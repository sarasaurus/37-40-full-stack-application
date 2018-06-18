const deleteCookie = (key) => {
  const cookieDeath = document.cookie = `${key}=; expires= Thu, 01 Jan 1970 00:00:00 GMT`;
  return cookieDeath;
};
const fetchCookie = (key) => {
  const allCookies = document.cookie.split(';');
  for (const cookie of allCookies) { // eslint-disable-line
    const [cookieKey, cookieValue] = cookie.split('=');
    if (key === cookieKey.trim()) {
      return cookieValue;
    }
  }
  return null;
};

export { deleteCookie, fetchCookie };
