'use client';

import NavBar from '../NavBar';
import Links from '@/components/Links';
import Profile from '@/components/Profile';
import PhoneMockup from '../PhoneMockup';
import { useRouter, useSearchParams } from 'next/navigation';
import { useUser } from '@/context/AuthContext';
import { useEffect } from 'react';

export default function HomeClient() {
  const params = useSearchParams();
  const profileTab = params.get('tab') === 'profile';
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.replace('/login');
    }
  }, [user]);

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <NavBar />
      <div className="flex flex-row justify-center p-4 w-full h-full lg:space-x-6">
        <PhoneMockup />
        {profileTab ? <Profile /> : <Links />}
      </div>
    </div>
  );
}
