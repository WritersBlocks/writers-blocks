import { __ } from '@wordpress/i18n';
import apiFetch from '@wordpress/api-fetch';
import { addQueryArgs } from '@wordpress/url';
import { Fragment, useState } from '@wordpress/element';
import {
	Icon,
	Spinner,
	Button,
	// @ts-ignore - TODO: remove when HStack is no longer experimental
	__experimentalHStack as HStack,
	TextControl,
} from '@wordpress/components';
import { check, close } from '@wordpress/icons';

const {
	WRITERS_BLOCKS: { rest_url, license: LICENSE_DATA },
} = window;

export const LicenseChecker = () => {
	const [licenseData, setLicenseData] = useState(LICENSE_DATA);
	const [license, setLicense] = useState(
		LICENSE_DATA?.license_key?.key || ''
	);
	const [isLicenseValid, setIsLicenseValid] = useState(
		LICENSE_DATA?.activated || LICENSE_DATA?.valid ? true : false
	);
	const [isLicenseUpdating, setIsLicenseUpdating] = useState(false);

	const verifyLicense = async () => {
		if (isLicenseUpdating) {
			return;
		}

		setIsLicenseUpdating(true);

		const action =
			(licenseData && licenseData.activated) || licenseData.valid
				? 'validate'
				: 'activate';

		const response = await apiFetch({
			path: addQueryArgs(`${rest_url}/license`, {
				action,
				license,
			}),
		});

		setLicenseData(response);
		setIsLicenseValid(response.activated || response.valid);
		setIsLicenseUpdating(false);
	};

	return (
		<Fragment>
			<HStack alignment="stretch">
				<TextControl
					className="writers-blocks__license-checker-input"
					label={__('License key', 'writers-blocks')}
					hideLabelFromVision={true}
					value={license}
					onChange={(value) => {
						setLicense(value);
					}}
				/>
				<Button isPrimary onClick={verifyLicense}>
					{__(
						!isLicenseValid ? 'Activate' : 'Validate',
						'writers-blocks'
					)}
				</Button>
			</HStack>
			{isLicenseUpdating ? <Spinner /> : null}
			{licenseData &&
			(isLicenseValid ||
				licenseData.error ||
				licenseData?.license_key?.key === license) &&
			!isLicenseUpdating ? (
				<p
					className={`writers-blocks__license-checker-message${
						isLicenseValid ? ' is-valid' : ' is-invalid'
					}`}
				>
					{<Icon icon={isLicenseValid ? check : close} size="16" />}
					{__(
						isLicenseValid ? 'License is valid' : 'Invalid license',
						'writers-blocks'
					)}
				</p>
			) : null}
		</Fragment>
	);
};
