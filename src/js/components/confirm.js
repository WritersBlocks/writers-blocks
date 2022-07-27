import {
	Button,
	Modal,
	Flex,
	__experimentalVStack as VStack,
	__experimentalText as Text,
} from '@wordpress/components';

export const Confirm = ({
	onClose,
	onConfirm,
	title,
	confirmText,
	cancelText,
	message,
}) => {
	return (
		<Modal
			title={title}
			onRequestClose={onClose}
			shouldCloseOnClickOutside={true}
			className="wp-block-writers-blocks__confirm"
		>
			<VStack spacing={8}>
				<Text>{message}</Text>
				<Flex direction="row" justify="flex-end">
					<Button variant="primary" onClick={onClose}>
						{cancelText}
					</Button>
					<Button variant="tertiary" onClick={onConfirm}>
						{confirmText}
					</Button>
				</Flex>
			</VStack>
		</Modal>
	);
};
