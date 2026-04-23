'use client';

import Links from '@/components/Links';
import NavBar from '../components/NavBar';
import PhoneMockup from '../components/PhoneMockup';
import { useSearchParams } from 'next/navigation';
import Profile from '@/components/Profile';

export default function Home() {
  const params = useSearchParams();
  const profileTab = params.get('tab') === 'profile';

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
