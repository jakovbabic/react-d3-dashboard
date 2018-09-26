import apiFetch from '../utils/apiFetch';

export function loadDashboard() {
  return apiFetch(
    'GET',
    { endPoint: 'views' },
  );
}
