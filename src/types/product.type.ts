export interface Product {
  id: string;
  name: string;
  description: string;
  quantity: number;
  price: number;
  isKit: boolean;
  createdAt: string;
  modifiedAt: string;
  isHidden: boolean;
}

export type ProductResponse = Pick<
  Product,
  "id" | "name" | "price" | "isHidden"
>;
