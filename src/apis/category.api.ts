import { CategoryResponse } from "../types/category.type";
import { BaseReponse } from "../types/response.type";
import request from "../utils/axios";
import { API_SUFFIX, generateAPI } from "./utils.api";

const getCategories = (params?: any) =>
  request.get<BaseReponse<CategoryResponse>>(`/${API_SUFFIX.CATEGORY_API}`, {
    params,
  });

export const categoryApi = {
  ...generateAPI<CategoryResponse>(API_SUFFIX.CATEGORY_API),
  getCategories,
};
