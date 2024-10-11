import axios from "axios";
import { ADDRESS_API } from "../utils/config";

const getProvinces = async () => {
  const response = await axios.get(ADDRESS_API + "/p");
  return response.data;
};

const getDistricts = async (provinceId: string | undefined) => {
  const response = await axios.get(ADDRESS_API + `/p/${provinceId}?depth=2`);
  return response.data.districts;
};

const getWards = async (districtId: string | undefined) => {
  const response = await axios.get(ADDRESS_API + `/d/${districtId}?depth=2`);
  return response.data.wards;
};

const getProvinceById = async (provinceId: string | undefined) => {
  const response = await axios.get(ADDRESS_API + `/p/${provinceId}`);
  return response.data;
};
const getDistrictById = async (districtId: string | undefined) => {
  const response = await axios.get(ADDRESS_API + `/d/${districtId}`);
  return response.data;
};
const getWardById = async (wardId: string | undefined) => {
  const response = await axios.get(ADDRESS_API + `/w/${wardId}`);
  return response.data;
};

export const addressApi = {
  getProvinces,
  getDistricts,
  getWards,
  getProvinceById,
  getDistrictById,
  getWardById,
};
