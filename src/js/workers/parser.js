import { createWorkerFactory, terminate } from '@shopify/web-worker';

const createWorker = createWorkerFactory(() =>
	import(/* webpackChunkName: 'parser' */ '../parsers')
);

const parse = async (text, options) => {
	const worker = createWorker();
	const result = await worker.parse(text, options);

	terminate(worker);

	return result;
};

export const Parser = {
	parse,
};
