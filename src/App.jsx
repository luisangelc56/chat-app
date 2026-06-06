import { useEffect, useState } from 'react';
import Login from './components/Login';
import MessageForm from './components/MessageForm';
import MessageList from './components/MessageList';
import { clearSession, getToken, getUsername } from './services/api';
import './App.css';

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
    <main className="app">
      <header className="app-header">
        <div>
          <h1>Chat UMG — Examen Programación III</h1>
          <p>Autenticación, envío y visualización cronológica de mensajes</p>
        </div>

        {isAuthenticated && (
          <div className="session">
            <span>Sesión: <strong>{username}</strong></span>
            <button type="button" className="secondary" onClick={handleLogout}>
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
