export interface Book {
  id: string;
  title: string;
}

export interface FirebaseBook {
  title: string;
  chapterIds: string[];
  chapterTitles: string[];
}