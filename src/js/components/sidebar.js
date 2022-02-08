import { __ } from '@wordpress/i18n';
import { PluginSidebar } from '@wordpress/edit-post';
import { PanelBody, PanelRow, ToggleControl } from '@wordpress/components';
import { registerPlugin } from '@wordpress/plugins';
import { useSelect, select, dispatch } from '@wordpress/data';

import {
	PROBLEM_TYPES_TO_LABEL,
	BLOCK_TYPE_CONTENT_ATTRIBUTE,
} from '../constants';

const AccessPanel = () => {
	const {
		readingTime,
		score,
		polarity,
	} = useSelect((select) => select('writers-blocks/editor').getReadability());
	const problems = useSelect((select) => {
		const currentProblems = select('writers-blocks/editor').getProblems();

		return {
			adverb: currentProblems.filter(({ type }) => type === 'adverb'),
			weasel: currentProblems.filter(({ type }) => type === 'weasel'),
			hedge: currentProblems.filter(({ type }) => type === 'hedge'),
			filler: currentProblems.filter(({ type }) => type === 'filler'),
			profanity: currentProblems.filter(({ type }) => type === 'profanity'),
			equality: currentProblems.filter(({ type }) => type === 'equality'),
			cliche: currentProblems.filter(({ type }) => type === 'cliche'),
			passive: currentProblems.filter(({ type }) => type === 'passive'),
			readability: currentProblems.filter(({ type }) => type.includes('readability')),
			simpler: currentProblems.filter(({ type }) => type === 'simpler'),
		};
	});
	const { typesToShow: SHOWN_ANNOTATION_TYPES } = useSelect((select) => select('writers-blocks/editor').getUserSettings());

	return (
		<>
			<PluginSidebar
				name="writers-blocks"
				icon="text"
				title={__('Writer\'s Blocks', 'writers-blocks')}
			>
				<PanelBody title={__('Readability', 'writers-blocks')}>
					<PanelRow>
						<span>Reading time</span>
						<h2 style={{margin: 0}}>{(readingTime || 0) >= 1 ? `${
							Math.round(readingTime)} minute${Math.round((readingTime || 0)) > 1 ? 's' : ''
						}` : 'Less than a minute'}</h2>
					</PanelRow>
					<PanelRow>
						<span>Grade</span>
						<h2 style={{margin: 0}}>{score || 0}</h2>
					</PanelRow>
					<PanelRow>
						<span>Polarity</span>
						<h2 style={{margin: 0}}>{polarity || 0}</h2>
					</PanelRow>
				</PanelBody>
				<PanelBody title={__('Suggestions', 'writers-blocks')}>
					{
						Object.keys(PROBLEM_TYPES_TO_LABEL).map((type) => (
							<PanelRow key={type}>
								<ToggleControl
									label={PROBLEM_TYPES_TO_LABEL[type].label}
									help={PROBLEM_TYPES_TO_LABEL[type].help(problems[type].length)}
									checked={SHOWN_ANNOTATION_TYPES[type]}
									onChange={(checked) => {
										dispatch('writers-blocks/editor').updateUserSettings({
											typesToShow: {
												...SHOWN_ANNOTATION_TYPES,
												[type]: checked,
											},
										});

										(PROBLEM_TYPES_TO_LABEL[type].source || [type]).forEach((source) => {
											if (checked) {
												const problems = select('writers-blocks/editor').getProblemsByType(source);
			
												problems.forEach(({ blockId, blockName, type, index, offset }) => {
													dispatch('core/annotations').__experimentalAddAnnotation({
														source: `writers-blocks--${type}`,
														blockClientId: blockId,
														richTextIdentifier: BLOCK_TYPE_CONTENT_ATTRIBUTE[blockName],
														range: {
															start: index,
															end: offset,
														},
													});
												});
											} else {
												dispatch( "core/annotations" ).__experimentalRemoveAnnotationsBySource( `writers-blocks--${source}` );
											}
										});
									}}
								/>
							</PanelRow>
						))
					}
				</PanelBody>
			</PluginSidebar>
		</>
	);
};

/**
 * Register Access Panel Plugin
 */
registerPlugin('writers-blocks', {
	render: AccessPanel,
});
