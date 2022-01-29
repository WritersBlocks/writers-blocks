export default (text) => {
    const expression = new RegExp(/^(\s)*so\b[\s\S]/gi);
    const matches = [...text.matchAll(expression)];

    if (!matches) {
        return [];
    }

    return matches.map((match) => {
        const [ value ] = [...match].filter(Boolean);

        return {
            value,
            type: 'so',
            level: 'suggestion',
            message: 'omit "So" from the beginning of sentences',
            index: match.index,
            offset: value.length + match.index,
            replacements: '',
        }
    });
};
