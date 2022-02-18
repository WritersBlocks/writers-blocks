import domReady from '@wordpress/dom-ready';
import apiFetch from '@wordpress/api-fetch';

const { WB_SETTINGS: { settings: { license_verified: isLicenseVerified } } } = window;

function showNotice( $el, type = 'info', message ) {
    const $notice = document.createElement( 'div' );
    const $button = document.createElement( 'button' );
    $notice.classList.add( 'writers-blocks-license-verify-notice', 'notice', 'is-dismissible', `notice-${type}` );
    $notice.innerHTML = `<p><strong>${message}</strong></p>`;
    $button.classList.add( 'notice-dismiss' );
    $button.setAttribute( 'type', 'button' );
    $button.setAttribute( 'aria-label', 'Dismiss this notice.' );
    $button.addEventListener( 'click', () => {
        $el.removeChild( $notice );
    } );
    $notice.appendChild( $button );

    if ( document.querySelector( '.writers-blocks-license-verify-notice' ) ) {
        document.querySelector( '.writers-blocks-license-verify-notice' ).remove();
    }

    $el.prepend( $notice );
}

domReady(() => {
    const wrapper = document.querySelector( '.writers-blocks-settings' );
    const $verifyLicense = document.querySelector('#verify-license');
    const $licenseKey = document.querySelector('#license_key');

    $verifyLicense.addEventListener('click', () => {
        apiFetch({
            path: '/writers-blocks/v1/license',
            method: 'POST',
            data: {
                license: $licenseKey.value,
                increment: !isLicenseVerified,
            },
        }).then(({ success }) => {
            showNotice(
                wrapper,
                success ? 'success' : 'error',
                success
                    ? 'License verified!'
                    : 'The license key entered did not appear to be a valid license key. Please enter a valid license key.'
            );
        });
    });
});
