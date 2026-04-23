import { AddLinkType, LinkType } from '@/types/links';
import Link from '../Link';
import { Dispatch, SetStateAction, useState } from 'react';
import { DragDropProvider, DragEndEvent, useDroppable } from '@dnd-kit/react';
import { isSortable } from '@dnd-kit/react/sortable';
import { arrayMove } from '@/lib/utils/arrayMove';

type LinksDisplayProps = {
  links: LinkType[] | AddLinkType[];
  setLinks: Dispatch<SetStateAction<LinkType[] | AddLinkType[]>>;
  failedSave: boolean;
};

function LinksDisplay({ links, setLinks, failedSave }: LinksDisplayProps) {
  const [isDropped, setIsDropped] = useState(false);

  const { ref: droppableRef } = useDroppable({ id: 'LinkContainer' });

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

  const handleDragEnd = (e: DragEndEvent) => {
    const { source, target } = e.operation;

    if (!isSortable(source) || !isSortable(target)) return;

    const oldIndex = source.sortable.initialIndex;
    const newIndex = target.sortable.index;

    if (oldIndex === newIndex) return;

    setLinks((prev) => arrayMove(prev, oldIndex, newIndex));
  };

  return (
    <DragDropProvider onDragEnd={handleDragEnd}>
      <ul
        ref={droppableRef}
        className="w-full h-full flex flex-col space-y-6 overflow-scroll"
      >
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
      </ul>
    </DragDropProvider>
  );
}

export default LinksDisplay;
