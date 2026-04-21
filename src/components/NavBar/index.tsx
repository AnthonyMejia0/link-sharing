'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import LinkIcon from '@/assets/images/icon-links-header.svg';
import ProfileIcon from '@/assets/images/icon-profile-details-header.svg';

function NavBar() {
  const params = useSearchParams();
  const profileTab = params.get('tab') === 'profile';

  return (
    <div className="w-full h-21 bg-white flex flex-row items-center justify-between py-4 pl-6 pr-4">
      <Link href="/" className="md:hidden">
        <Image
          src="/images/logo-devlinks-small.svg"
          width={32}
          height={32}
          alt="devlinks logo"
          className="w-8 h-8"
        />
      </Link>
      <Link href="/" className="hidden md:inline-block">
        <Image
          src="/images/logo-devlinks-large.svg"
          width={146}
          height={32}
          alt="devlinks logo"
          className="w-36.5 h-8"
          loading="eager"
        />
      </Link>

      <div className="flex flex-row h-13 pl-5 md:pl-0 md:h-14">
        <Link
          href={'/'}
          className={`px-6 flex justify-center items-center cursor-pointer rounded-lg text-grey-500 hover:text-purple-600 ${
            !profileTab
              ? 'bg-grey-100 text-purple-600'
              : 'bg-none text-grey-500'
          }`}
        >
          <LinkIcon className="w-5 h-5 text-inherit" />
          <span className="hidden md:inline-block ml-2 text-inherit">
            Links
          </span>
        </Link>
        <Link
          href={'?tab=profile'}
          className={`px-6 flex justify-center items-center cursor-pointer rounded-lg text-grey-500 hover:text-purple-600 ${
            profileTab ? 'bg-grey-100 text-purple-600' : 'bg-none text-grey-500'
          }`}
        >
          <ProfileIcon className="w-5 h-5 text-inherit" />
          <span className="hidden md:inline-block ml-2 text-inherit">
            Profile Details
          </span>
        </Link>
      </div>

      <button className="w-13 h-13 rounded-lg bg-white hover:bg-grey-100 border border-purple-600 flex items-center justify-center cursor-pointer md:w-27 md:h-14">
        <Image
          src="/images/icon-preview-header.svg"
          width={20}
          height={20}
          alt="preview"
          className="w-5 h-5 md:hidden"
        />
        <span className="hidden text-preset-3-semi text-purple-600 md:inline-block">
          Preview
        </span>
      </button>
    </div>
  );
}

export default NavBar;
