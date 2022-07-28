/**
 * WordPress depenedencies
 */
import { __ } from '@wordpress/i18n';
import {
	subscribe,
	select,
	dispatch,
	useSelect,
	useDispatch,
} from '@wordpress/data';
import domReady from '@wordpress/dom-ready';
import { render, useEffect, useState } from '@wordpress/element';
import {
	Popover,
	Button,
	Flex,
	__experimentalHStack as HStack,
} from '@wordpress/components';
import { info, plusCircle, trash } from '@wordpress/icons';
import { store as noticesStore } from '@wordpress/notices';
import { create, replace, toHTMLString } from '@wordpress/rich-text';

/**
 * Internal depenedencies
 */
import {
	BLOCK_TYPE_CONTENT_ATTRIBUTE,
	PROBLEM_TYPES_WITH_IGNORE,
} from '../constants';
import { store } from '../store';
import { useLocalStorage } from '../hooks/useLocalStorage';

const {
	WRITERS_BLOCKS: { settings: DEFAULT_SETTINGS },
} = window;

/**
 *
 * @param {*} element
 * @return
 */
const getPopoverPosition = (element) => element.getBoundingClientRect();

/**
 *
 * @param {*} param0
 * @return
 */
const Tooltip = ({ isShown, target, annotationId }) => {
	const [suggestions, setSuggestions] =
		DEFAULT_SETTINGS.demo !== true
			? useState(DEFAULT_SETTINGS)
			: useLocalStorage(DEFAULT_SETTINGS, 'writers_blocks');

	const siteSettings = useSelect((select) => {
		return select('core').getEntityRecord('root', 'site');
	});

	const selectedAnnotation = useSelect((select) =>
		select('writers-blocks/editor').getProblem(annotationId)
	);

	const { createNotice } = useDispatch(noticesStore);

	const {
		blockId,
		message,
		type,
		value,
		replacements = [],
	} = selectedAnnotation || {};
	const title = type?.split('_')?.join(' ') || '';

	useEffect(() => {
		if (siteSettings) {
			const { writers_blocks } = siteSettings;

			if (writers_blocks) {
				setSuggestions(writers_blocks);
			}
		}
	}, [siteSettings]);

	const { attributes, name } = useSelect(
		(select) => select('core/block-editor').getBlock(blockId) || {}
	);

	const { updateBlockAttributes } = useDispatch('core/block-editor');

	return isShown && message ? (
		<Popover
			className={`writers-blocks-annotation-popover is-type-${type}`}
			position="top center"
			getAnchorRect={() => getPopoverPosition(target)}
		>
			<Flex justify="space-between" align="center">
				<h5 style={{ margin: 0 }}>{title}</h5>
				<div>
					{process.env.NODE_ENV === 'development' ? (
						<Button
							variant="tertiary"
							onClick={() => {
								console.log(
									select(store).getProblem(annotationId)
								);
							}}
							icon={info}
							iconSize={18}
							isSmall={true}
						/>
					) : null}
					{type === 'spell' ? (
						<Button
							variant="tertiary"
							onClick={() => {
								const { dictionary } = suggestions;
								const newDictionary = new Set([
									...(dictionary.length
										? dictionary.split(',')
										: []),
									value,
								]);

								if (suggestions.demo !== true) {
									dispatch('core')
										.saveEntityRecord('root', 'site', {
											writers_blocks: {
												...suggestions,
												dictionary: [
													...newDictionary,
												].join(','),
											},
										})
										.then(({ writers_blocks }) => {
											setSuggestions(writers_blocks);
										});
								} else {
									setSuggestions({
										...suggestions,
										dictionary: [...newDictionary].join(
											','
										),
									});
								}

								createNotice(
									'info',
									__(
										`Added "${value}" to dictionary`,
										'writers-blocks'
									),
									{
										isDismissible: true,
										type: 'snackbar',
									}
								);

								const problems = select(
									store
								).getProblemsByValue(value, type);

								problems.forEach(({ annotationId }) => {
									dispatch(
										'core/annotations'
									).__experimentalRemoveAnnotation(
										annotationId
									);
								});
							}}
							icon={plusCircle}
							iconSize={18}
							isSmall={true}
						/>
					) : null}
					{PROBLEM_TYPES_WITH_IGNORE.includes(type) ? (
						<Button
							variant="tertiary"
							onClick={() => {
								const ignored = suggestions[`ignored_${type}`];
								const newIgnored = new Set([
									...(ignored.length
										? ignored.split(',')
										: []),
									type === 'spell'
										? value
										: value.toLowerCase(),
								]);

								if (suggestions.demo !== true) {
									dispatch('core')
										.saveEntityRecord('root', 'site', {
											writers_blocks: {
												...suggestions,
												[`ignored_${type}`]: [
													...newIgnored,
												].join(','),
											},
										})
										.then(({ writers_blocks }) => {
											setSuggestions(writers_blocks);
										});
								} else {
									setSuggestions({
										...suggestions,
										[`ignored_${type}`]: [
											...newIgnored,
										].join(','),
									});
								}

								createNotice(
									'info',
									__(`Ignored "${value}"`, 'writers-blocks'),
									{
										isDismissible: true,
										type: 'snackbar',
									}
								);

								const problems = select(
									store
								).getProblemsByValue(value, type);

								problems.forEach(({ annotationId }) => {
									dispatch( store ).removeProblem( annotationId );
									dispatch(
										'core/annotations'
									).__experimentalRemoveAnnotation(
										annotationId
									);
								});
							}}
							icon={trash}
							iconSize={18}
							isSmall={true}
						/>
					) : null}
				</div>
			</Flex>
			<p>{message}</p>
			{replacements.length && type !== 'sentence_spacing' ? (
				<HStack
					alignment="left"
					direction="row"
					spacing="4px"
					wrap={true}
				>
					{replacements.slice(0, 5).map((replacement) => {
						return (
							<Button
								key={replacement}
								className="wp-block-writers-blocks-word__modal-synonym"
								variant="secondary"
								showTooltip={true}
								label={null}
								onClick={() => {
									const contentAttribute =
										BLOCK_TYPE_CONTENT_ATTRIBUTE[name] ||
										'content';
									const content =
										attributes[contentAttribute];
									const multilineTag =
										name === 'core/list' ? 'li' : undefined;

									const blockValue = create({
										html: content,
										multilineTag,
									});

									const newValue = replace(
										blockValue,
										value,
										replacement
									);

									updateBlockAttributes(blockId, {
										[contentAttribute]: toHTMLString({
											value: newValue,
											multilineTag,
											multilineWrapperTags:
												multilineTag === 'li'
													? ['ul', 'ol']
													: undefined,
											preserveWhiteSpace:
												name === 'core/list',
										}),
									}).then(() => {
										dispatch( store ).removeProblem( annotationId );
										dispatch(
											'core/annotations'
										).__experimentalRemoveAnnotation(
											annotationId
										);

										createNotice(
											'info',
											__(
												`Replaced "${value}" with "${replacement}"`,
												'writers-blocks'
											),
											{
												isDismissible: true,
												type: 'snackbar',
											}
										);
									});
								}}
							>
								{replacement}
							</Button>
						);
					})}
				</HStack>
			) : null}
		</Popover>
	) : null;
};

