import { ProfileType, UserType } from '@/types/user';
import { SupabaseClient } from '@supabase/supabase-js';

const extractPathFromUrl = (url: string) => {
  try {
    const parts = url.split('/user_avatars/');
    return parts[1] ?? null;
  } catch {
    return null;
  }
};

export const updateUserProfile = async (
  user: UserType,
  supabase: SupabaseClient,
  userInfo: UserType,
  selectedFile: File | null,
) => {
  if (!user) throw new Error('No user');

  const oldAvatar = user.user_metadata?.avatar_url;
  let newAvatarUrl = oldAvatar;

  // Upload image
  if (selectedFile) {
    const fileExt = selectedFile.name.split('.').pop();
    const filePath = `${user.id}/${Date.now()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from('user_avatars')
      .upload(filePath, selectedFile);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage
      .from('user_avatars')
      .getPublicUrl(filePath);

    newAvatarUrl = data.publicUrl;
  }

  // Update user
  const { error: updateError } = await supabase.auth.updateUser({
    email: userInfo?.email,
    data: {
      first_name: userInfo?.user_metadata?.first_name,
      last_name: userInfo?.user_metadata?.last_name,
      avatar_url: newAvatarUrl,
      username: userInfo?.user_metadata?.username,
    },
  });

  await supabase
    .from('profiles')
    .update({
      first_name: userInfo?.user_metadata?.first_name ?? null,
      last_name: userInfo?.user_metadata?.last_name ?? null,
      username: userInfo?.user_metadata?.username ?? null,
      email: userInfo?.email,
      avatar_url: newAvatarUrl,
    })
    .eq('id', user.id);

  if (updateError) throw updateError;

  // Delete old avatar
  if (selectedFile && oldAvatar) {
    const oldPath = extractPathFromUrl(oldAvatar);
    if (oldPath) {
      await supabase.storage.from('user_avatars').remove([oldPath]);
    }
  }

  return newAvatarUrl;
};
