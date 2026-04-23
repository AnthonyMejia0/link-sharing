'use client';

import { AddLinkType, LocalLinkType } from '@/types/links';
import LinksDisplay from '../LinksDisplay';
import { useLinks } from '@/context/LinkContext';
import { useEffect, useState } from 'react';
import LoadingSpinner from '../LoadingSpinner';
import { toast } from 'sonner';

function Links() {
  const { links, updateLinks, loading, refreshLinks } = useLinks();
  const [localLinks, setLocalLinks] = useState<LocalLinkType[] | AddLinkType[]>(
    [],
  );
  const [failedSave, setFailedSave] = useState(false);
  const [mounted, setMounted] = useState(false);

  const handleAddLink = () => {
    const newLink: AddLinkType = {
      id: crypto.randomUUID(),
      platform: null,
      url: null,
    };

    setLocalLinks([newLink, ...localLinks]);
  };

  const handleSave = async () => {
    setFailedSave(false);
    let validLinks = true;

    localLinks.map((l) => {
      if (l.platform === '' || l.url === '') {
        validLinks = false;
      }
      return l;
    });

    if (!validLinks) {
      setFailedSave(true);
      toast.error('Failed to save links.');
      return;
    }

    try {
      await updateLinks(localLinks as LocalLinkType[]);
      toast.success('Links saved successfully.');
      await refreshLinks();
    } catch (error) {
      setFailedSave(true);
      toast.success('Failed to save links.');
    }
  };

  useEffect(() => {
    setLocalLinks([...links]);
  }, [links]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="w-full max-w-202 mx-auto lg:mx-0 bg-white pt-6 pb-0 md:pt-10 rounded-xl">
      <div className="w-full px-6 md:px-10">
        <h1 className="text-preset-2 text-grey-900 text-left">
          Customize your links
        </h1>
        <p className="text-preset-3 text-grey-500 mt-2">
          Add/edit/remove links below and then share all your profiles with the
          world!
        </p>
        <button
          onClick={handleAddLink}
          className="text-preset-3 w-full h-14 mt-10 rounded-lg flex justify-center items-center bg-white hover:bg-grey-100 text-purple-600 border border-purple-600 cursor-pointer"
        >
          + Add new link
        </button>
      </div>

      <div className="w-full px-6 md:px-10">
        {(!localLinks || localLinks.length === 0) && (
          <div className="flex flex-col items-center justify-between w-full mt-6 h-86.75 md:h-119.75 bg-gray-50 rounded-xl px-6 py-[31.5px] md:py-[67.5px]">
            <img
              src="/images/illustration-empty.svg"
              alt="Get started"
              className="w-auto h-20 md:h-40"
            />
            <h1 className="text-preset-2 text-gray-900">
              Let's get you started
            </h1>
            <p className="text-preset-3 text-gray-500 text-center max-w-122">
              Use the “Add new link” button to get started. Once you have more
              than one link, you can reorder and edit them. We're here to help
              you share your profiles with everyone!
            </p>
          </div>
        )}
        {localLinks && localLinks.length > 0 && (
          <div className="flex flex-col items-center justify-between w-full mt-6 h-86.75 md:h-119.75 rounded-xl">
            <LinksDisplay
              links={localLinks}
              setLinks={setLocalLinks}
              failedSave={failedSave}
            />
          </div>
        )}
      </div>

      <div className="h-px w-full bg-grey-200 mt-10"></div>

      <div className="flex justify-center items-center md:justify-end w-full h-22 md:h-26 p-6">
        <button
          onClick={handleSave}
          disabled={loading}
          className="flex justify-center items-center w-full md:w-21.25 h-14 rounded-lg bg-purple-600 hover:bg-purple-300 text-white text-preset-3 cursor-pointer"
        >
          {loading ? <LoadingSpinner /> : 'Save'}
        </button>
      </div>
    </div>
  );
}

export default Links;
