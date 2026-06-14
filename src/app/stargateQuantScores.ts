export type StargateQuantScore = {
  document: number;
  space: number;
  program: number;
};

export const stargateQuantScores: Record<string, StargateQuantScore> = {
  "company-003": {
    document: 3,
    space: 3,
    program: 4,
  },

  "company-021": {
    document: 3,
    space: 3,
    program: 4,
  },
};

export const getStargateQuantScore = (companyId: string): StargateQuantScore => {
  return (
    stargateQuantScores[companyId] || {
      document: 0,
      space: 0,
      program: 0,
    }
  );
};

export const getStargateQuantTotal = (companyId: string): number => {
  const score = getStargateQuantScore(companyId);

  return score.document + score.space + score.program;
};