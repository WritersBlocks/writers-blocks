import { __ } from '@wordpress/i18n';
import { PluginSidebar } from '@wordpress/edit-post';
import {
	PanelBody,
	PanelRow,
	ToggleControl,
	Spinner,
	Dropdown,
	Button,
	MenuGroup,
	MenuItem,
	DropdownMenu,
} from '@wordpress/components';
import { useSelect, select, dispatch } from '@wordpress/data';
import { Fragment, useEffect, useState } from '@wordpress/element';
import { moreVertical, edit } from '@wordpress/icons';

import {
	PROBLEM_TYPES_TO_LABEL,
	BLOCK_TYPE_CONTENT_ATTRIBUTE,
} from '../../constants';
import { store } from '../../store';

const {
	WB_SETTINGS: { settings: SHOWN_ANNOTATION_TYPES },
} = window;

export const PluginPanel = () => {
	const [ suggestions, setSuggestions ] = useState( SHOWN_ANNOTATION_TYPES );

	const siteSettings = useSelect( ( select ) => {
		return select( 'core' ).getEntityRecord( 'root', 'site' );
	}, [] );

	useEffect( () => {
		if ( siteSettings ) {
			const { writers_blocks } = siteSettings;
			setSuggestions( writers_blocks );
		}
	}, [ siteSettings ] );

	const { readingTime, score, polarity } = useSelect( ( select ) =>
		select( store ).getReadability()
	);

	const problems = useSelect( ( select ) => {
		const currentProblems = select( store ).getProblems();

		return Object.keys( PROBLEM_TYPES_TO_LABEL ).reduce( ( acc, key ) => {
			acc[ key ] = currentProblems.filter( ( { type } ) => type === key );
			return acc;
		}, {} );
	} );

	return (
		<PluginSidebar
			name="writers-blocks"
			icon="text"
			title={ __( "Writer's Blocks", 'writers-blocks' ) }
		>
			{ /* <PanelRow className='components-panel__body-static'>
				<span>Settings</span>
				<DropdownMenu icon={ moreVertical } label="Select a direction">
					{ ( { onClose } ) => (
						<Fragment>
							<MenuGroup>
								<MenuItem
									icon={ edit }
									onClick={ () => {
										const isEditingMode = suggestions.editing_mode === '1';

										dispatch( 'core' ).saveEntityRecord( 'root', 'site', {
											writers_blocks: {
												...suggestions,
												editing_mode: isEditingMode ? "0" : "1",
											}
										} ).then(({ writers_blocks }) => {
											setSuggestions(writers_blocks);
										});

										if (isEditingMode) {
											removeAnnotations();
										} else {
											const blockProblems = select('writers-blocks/editor').getProblems();
											addAnnotations(blockProblems);
										}

										onClose();
									} }
									isSelected={ suggestions.editing_mode }
								>
									Editing Mode
								</MenuItem>
							</MenuGroup>
						</Fragment>
					) }
				</DropdownMenu>
			</PanelRow> */ }
			<PanelBody title={ __( 'Readability', 'writers-blocks' ) }>
				{ readingTime && score && polarity ? (
					<>
						<PanelRow>
							<span>Reading time</span>
							<h2 style={ { margin: 0 } }>
								{ ( readingTime || 0 ) >= 1
									? `${ Math.round( readingTime ) } minute${
											Math.round( readingTime || 0 ) > 1
												? 's'
												: ''
									  }`
									: 'Less than a minute' }
							</h2>
						</PanelRow>
						<PanelRow>
							<span>Grade</span>
							<h2 style={ { margin: 0 } }>{ score || 0 }</h2>
						</PanelRow>
						<PanelRow>
							<span>Polarity</span>
							<h2 style={ { margin: 0 } }>{ polarity || 0 }</h2>
						</PanelRow>
					</>
				) : (
					<Spinner />
				) }
			</PanelBody>
			<PanelBody title={ __( 'Suggestions', 'writers-blocks' ) }>
				{ suggestions ? Object.keys( PROBLEM_TYPES_TO_LABEL ).map( ( type ) =>
					<PanelRow key={ type }>
						<ToggleControl
							label={ PROBLEM_TYPES_TO_LABEL[ type ].label }
							help={ PROBLEM_TYPES_TO_LABEL[ type ].help(
								problems[ type ].length
							) }
							checked={
								suggestions[ type ]
									? suggestions[ type ] === '1'
									: true
							}
							onChange={ ( checked ) => {
								dispatch( 'core' )
									.saveEntityRecord( 'root', 'site', {
										writers_blocks: {
											...suggestions,
											[ type ]: checked ? '1' : '0',
										},
									} )
									.then( ( { writers_blocks } ) => {
										setSuggestions( writers_blocks );
									} );

								if ( checked ) {
									const problems = select(
										store
									).getProblemsByType( type );

									problems.forEach(
										( {
											blockId,
											blockName,
											type,
											index,
											offset,
										} ) => {
											dispatch(
												'core/annotations'
											).__experimentalAddAnnotation(
												{
													source: `writers-blocks--${ type }`,
													blockClientId: blockId,
													richTextIdentifier:
														BLOCK_TYPE_CONTENT_ATTRIBUTE[
															blockName
														],
													range: {
														start: index,
														end: offset,
													},
												}
											);
										}
									);
								} else {
									dispatch(
										'core/annotations'
									).__experimentalRemoveAnnotationsBySource(
										`writers-blocks--${ type }`
									);
								}

								if ( type === 'readability' && checked ) {
									const problems = select(
										store
									).getProblems();

									problems
										.filter(
											( { type } ) =>
												type !== 'readability' && suggestions[ type ] === '1'
										)
										.forEach(
											( {
												blockId,
												blockName,
												type,
												index,
												offset,
											} ) => {
												dispatch(
													'core/annotations'
												).__experimentalAddAnnotation(
													{
														source: `writers-blocks--${ type }`,
														blockClientId: blockId,
														richTextIdentifier:
															BLOCK_TYPE_CONTENT_ATTRIBUTE[
																blockName
															],
														range: {
															start: index,
															end: offset,
														},
													}
												);
											}
										);
								}
							} }
						/>
					</PanelRow>
				) : null }
			</PanelBody>
		</PluginSidebar>
	);
};
