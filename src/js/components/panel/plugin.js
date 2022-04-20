import { __ } from '@wordpress/i18n';
import { PluginSidebar } from '@wordpress/edit-post';
import {
	PanelBody,
	PanelRow,
	ToggleControl,
	Spinner,
	Button,
	// MenuItem,
	MenuGroup,
	MenuItemsChoice,
	DropdownMenu,
	Modal,
	__experimentalHStack as HStack,
	TextControl,
	TextareaControl,
} from '@wordpress/components';
import { useSelect, select, dispatch } from '@wordpress/data';
import { Fragment, useEffect, useState } from '@wordpress/element';
import { moreVertical } from '@wordpress/icons';
import { capitalize } from 'lodash';

import {
	SYNTAX_TYPES,
	PROBLEM_TYPES_TO_LABEL,
	PROBLEM_TYPES_WITH_IGNORE,
	// BLOCK_TYPE_CONTENT_ATTRIBUTE,
} from '../../constants';
import { store } from '../../store';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { addAnnotations } from '../../decorators/gutenberg';

const {
	WB_SETTINGS: { settings: DEFAULT_SETTINGS },
} = window;

export const PluginPanel = () => {
	const [ suggestions, setSuggestions ] = DEFAULT_SETTINGS.demo !== true
		? useState( DEFAULT_SETTINGS )
		: useLocalStorage( DEFAULT_SETTINGS, 'writers_blocks' );
	const [ mode, setMode ] = useState( DEFAULT_SETTINGS.mode );
	const [ isOptionsPopoverOpen, setIsOptionsPopoverOpen ] = useState( false );
	const [ isStyleOptionsPopoverOpen, setIsStyleOptionsPopoverOpen ] = useState( false );
	const [ styleOptionsPopoverType, setStyleOptionsPopoverType ] = useState( null );
	const [ ignoredWordList, setIgnoredWordList ] = DEFAULT_SETTINGS.demo !== true
		? useState( '' )
		: useLocalStorage( DEFAULT_SETTINGS, 'writers_blocks__ignored-words' );
	const [ customWordList, setCustomWordList ] = DEFAULT_SETTINGS.demo !== true
		? useState( '' )
		: useLocalStorage( DEFAULT_SETTINGS, 'writers_blocks__dictionary' );

	const siteSettings = useSelect( ( select ) => {
		return select( 'core' ).getEntityRecord( 'root', 'site' );
	} );
	// const selectedBlock = useSelect( ( select ) => {
	// 	return select( 'core/block-editor' ).getSelectedBlock();
	// } );

	// useEffect( () => {
	// 	if ( suggestions.mode === 'focus' && selectedBlock ) {
	// 		document.body.classList.add( 'focus-mode' );
	// 	} else {
	// 		document.body.classList.remove( 'focus-mode' );
	// 	}
	// }, [ selectedBlock ] );

	useEffect( () => {
		if ( suggestions.demo === true ) {
			localStorage.setItem( 'writers_blocks', JSON.stringify( suggestions ) );
		}
	}, [] );

	useEffect( () => {
		if ( siteSettings ) {
			const { writers_blocks } = siteSettings;
			
			if ( writers_blocks ) {
				setSuggestions( writers_blocks );
			}
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
		<Fragment>
			{ isOptionsPopoverOpen ? (
				<Modal
					title={ __( "Writer's Blocks options", 'writers-blocks' ) }
					onRequestClose={ () => {
						setIsOptionsPopoverOpen( false );
					} }
				>
					<h2 className='edit-post-options-modal__section-title'>{ __( 'License', 'writers-blocks' ) }</h2>
					<p className='edit-post-options-modal__section-help'>{ __( 'Enter your license key for updates and support', 'writers-blocks' ) }</p>
					<HStack>
						<TextControl
							label={ __( 'License key', 'writers-blocks' ) }
							hideLabelFromVision={ true }
							value={ '' }
							onChange={ ( value ) => {
								// setLicense( value );
							} }
						/>
						<Button
							isPrimary
							onClick={ () => {
								// setIsUpdating( true );
								// updateLicense( license );
							} }
						>
							{ __( 'Activate', 'writers-blocks' ) }
						</Button>
					</HStack>
				</Modal>
			) :  null }
			{ isStyleOptionsPopoverOpen ? (
				<Modal
					title={ __( `${ capitalize( styleOptionsPopoverType ) } options`, 'writers-blocks' ) }
					onRequestClose={ () => {
						setIsStyleOptionsPopoverOpen( false );
					} }
				>
					{ styleOptionsPopoverType === 'spell' ? (
						<Fragment>
							<h2 className='edit-post-options-modal__section-title'>{ __( 'Dictionary', 'writers-blocks' ) }</h2>
							<p className='edit-post-options-modal__section-help'>{ __( 'Enter a list of words to add to the dictionary. Each word should be on a new line.', 'writers-blocks' ) }</p>
							<TextareaControl
								label={ __( 'Dictionary', 'writers-blocks' ) }
								hideLabelFromVision={ true }
								value={ customWordList }
								rows={ suggestions.dictionary.split( ',' ).length + 4 }
								onChange={ ( value ) => {
									setCustomWordList( value ?? '' );
								} }
								spellCheck={ false }
							/>
						</Fragment>
					 ) : null }
					<h2 className='edit-post-options-modal__section-title'>{ __( 'Ignore List', 'writers-blocks' ) }</h2>
					<p className='edit-post-options-modal__section-help'>{ __( 'Edit your list of ignored words. Each word should be on a new line.', 'writers-blocks' ) }</p>
					<TextareaControl
						label={ __( 'Ignored Words', 'writers-blocks' ) }
						hideLabelFromVision={ true }
						value={ ignoredWordList }
						rows={ suggestions[ `ignored_${ styleOptionsPopoverType }` ].split( ',' ).length + 4 }
						onChange={ ( value ) => {
							setIgnoredWordList( value );
						} }
						spellCheck={ false }
					/>
					<Button
						isPrimary
						onClick={ () => {
							const ignoredWords = ignoredWordList.split( '\n' ).filter( ( word ) => word.length > 0 );
							const previouslyIgnoredWords = suggestions[ `ignored_${ styleOptionsPopoverType }` ].split( ',' );
							const previousDictionary = suggestions.dictionary.split( ',' );

							if ( suggestions.demo !== true ) {
								dispatch( 'core' )
									.saveEntityRecord(
										'root',
										'site',
										{
											writers_blocks: {
												...suggestions,
												[ `ignored_${styleOptionsPopoverType}` ]: ignoredWords.join( ',' ),
												...(styleOptionsPopoverType === 'spell' ? {
													dictionary: customWordList.split( '\n' ).join( ',' ),
												} : {})
											},
										}
									)
									.then( ( { writers_blocks } ) => {
										setSuggestions(
											writers_blocks
										);
									} );
							} else {
								setSuggestions( {
									...suggestions,
									[ `ignored_${styleOptionsPopoverType}` ]: ignoredWords.join( ',' ),
									...(styleOptionsPopoverType === 'spell' ? {
										dictionary: customWordList.split( '\n' ).join( ',' ),
									} : {})
								} );
							}

							console.log(customWordList);

							[
								...customWordList.split( '\n' ),
								...ignoredWords,
							].forEach( ( word ) => {
								const problems = select( store ).getProblemsByValue( word, styleOptionsPopoverType );

								problems.forEach( ( { annotationId } ) => {
									dispatch(
										'core/annotations'
									).__experimentalRemoveAnnotation( annotationId );
								} );
							} );

							const removedWords = previouslyIgnoredWords.filter( ( word ) => ! ignoredWords.includes( word ) );
							const removedDictionary = previousDictionary.filter( ( word ) => ! customWordList.split( '\n' ).includes( word ) );

							[
								...removedWords,
								...removedDictionary,
							].forEach( ( word ) => {
								const problems = select( store ).getProblemsByValue( word, styleOptionsPopoverType );

								addAnnotations( problems );
							} );

							setIsStyleOptionsPopoverOpen( false );
						} }
					>
						{ __( 'Save', 'writers-blocks' ) }
					</Button>
				</Modal>
			) : null }
			<PluginSidebar
				name="writers-blocks"
				icon="text"
				title={ __( "Writer's Blocks", 'writers-blocks' ) }
			>
				<div style={ { padding: '6px 16px' } }>
					<PanelRow className="components-panel__body-static">
						<span>Settings</span>
						<DropdownMenu
							icon={ moreVertical }
							label="Writer's Blocks settings"
						>
							{ ( { onClose } ) => (
								<Fragment>
									<MenuGroup label="Mode">
										<MenuItemsChoice
											value={ mode }
											choices={ [
												{
													label: 'Writing',
													value: 'writing',
												},
												{
													label: 'Editing',
													value: 'editing',
													info: 'Highlight style suggestions'
												},
												{
													label: 'Syntax',
													value: 'syntax',
													info: 'Highlight parts of speech'
												},
												// {
												// 	label: 'Focus',
												// 	value: 'focus',
												// 	info: 'Focus on one paragraph at a time',
												// },
											] }
											onSelect={ ( value ) => {
												setMode( value );
												
												if ( suggestions.demo !== true ) {
													dispatch( 'core' )
														.saveEntityRecord(
															'root',
															'site',
															{
																writers_blocks: {
																	...suggestions,
																	mode: value,
																},
															}
														)
														.then( ( { writers_blocks } ) => {
															setSuggestions(
																writers_blocks
															);
														} );
												} else {
													setSuggestions( {
														...suggestions,
														mode: value,
													} );
												}

												Annotations.remove( 'syntax' );
												Annotations.remove( 'style' );
												// document.body.classList.remove( 'focus-mode' );

												switch ( value ) {
													case 'editing':
														const blockProblems = select(
															'writers-blocks/editor'
														).getProblems();
						
														addAnnotations( blockProblems );
														break;
													case 'syntax':
														const blockWords = select(
															'writers-blocks/editor'
														).getWords();
						
														addAnnotations( blockWords );
														break;
													default:
														break;
													// case 'focus':
													// 	document.body.classList.add( 'focus-mode' );
													// 	break;
												}
											} }
										/>
									</MenuGroup>
									{/* <MenuGroup>
										<MenuItem
											label="Show options"
											onClick={ () => setIsOptionsPopoverOpen( ( isOpen ) => ! isOpen ) }
										>
											{ __( 'Options', 'writers-blocks' ) }
										</MenuItem>
									</MenuGroup> */}
								</Fragment>
							) }
						</DropdownMenu>
					</PanelRow>
					{/* <PanelRow>
						<ToggleControl
							label={ __( 'Editing Mode', 'writers-blocks' ) }
							checked={ suggestions.editing_mode === '1' }
							onChange={ () => {
								dispatch( 'core' ).saveEntityRecord(
									'root',
									'site',
									{
										writers_blocks: {
											...suggestions,
											syntax_mode:
												suggestions.syntax_mode === '1' &&
												suggestions.editing_mode === '0'
													? '0'
													: suggestions.syntax_mode,
											editing_mode:
												suggestions.editing_mode === '1'
													? '0'
													: '1',
											focus_mode: '0',
										},
									}
								);

								if ( suggestions.syntax_mode === '1' ) {
									Annotations.remove( 'syntax' );
								}

								if ( suggestions.focus_mode === '1' ) {
									document.body.classList.remove( 'focus-mode' );
								}

								if ( suggestions.editing_mode === '1' ) {
									Annotations.remove( 'style' );
								} else {
									const blockProblems = select(
										'writers-blocks/editor'
									).getProblems();

									addAnnotations( blockProblems );
								}
							} }
						/>
					</PanelRow>
					<PanelRow>
						<ToggleControl
							label={ __( 'Syntax Mode', 'writers-blocks' ) }
							checked={ suggestions.syntax_mode === '1' }
							onChange={ () => {
								dispatch( 'core' ).saveEntityRecord(
									'root',
									'site',
									{
										writers_blocks: {
											...suggestions,
											editing_mode:
												suggestions.editing_mode === '1' &&
												suggestions.syntax_mode === '0'
													? '0'
													: suggestions.editing_mode,
											syntax_mode:
												suggestions.syntax_mode === '1'
													? '0'
													: '1',
											focus_mode: '0',
										},
									}
								);

								if ( suggestions.editing_mode === '1' ) {
									Annotations.remove( 'style' );
								}

								if ( suggestions.focus_mode === '1' ) {
									document.body.classList.remove( 'focus-mode' );
								}

								if ( suggestions.syntax_mode === '1' ) {
									Annotations.remove( 'syntax' );
								} else {
									const blockWords = select(
										'writers-blocks/editor'
									).getWords();

									addAnnotations( blockWords );
								}
							} }
						/>
					</PanelRow>
					<PanelRow>
						<ToggleControl
							label={ __( 'Focus Mode', 'writers-blocks' ) }
							checked={ suggestions.focus_mode === '1' }
							onChange={ () => {
								dispatch( 'core' ).saveEntityRecord(
									'root',
									'site',
									{
										writers_blocks: {
											...suggestions,
											editing_mode: '0',
											syntax_mode: '0',
											focus_mode:
												suggestions.focus_mode === '1'
													? '0'
													: '1',
										},
									}
								);

								if ( suggestions.editing_mode === '1' ) {
									Annotations.remove( 'style' );
								}

								if ( suggestions.syntax_mode === '1' ) {
									Annotations.remove( 'syntax' );
								}

								if ( suggestions.focus_mode === '1' ) {
									document.body.classList.remove( 'focus-mode' );
								} else {
									document.body.classList.add( 'focus-mode' );
								}
							} }
						/>
					</PanelRow> */}
				</div>
				<PanelBody title={ __( 'Readability', 'writers-blocks' ) }>
					{ readingTime !== undefined && score !== undefined && polarity !== undefined ? (
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
				<PanelBody title={ __( 'Syntax', 'writers-blocks' ) } initialOpen={ false }>
					{ suggestions ? (
						SYNTAX_TYPES.map( ( type ) => (
							<PanelRow key={ type }>
								<div
									className={ `writers-blocks__toggle ${ type }` }
								>
									<ToggleControl
										label={
											`${type.charAt( 0 ).toUpperCase() +
											type.slice( 1 )}s`
										}
										checked={
											suggestions[ type ]
												? suggestions[ type ] === '1'
												: true
										}
										onChange={ ( checked ) => {
											if ( suggestions.demo !== true ) {
												dispatch( 'core' )
													.saveEntityRecord( 'root', 'site', {
														writers_blocks: {
															...suggestions,
															[ type ]: checked
																? '1'
																: '0',
														},
													} )
													.then( ( { writers_blocks } ) => {
														setSuggestions(
															writers_blocks
														);
													} );
											} else {
												setSuggestions({
													...suggestions,
													[ type ]: checked
														? '1'
														: '0',
												});
											}

											if ( checked ) {
												const words = select(
													store
												).getWordsByType( type );

												addAnnotations( words );
											} else {
												dispatch(
													'core/annotations'
												).__experimentalRemoveAnnotationsBySource(
													`writers-blocks--syntax--${ type }`
												);
											}
										} }
									/>
								</div>
							</PanelRow>
						) )
					) : (
						<Spinner />
					) }
				</PanelBody>
				<PanelBody title={ __( 'Style', 'writers-blocks' ) } initialOpen={ false }>
					{ suggestions ? (
						Object.keys( PROBLEM_TYPES_TO_LABEL ).map( ( type ) => (
							<PanelRow key={ type } className="writers-blocks__panel-row">
								<div
									className={ `writers-blocks__toggle ${ type }` }
								>
									<ToggleControl
										label={
											PROBLEM_TYPES_TO_LABEL[ type ].label
										}
										help={ PROBLEM_TYPES_TO_LABEL[ type ].help(
											problems[ type ].length
										) }
										checked={
											suggestions[ type ]
												? suggestions[ type ] === '1'
												: true
										}
										onChange={ ( checked ) => {
											if ( suggestions.demo !== true ) {
												dispatch( 'core' )
													.saveEntityRecord( 'root', 'site', {
														writers_blocks: {
															...suggestions,
															[ type ]: checked
																? '1'
																: '0',
														},
													} )
													.then( ( { writers_blocks } ) => {
														setSuggestions(
															writers_blocks
														);
													} );
											} else {
												setSuggestions({
													...suggestions,
													[ type ]: checked
														? '1'
														: '0',
												});
											}

											if ( checked ) {
												const problems = select(
													store
												).getProblemsByType( type );

												addAnnotations( problems );
											} else {
												dispatch(
													'core/annotations'
												).__experimentalRemoveAnnotationsBySource(
													`writers-blocks--style--${ type }`
												);
											}

											if (
												type === 'readability' &&
												checked
											) {
												const problems = select(
													store
												).getProblems();

												addAnnotations(
													problems.filter(
														( { type } ) =>
															type !==
																'readability' &&
															suggestions[ type ] ===
																'1'
													)
												);
											}
										} }
									/>
								</div>
								{ PROBLEM_TYPES_WITH_IGNORE.includes( type ) ? (
									<Button
										variant="tertiary"
										icon={ moreVertical }
										label={ __(
											'More options',
											'writers-blocks'
										) }
										onClick={ () => {
											setIsStyleOptionsPopoverOpen( true );
											setStyleOptionsPopoverType( type );
											setIgnoredWordList( suggestions[ `ignored_${ type }` ].split( ',' ).join( '\n' ) );
											
											if ( type === 'spell' ) {
												setCustomWordList( suggestions.dictionary.split( ',' ).join( '\n' ) );
											}
										} }
										showTooltip={ true }
									/>
								) : null }
							</PanelRow>
						) )
					) : (
						<Spinner />
					) }
				</PanelBody>
			</PluginSidebar>
		</Fragment>
	);
};
