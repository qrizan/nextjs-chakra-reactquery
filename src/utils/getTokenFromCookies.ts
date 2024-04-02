const getTokenFromCookies = (cookieString: string | undefined) => {
  if (!cookieString) return null;

  const tokenCookie = cookieString.split('; ')
    .find(cookie => cookie.startsWith('token='));

  return tokenCookie ? tokenCookie.split('=')[1] : null;
};

export default getTokenFromCookies;
