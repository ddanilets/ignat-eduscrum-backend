export default {
  username: '',
  email: '',
  photo: '',
  name: '',
  surname: '',
  skype: '',
  token: typeof localStorage !== 'undefined' ? localStorage.getItem('auth_token') : null || null,
  id: typeof localStorage !== 'undefined' ? localStorage.getItem('id') : null || null,
  roles: [],
};
