export const getProblems = (state) => state.problems.list;

export const getAnnotations = (state) => state.annotations.list;

export const getProblem = (state, id) => state.problems.list.find((problem) => problem.id === id);

export const getBlockProblems = (state, blockId) => state.problems.list.filter((problem) => problem.blockId === blockId);

export const getProblemsByType = (state, type) => state.problems.list.filter((problem) => problem.type === type);

export const getReadability = (state) => state.readability.stats;

export const getUserSettings = (state) => state.user.settings;