subscribe(() => {
	domReady(() => {
		const editorWrapper = document.querySelector(
			'.edit-post-visual-editor'
		);
		const textArea = document.querySelector(
			'.edit-post-visual-editor__content-area'
		);
		const isTyping = select('core/block-editor').isTyping();

		if (!editorWrapper) {
			return;
		}

		if (!textArea.hasAttribute('spellcheck')) {
			textArea.setAttribute('spellcheck', 'false');
		}

		let popoverWrapper = document.getElementById(
			'writers-blocks-popover-wrapper'
		);
		const selectedAnnotation = document.querySelector(
			'.wp-block.is-selected mark[class*="annotation-text-writers-blocks"][data-rich-text-format-boundary="true"]'
		);

		if (!selectedAnnotation && !popoverWrapper) {
			return;
		}

		if (!popoverWrapper) {
			popoverWrapper = document.createElement('div');
			popoverWrapper.id = 'writers-blocks-popover-wrapper';

			editorWrapper.prepend(popoverWrapper);
		}

		render(
			<Tooltip
				isShown={selectedAnnotation !== null && !isTyping}
				target={selectedAnnotation}
				annotationId={selectedAnnotation?.id?.replace(
					'annotation-text-',
					''
				)}
			/>,
			document.getElementById('writers-blocks-popover-wrapper')
		);
	});
});
