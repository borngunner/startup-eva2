import { companies } from "./companies";

export const stargateCESIds = [
  "company-003", // 마이크로메디옴
];

export const stargateILSIds = [
  "company-021", // 한국정보통신과학기술
];

export const stargateCESCompanies = companies.filter((company) =>
  stargateCESIds.includes(company.id)
);

export const stargateILSCompanies = companies.filter((company) =>
  stargateILSIds.includes(company.id)
);

export const stargateCompanies = [
  ...stargateCESCompanies,
  ...stargateILSCompanies,
];