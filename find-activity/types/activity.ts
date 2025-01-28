type Supplier = {
    name: string;
    address: string;
    city: string;
    country: string;
  };
  
  export type Activity = {
    id: number;
    title: string;
    price: number;
    currency: string;
    rating: number;
    specialOffer: boolean;
    supplier: Supplier;
  };
  