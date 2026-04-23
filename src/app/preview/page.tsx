'use client';

import { LinkMockup } from '@/components/PhoneMockup';
import { useUser } from '@/context/AuthContext';
import { useLinks } from '@/context/LinkContext';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

function Preview() {
  const { user } = useUser();
  const { links } = useLinks();
  const router = useRouter();

  const copyToClipboard = async () => {
    if (!user?.user_metadata?.username) return;

    try {
      await navigator.clipboard.writeText(
        `${BASE_URL}/${encodeURI(user.user_metadata?.username)}`,
      );
      toast.success('Link copied to clipboard.');
    } catch (error) {
      toast.error('Failed to copy link.');
    }
  };

  return (
    <div className="w-full h-full overflow-y-scroll pb-10 bg-grey-50">
      <div className="w-full h-22 md:h-80 rounded-b-xl bg-transparent md:bg-purple-600 md:pt-6 md:px-6">
        <div className="w-full h-22 flex flex-row justify-between items-center rounded-xl py-4 px-6 bg-none md:bg-white">
          <button
            onClick={() => router.back()}
            className="text-preset-3-semi flex-1 max-w-38.25 py-4 rounded-lg border border-purple-600 text-purple-600 cursor-pointer hover:bg-grey-100"
          >
            Back to Editor
          </button>
          <button
            onClick={copyToClipboard}
            className="text-preset-3-semi flex-1 max-w-31.75 py-4 rounded-lg border bg-purple-600 border-purple-600 text-white cursor-pointer hover:opacity-80"
          >
            Share Link
          </button>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center mx-auto mt-12.5 md:-mt-30 w-76.75 h-max bg-transparent md:bg-white rounded-[24px] p-0 md:py-12 md:px-14">
        {user?.user_metadata?.avatar_url && (
          <img
            src={user?.user_metadata.avatar_url}
            alt="Profile"
            className="w-24 h-24 rounded-full border-4 border-purple-600"
          />
        )}
        <div className="w-59.25 h-16 mt-6">
          <h2 className="text-grey-900 leading-[150%] tracking-normal font-inst-sans font-semibold text-[18px] text-center">
            {user?.user_metadata?.first_name} {user?.user_metadata?.last_name}
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

export default Preview;
