export const ROUTES = {
  HOME: '/',
  SHOP: (shopId: string) => `/shops/${shopId}`,
} as const;
