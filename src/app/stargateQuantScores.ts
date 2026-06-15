export type StargateQuantScore = {
report: number;
space: number;
program: number;
};

export const stargateQuantScores: Record<string, StargateQuantScore> = {
"company-032-ils": {
report: 2,
space: 3,
program: 3,
},

"company-016-ils": {
report: 3,
space: 3,
program: 2,
},

"company-016-ces": {
report: 3,
space: 3,
program: 2,
},

"company-027-ces": {
report: 3,
space: 3,
program: 2,
},

"company-003-ces": {
report: 3,
space: 2,
program: 0,
},
};

export const getStargateQuantScore = (companyId: string): StargateQuantScore => {
return (
stargateQuantScores[companyId] || {
report: 0,
space: 0,
program: 0,
}
);
};

export const getStargateQuantTotal = (companyId: string): number => {
const score = getStargateQuantScore(companyId);

return score.report + score.space + score.program;
};