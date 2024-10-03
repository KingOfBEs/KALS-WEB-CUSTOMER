export type CartItem = {
  productId: string;
  name?: string;
  description?: string;
  price: number;
  quantity: number;
};

export type CartItemRequest = Pick<CartItem, "productId" | "quantity">;
