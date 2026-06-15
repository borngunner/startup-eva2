import { companies } from "./companies";

export const stargateCompanies = [
{
...companies.find((c) => c.id === "company-032")!,
id: "company-032-ils",
track: "ILS",
},

{
...companies.find((c) => c.id === "company-016")!,
id: "company-016-ils",
track: "ILS",
},

{
...companies.find((c) => c.id === "company-016")!,
id: "company-016-ces",
track: "CES",
},

{
...companies.find((c) => c.id === "company-027")!,
id: "company-027-ces",
track: "CES",
},

{
...companies.find((c) => c.id === "company-003")!,
id: "company-003-ces",
track: "CES",
},
];