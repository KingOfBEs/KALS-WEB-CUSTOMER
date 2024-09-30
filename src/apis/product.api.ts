import { ProductResponse } from "../types/product.type";
import { BaseReponse } from "../types/response.type";
import request from "../utils/axios";
import { generateAPIWithPaging } from "./utils.api";

const PRODUCT_API = "products";

const getProducts = (params?: any) =>
  request.get<BaseReponse<ProductResponse>>(`/${PRODUCT_API}`, { params });

const getProducById = (id: string) =>
  request.get<ProductResponse>(`/${PRODUCT_API}/${id}`);

const productApi = {
  ...generateAPIWithPaging<ProductResponse>("products"),
  getProducts,
  getProducById,
};

export default productApi;
