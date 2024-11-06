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
  isActive: boolean;
  dateOfBirth: string;
  phoneNumbers: string[];
  cartId: string;
};
