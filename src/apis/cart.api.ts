import { CartItem, CartItemRequest } from "../types/cart.type";
import request from "../utils/axios";
import { API_SUFFIX, generateAPI } from "./utils.api";

const updateCart = (data: CartItemRequest) =>
  request.patch<CartItem>(`/${API_SUFFIX.CART_API}`, data);

const deleteCartItem = (params: any) =>
  request.delete<CartItem>(`/${API_SUFFIX.CART_API}`, { params });
export const cartApi = {
  ...generateAPI<CartItem>(API_SUFFIX.CART_API),
  updateCart,
  deleteCartItem,
};
