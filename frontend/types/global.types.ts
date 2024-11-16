export type AppEventType = {
  id: string;
  name: string;
  description: string;
  city: string;
  address: string;
  type: string;
  poster: string;
  images: string[];
  date: string;
  price: number;
  cart: AppCartType;
};

export type AppUserType = {
  id: string;
  role: string;
  username: string;
  firstname: string;
  lastname: string;
  address: string;
  email: string;
  password: string;
  history: AppCartType[];
  isActive: boolean;
  dateOfBirth: string;
  phoneNumbers: string[];
  cartId: string;
};

export type AppCartType = {
  eventsIds: string[];
  totalPrice: number;
  numberOfTickets: number;
  couponsIds: string[];
};

export type AppCouponType = {
  id: string;
  code: string;
  name: string;
  description: string;
  discount: number;
  expiryDate: string;
  userId?: string;
};
