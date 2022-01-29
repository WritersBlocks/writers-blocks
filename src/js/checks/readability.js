export default (text) => {
    const sentences = text.match(/[^\.!\?]+[\.!\?]+/g) || [];

    return !sentences ? [] : sentences.map((sentence) => {
        const words = text.match(/\w+/g)?.length || 0;
        const characters = text.match(/[a-zA-Z0-9]/g)?.length || 0;
        const score = 4.71 * (characters / words) + 0.5 * (words / 1) - 21.43;
        const level = score > 9 && score <= 16 ? 'suggestion' : score > 16 ? 'warning' : null;

        return words > 14 && level ? {
            type: 'readability',
            message: `sentence is${level ===  'warning' ? ' very' : ''} hard to read`,
            level,
            score,
        } : {
            characters,
            words,
            score,
        };
    });
};
