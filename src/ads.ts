// Ads are on only when PUBLIC_ADS_ENABLED=true AND PUBLIC_ADSENSE_CLIENT is set (after AdSense approval).
export const ADSENSE_CLIENT: string = import.meta.env.PUBLIC_ADSENSE_CLIENT ?? '';
export const ADS_ON = import.meta.env.PUBLIC_ADS_ENABLED === 'true' && ADSENSE_CLIENT !== '';
// Responsive display unit "site-responsive" in AdSense.
export const ADSENSE_SLOT = '4560609721';
