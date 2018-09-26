import apiFetch from '../utils/apiFetch';

export function loadDashboard() {
  return apiFetch(
    'GET',
    { endPoint: 'views' },
  );
}

export function loadDashboardView(id) {
  return apiFetch(
    'GET',
    { endPoint: `views/${id}` },
  );
}
