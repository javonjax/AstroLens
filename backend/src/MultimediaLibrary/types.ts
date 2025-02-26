export interface LibraryData {
  href: string;
  data: LibraryItem[];
  links: ImageLink[];
}

export interface LibraryItem {
  center: string;
  date_created: string;
  description: string;
  keywords: string[];
  location: string;
  nasa_id: string;
  title: string;
  media_type: string;
  photographer?: string;
}

export interface ImageLink {
  href: string;
  rel: string;
}
