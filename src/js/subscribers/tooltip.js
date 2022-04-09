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
import { info, plusCircle } from '@wordpress/icons';
import { store as noticesStore } from '@wordpress/notices';

/**
 * Internal depenedencies
 */
import { PROBLEM_TYPES_WITH_IGNORE } from '../constants';
import { store } from '../store';
import { CopyButton } from '../components/CopyButton';
// import { strip } from '../utils/strip-text';

const {
	WB_SETTINGS: { settings: DEFAULT_SETTINGS },
} = window;

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
	const [ suggestions, setSuggestions ] = useState( DEFAULT_SETTINGS );
	// const [ ignoredAnnotations, setIgnoredAnnotations ] = useState( null );

	const siteSettings = useSelect( ( select ) => {
		return select( 'core' ).getEntityRecord( 'root', 'site' );
	} );

	// const { wb_ignored } = useSelect(
	// 	( select ) =>
	// 		select( 'core/editor' ).getEditedPostAttribute( 'meta' ) || {}
	// );
	const selectedAnnotation = useSelect( ( select ) =>
		select( 'writers-blocks/editor' ).getProblem( annotationId )
	);

	const { createNotice } = useDispatch( noticesStore );

	// const { editPost } = useDispatch( 'core/editor' );

	// useEffect( () => {
	// 	if ( wb_ignored ) {
	// 		setIgnoredAnnotations( wb_ignored );
	// 	}
	// }, [ wb_ignored ] );

	const {
		// blockId,
		// blockName,
		// index,
		// offset,
		message,
		type,
		value,
		replacements = [],
	} = selectedAnnotation || {};
	const title = type?.split( '_' )?.join( ' ' ) || '';

	useEffect( () => {
		if ( siteSettings ) {
			const { writers_blocks } = siteSettings;
			
			if ( writers_blocks ) {
				setSuggestions( writers_blocks );
			}
		}
	}, [ siteSettings ] );

	// useEffect( () => {
	// 	if ( ! isOpen ) {
	// 		setIsOpen( isShown );
	// 	}
	// }, [ isOpen ] );

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
			<Flex justify="space-between" align="center">
				<h5 style={ { margin: 0 } }>{ title }</h5>
				<div>
					{ process.env.NODE_ENV === 'development' ? (
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
					) : null }
					{ PROBLEM_TYPES_WITH_IGNORE.includes( type ) ? (
						<Button
							variant="tertiary"
							onClick={ () => {
								const ignored = suggestions[ `ignored_${type}` ];
								const newIgnored = new Set( [ ...( ignored.length ? ignored.split(',') : [] ), type === 'spell' ? value : value.toLowerCase() ] );

								dispatch( 'core' ).saveEntityRecord(
									'root',
									'site',
									{
										writers_blocks: {
											...suggestions,
											[ `ignored_${type}` ]: [...newIgnored].join( ',' ),
										},
									}
								);

								createNotice(
									'info',
									__(
										type === 'spell'
											? `Added "${value}" to dictionary`
											: `Ignored "${value}"`,
										'writers-blocks'
									),
									{
										isDismissible: true,
										type: 'snackbar',
									}
								);

								const problems = select( store ).getProblemsByValue( value, type );

								problems.forEach( ( { annotationId } ) => {
									dispatch(
										'core/annotations'
									).__experimentalRemoveAnnotation( annotationId );
								} );
							} }
							icon={ plusCircle }
							iconSize={ 18 }
							isSmall={ true }
						/>
					) : null }
				</div>
			</Flex>
			<p>{ message }</p>
			{ replacements.length && type !== 'sentence_spacing' ? (
				<HStack
					alignment="left"
					direction="row"
					spacing="4px"
					wrap={ true }
				>
					{ replacements.slice( 0, 5 ).map( ( replacement ) => {
						return (
							<CopyButton
								key={ replacement }
								text={ replacement }
								label={ null }
								onClick={ () => {} }
							/>
						);
					} ) }
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
		const textArea = document.querySelector(
			'.edit-post-visual-editor__content-area'
		);
		const isTyping = select( 'core/block-editor' ).isTyping();

		if ( ! editorWrapper ) {
			return;
		}

		if ( ! textArea.hasAttribute( 'spellcheck' ) ) {
			textArea.setAttribute( 'spellcheck', 'false' );
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
				isShown={ selectedAnnotation !== null && ! isTyping }
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
