export type AppEventType = {
  id: string;
  name: string;
  description: string;
  date: string;
  location: string;
  image: string;
  price: number;
  capacity: number;
  status: string;
  category: string;
  organizer: string;
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
