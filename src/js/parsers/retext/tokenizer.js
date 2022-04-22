/**
 * External dependencies
 */
import { VFile } from 'vfile';
import { sort } from 'vfile-sort';
import { unified } from 'unified';
import retextEnglish from 'retext-english';
import remarkMessageControl from 'remark-message-control';
import retextPos from 'retext-pos';
import { toString } from 'nlcst-to-string';

export function tokenize( text = '' ) {
    return core( text, makeText() );
}

function makeText() {
    return unified()
        .use( retextEnglish )
        .use( retextPos );
}

function core( value, processor, options = {} ) {
    const sentences = [];
    const file = new VFile( value );
    const tree = processor.use( filter, options ).parse( file );

    processor.runSync( tree, file );

    const [ paragraph ] = tree.children;

    paragraph.children.forEach( ( node ) => {
        const { type, value } = node;

        if ( ! sentences.length || sentences[ sentences.length - 1 ].filter( ( { type } ) => type === 'SentenceNode' ).length ) {
            sentences.push( [] );
        }

        sentences[ sentences.length - 1 ].push( node );
    } );

    sort( file );

    return {
        sentences: sentences.map( ( sentence ) => sentence.map( ( node ) => node.value ? node.value : toString( node ) ).join( '' ) ),
        tree: file,
    };
}

function filter( options = {} ) {
    if ( options.allow && options.deny ) {
        throw new Error(
            'Do not provide both allow and deny configuration parameters'
        );
    }

    return remarkMessageControl( {
        name: 'alex',
        reset: Boolean( options.deny ),
        enable: options.deny,
        disable: options.allow,
        source: [ 'retext-equality', 'retext-profanities' ],
    } );
}
