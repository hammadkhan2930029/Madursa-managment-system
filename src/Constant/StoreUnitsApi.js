import { apiRequest } from './Api';
import { getAdminToken } from './AdminAuth';

const withToken = (options = {}) => ({
    ...options,
    token: getAdminToken(),
});

const buildQuery = (filters = {}) => {
    const params = new URLSearchParams();
    if (filters.search) params.set('search', filters.search);
    if (filters.activeOnly) params.set('activeOnly', filters.activeOnly);
    const query = params.toString();
    return query ? `?${query}` : '';
};

export const getStoreUnits = async (filters = {}) => {
    const result = await apiRequest(`/store/units${buildQuery(filters)}`, withToken({ method: 'GET' }));
    return result?.data || { items: [], meta: null };
};

export const createStoreUnit = async (payload) => {
    const result = await apiRequest('/store/units', {
        ...withToken({ method: 'POST' }),
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });
    return result?.data;
};

export const updateStoreUnit = async (id, payload) => {
    const result = await apiRequest(`/store/units/${id}`, {
        ...withToken({ method: 'PUT' }),
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });
    return result?.data;
};

export const deleteStoreUnit = async (id) => {
    const result = await apiRequest(`/store/units/${id}`, withToken({ method: 'DELETE' }));
    return result?.data;
};
