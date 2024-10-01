import { CategoryResponse } from "./category.type";

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
  categories: CategoryResponse[];
}

export type ProductResponse = Pick<
  Product,
  "id" | "name" | "price" | "isHidden" | "categories"
>;
