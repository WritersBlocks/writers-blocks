import { strip } from './strip-text';

export const normalize = ( text = '', {
	preserveWhiteSpace = true,
} = {} ) => {
	const content = strip( text, { preserveWhiteSpace } );
	return content;
};
