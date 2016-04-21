const utils = {
  getDomain: () => (window.location.origin).replace(':8080', '') + ':3000',
  getDomainEmail: () => (window.location.origin).replace(':8080', '') + ':3001'
};

export default utils;
