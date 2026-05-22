/**
 * API client service for connecting to the NestJS backend
 */

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export type UserRole = 'clinic' | 'patient';

export function getAuthToken(role: UserRole): string | null {
  return localStorage.getItem(`${role}_token`);
}

export function setAuthToken(role: UserRole, token: string) {
  localStorage.setItem(`${role}_token`, token);
}

export function clearAuthToken(role: UserRole) {
  localStorage.removeItem(`${role}_token`);
}

export async function apiFetch(path: string, options: RequestInit = {}) {
  // Determine if patient or clinic is requesting based on path / context
  // Fallback to checking whichever token is present
  let token = getAuthToken('clinic') || getAuthToken('patient');
  
  if (path.includes('clinic')) {
    token = getAuthToken('clinic') || token;
  }

  const headers = new Headers(options.headers || {});
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }
  if (options.body && !(options.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
  }

  const response = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    let errorMessage = 'An error occurred';
    try {
      const errorData = await response.json();
      errorMessage = errorData.message || errorMessage;
    } catch {
      // JSON parsing failed, use statusText
      errorMessage = response.statusText || errorMessage;
    }
    throw new Error(errorMessage);
  }

  // Handle empty or text responses
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    return response.json();
  }
  return response.text();
}

// ============ AUTHENTICATION API ============
export async function loginPatient(identifier: string, password: string) {
  const data = await apiFetch('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ identifier, password }),
  });
  if (data.access_token) {
    setAuthToken('patient', data.access_token);
  }
  return data;
}

export async function loginClinic(identifier: string, password: string) {
  const data = await apiFetch('/auth/clinic/login', {
    method: 'POST',
    body: JSON.stringify({ identifier, password }),
  });
  if (data.access_token) {
    setAuthToken('clinic', data.access_token);
  }
  return data;
}

export async function registerUser(email: string, password: string, role: string) {
  return apiFetch('/auth/register', {
    method: 'POST',
    body: JSON.stringify({ email, password, role }),
  });
}

export async function getOwnProfile() {
  // Use /users/profile which returns the details based on JWT role
  return apiFetch('/users/profile');
}

// ============ USERS & CLINICS API ============
export async function updateOwnProfile(role: UserRole, updateData: any) {
  return apiFetch('/users/profile', {
    method: 'PUT',
    body: JSON.stringify(updateData),
  });
}

export async function listClinics(specialty?: string, location?: string) {
  const params = new URLSearchParams();
  if (specialty) params.append('specialty', specialty);
  if (location) params.append('location', location);
  
  const queryStr = params.toString() ? `?${params.toString()}` : '';
  return apiFetch(`/clinics${queryStr}`);
}

export async function getClinicDetail(id: string) {
  return apiFetch(`/clinics/${id}`);
}

export async function getUserById(id: string) {
  return apiFetch(`/users/${id}`);
}

export async function addClinicImage(imageUrl: string) {
  return apiFetch('/users/profile/images', {
    method: 'POST',
    body: JSON.stringify({ imageUrl }),
  });
}

export async function deleteClinicImage(imageUrl: string) {
  return apiFetch('/users/profile/images', {
    method: 'DELETE',
    body: JSON.stringify({ imageUrl }),
  });
}

// ============ APPOINTMENTS API ============
export interface CreateAppointmentPayload {
  clinicUserId: string;
  appointmentTime: string;
  symptoms: string;
}

export async function createAppointment(payload: CreateAppointmentPayload, submit: boolean) {
  return apiFetch(`/appointments?submit=${submit}`, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export interface ListAppointmentsFilters {
  clinicUserId?: string;
  patientUserId?: string;
  startDate?: string;
  endDate?: string;
  status?: string;
}

export async function listAppointments(filters: ListAppointmentsFilters = {}) {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([key, val]) => {
    if (val) params.append(key, val);
  });
  const queryStr = params.toString() ? `?${params.toString()}` : '';
  return apiFetch(`/appointments${queryStr}`);
}

export async function getAppointmentDetail(id: string) {
  return apiFetch(`/appointments/${id}`);
}

export async function updateAppointment(id: string, updateData: { appointmentTime?: string; symptoms?: string }) {
  return apiFetch(`/appointments/${id}`, {
    method: 'PUT',
    body: JSON.stringify(updateData),
  });
}

export async function submitDraftAppointment(id: string) {
  return apiFetch(`/appointments/${id}/submit`, {
    method: 'PUT',
  });
}

export interface UpdatePrescriptionPayload {
  diagnosis: string;
  prescription: {
    medications: Array<{
      name: string;
      dosage: string;
      frequency: string;
      duration: string;
    }>;
    notes: string;
  };
  testResults?: string;
}

export async function updatePrescription(id: string, payload: UpdatePrescriptionPayload) {
  return apiFetch(`/appointments/${id}/prescription`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
}

export async function cancelAppointment(id: string) {
  return apiFetch(`/appointments/${id}`, {
    method: 'DELETE',
  });
}

export async function getAvailableSlots(clinicId: string, date: string) {
  return apiFetch(`/appointments/clinic/${clinicId}/available-slots?date=${date}`);
}
