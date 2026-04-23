import { AddLinkType, LinkType } from '@/types/links';
import Link from '../Link';
import { Dispatch, SetStateAction } from 'react';

type LinksDisplayProps = {
  links: LinkType[] | AddLinkType[];
  setLinks: Dispatch<SetStateAction<LinkType[] | AddLinkType[]>>;
  failedSave: boolean;
};

function LinksDisplay({ links, setLinks, failedSave }: LinksDisplayProps) {
  const handleUpdateLink = (index: number, platform: string, url: string) => {
    setLinks((prev) =>
      prev.map((l, i) =>
        i === index
          ? {
              ...l,
              platform,
              url,
            }
          : l,
      ),
    );
  };

  const handleRemoveLink = (index: number) => {
    console.log('Index: ', index);
    console.log('Links =>', links);
    setLinks((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="w-full h-full flex flex-col space-y-6 overflow-scroll">
      {links.map((link, i) => (
        <Link
          key={link.id}
          link={link}
          index={i}
          failedSave={failedSave}
          handleUpdateLink={handleUpdateLink}
          handleRemoveLink={handleRemoveLink}
        />
      ))}
    </div>
  );
}

export default LinksDisplay;
