import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
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
        <div style={{ display: 'flex', gap: 24 }}>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
