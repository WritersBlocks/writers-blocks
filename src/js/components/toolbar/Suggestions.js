/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { ToolbarButton, Modal, Spinner, Flex } from '@wordpress/components';
import { useState, useEffect } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';
import { select } from '@wordpress/data';

/**
 * Internal dependencies
 */
import { strip } from '../../utils/strip-text';
import { CopyButton } from '../CopyButton';

export const SuggestionsToolbarButton = ({ attributes }) => {
    const [isSuggestionsModalOpen, setIsSuggestionsModalOpen] = useState(false);
    const [isSuggestionsModalLoading, setIsSuggestionsModalLoading] = useState(false);
    const [selectedSentence, setSelectedSentence] = useState('');
    const [selectedSentenceData, setSelectedSentenceData] = useState(null);

    useEffect(() => {
        if (selectedSentence) {
            setIsSuggestionsModalOpen(true);
            setIsSuggestionsModalLoading(true);
            apiFetch({
                path: `/writers-blocks/v1/rewrite`,
                method: 'POST',
                data: { text: selectedSentence },
            })
                .then((response) => {
                    if (response) {
                        console.log(response);
                        setSelectedSentenceData(response);
                        setIsSuggestionsModalLoading(false);
                    }
                });
        }
    }, [selectedSentence]);

    return (
        <Fragment>
            <ToolbarButton
                className={ classnames( 'components-toolbar__control', { 'is-pressed': isSuggestionsModalOpen } ) }
                label={ __( 'Dictionary', 'writers-blocks' ) }
                icon="lightning"
                onClick={ () => {
                    const { offset: selectionStart } = select('core/block-editor').getSelectionStart();
                    const { offset: selectionEnd, attributeKey: content } = select('core/block-editor').getSelectionEnd();
                    
                    if (selectionStart !== selectionEnd) {
                        const text = strip(attributes[content]);
                        const sentence = text.slice(selectionStart, selectionEnd).trim();
                        
                        if (sentence) {
                            setSelectedSentence(sentence);
                        }
                    }
                } }
            />
            {isSuggestionsModalOpen ? (
                <Modal
                    className="wp-block-writers-blocks-rewrite__modal"
                    title={ __( 'Sentence Rewrite', 'writers-blocks' ) }
                    onRequestClose={ () => {
                        setIsSuggestionsModalOpen( false );
                        setSelectedSentenceData( null );
                    } }
                    isFullScreen
                >
                    {
                        isSuggestionsModalLoading ? (
                            <div className="wp-block-writers-blocks-rewrite__modal-loading">
                                <Spinner />
                            </div>
                        ) : (
                            <div className="wp-block-writers-blocks-rewrite__modal-content">
                                {/* <Flex className="wp-block-writers-blocks-rewrite__modal-title" justify="flex-start">
                                    <h2>{ __( 'Original', 'writers-blocks' ) }</h2>
                                    <small>{ selectedSentence }</small>
                                </Flex> */}
                                {/* {
                                    selectedSentenceData && Object.keys(selectedSentenceData.results).length ?
                                        (
                                            <div>
                                                {
                                                    Object.keys(selectedSentenceData.results).map((key, index) => {
                                                        return (
                                                            <Fragment key={index}>
                                                                <Flex justify="flex-start">
                                                                    <p><em>{ key }</em></p>
                                                                    {
                                                                        selectedSentenceData?.pronunciation?.[key] ? (
                                                                            <small>{ selectedSentenceData.pronunciation[key] }</small>
                                                                        ) : null
                                                                    }
                                                                </Flex>
                                                                <ol className="wp-block-writers-blocks-rewrite__modal-definition-list">
                                                                    {
                                                                        selectedSentenceData.results[key].map((result, index) => {
                                                                            return (
                                                                                <li
                                                                                    className="wp-block-writers-blocks-rewrite__modal-definition"
                                                                                    key={ index }
                                                                                >
                                                                                    <p>{ result.definition }</p>
                                                                                    {
                                                                                        result.examples && result.examples.length ? (
                                                                                            <ul className="wp-block-writers-blocks-rewrite__modal-examples-list">
                                                                                                {
                                                                                                    result.examples.map((example, index) => {
                                                                                                        return (
                                                                                                            <li
                                                                                                                className="wp-block-writers-blocks-rewrite__modal-example"
                                                                                                                key={ index }
                                                                                                            >
                                                                                                                <p><em>{ example }</em></p>
                                                                                                            </li>
                                                                                                        );
                                                                                                    })
                                                                                                }
                                                                                            </ul>
                                                                                        ) : null
                                                                                    }
                                                                                    {
                                                                                        result.synonyms && result.synonyms.length ? (
                                                                                            <Flex
                                                                                                className="wp-block-writers-blocks-rewrite__modal-synonyms-list"
                                                                                                justify="flex-start"
                                                                                            >
                                                                                                {
                                                                                                    result.synonyms.map((synonym, index) => {
                                                                                                        return (
                                                                                                            <CopyButton
                                                                                                                key={ index }
                                                                                                                text={ synonym }
                                                                                                                onClick={ () => {
                                                                                                                    setIsSuggestionsModalOpen(false);
                                                                                                                } }
                                                                                                            />
                                                                                                        );
                                                                                                    })
                                                                                                }
                                                                                            </Flex>
                                                                                        ) : null
                                                                                    }
                                                                                </li>
                                                                            )
                                                                        })
                                                                    }
                                                                </ol>
                                                            </Fragment>
                                                        )
                                                    })
                                                }
                                            </div>
                                        ) : (
                                        <p>{ __( 'No results found', 'writers-blocks' ) }</p>
                                    )
                                } */}
                            </div>
                        )
                    }
                </Modal>
            ) : null}
        </Fragment>
    );
};
