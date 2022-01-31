import { __ } from '@wordpress/i18n';
import { PluginSidebar } from '@wordpress/edit-post';
import { PanelBody, PanelRow } from '@wordpress/components';
import { registerPlugin } from '@wordpress/plugins';
import { useSelect } from '@wordpress/data';
import { useEffect, useMemo } from '@wordpress/element';

import { addProblems } from '../api';
import check from '../checks';
import { readingScore } from '../utils/reading-score';

const ALLOWED_BLOCKS = [
	'core/paragraph',
	'core/heading',
	'core/list',
	'core/quote',
	'core/pullquote',
	'core/verse',
	'core/media-text',
	'core/preformatted',
];

const AccessPanel = () => {
	const blocks = useSelect( (select) =>
		select('core/block-editor').getBlocks()
	);
	const content = useSelect( (select) =>
		select('core/editor').getEditedPostAttribute('content')
	);

	const { score, sentences, words, characters, paragraphs, letters, polarity, readingTime } = useMemo( () => readingScore(content), [ content ] );
	const contentBlocks = useMemo( () => blocks.filter((block) => ALLOWED_BLOCKS.includes(block.name)), [ blocks ] );
	const blocksWithProblems = useMemo( () => {
		const blockData = contentBlocks.map((block) => ({
			blockId: block.clientId,
			...(block?.attributes?.content?.length ? {
				problems: check(block.attributes.content),
			} : {}),
		}));

		return blockData.filter((block) => block?.problems?.length);
	}, [ contentBlocks ] );
	const { adverbs, passive, simpler, weasels, hedges, readability } = useMemo( () => blocksWithProblems.reduce( (acc, block) => {
		acc.adverbs = acc.adverbs.concat(block.problems.filter(({ type }) => type === 'adverbs'));
		acc.passive = acc.passive.concat(block.problems.filter(({ type }) => type === 'passive'));
		acc.simpler = acc.simpler.concat(block.problems.filter(({ type }) => type === 'simpler'));
		acc.weasels = acc.weasels.concat(block.problems.filter(({ type }) => type === 'weasels'));
		acc.hedges = acc.hedges.concat(block.problems.filter(({ type }) => type === 'hedges'));
		acc.readability = acc.readability.concat(block.problems.filter(({ type }) => type === 'readability'));

		return acc;
	}, { adverbs: [], passive: [], simpler: [], weasels: [], hedges: [], readability: [] } ), [ blocksWithProblems ] );

	useEffect(() => {
		if (blocksWithProblems.length) {
			addProblems(blocksWithProblems);
		}
	}, [ blocksWithProblems ]);

	return (
		<>
			<PluginSidebar
				name="syntax-highlighter"
				icon="text"
				title={__('Syntax Highlighter', 'syntax')}
			>
				<PanelBody title={__('Readability', 'yext')}>
					<PanelRow>
						<h2>Grade {score}</h2>
					</PanelRow>
					<PanelRow>
						<h2>Polarity {polarity}</h2>
					</PanelRow>
				</PanelBody>
				<PanelBody title={__('Stats', 'yext')} initialOpen={false}>
					<PanelRow>
						<p><strong>Reading time:</strong> {readingTime >= 1 ? `${
							Math.round(readingTime)} minute${Math.round(readingTime) > 1 ? 's' : ''
						}` : 'Less than a minute'}</p>
					</PanelRow>
					<PanelRow>
						<p><strong>Paragraphs:</strong> {paragraphs}</p>
					</PanelRow>
					<PanelRow>
						<p><strong>Sentences:</strong> {sentences}</p>
					</PanelRow>
					<PanelRow>
						<p><strong>Words:</strong> {words}</p>
					</PanelRow>
					<PanelRow>
						<p><strong>Characters:</strong> {characters}</p>
					</PanelRow>
					<PanelRow>
						<p><strong>Letters:</strong> {letters}</p>
					</PanelRow>
				</PanelBody>
				<PanelBody title={__('Suggestions', 'yext')}>
					<PanelRow>
						<p>{adverbs.length} adverbs</p>
					</PanelRow>
					<PanelRow>
						<p>{weasels.length} weasel words</p>
					</PanelRow>
					<PanelRow>
						<p>{hedges.length} hedge words</p>
					</PanelRow>
					<PanelRow>
						<p>{passive.length} uses of passive voice.</p>
					</PanelRow>
					<PanelRow>
						<p>{simpler.length} phrases have simpler alternatives.</p>
					</PanelRow>
					<PanelRow>
						<p>{readability.filter(({ level }) => level === 'suggestion').length} of {sentences} are hard to read.</p>
					</PanelRow>
					<PanelRow>
						<p>{readability.filter(({ level }) => level === 'warning').length} of {sentences} are very hard to read.</p>
					</PanelRow>
				</PanelBody>
			</PluginSidebar>
		</>
	);
};

/**
 * Register Access Panel Plugin
 */
registerPlugin('syntax-highlighter', {
	render: AccessPanel,
});
