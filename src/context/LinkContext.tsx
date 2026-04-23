'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { getSupabaseBrowserClient } from '@/lib/supabase/browser-client';
import { LocalLinkType } from '@/types/links';
import { useUser } from './AuthContext';

type LinksContextType = {
  links: LocalLinkType[];
  loading: boolean;
  updateLinks: (newLinks: LocalLinkType[]) => Promise<void>;
  refreshLinks: () => Promise<void>;
};

const LinksContext = createContext<LinksContextType | undefined>(undefined);

export function LinksProvider({ children }: { children: React.ReactNode }) {
  const supabase = getSupabaseBrowserClient();
  const [links, setLinks] = useState<LocalLinkType[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useUser();

  const getLinks = async () => {
    // const {
    //   data: { user },
    // } = await supabase.auth.getUser();

    if (!user) return;

    setLoading(true);

    const { data: linkData } = await supabase
      .from('links')
      .select('*')
      .eq('user_id', user.id);

    const sortedLinks = linkData?.sort((l1, l2) => l1.position - l2.position);
    const localizedLinks = sortedLinks?.map((l) => {
      return {
        id: l.id,
        platform: l.platform,
        url: l.url,
      } as LocalLinkType;
    });

    if (localizedLinks) setLinks([...localizedLinks]);
    setLoading(false);
  };

  const updateLinks = async (newLinks: LocalLinkType[]) => {
    // const {
    //   data: { user },
    // } = await supabase.auth.getUser();

    if (!user) return;

    setLoading(true);

    const { error: deleteError } = await supabase
      .from('links')
      .delete()
      .eq('user_id', user.id);

    if (deleteError) throw deleteError;

    const { error: insertError } = await supabase.from('links').insert(
      newLinks.map((link, i) => ({
        user_id: user.id,
        platform: link.platform,
        url: link.url,
        position: i,
      })),
    );

    if (insertError) throw insertError;

    setLoading(false);
  };

  const refreshLinks = async () => {
    await getLinks();
  };

  useEffect(() => {
    getLinks();
  }, [user]);

  return (
    <LinksContext.Provider
      value={{ links, loading, updateLinks, refreshLinks }}
    >
      {children}
    </LinksContext.Provider>
  );
}

export function useLinks() {
  const context = useContext(LinksContext);

  if (!context) {
    throw new Error('useUser must be used within an AuthProvider');
  }

  return context;
}
