const size = {
  mobileS: '360px',
  mobileM: '480px',
  mobileL: '600px',
  tablet: '768px',
  laptopS: '960px',
  laptopM: '1024px',
  laptopL: '1440px',
  desktop: '2560px',
};

const device = {
  mobileS: `(min-width: ${size.mobileS})`,
  mobileM: `(min-width: ${size.mobileM})`,
  mobileL: `(min-width: ${size.mobileL})`,
  tablet: `(min-width: ${size.tablet})`,
  laptopS: `(min-width: ${size.laptopS})`,
  laptopM: `(min-width: ${size.laptopM})`,
  laptopL: `(min-width: ${size.laptopL})`,
  desktop: `(min-width: ${size.desktop})`,
  desktopL: `(min-width: ${size.desktop})`,
};

const DOMAIN = process.env.REACT_APP_DOMAIN;
// Google Analytics
const GA_TRACKING_ID = process.env.REACT_APP_GA_TRACKING_ID;
const GA_DEBUG = JSON.parse(process.env.REACT_APP_GA_DEBUG || 'false');

export {
  DOMAIN, GA_DEBUG, GA_TRACKING_ID, device, size,
};
