/**
 * External dependencies
 */
import { createWorkerFactory, terminate } from '@shopify/web-worker';

const {
	WRITERS_BLOCKS: { settings: DEFAULT_SETTINGS },
} = window;

const createWorker = createWorkerFactory(() =>
	import(
		/* webpackChunkName: 'annotations' */ '../decorators/inline-annotations'
	)
);

const addAnnotations = async (blockProblems = [], options = {}) => {
	const worker = createWorker();

	await worker.addAnnotations(blockProblems, {
		...options,
		options: DEFAULT_SETTINGS,
	});

	terminate(worker);
};

const removeAnnotations = (annotationType, blockId = null) => {
	const worker = createWorker();
	worker.removeAnnotations(annotationType, blockId);

	terminate(worker);
};

export const Annotations = {
	add: addAnnotations,
	remove: removeAnnotations,
};
