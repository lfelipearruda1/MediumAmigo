import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

function Sidebar() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  const loadUserData = async () => {
    try {
      const response = await fetch('/api/user');  
      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.error('Erro ao carregar os dados do usuário:', error);
    }
  };

  useEffect(() => {
    loadUserData();
  }, []);

  return (
    <div className="sidebar">
      <div className="user-info">
        {user && (
          <>
    <img
        src={user?.userImg || '/default-profile.png'}
        alt="User Avatar"
        className="user-img"
    />
    <h3>{user?.username || "Usuário Desconhecido"}</h3>
          </>
        )}
      </div>
      <nav className="nav-links">
        <ul>
          <li onClick={() => router.push('/dashboard')}>Dashboard</li>
          <li onClick={() => router.push('/profile')}>Perfil</li>
          <li onClick={() => router.push('/settings')}>Configurações</li>
          <li onClick={() => router.push('/logout')}>Sair</li>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
