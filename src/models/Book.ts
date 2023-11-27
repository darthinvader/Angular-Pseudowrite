import { Chapter } from "./Chapter";

export interface Book {
  id: string;
  title: string;
}

export interface FirebaseBook {
  title: string;
  chaptersInfo: Chapter[]
  imageUrl?: string;
}