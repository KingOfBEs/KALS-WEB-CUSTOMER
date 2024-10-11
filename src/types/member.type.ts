export type Member = {
  username: string;
  phoneNumber: string;
  fullName: string;
  ward: string;
  district: string;
  province: string;
  address: string;
  provinceCode: string;
  districtCode: string;
  wardCode: string;
};

export type MemberRequest = Omit<Member, "phoneNumber">;
