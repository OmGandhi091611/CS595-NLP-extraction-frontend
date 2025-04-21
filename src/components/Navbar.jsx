import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const Navbar = () => {
  const location = useLocation();
  const { user } = useContext(UserContext);


  // Don't show user info on login page
  const showUser = user && location.pathname !== '/';

  return (
    <nav style={{
      width: '100%',
      background: '#222',
      color: '#fff',
      padding: '12px 0',
      marginBottom: 36,
      boxShadow: '0 2px 8px #e0e0e0',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
    }}>
      <div style={{
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
      }}>
        <div style={{ fontWeight: 700, fontSize: 22, letterSpacing: 1 }}>NLP Extraction</div>
        <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
          {/* Add navigation links back if needed */}
          {showUser && (
            <div style={{ color: '#e0e0e0', fontWeight: 500, fontSize: 15, display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ background: '#444', borderRadius: '50%', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 16 }}>
                {user.name[0].toUpperCase()}
              </span>
              <span>{user.name}</span>
              {/* <span style={{ color: '#bbb', fontSize: 13 }}>({user.email})</span> */}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
