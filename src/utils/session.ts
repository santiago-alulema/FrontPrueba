import cookie from 'js-cookie';
// import nextCookie from 'next-cookies';
// const isBrowser = typeof window !== 'undefined';

export const getCookie = (key: string) => {
  // return isBrowser
  //   ? getCookieFromBrowser(key)
  //   : getCookieFromServer(context, key);
  return cookie.get(key);
};

export const setCookie = (key: string, token: any) => {
  cookie.set(key, token, { expires: 7 });
};

export const removeCookie = (key: string) => {
  cookie.remove(key);
};
