import { ProductResponse } from "../types/product.type";
import { BaseReponse } from "../types/response.type";
import request from "../utils/axios";
import { API_SUFFIX, generateAPIWithPaging } from "./utils.api";

const getProducts = (params?: any) =>
  request.get<BaseReponse<ProductResponse>>(`/${API_SUFFIX.PRODUCT_API}`, {
    params,
  });

const getProductById = (id: string) =>
  request.get<ProductResponse>(`/${API_SUFFIX.PRODUCT_API}/${id}`);

const productApi = {
  ...generateAPIWithPaging<ProductResponse>(API_SUFFIX.PRODUCT_API),
  getProducts,
  getProductById,
};

export default productApi;
