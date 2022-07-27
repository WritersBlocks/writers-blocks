import { __, sprintf } from '@wordpress/i18n';
import { useDispatch } from '@wordpress/data';
import { Button } from '@wordpress/components';
import { useCopyToClipboard } from '@wordpress/compose';
import { store as noticesStore } from '@wordpress/notices';

const generateLabel = (word) => {
	return `${word} (${__('Copy', 'writers-blocks')})`;
};

export const CopyButton = ({
	text,
	label,
	buttonText,
	variant = 'secondary',
	onClick,
}) => {
	const { createNotice } = useDispatch(noticesStore);

	function onSuccess() {
		createNotice('info', __('Copied!'), {
			isDismissible: true,
			type: 'snackbar',
		});
		onClick();
	}

	const ref = useCopyToClipboard(text, onSuccess);

	return (
		<Button
			className="wp-block-writers-blocks-word__modal-synonym"
			variant={variant}
			showTooltip={true}
			label={
				label && sprintf( 'Copy %d and close modal', text )
			}
			ref={ref}
		>
			{buttonText || text}
		</Button>
	);
};
