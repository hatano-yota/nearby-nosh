export class Shop {
  id: string;
  name: string;
  photo: Photo;
  access: string;

  constructor(data: unknown) {
    const { id, name, photo, access } = data as ApiResponse;
    this.id = id;
    this.name = name;
    this.photo = photo;
    this.access = access;
  }
}

type ApiResponse = {
  id: string;
  name: string;
  photo: Photo;
  access: string;
};

export type Photo = {
  pc: {
    l: string;
    m: string;
    s: string;
  };
  mobile: {
    l: string;
    m: string;
    s: string;
  };
};
