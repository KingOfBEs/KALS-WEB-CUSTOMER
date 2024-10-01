export interface Category {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  modifiedAt: string;
}

export type CategoryResponse = Pick<Category, "id" | "name">;
