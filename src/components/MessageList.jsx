import { useCallback, useEffect, useState } from 'react';
import { fetchMessages } from '../services/api';

function formatDate(value) {
  if (!value) return '';
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? String(value) : date.toLocaleString();
}

function getInitials(name) {
  return (name || '?').slice(0, 2).toUpperCase();
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
        <h2 className="card-title">
          <span className="card-step">III</span>
          Mensajes del chat
        </h2>
        <div className="card-header-actions">
          {!loading && !error && (
            <span className="message-count">{messages.length} mensajes</span>
          )}
          <button
            type="button"
            className="btn-secondary btn-icon"
            onClick={loadMessages}
            disabled={loading}
          >
            ↻ Actualizar
          </button>
        </div>
      </div>

      {loading && (
        <p className="status-banner status-banner--loading">Cargando mensajes...</p>
      )}
      {error && <p className="status-banner status-banner--error">{error}</p>}

      {!loading && !error && messages.length === 0 && (
        <p className="status-banner status-banner--empty">No hay mensajes para mostrar.</p>
      )}

      <ul className="message-list">
        {messages.map((message, index) => {
          const author = message.Login_Emisor ?? message.login_Emisor ?? 'Anónimo';
          const sala = message.Cod_Sala ?? message.cod_Sala ?? 0;
          const contenido = message.Contenido ?? message.contenido;
          const fecha = message.Fecha_Envio ?? message.fecha_Envio;

          return (
            <li key={message.Id_Mensaje ?? message.id ?? index} className="message-item">
              <div className="message-avatar">{getInitials(author)}</div>
              <div className="message-body">
                <div className="message-meta">
                  <span className="message-author">{author}</span>
                  <span className="message-badge">Sala {sala}</span>
                  <time className="message-time">{formatDate(fecha)}</time>
                </div>
                <p>{contenido}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
