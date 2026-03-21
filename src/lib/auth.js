const ADMIN_TOKEN_KEY = 'cwm_admin_token';
const ADMIN_USER_KEY = 'cwm_admin_user';

function setAdminSession({ token, user }) {
  localStorage.setItem(ADMIN_TOKEN_KEY, token);
  localStorage.setItem(ADMIN_USER_KEY, JSON.stringify(user));
}

function clearAdminSession() {
  localStorage.removeItem(ADMIN_TOKEN_KEY);
  localStorage.removeItem(ADMIN_USER_KEY);
}

function getAdminToken() {
  return localStorage.getItem(ADMIN_TOKEN_KEY);
}

function getAdminUser() {
  const serialized = localStorage.getItem(ADMIN_USER_KEY);
  if (!serialized) return null;

  try {
    return JSON.parse(serialized);
  } catch (_error) {
    return null;
  }
}

export { setAdminSession, clearAdminSession, getAdminToken, getAdminUser };
