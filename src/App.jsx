import { useEffect, useState } from 'react';
import Login from './components/Login';
import MessageForm from './components/MessageForm';
import MessageList from './components/MessageList';
import { clearSession, getToken, getUsername } from './services/api';
import './App.css';

function getInitials(name) {
  return (name || '?').slice(0, 2).toUpperCase();
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const token = getToken();
    const savedUser = getUsername();
    if (token && savedUser) {
      setIsAuthenticated(true);
      setUsername(savedUser);
    }
  }, []);

  function handleLoginSuccess({ username: loggedUser }) {
    setIsAuthenticated(true);
    setUsername(loggedUser);
  }

  function handleLogout() {
    clearSession();
    setIsAuthenticated(false);
    setUsername('');
  }

  function handleMessageSent() {
    setRefreshKey((current) => current + 1);
  }

  return (
    <main className={`app ${!isAuthenticated ? 'app--login' : ''}`}>
      <header className="app-header">
        <div className="brand">
          <span className="brand-badge">UMG · Programación III</span>
          <h1>Chat UMG</h1>
          <p>Autenticación, envío y visualización cronológica de mensajes</p>
        </div>

        {isAuthenticated && (
          <div className="session">
            <div className="session-pill">
              <span className="session-avatar">{getInitials(username)}</span>
              <span>{username}</span>
            </div>
            <button type="button" className="btn-ghost" onClick={handleLogout}>
              Cerrar sesión
            </button>
          </div>
        )}
      </header>

      {!isAuthenticated ? (
        <Login onLoginSuccess={handleLoginSuccess} />
      ) : (
        <div className="grid">
          <MessageForm onMessageSent={handleMessageSent} />
          <MessageList refreshKey={refreshKey} />
        </div>
      )}
    </main>
  );
}

export default App;
