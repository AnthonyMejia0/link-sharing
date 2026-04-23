'use client';

import { PlatformConfig, PlatformKey, PLATFORMS } from '@/lib/platforms';
import { LocalLinkType } from '@/types/links';
import ArrowRightIcon from '@/assets/images/icon-arrow-right.svg';
import { useLinks } from '@/context/LinkContext';
import { useUser } from '@/context/AuthContext';
import Link from 'next/link';

function PhoneMockup() {
  const { links } = useLinks();
  const { user } = useUser();

  return (
    <div className="hidden xl:flex justify-center items-center w-140 min-w-140 max-w-140 bg-white rounded-xl">
      <div className="relative w-76.75 h-157.75">
        <img
          src="/images/illustration-phone-mockup-data.svg"
          alt="phone mockup"
          className="object-cover z-0"
        />
        {user?.user_metadata?.avatar_url && (
          <img
            src={user?.user_metadata.avatar_url}
            alt="Profile"
            className="absolute w-24 h-24 rounded-full top-[63.5px] left-26.25 border-4 border-purple-600"
          />
        )}
        <div className="absolute top-44.5 left-[34.5px] w-59.25 h-16">
          <h2 className="text-grey-900 leading-[150%] tracking-normal font-inst-sans font-semibold text-[18px] text-center">
            {user?.user_metadata?.first_name} {user?.user_metadata?.last_name}
          </h2>
          <p className="text-grey-500 leading-[150%] tracking-normal text-[14px] text-center">
            {user?.email}
          </p>
        </div>
        <div className="absolute z-10 flex flex-col space-y-5 top-[277.5px] left-[34.5px] w-59.25 h-75 rounded-lg">
          {links.slice(0, 5).map((link, i) => (
            <LinkMockup key={i} link={link} />
          ))}
        </div>
      </div>
    </div>
  );
}

export function LinkMockup({ link }: { link: LocalLinkType }) {
  const key = link.platform.toLowerCase().replace(/\s/g, '');
  const platformData: PlatformConfig = PLATFORMS[key as PlatformKey];

  return (
    <Link
      href={link.url}
      target="_blank"
      className={`z-50 flex flex-row justify-start items-center px-4 py-3.5 space-x-2 w-full h-11 rounded-lg border hover:opacity-90`}
      style={{
        backgroundColor: platformData.bgColor,
        borderColor: platformData.borderColor ?? platformData.bgColor,
      }}
    >
      <platformData.icon
        className="w-4 h-4"
        style={{ color: platformData.textColor }}
      />
      <p
        className={`text-preset-4`}
        style={{
          color: platformData.textColor,
        }}
      >
        {platformData.label}
      </p>
      <ArrowRightIcon
        className="w-4 h-4 ml-auto"
        style={{ color: platformData.textColor }}
      />
    </Link>
  );
}

export default PhoneMockup;
