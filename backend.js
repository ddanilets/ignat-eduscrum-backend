import request from 'superagent';

const baseUrl = process.env.NODE_ENV === 'production' ? `https://ignat-eduscrum.herokuapp.com:${process.env.DJANGO_PORT}` :
  'http://localhost:5000';

export function sendPostRequest(url, data, query, contentType = 'application/json') {
  return new Promise((resolve, reject) => {
    request('POST', baseUrl + url)
      .set('Content-Type', contentType)
      .query(query)
      .send({ data })
      .end((err, res) => {
        if (err) {
          reject(err || res.body);
        } else {
          resolve(res.body);
        }
      });
  });
}

export function sendGetRequest(url, query) {
  return new Promise((resolve, reject) => {
    request('GET', baseUrl + url)
      .set('Content-Type', 'application/json')
      .query(query)
      .end((err, res) => {
        if (err) {
          reject(err || res.body);
        } else {
          resolve(res.body);
        }
      });
  });
}

export function sendPatchRequest(url, data) {
  return new Promise((resolve, reject) => {
    request('PATCH', baseUrl + url)
      .set('Content-Type', 'application/json')
      .set('Cache-Control', 'no-cache,no-store,must-revalidate,max-age=-1,private')
      .send(data)
      .end((err, res) => {
        if (err) {
          reject(err || res.body);
        } else {
          resolve(res.body);
        }
      });
  });
}

export function sendDeleteRequest(url) {
  return new Promise((resolve, reject) => {
    request('DELETE', baseUrl + url)
      .set('Content-Type', 'application/json')
      .set('Cache-Control', 'no-cache,no-store,must-revalidate,max-age=-1,private')
      .end((err, res) => {
        if (err) {
          reject(err || res.body);
        } else {
          resolve(res.body);
        }
      });
  });
}

export function sendRegistration(registration) {
  return sendPostRequest('/users/', registration, null);
}

export function sendResetPassword(data) {
  return sendPostRequest('/api/reset-password', data, null);
}

export function sendNewPassword(data) {
  return sendPostRequest('/api/new-password', data, null);
}

export function checkLoginAndPasswordAccordance(logIn) {
  return sendPostRequest('/users/login/', logIn, null);
}

export function getUserData(id) {
  return sendGetRequest(`/users/${id}/`);
}

export function sendUserData(data, token) {
  return sendPostRequest('/api/user', data, { token });
}

export function logoutUser(token) {
  return sendGetRequest('/users/logout/', null, { token });
}

export function loadProject(id, token) {
  return sendGetRequest('/api/project-load', { token, id });
}

export function addMilestone(data, token) {
  return sendPostRequest('/api/milestone-add', data, { token });
}

export function loadUsers(token) {
  return sendGetRequest('/api/load-users', { token });
}

export function addDev(data, token) {
  return sendPostRequest('/api/dev-add', data, { token });
}

export function removeDev(data, token) {
  return sendPostRequest('/api/dev-remove', data, { token });
}

export function removeMilestone(id, token) {
  return sendPostRequest('/api/milestone-remove', id, { token });
}

export function createProject(data, token) {
  return sendPostRequest('/api/project-create', Object.assign(data, { token }), { token });
}

export function loadProjects(token) {
  return sendGetRequest('/projects/');
}

export function loadTickets() {
  return sendGetRequest('/tickets/');
}
