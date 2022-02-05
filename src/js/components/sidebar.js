import { debounce, update } from 'lodash';
import { __ } from '@wordpress/i18n';
import { PluginSidebar } from '@wordpress/edit-post';
import { PanelBody, PanelRow } from '@wordpress/components';
import { registerPlugin } from '@wordpress/plugins';
import { dispatch, useSelect } from '@wordpress/data';
import { useEffect, useCallback, useState } from '@wordpress/element';

import { addProblems } from '../hooks';
import check from '../parsers';
import { readingScore } from '../reading-score';

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

	const [stats, setStats] = useState({});
	const [problems, setProblems] = useState({});

	const updateReadability = useCallback( debounce( (content) => {
		setStats(readingScore(content));
	}, 500), [] );

	const updateProblems = useCallback( debounce( (blocks) => {
		const allowedBlocks = blocks.filter( (block) => ALLOWED_BLOCKS.includes(block.name) );
		const blocksWithProblems = allowedBlocks.map((block) => ({
			blockId: block.clientId,
			blockName: block.name,
			...(block?.attributes?.content?.length || block?.attributes?.values?.length ? {
				problems: check(block.attributes.content || block.attributes.values),
			} : {}),
		})).filter((block) => block?.problems?.length);

		addProblems(blocksWithProblems);
		setProblems(
			blocksWithProblems.reduce( (acc, block) => {
				acc.adverbs = acc.adverbs.concat(block.problems.filter(({ type }) => type === 'adverbs'));
				acc.passive = acc.passive.concat(block.problems.filter(({ type }) => type === 'passive'));
				acc.simpler = acc.simpler.concat(block.problems.filter(({ type }) => type === 'simpler'));
				acc.weasels = acc.weasels.concat(block.problems.filter(({ type }) => type === 'weasels'));
				acc.hedges = acc.hedges.concat(block.problems.filter(({ type }) => type === 'hedges'));
				acc.readability = acc.readability.concat(block.problems.filter(({ type }) => type.includes('readability')));
	
				return acc;
			}, { adverbs: [], passive: [], simpler: [], weasels: [], hedges: [], readability: [] } )
		);
	}, 500), [] );

	useEffect(( ) => {
		if (content) {
			updateReadability(content);
		}
	}, [ content ] );

	useEffect(() => {
		if (blocks.length) {
			updateProblems(blocks);
		}
	}, [ blocks ]);

	return (
		<>
			<PluginSidebar
				name="syntax-highlighter"
				icon="text"
				title={__('Syntax Highlighter', 'syntax')}
			>
				<PanelBody title={__('Readability', 'yext')}>
					<PanelRow>
						<h2>Grade {stats.score || 0}</h2>
					</PanelRow>
					<PanelRow>
						<h2>Polarity {stats.polarity || 0}</h2>
					</PanelRow>
				</PanelBody>
				<PanelBody title={__('Stats', 'yext')} initialOpen={false}>
					<PanelRow>
						<p><strong>Reading time:</strong> {(stats.readingTime || 0) >= 1 ? `${
							Math.round(stats.readingTime)} minute${Math.round((stats.readingTime || 0)) > 1 ? 's' : ''
						}` : 'Less than a minute'}</p>
					</PanelRow>
					<PanelRow>
						<p><strong>Paragraphs:</strong> {stats?.paragraphs || 0}</p>
					</PanelRow>
					<PanelRow>
						<p><strong>Sentences:</strong> {stats.sentences || 0}</p>
					</PanelRow>
					<PanelRow>
						<p><strong>Words:</strong> {stats.words || 0}</p>
					</PanelRow>
					<PanelRow>
						<p><strong>Characters:</strong> {stats.characters || 0}</p>
					</PanelRow>
					<PanelRow>
						<p><strong>Letters:</strong> {stats.letters || 0}</p>
					</PanelRow>
				</PanelBody>
				<PanelBody title={__('Suggestions', 'yext')}>
					<PanelRow>
						<p>{problems?.adverbs?.length || 0} adverbs</p>
					</PanelRow>
					<PanelRow>
						<p>{problems?.weasels?.length || 0} weasel words</p>
					</PanelRow>
					<PanelRow>
						<p>{problems?.hedges?.length || 0} hedge words</p>
					</PanelRow>
					<PanelRow>
						<p>{problems?.passive?.length || 0} uses of passive voice.</p>
					</PanelRow>
					<PanelRow>
						<p>{problems?.simpler?.length || 0} phrases have simpler alternatives.</p>
					</PanelRow>
					<PanelRow>
						<p>{problems?.readability?.filter(({ level }) => level === 'suggestion').length || 0} of {stats?.sentences || 0} are hard to read.</p>
					</PanelRow>
					<PanelRow>
						<p>{problems?.readability?.filter(({ level }) => level === 'warning').length || 0} of {stats?.sentences || 0} are very hard to read.</p>
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
