export type LinkType = {
  id: string;
  user_id: string;
  platform: string;
  url: string;
  position: number;
};

export type LocalLinkType = {
  id?: string | null;
  platform: string;
  url: string;
};

export type AddLinkType = {
  id?: string | null;
  platform: string | null;
  url: string | null;
};

export type LinkPost = {
  user_id: string;
  platform: string;
  url: string;
  position: number;
};
