import { useState } from 'react';
import { login } from '../services/api';

export default function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      const session = await login(username.trim(), password);
      onLoginSuccess(session);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="card card--login">
      <h2 className="card-title">
        <span className="card-step">I</span>
        Inicio de sesión
      </h2>
      <p className="card-subtitle">
        Ingrese solo la parte del correo antes de @miumg.edu.gt (ej: ctezop).
      </p>

      <form onSubmit={handleSubmit} className="form">
        <label>
          Usuario
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="ctezop"
            required
            autoComplete="username"
          />
        </label>

        <label>
          Contraseña
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="123456a"
            required
            autoComplete="current-password"
          />
        </label>

        {error && <p className="status-banner status-banner--error">{error}</p>}

        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? 'Autenticando...' : 'Iniciar sesión'}
        </button>
      </form>
    </section>
  );
}
