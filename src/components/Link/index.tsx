import { AddLinkType, LinkType } from '@/types/links';
import DragIcon from '@/assets/images/icon-drag-and-drop.svg';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { PLATFORMS } from '@/lib/platforms';
import { useEffect, useState } from 'react';
import LinkIcon from '@/assets/images/icon-link.svg';
import { useSortable } from '@dnd-kit/react/sortable';

type LinkProps = {
  link: LinkType | AddLinkType;
  index: number;
  failedSave: boolean;
  handleUpdateLink: (index: number, platform: string, url: string) => void;
  handleRemoveLink: (index: number) => void;
};

function Link({
  link,
  index,
  failedSave,
  handleUpdateLink,
  handleRemoveLink,
}: LinkProps) {
  const [platform, setPlatform] = useState(link.platform ?? '');
  const [linkInput, setLinkInput] = useState(link.url ?? '');
  const [inputError, setInputError] = useState(false);
  const { ref: sortableRef } = useSortable({
    id: link.id ?? crypto.randomUUID(),
    index: index,
  });

  useEffect(() => {
    if (inputError) setInputError(false);
    handleUpdateLink(index, platform, linkInput);
  }, [platform, linkInput]);

  useEffect(() => {
    if (failedSave && linkInput.length < 1) {
      setInputError(true);
    }
  }, [failedSave, linkInput]);

  return (
    <li ref={sortableRef} className="w-full rounded-xl p-4 md:p-6 bg-grey-50">
      <div className="flex flex-row justify-between w-full">
        <div className="flex flex-row items-center space-x-2 cursor-pointer">
          <DragIcon className="w-3 h-1.5" />
          <p className="text-preset-3-bold text-grey-500">Link #{index + 1}</p>
        </div>
        <button
          onClick={() => handleRemoveLink(index)}
          className="text-preset-3 text-grey-500 cursor-pointer"
        >
          Remove
        </button>
      </div>
      <div className="w-full mt-4">
        <Select value={platform} onValueChange={setPlatform}>
          <SelectTrigger className="w-full p-4! h-auto! bg-white! border-grey-200! shadow-none! outline-none! cursor-pointer">
            <SelectValue placeholder="Select a platform" />
          </SelectTrigger>
          <SelectContent className="">
            <SelectGroup>
              {Object.entries(PLATFORMS).map(([value, platform]) => (
                <SelectItem
                  key={value}
                  value={value}
                  className="p-4! cursor-pointer"
                >
                  {platform.label === 'X' ? (
                    <img
                      src="/images/icon-x-black.png"
                      alt="x icon"
                      className="mr-3 text-grey-500 w-4 h-4"
                    />
                  ) : (
                    <platform.icon className="mr-3 text-grey-500" />
                  )}
                  {platform.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <p className="text-preset-4 text-grey-900 mt-4">Link</p>
        <div className="relative w-full">
          <LinkIcon className="absolute w-4 h-4 left-4 top-1/2" />
          <input
            type="text"
            value={linkInput}
            onChange={(e) => setLinkInput(e.target.value)}
            placeholder="e.g. https://www.github.com/johnappleseed"
            className={`w-full h-14 pl-12 pr-4 text-preset-3 text-grey-900 rounded-lg mt-4 bg-white border outline-none ${
              inputError ? 'border-red-500' : 'border-grey-200'
            }`}
          />
          {inputError && (
            <p className="text-right mt-2 md:mt-0 md:absolute text-preset-4 right-4 top-1/2 text-red-500">
              Can't be empty
            </p>
          )}
        </div>
      </div>
    </li>
  );
}

export default Link;
