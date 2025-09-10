// User ----------------------------------------------------------------
export type AppUserType = {
  id: string;
  fullnames: string;
  lastnames: string;
  username: string;
  email: string;
  password: string; // opcional en responses si no lo devuelves
  phone: string;
  address: string;
  role: "ADMIN" | "USER";
  active: boolean;
  createdAt: string;
  updatedAt: string;
  order: AppOrderType[]; // relación opcional
};

// Event ---------------------------------------------------------------
export type AppEventType = {
  id: string;
  name: string;
  description: string;
  category: "CONCERT" | "THEATER" | "SPORT" | "FESTIVAL" | "OTHER";
  logo: string;
  poster: string;
  images: string[];
  date: string;
  venueId: string;
  venue?: AppVenueType;
  vipCapacity: number;
  vipAvailable: number;
  vipSold: number;
  vipReserved: number;
  regularCapacity: number;
  regularAvailable: number;
  regularSold: number;
  regularReserved: number;
  vipPrice: number;
  regularPrice: number;
  createdAt: string;
  updatedAt: string;
  orders?: AppOrderType[];
  tickets?: AppTicketType[];
};

// Venue ---------------------------------------------------------------
export type AppVenueType = {
  id: string;
  name: string;
  address: string;
  city: string;
  capacity: number;
  createdAt: string;
  updatedAt: string;
  events?: AppEventType[];
};

// Ticket --------------------------------------------------------------
export type AppTicketType = {
  id: string;
  price: number;
  eventId: string;
  event?: AppEventType;
  type: "REGULAR" | "VIP";
  status: "AVAILABLE" | "RESERVED" | "SOLD" | "EXPIRED";
  orderId: string;
  order?: AppOrderType;
  createdAt: string;
  updatedAt: string;
};

// Order ---------------------------------------------------------------
export type AppOrderType = {
  id: string;
  eventId: string;
  event?: AppEventType;
  userId: string;
  user?: AppUserType;
  tickets?: AppTicketType[];
  total: number;
  status: "PENDING" | "COMPLETED" | "CANCELLED" | "EXPIRED";
  createdAt: string;
  updatedAt: string;
  payments?: AppPaymentType[];
};

// Payment -------------------------------------------------------------
export type AppPaymentType = {
  id: string;
  orderId: string;
  order?: AppOrderType;
  mpPreferenceId: number;
  mpPaymentId: number;
  mpStatusDetail?: string;
  mpCurrency: string;
  amount: number;
  mpTransactionAmount?: number;
  mpNetReceivedAmount?: number;
  method:
    | "CREDIT_CARD"
    | "DEBIT_CARD"
    | "PAYPAL"
    | "TRANSFER"
    | "PSE"
    | "OTHER";
  status:
    | "PENDING"
    | "APPROVED"
    | "REJECTED"
    | "CANCELLED"
    | "REFUNDED"
    | "EXPIRED";
  createdAt: string;
  updatedAt: string;
};
