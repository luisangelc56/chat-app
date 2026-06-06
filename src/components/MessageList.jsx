import { useCallback, useEffect, useState } from 'react';
import { fetchMessages } from '../services/api';

function formatDate(value) {
  if (!value) return '';
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? String(value) : date.toLocaleString();
}

export default function MessageList({ refreshKey }) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadMessages = useCallback(async () => {
    setLoading(true);
    setError('');

    try {
      const data = await fetchMessages();
      setMessages(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message);
      setMessages([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadMessages();
  }, [loadMessages, refreshKey]);

  return (
    <section className="card">
      <div className="card-header">
        <h2>Serie III — Mensajes del chat</h2>
        <button type="button" className="secondary" onClick={loadMessages}>
          Actualizar
        </button>
      </div>

      {loading && <p className="hint">Cargando mensajes...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && !error && messages.length === 0 && (
        <p className="hint">No hay mensajes para mostrar.</p>
      )}

      <ul className="message-list">
        {messages.map((message, index) => (
          <li key={message.Id_Mensaje ?? message.id ?? index} className="message-item">
            <div className="message-meta">
              <strong>{message.Login_Emisor ?? message.login_Emisor ?? 'Anónimo'}</strong>
              <span>Sala {message.Cod_Sala ?? message.cod_Sala ?? 0}</span>
              <time>{formatDate(message.Fecha_Envio ?? message.fecha_Envio)}</time>
            </div>
            <p>{message.Contenido ?? message.contenido}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
