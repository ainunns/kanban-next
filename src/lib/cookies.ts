import Cookies from 'universal-cookie';

const cookies = new Cookies();

export const getToken = (): string => {
  return cookies.get('@kanban/token');
};

export const setToken = (token: string) => {
  cookies.set('@kanban/token', token);
};

export const removeToken = () => {
  cookies.remove('@kanban/token');
};

export const setRedirect = (redirect: string) => {
  cookies.set('@kanban/redirect', redirect);
};

export const getRedirect = () => {
  return cookies.get('@kanban/redirect');
};
