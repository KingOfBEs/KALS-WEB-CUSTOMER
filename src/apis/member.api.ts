import { Member, MemberRequest } from "../types/member.type";
import request from "../utils/axios";
import { API_SUFFIX } from "./utils.api";
const getMemberInformation = () =>
  request.get<Member>(`${API_SUFFIX.MEMBER_API}/information`);
const updateMemberInformation = (data: MemberRequest) =>
  request.patch(`${API_SUFFIX.MEMBER_API}`, data);

export const memberApi = {
  getMemberInformation,
  updateMemberInformation,
};
