/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { createHigherOrderComponent } from '@wordpress/compose';
import { Fragment } from '@wordpress/element';
import { BlockControls, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, PanelRow, ToggleControl, ToolbarGroup, Toolbar, IconButton, Modal, Spinner, Flex } from '@wordpress/components';
import { addFilter } from '@wordpress/hooks';
import { useState, useEffect } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';
import { select, dispatch } from '@wordpress/data';

import { strip } from '../utils/strip';
import { Confirm } from '../components/confirm';

/**
 * Internal dependencies
 */
import {
	ALLOWED_BLOCKS,
	PROBLEM_TYPES_TO_LABEL,
	BLOCK_TYPE_CONTENT_ATTRIBUTE,
} from '../constants';
import { store } from '../store';

const addPanel = createHigherOrderComponent((BlockEdit) => {
	return (props) => {
		const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
		const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
		const [isSearchModalLoading, setIsSearchModalLoading] = useState(false);
		const [selectedWord, setSelectedWord] = useState('');
		const [selectedWordData, setSelectedWordData] = useState(null);
		const {
			clientId,
			name,
			setAttributes,
			isSelected,
			attributes: {
				isBlurred,
				isHighlighted,
			},
			attributes,
		} = props;

		useEffect(() => {
			if (selectedWord) {
				setIsSearchModalOpen(true);
				setIsSearchModalLoading(true);
				apiFetch({
					path: `/writers-blocks/v1/word`,
					method: 'POST',
					data: { word: selectedWord },
				})
					.then((response) => {
						if (response) {
							setSelectedWordData({
								...response,
								results: (response.results || []).reduce((acc, result) => ({
									...acc,
									[result.partOfSpeech]: acc[result.partOfSpeech] ? [...acc[result.partOfSpeech], result] : [result],
								}), {}),
							});
							setIsSearchModalLoading(false);
						}
					});
			}
		}, [selectedWord]);

		if (!ALLOWED_BLOCKS.includes(name)) {
			return <BlockEdit {...props} />;
		}

		const blockProblems = select(store).getBlockProblems(clientId);

		if (!isSelected || !blockProblems.length) {
			return <BlockEdit {...props} />;
		}

		const problems = blockProblems.reduce((acc, problem) => {
			const { type } = problem;
			const [formattedType] = type.split('-');

			if (acc[formattedType]) {
				acc[formattedType].push(problem);
			} else {
				acc[formattedType] = [problem];
			}

			return acc;
		}, {});

		return (
			<Fragment>
				<BlockEdit {...props} />
				<BlockControls>
					<ToolbarGroup>
						<Toolbar>
							<IconButton
								className="components-toolbar__control"
								label={ __( isBlurred ? 'Deblur text' : 'Blur text', 'writers-blocks' ) }
								icon={ isBlurred ? 'visibility' : 'hidden' }
								onClick={ () => {
									setAttributes({ isBlurred: !isBlurred });
								} }
							/>
						</Toolbar>
						<Toolbar>
							<IconButton
								className="components-toolbar__control"
								label={ __( 'Edit', 'writers-blocks' ) }
								icon="edit"
								onClick={ () => {
									setAttributes({ isHighlighted: !isHighlighted });
								} }
							/>
						</Toolbar>
						<Toolbar>
							<IconButton
								className="components-toolbar__control"
								label={ __( 'Get synonyms', 'writers-blocks' ) }
								icon="search"
								onClick={ () => {
									const { offset: selectionStart } = select('core/block-editor').getSelectionStart();
									const { offset: selectionEnd, attributeKey: content } = select('core/block-editor').getSelectionEnd();
									
									if (selectionStart !== selectionEnd) {
										const text = strip(attributes[content]);
										const word = text.slice(selectionStart, selectionEnd).trim();
										
										if (word.includes(' '))
											setIsConfirmModalOpen(true);
										else if (word) {
											setSelectedWord(word);
										}
									}
								} }
							/>
						</Toolbar>
						{
							isConfirmModalOpen ? (
								<Confirm
									onClose={ () => {
										setIsConfirmModalOpen(false);
									} }
									onConfirm={ () => {
										setIsConfirmModalOpen(false);

										const { offset: selectionStart } = select('core/block-editor').getSelectionStart();
										const { offset: selectionEnd, attributeKey: content } = select('core/block-editor').getSelectionEnd();
										const text = strip(attributes[content]);
										const word = text.slice(selectionStart, selectionEnd).trim();

										setSelectedWord(word);
									} }
									confirmText={ __( 'Yes', 'writers-blocks' ) }
									cancelText={ __( 'No', 'writers-blocks' ) }
									title={ __( 'Are you sure?', 'writers-blocks' ) }
									message={ __( `It looks like you've selected multiple words. Are you sure you want to use a search credit?`, 'writers-blocks' ) }
									/>
							) : null
						}
						{isSearchModalOpen ? (
							<Modal
								className="wp-block-writers-blocks-word__modal"
								title={ __( 'Word Search', 'writers-blocks' ) }
								onRequestClose={ () => {
									setIsSearchModalOpen( false );
									setSelectedWordData( null );
								} }
								isFullScreen
							>
								{
									isSearchModalLoading ? (
										<div className="wp-block-writers-blocks-word__modal-loading">
											<Spinner />
										</div>
									) : (
										<div className="wp-block-writers-blocks-word__modal-content">
											<Flex className="wp-block-writers-blocks-word__modal-title" justify="flex-start">
												<h2>{ selectedWord }</h2>
												<small>{ selectedWordData?.pronunciation?.all }</small>
											</Flex>
											{
												selectedWordData && Object.keys(selectedWordData.results).length ?
													(
														<div>
															{
																Object.keys(selectedWordData.results).map((key, index) => {
																	return (
																		<Fragment key={index}>
																			<p>{ key }</p>
																			<ol className="wp-block-writers-blocks-word__modal-definition-list">
																				{
																					selectedWordData.results[key].map((result, index) => {
																						return (
																							<li
																								className="wp-block-writers-blocks-word__modal-definition"
																								key={ index }
																							>
																								<p>{ result.definition }</p>
																								{
																									result.examples && result.examples.length ? (
																										<ul className="wp-block-writers-blocks-word__modal-examples-list">
																											{
																												result.examples.map((example, index) => {
																													return (
																														<li
																															className="wp-block-writers-blocks-word__modal-example"
																															key={ index }
																														>
																															<em>{ example }</em>
																														</li>
																													);
																												})
																											}
																										</ul>
																									) : null
																								}
																								{
																									result.synonyms && result.synonyms.length ? (
																										<ul className="wp-block-writers-blocks-word__modal-synonyms-list">
																											{
																												result.synonyms.map((synonym, index) => {
																													return (
																														<li
																															className="wp-block-writers-blocks-word__modal-synonym"
																															key={ index }
																														>
																															{ synonym }
																														</li>
																													);
																												})
																											}
																										</ul>
																									) : null
																								}
																							</li>
																						)
																					})
																				}
																			</ol>
																		</Fragment>
																	)
																})
															}
														</div>
													) : (
													<p>{ __( 'No results found', 'writers-blocks' ) }</p>
												)
											}
										</div>
									)
								}
							</Modal>
						) : null}
					</ToolbarGroup>
				</BlockControls>
				<InspectorControls>
					<PanelBody title={__('Suggestions', 'writers-blocks')} initialOpen={false}>
						{
							Object.keys(PROBLEM_TYPES_TO_LABEL).map((type) => (
								<PanelRow key={type}>
									<ToggleControl
										label={PROBLEM_TYPES_TO_LABEL[type].label}
										help={PROBLEM_TYPES_TO_LABEL[type].help(problems[type]?.length || 0)}
										checked={attributes[type]}
										onChange={(checked) => {
											setAttributes({ [type]: checked });

											(PROBLEM_TYPES_TO_LABEL[type].source || [type]).forEach((source) => {
												if (checked) {
													const problems = select(store).getProblemsByType(source);
				
													problems
														.filter(({ blockId }) => blockId === clientId)
														.forEach(({ blockId, blockName, type, index, offset }) => {
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
													const annotationsInBlock = select('core/annotations')
														.__experimentalGetAnnotations()
														.filter(
															({ blockClientId, source: annotationSource }) => blockClientId === clientId &&
															annotationSource === `writers-blocks--${source}`,
														);

													annotationsInBlock.forEach(({ id }) => {
														dispatch('core/annotations').__experimentalRemoveAnnotation(id);
													} );
												}
											});
										}}
									/>
								</PanelRow>
							))
						}
					</PanelBody>
				</InspectorControls>
			</Fragment>
		);
	};
}, 'addPanel');

addFilter(
	'editor.BlockEdit',
	'writers-blocks/border-filter/add-panel',
	addPanel,
);

/**
 * Add the vertical spacing class to the wrapping block element
 */
const addClassName = createHigherOrderComponent((BlockEdit) => {
	return (props) => {
		const { name, attributes } = props;

		if (!ALLOWED_BLOCKS.includes(name)) {
			return <BlockEdit {...props} />;
		}

		const { className, isBlurred } = attributes;

		return <BlockEdit {...props} className={`${className || ''}${isBlurred ? 'is-blurred' : ''}`} />;
	};
}, 'addClassName');

wp.hooks.addFilter(
	'editor.BlockListBlock',
	'writers-blocks/border-filter/add-classname',
	addClassName,
);

/**
 * Add attributes to blocks
 *
 * @param  {Object} settings Default Block Settings
 * @param  {string} name     Block Name
 * @return {Object}          Updated settings object
 */
function addAttributes(settings, name) {
	if (!ALLOWED_BLOCKS.includes(name)) {
		return settings;
	}

	if (settings.attributes) {
		Object.keys(PROBLEM_TYPES_TO_LABEL).forEach((type) => {
			settings.attributes[type] = {
				type: 'boolean',
				default: true,
			};
		});

		settings.attributes.isBlurred = {
			type: 'boolean',
			default: false,
		};

		settings.attributes.isHighlighted = {
			type: 'boolean',
			default: true,
		};
	}

	return settings;
}

addFilter(
	'blocks.registerBlockType',
	'writers-blocks/border-filter/add-attributes',
	addAttributes,
);
