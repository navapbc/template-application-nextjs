/**
 * Run 'npm run i18n-types' to generate this file
 */
import common from '../../public/locales/en/common.json';
import home from '../../public/locales/en/home.json';

const resources = {
  common,
  home
} as const;

export default resources;
