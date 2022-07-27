import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { ToolbarButton } from '@wordpress/components';

export const BlurToolbarButton = ({ setAttributes, isBlurred }) => {
	return (
		<ToolbarButton
			className={classnames('components-toolbar__control', {
				'is-pressed': isBlurred,
			})}
			label={__(
				isBlurred ? 'Deblur text' : 'Blur text',
				'writers-blocks'
			)}
			icon="hidden"
			onClick={() => {
				setAttributes({ isBlurred: !isBlurred });
			}}
			data-toolbar-item
		/>
	);
};
