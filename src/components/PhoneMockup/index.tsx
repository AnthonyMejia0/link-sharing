'use client';

import { PlatformConfig, PlatformKey, PLATFORMS } from '@/lib/platforms';
import { LinkType } from '@/types/links';
import ArrowRightIcon from '@/assets/images/icon-arrow-right.svg';

function PhoneMockup() {
  const links: LinkType[] = [
    { platform: 'GitHub', url: 'https://github.com/AnthonyMejia0' },
    {
      platform: 'Frontend Mentor',
      url: 'https://frontendmentor.com/AnthonyMejia0',
    },
  ];

  return (
    <div className="relative hidden lg:flex justify-center items-center w-140 min-w-140 bg-white rounded-xl">
      <img
        src="/images/illustration-phone-mockup.svg"
        alt="phone mockup"
        className="w-76.75 h-157.75 z-0"
      />
      <div className="absolute z-10 flex flex-col space-y-5 top-97 left-40.25 w-59.25 h-75 rounded-lg">
        {links.slice(0, 5).map((link, i) => (
          <LinkMockup key={i} link={link} />
        ))}
      </div>
    </div>
  );
}

function LinkMockup({ link }: { link: LinkType }) {
  const key = link.platform.toLowerCase().replace(/\s/g, '');
  const platformData: PlatformConfig = PLATFORMS[key as PlatformKey];

  return (
    <div
      className={`z-50 flex flex-row justify-start items-center px-4 py-3.5 space-x-2 w-full h-11 rounded-lg border`}
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
    </div>
  );
}

export default PhoneMockup;
