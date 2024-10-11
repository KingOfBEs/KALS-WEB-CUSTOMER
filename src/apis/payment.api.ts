import request from "../utils/axios";
import { API_SUFFIX } from "./utils.api";

const checkout = (address: string) =>
  request.post(`${API_SUFFIX.PAYMENT_API}/checkout`, { address });
const completeOrder = (orderCode: number) =>
  request.post(`${API_SUFFIX.PAYMENT_API}`, { orderCode });
export const paymentApi = {
  checkout,
  completeOrder,
};
