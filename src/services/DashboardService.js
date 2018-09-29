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

export function saveModal(data) {
  return apiFetch(
    'POST',
    { endPoint: `views/${data.viewId}/graph` },
    data,
  );
}

export function loadOptions() {
  return apiFetch(
    'GET',
    { endPoint: 'views/graph/types' },
  );
}
