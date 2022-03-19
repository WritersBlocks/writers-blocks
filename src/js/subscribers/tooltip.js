/**
 * WordPress depenedencies
 */
import { __ } from '@wordpress/i18n';
import {
	subscribe,
	select,
	useSelect,
	dispatch,
	useDispatch,
} from '@wordpress/data';
import domReady from '@wordpress/dom-ready';
import { render, useEffect, useState } from '@wordpress/element';
import { Popover, Button, Flex, __experimentalHStack as HStack } from '@wordpress/components';
import { info } from '@wordpress/icons';

/**
 * Internal depenedencies
 */
// import { BLOCK_TYPE_CONTENT_ATTRIBUTE } from '../constants';
import { store } from '../store';
import { CopyButton } from '../components/CopyButton';
// import { strip } from '../utils/strip-text';

// const { btoa } = window;

/**
 *
 * @param {*} element
 * @return
 */
const getPopoverPosition = ( element ) => element.getBoundingClientRect();

/**
 *
 * @param {*} param0
 * @return
 */
const Tooltip = ( { isShown, target, annotationId } ) => {
	// const [ ignoredAnnotations, setIgnoredAnnotations ] = useState( null );

	// const { wb_ignored } = useSelect(
	// 	( select ) =>
	// 		select( 'core/editor' ).getEditedPostAttribute( 'meta' ) || {}
	// );
	const selectedAnnotation = useSelect( ( select ) =>
		select( 'writers-blocks/editor' ).getProblem( annotationId )
	);

	// const { editPost } = useDispatch( 'core/editor' );

	// useEffect( () => {
	// 	if ( wb_ignored ) {
	// 		setIgnoredAnnotations( wb_ignored );
	// 	}
	// }, [ wb_ignored ] );

	const {
		// blockId,
		// blockName,
		index,
		offset,
		message,
		type,
		value,
		replacements = [],
	} = selectedAnnotation || {};
	const title = type?.split( '_' )?.join( ' ' ) || '';

	// const { attributes } = useSelect(
	// 	( select ) => select( 'core/block-editor' ).getBlock( blockId ) || {},
	// );

	// const { updateBlockAttributes } = useDispatch( 'core/block-editor' );

	return isShown && message ? (
		<Popover
			className={ `writers-blocks-annotation-popover is-type-${ type }` }
			position="top center"
			getAnchorRect={ () => getPopoverPosition( target ) }
		>
			{ process.env.NODE_ENV === 'development' ? (
				<Flex justify="space-between" align="center">
					<h5 style={{ margin: 0 }}>{ title }</h5>
					<Button
						variant="tertiary"
						onClick={ () => {
							console.log(
								select( store ).getProblem( annotationId )
							);
						} }
						icon={ info }
						iconSize={ 18 }
						isSmall={ true }
					/>
				</Flex>
			) : (
				<h5 style={{ margin: 0 }}>{ title }</h5>
			) }
			<p>{ message }</p>
			{ replacements.length ? (
				<HStack alignment="left" direction="row" spacing="4px" wrap={ true }>
					{ /**
					 * Still needs some work...
					 */
					/* <Button
						variant="secondary"
						onClick={ () => {
							dispatch( store ).ignoreProblem( annotationId );
							dispatch(
								'core/annotations'
							).__experimentalRemoveAnnotation( annotationId );

							editPost( {
								meta: {
									wb_ignored: [
										...ignoredAnnotations,
										btoa(
											`${ type }_${ index }_${ offset }_${ value }`
										),
									],
								},
							} );
						} }
					>
						{ __( 'Ignore', 'writers-blocks' ) }
					</Button> */}
					{
						replacements.map( ( replacement ) => {
							return (
								<CopyButton
									key={ replacement }
									text={ replacement }
									label={ null }
									onClick={ () => {} }
								/>
							);
						} )
					}
				</HStack>
			) : null }
		</Popover>
	) : null;
};

subscribe( () => {
	domReady( () => {
		const editorWrapper = document.querySelector(
			'.edit-post-visual-editor'
		);
		const isTyping = select( 'core/block-editor' ).isTyping();

		if ( ! editorWrapper ) {
			return;
		}

		let popoverWrapper = document.getElementById(
			'writers-blocks-popover-wrapper'
		);
		const selectedAnnotation = document.querySelector(
			'.wp-block.is-selected mark[class*="annotation-text-writers-blocks"][data-rich-text-format-boundary="true"]'
		);

		if ( ! selectedAnnotation && ! popoverWrapper ) {
			return;
		}

		if ( ! popoverWrapper ) {
			popoverWrapper = document.createElement( 'div' );
			popoverWrapper.id = 'writers-blocks-popover-wrapper';

			editorWrapper.prepend( popoverWrapper );
		}

		render(
			<Tooltip
				isShown={ !! selectedAnnotation && ! isTyping }
				target={ selectedAnnotation }
				annotationId={ selectedAnnotation?.id?.replace(
					'annotation-text-',
					''
				) }
			/>,
			document.getElementById( 'writers-blocks-popover-wrapper' )
		);
	} );
} );
