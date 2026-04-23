export type UserType = {
  id: string;
  email?: string;
  user_metadata?: {
    first_name?: string;
    last_name?: string;
    avatar_url?: string | null | undefined;
  };
} | null;
