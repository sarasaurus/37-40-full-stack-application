const deleteCookie = (key) => {
  const cookieDeath = document.cookie = `${key}=; expires= Thu, 01 Jan 1970 00:00:00 GMT`;
  return cookieDeath;
};
const fetchCookie = (key) => {
  const allCookies = document.cookie.split(';');
  // allCookies.forEach ==> allways have O(n) == has to iterate the entire array regardless where the cookie is found
  // but in for loop the iteration breaks as soon as find value-- so loop only runs until value is found
  for (const cookie of allCookies) { // eslint-disable-line
    // in for _of_, cookie === element
    // in for _in_, allCookies ==> cookie === INDEX
    const [cookieKey, cookieValue] = cookie.split('=');
    if (key === cookieKey.trim()) {
      return cookieValue;
    }
  }
  console.log('FETCH COOKIE', allCookies);
  return null;
};

export { deleteCookie, fetchCookie };
