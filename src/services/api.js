const API_BASE = 'https://backcvbgtmdesa.azurewebsites.net/api';
const MESSAGES_API = import.meta.env.VITE_MESSAGES_API || 'http://localhost:3001/api';

const TOKEN_KEY = 'chat_token';
const USER_KEY = 'chat_username';

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function getUsername() {
  return localStorage.getItem(USER_KEY);
}

export function saveSession(token, username) {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, username);
}

export function clearSession() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

export async function login(username, password) {
  const response = await fetch(`${API_BASE}/login/authenticate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ Username: username, Password: password }),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.msgRespuesta || data.message || 'Error de autenticación');
  }

  const token = data.token || data.Token || data.accessToken;
  if (!token) {
    throw new Error('La API no devolvió un token válido');
  }

  saveSession(token, username);
  return { token, username };
}

export async function sendMessage({ codSala, loginEmisor, contenido }) {
  const token = getToken();
  if (!token) {
    throw new Error('No hay sesión activa. Inicie sesión primero.');
  }

  const response = await fetch(`${API_BASE}/Mensajes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      Cod_Sala: Number(codSala),
      Login_Emisor: loginEmisor,
      Contenido: contenido,
    }),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.msgRespuesta || data.message || 'No se pudo enviar el mensaje');
  }

  return data;
}

export async function fetchMessages() {
  const response = await fetch(`${MESSAGES_API}/mensajes`);
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || 'No se pudieron cargar los mensajes');
  }

  return data;
}
