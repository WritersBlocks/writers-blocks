import { __ } from '@wordpress/i18n';
import { PluginSidebar } from '@wordpress/edit-post';
import { Fragment, PanelBody, PanelRow, ToggleControl, Spinner } from '@wordpress/components';
import { useSelect, select, dispatch } from '@wordpress/data';
import { useEffect } from '@wordpress/element';

import {
	PROBLEM_TYPES_TO_LABEL,
	BLOCK_TYPE_CONTENT_ATTRIBUTE,
} from '../../constants';
import { store } from '../../store';

export const PluginPanel = () => {
	const siteSettings = useSelect((select) => {
		return select('core').getEntityRecord('root', 'site');
	}, []);

	useEffect(() => {
		if (siteSettings) {
			console.log(siteSettings);
		}
	}, [siteSettings]);

	const {
		readingTime,
		score,
		polarity,
	} = useSelect((select) => select(store).getReadability());

	const problems = useSelect((select) => {
		const currentProblems = select(store).getProblems();

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

	const { suggestionsToShow: SHOWN_ANNOTATION_TYPES = {} } = useSelect((select) => select(store).getUserSettings());

	return (
		<PluginSidebar
			name="writers-blocks"
			icon="text"
			title={__('Writer\'s Blocks', 'writers-blocks')}
		>
			<PanelBody title={__('Readability', 'writers-blocks')}>
				{/* {
					readingTime && score && polarity ? (
						<Fragment>
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
						</Fragment>
					) : (
						<Spinner />
					)
				} */}
			</PanelBody>
			<PanelBody title={__('Suggestions', 'writers-blocks')}>
				{
					Object.keys(PROBLEM_TYPES_TO_LABEL).map((type) =>
						problems[type].length ? (
							<PanelRow key={type}>
								<ToggleControl
									label={PROBLEM_TYPES_TO_LABEL[type].label}
									help={PROBLEM_TYPES_TO_LABEL[type].help(problems[type].length)}
									checked={SHOWN_ANNOTATION_TYPES[type] ?? true}
									onChange={(checked) => {
										dispatch(store).updateUserSettings({
											suggestionsToShow: {
												...SHOWN_ANNOTATION_TYPES ?? {},
												[type]: checked,
											},
										});

										(PROBLEM_TYPES_TO_LABEL[type].source || [type]).forEach((source) => {
											if (checked) {
												const problems = select(store).getProblemsByType(source);
			
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
						) : null
					)
				}
			</PanelBody>
		</PluginSidebar>
	);
};
