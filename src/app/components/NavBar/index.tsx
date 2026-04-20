'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

function NavBar() {
  const params = useSearchParams();

  return (
    <div className="w-full h-21 bg-white flex flex-row items-center justify-between py-4 pl-6 pr-4">
      <Image
        src="/images/logo-devlinks-small.svg"
        width={32}
        height={32}
        alt="devlinks logo"
        className="w-8 h-8 md:hidden"
      />
      <Image
        src="/images/logo-devlinks-large.svg"
        width={146}
        height={32}
        alt="devlinks logo"
        className="hidden md:inline-block w-36.5 h-8"
      />

      <div className="flex flex-row h-13 pl-5 md:pl-0 md:h-14">
        <Link
          href={'?tab=links'}
          className={`px-6 flex justify-center items-center cursor-pointer rounded-lg ${
            params.get('tab') === 'links' ? 'bg-grey-100' : 'bg-none'
          }`}
        >
          <img
            src={`/images/icon-links-header${
              params.get('tab') === 'links' ? '-purple' : ''
            }.svg`}
            alt="Links"
            className="w-5 h-5"
          />
          <span
            className={`hidden md:inline-block ml-2 ${
              params.get('tab') === 'links'
                ? 'text-purple-600'
                : 'text-grey-500'
            }`}
          >
            Links
          </span>
        </Link>
        <Link
          href={'?tab=profile'}
          className={`px-6 flex justify-center items-center cursor-pointer rounded-lg ${
            params.get('tab') === 'profile' ? 'bg-grey-100' : 'bg-none'
          }`}
        >
          <img
            src={`/images/icon-profile-details-header${
              params.get('tab') === 'profile' ? '-purple' : ''
            }.svg`}
            alt="Profile"
            className="w-5 h-5"
          />
          <span
            className={`hidden md:inline-block ml-2 ${
              params.get('tab') === 'profile'
                ? 'text-purple-600'
                : 'text-grey-500'
            }`}
          >
            Profile Details
          </span>
        </Link>
      </div>

      <button className="w-13 h-13 rounded-lg border border-purple-600 flex items-center justify-center cursor-pointer md:w-27 md:h-14">
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
