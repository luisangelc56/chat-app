import { useState } from 'react';
import { getUsername, sendMessage } from '../services/api';

export default function MessageForm({ onMessageSent }) {
  const [codSala, setCodSala] = useState('0');
  const [contenido, setContenido] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const loginEmisor = getUsername();

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      await sendMessage({
        codSala,
        loginEmisor,
        contenido: contenido.trim(),
      });
      setContenido('');
      setSuccess('Mensaje enviado correctamente.');
      onMessageSent?.();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="card">
      <h2 className="card-title">
        <span className="card-step">II</span>
        Enviar mensaje
      </h2>
      <p className="card-subtitle">Complete los campos y envíe su mensaje al chat.</p>

      <form onSubmit={handleSubmit} className="form">
        <label>
          Cod_Sala
          <input
            type="number"
            value={codSala}
            onChange={(e) => setCodSala(e.target.value)}
            min="0"
            required
          />
        </label>

        <label>
          Login_Emisor
          <input type="text" value={loginEmisor || ''} readOnly />
        </label>

        <label>
          Contenido
          <textarea
            value={contenido}
            onChange={(e) => setContenido(e.target.value)}
            rows={4}
            placeholder="Escriba su mensaje..."
            required
          />
        </label>

        {error && <p className="status-banner status-banner--error">{error}</p>}
        {success && <p className="status-banner status-banner--success">{success}</p>}

        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? 'Enviando...' : 'Enviar mensaje'}
        </button>
      </form>
    </section>
  );
}
