export const getProblems = (state) => state.problems.problems;

export const getProblem = (state, id) => state.problems.problems.find((problem) => problem.id === id);

export const getBlockProblems = (state, blockId) => state.problems.problems.filter((problem) => problem.blockId === blockId);
