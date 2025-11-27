export interface contact {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  createdAt?: string;
  updatedAt?: string;
  address?: Address[];
}

export interface Address {
  _id?: string;
  contactId?: string;
  label?: string;
  street?: string;
  city?: string;
  province?: string;
  country?: string;
  postalCode?: string;
}
