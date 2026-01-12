export interface HomeBook {
  id: string;
  title: string;
  authorName: string;
  price: number;
  thumbnail: string;
  authorId?: string;
  category?: string;
  description?: string;
  oldPrice?: number;
  discount?: string;
  rating?: number;
}
