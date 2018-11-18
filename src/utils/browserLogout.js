import { utils as api } from '@vidijs/vidijs-api';

export function browserLogout() {
  localStorage.removeItem('vsUserToken');
  localStorage.removeItem('vsUsername');
  localStorage.removeItem('vsBaseUrl');
  api.clientLogout();
}

export function browserLogoutOn401(onLogout) {
  api.defaultClient.interceptors.response.use(response => response, (error) => {
    if (error.response && error.response.status === 401) {
      browserLogout();
      if (onLogout) { onLogout(); }
    }
    return Promise.reject(error);
  });
}
