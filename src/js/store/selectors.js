export const getProblems = (state) => state.problems;

export const getProblem = (state, id) => state.problems.find((problem) => problem.id === id);

export const getBlockProblems = (state, blockId) => state.problems.filter((problem) => problem.blockId === blockId);
