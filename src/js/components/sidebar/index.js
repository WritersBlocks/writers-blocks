/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { PanelBody, PanelRow, ToggleControl } from '@wordpress/components';
import { select, dispatch } from '@wordpress/data';

/**
 * Internal dependencies
 */
import {
	PROBLEM_TYPES_TO_LABEL,
	// BLOCK_TYPE_CONTENT_ATTRIBUTE,
} from '../../constants';
import { store } from '../../store';
import { addAnnotations } from '../../store/actions';

export const Sidebar = (props) => {
	const { clientId, setAttributes, attributes, problems } = props;

	return (
		<PanelBody
			title={__('Suggestions', 'writers-blocks')}
			initialOpen={false}
		>
			{Object.keys(PROBLEM_TYPES_TO_LABEL).map((type) =>
				PROBLEM_TYPES_TO_LABEL[type].help(problems[type]?.length) ? (
					<PanelRow key={type}>
						<ToggleControl
							label={PROBLEM_TYPES_TO_LABEL[type].label}
							help={PROBLEM_TYPES_TO_LABEL[type].help(
								problems[type]?.length || 0
							)}
							checked={attributes[type] ?? false}
							onChange={(checked) => {
								setAttributes({ [type]: checked });

								(
									PROBLEM_TYPES_TO_LABEL[type].source || [
										type,
									]
								).forEach((source) => {
									if (checked) {
										const problems =
											select(store).getProblemsByType(
												source
											);

										addAnnotations(
											problems.filter(
												({ blockId }) =>
													blockId === clientId
											)
										);
									} else {
										const annotationsInBlock = select(
											'core/annotations'
										)
											.__experimentalGetAnnotations()
											.filter(
												({
													blockClientId,
													source: annotationSource,
												}) =>
													blockClientId ===
														clientId &&
													annotationSource ===
														`writers-blocks--${source}`
											);

										annotationsInBlock.forEach(({ id }) => {
											dispatch(
												'core/annotations'
											).__experimentalRemoveAnnotation(
												id
											);
										});
									}
								});
							}}
						/>
					</PanelRow>
				) : null
			)}
		</PanelBody>
	);
};
