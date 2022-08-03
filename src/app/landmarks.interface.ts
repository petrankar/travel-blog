export interface Landmark {
  title: string;
  createdAt: string;
  updatedAt: string;
  url: string;
  short_info: string;
  photo: string;
  photo_thumb: Photo;
  location: Array<Number>;
  objectId: string;
  description?: string;
}

interface Photo {
  name: string;
  url: string;
}
