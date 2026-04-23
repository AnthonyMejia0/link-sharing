'use client';

import { LinkMockup } from '@/components/PhoneMockup';
import { useUser } from '@/context/AuthContext';
import { useLinks } from '@/context/LinkContext';
import { getSupabaseBrowserClient } from '@/lib/supabase/browser-client';
import { LocalLinkType } from '@/types/links';
import { ProfileType } from '@/types/user';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

function SharedLinks() {
  const [user, setUser] = useState<ProfileType | null>(null);
  const [links, setLinks] = useState<LocalLinkType[]>([]);
  const [notFound, setNotFound] = useState(false);
  const [loadingUser, setLoadingUser] = useState(false);
  const [loadingLinks, setLoadingLinks] = useState(false);
  const pathname = usePathname();
  const supabase = getSupabaseBrowserClient();

  const fetchUserLinks = useCallback(async () => {
    if (!user || !user.id) return;
    setLoadingLinks(true);

    const { data, error } = await supabase
      .from('links')
      .select('*')
      .eq('user_id', user.id);

    if (error) {
      console.log(error);
      setLoadingLinks(false);
      return;
    }

    const sortedLinks = data?.sort((l1, l2) => l1.position - l2.position);
    const localizedLinks = sortedLinks?.map((l) => {
      return {
        id: l.id,
        platform: l.platform,
        url: l.url,
      } as LocalLinkType;
    });

    if (localizedLinks) setLinks([...localizedLinks]);

    setLoadingLinks(false);
  }, [user]);

  const fetchUserProfile = useCallback(async () => {
    setLoadingUser(true);

    const username = pathname.slice(1);
    const { data, error } = await supabase
      .from('profiles')
      .select()
      .eq('username', username);

    if (error || !data) {
      setNotFound(true);
      setLoadingUser(false);
      return;
    }

    setUser(data[0]);
    setLoadingUser(false);
  }, [pathname]);

  useEffect(() => {
    fetchUserLinks();
  }, [user, fetchUserLinks]);

  useEffect(() => {
    fetchUserProfile();
  }, [fetchUserProfile]);

  return (
    <div className="w-full h-full min-h-screen overflow-y-scroll pb-10 bg-grey-50">
      <div className="w-full h-60 rounded-b-xl bg-purple-600 md:pt-6 md:px-6"></div>
      <div
        className={`${
          (loadingUser || loadingLinks) && 'animate-pulse'
        } flex flex-col shadow justify-center items-center mx-auto -mt-34 md:-mt-30 w-76.75 h-max min-h-20 bg-white rounded-[24px] p-10 md:py-12 md:px-14`}
      >
        {user?.avatar_url && (
          <img
            src={user.avatar_url}
            alt="Profile"
            className="w-24 h-24 rounded-full border-4 border-purple-600"
          />
        )}
        <div className="w-59.25 h-16 mt-6">
          <h2 className="text-grey-900 leading-[150%] tracking-normal font-inst-sans font-semibold text-[18px] text-center">
            {user?.first_name} {user?.last_name}
          </h2>
          <p className="text-grey-500 leading-[150%] tracking-normal text-[14px] text-center">
            {user?.email}
          </p>
        </div>
        <div className="flex flex-col space-y-5 w-59.25 h-max rounded-lg mt-10 md:mt-14">
          {links.map((link, i) => (
            <LinkMockup key={i} link={link} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default SharedLinks;
