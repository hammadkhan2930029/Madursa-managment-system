import { apiRequest } from './Api';
import { getAdminToken } from './AdminAuth';

const withToken = (options = {}) => ({
  ...options,
  token: getAdminToken(),
});

const withJson = (method, body) =>
  withToken({
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

export const getQualifications = async (query = '') => {
  const result = await apiRequest(`/qualifications${query ? `?${query}` : ''}`, withToken({ method: 'GET' }));
  return result?.data || { items: [], meta: null };
};

export const createQualification = async (payload) => {
  const result = await apiRequest('/qualifications', withJson('POST', payload));
  return result?.data || null;
};

export const updateQualification = async (id, payload) => {
  const result = await apiRequest(`/qualifications/${id}`, withJson('PATCH', payload));
  return result?.data || null;
};

export const deleteQualification = async (id) => {
  const result = await apiRequest(`/qualifications/${id}`, withToken({ method: 'DELETE' }));
  return result?.data || null;
};
