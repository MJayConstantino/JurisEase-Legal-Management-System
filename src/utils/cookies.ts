/**
 * Sets a cookie with the specified name, value, and expiration days
 * @param name The name of the cookie
 * @param value The value to store in the cookie
 * @param days Number of days until the cookie expires (default: 30)
 */
export const setCookie = (name: string, value: string, days = 30) => {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `${name}=${value};${expires};path=/`;
};

/**
 * Gets a cookie value by name
 * @param name The name of the cookie to retrieve
 * @returns The cookie value or null if not found
 */
export const getCookie = (name: string): string | null => {
  const cookieName = `${name}=`;
  const cookies = document.cookie.split(";");

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.indexOf(cookieName) === 0) {
      return cookie.substring(cookieName.length, cookie.length);
    }
  }
  return null;
};
