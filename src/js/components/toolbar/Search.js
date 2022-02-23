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
import { Confirm } from '../Confirm';
import { CopyButton } from '../CopyButton';

export const SearchToolbarButton = ({ attributes }) => {
    const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [isSearchModalLoading, setIsSearchModalLoading] = useState(false);
    const [selectedWord, setSelectedWord] = useState('');
    const [selectedWordData, setSelectedWordData] = useState(null);

    useEffect(() => {
        if (selectedWord) {
            setIsSearchModalOpen(true);
            setIsSearchModalLoading(true);
            apiFetch({
                path: `/writers-blocks/v1/word`,
                method: 'POST',
                data: { word: selectedWord },
            })
                .then((response) => {
                    if (response) {
                        setSelectedWordData({
                            ...response,
                            results: (response.results || []).reduce((acc, result) => ({
                                ...acc,
                                [result.partOfSpeech]: acc[result.partOfSpeech] ? [...acc[result.partOfSpeech], result] : [result],
                            }), {}),
                        });
                        setIsSearchModalLoading(false);
                    }
                });
        }
    }, [selectedWord]);

    return (
        <Fragment>
            <ToolbarButton
                className={ classnames( 'components-toolbar__control', { 'is-pressed': isSearchModalOpen } ) }
                label={ __( 'Dictionary', 'writers-blocks' ) }
                icon="search"
                onClick={ () => {
                    const { offset: selectionStart } = select('core/block-editor').getSelectionStart();
                    const { offset: selectionEnd, attributeKey: content } = select('core/block-editor').getSelectionEnd();
                    
                    if (selectionStart !== selectionEnd) {
                        const text = strip(attributes[content]);
                        const word = text.slice(selectionStart, selectionEnd).trim();
                        
                        if (word.includes(' '))
                            setIsConfirmModalOpen(true);
                        else if (word) {
                            setSelectedWord(word);
                        }
                    }
                } }
            />
            {
                isConfirmModalOpen ? (
                    <Confirm
                        onClose={ () => {
                            setIsConfirmModalOpen(false);
                        } }
                        onConfirm={ () => {
                            setIsConfirmModalOpen(false);

                            const { offset: selectionStart } = select('core/block-editor').getSelectionStart();
                            const { offset: selectionEnd, attributeKey: content } = select('core/block-editor').getSelectionEnd();
                            const text = strip(attributes[content]);
                            const word = text.slice(selectionStart, selectionEnd).trim();

                            setSelectedWord(word);
                        } }
                        confirmText={ __( 'Yes', 'writers-blocks' ) }
                        cancelText={ __( 'No', 'writers-blocks' ) }
                        title={ __( 'Are you sure?', 'writers-blocks' ) }
                        message={ __( `It looks like you've selected multiple words. Are you sure you want to use a search credit?`, 'writers-blocks' ) }
                        />
                ) : null
            }
            {isSearchModalOpen ? (
                <Modal
                    className="wp-block-writers-blocks-word__modal"
                    title={ __( 'Word Search', 'writers-blocks' ) }
                    onRequestClose={ () => {
                        setIsSearchModalOpen( false );
                        setSelectedWordData( null );
                    } }
                    isFullScreen
                >
                    {
                        isSearchModalLoading ? (
                            <div className="wp-block-writers-blocks-word__modal-loading">
                                <Spinner />
                            </div>
                        ) : (
                            <div className="wp-block-writers-blocks-word__modal-content">
                                <Flex className="wp-block-writers-blocks-word__modal-title" justify="flex-start">
                                    <h2>{ selectedWord }</h2>
                                    <small>{ selectedWordData?.pronunciation?.all }</small>
                                </Flex>
                                {
                                    selectedWordData && Object.keys(selectedWordData.results).length ?
                                        (
                                            <div>
                                                {
                                                    Object.keys(selectedWordData.results).map((key, index) => {
                                                        return (
                                                            <Fragment key={index}>
                                                                <Flex justify="flex-start">
                                                                    <p><em>{ key }</em></p>
                                                                    {
                                                                        selectedWordData?.pronunciation?.[key] ? (
                                                                            <small>{ selectedWordData.pronunciation[key] }</small>
                                                                        ) : null
                                                                    }
                                                                </Flex>
                                                                <ol className="wp-block-writers-blocks-word__modal-definition-list">
                                                                    {
                                                                        selectedWordData.results[key].map((result, index) => {
                                                                            return (
                                                                                <li
                                                                                    className="wp-block-writers-blocks-word__modal-definition"
                                                                                    key={ index }
                                                                                >
                                                                                    <p>{ result.definition }</p>
                                                                                    {
                                                                                        result.examples && result.examples.length ? (
                                                                                            <ul className="wp-block-writers-blocks-word__modal-examples-list">
                                                                                                {
                                                                                                    result.examples.map((example, index) => {
                                                                                                        return (
                                                                                                            <li
                                                                                                                className="wp-block-writers-blocks-word__modal-example"
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
                                                                                                className="wp-block-writers-blocks-word__modal-synonyms-list"
                                                                                                justify="flex-start"
                                                                                            >
                                                                                                {
                                                                                                    result.synonyms.map((synonym, index) => {
                                                                                                        return (
                                                                                                            <CopyButton
                                                                                                                key={ index }
                                                                                                                text={ synonym }
                                                                                                                onClick={ () => {
                                                                                                                    setIsSearchModalOpen(false);
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
                                }
                            </div>
                        )
                    }
                </Modal>
            ) : null}
        </Fragment>
    );
};
