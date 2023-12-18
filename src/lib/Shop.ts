import { Location } from '@/hooks/atom/location';

export class Shop {
  id: string;
  name: string;
  photo: Photo;
  catchText: string;
  open: string;
  close: string;
  address: string;
  access: string;
  couponUrls: CouponUrls;
  urls: Urls;
  shopLocation: Location;

  constructor(data: unknown) {
    const {
      id,
      name,
      photo,
      catch: catchText,
      open,
      close,
      address,
      access,
      coupon_urls,
      urls,
      lat,
      lng,
    } = data as ApiResponse;

    this.id = id;
    this.name = name;
    this.photo = photo;
    this.catchText = catchText;
    this.open = open;
    this.close = close;
    this.address = address;
    this.access = access;
    this.couponUrls = coupon_urls;
    this.urls = urls;
    this.shopLocation = { lat, lng };
  }
}

type ApiResponse = {
  id: string;
  name: string;
  photo: Photo;
  catch: string;
  open: string;
  close: string;
  address: string;
  access: string;
  coupon_urls: CouponUrls;
  urls: Urls;
  lat: number;
  lng: number;
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

export type CouponUrls = {
  pc: string;
  sp: string;
};

export type Urls = {
  pc: string;
};
