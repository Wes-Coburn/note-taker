const publicURL = () => `${import.meta.env.VITE_PUBLIC_URL}`;
const protocol = () => 'https';
// const mobileDomain = 'm.';

export const CANONICAL = {
  desktop: (path: string) =>
    encodeURI(`${protocol()}://${publicURL()}/${path}`),
  /* mobile: (path: string) =>
    encodeURI(`${protocol()}://${mobileDomain}${publicURL()}/${path}`),
  */
};

const ROUTES = {
  ROOT: () => '',
  NOT_FOUND: () => '*',
};

export default ROUTES;
