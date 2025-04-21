import React from 'react'
import { useNavigate } from 'react-router-dom';

const demoProfile = {
  name: 'John Doe',
  email: 'johndoe@example.com'
};

const demoDocuments = [
  { id: 1, name: 'Resume.pdf' },
  { id: 2, name: 'Project_Proposal.docx' },
  { id: 3, name: 'Notes.txt' }
];

const Dashboard = () => {
  const navigate = useNavigate();

  const handleDocClick = (docId) => {
    // navigate(`/results/${docId}`);
	navigate(`/result`);
  };

  const handleUpload = () => {
    alert('Upload functionality coming soon!');
  };

  return (
    <div style={{ maxWidth: 700, margin: '40px auto', padding: 32, background: '#fafbfc', borderRadius: 16, boxShadow: '0 4px 24px #e5e7eb' }}>
      {/* Profile Section */}
      <section style={{ marginBottom: 36, paddingBottom: 18, borderBottom: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', gap: 32 }}>
        <div style={{ width: 64, height: 64, background: '#e0e7ef', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, color: '#7b8794', fontWeight: 700 }}>
          {demoProfile.name[0]}
        </div>
        <div>
          <div style={{ fontSize: 20, fontWeight: 600, color: '#23272f', marginBottom: 4 }}>{demoProfile.name}</div>
          <div style={{ fontSize: 15, color: '#6b7280' }}>{demoProfile.email}</div>
        </div>
      </section>

      {/* Document Section */}
      <section>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <h2 style={{ color: '#23272f', fontSize: 20, margin: 0, fontWeight: 600 }}>Documents</h2>
          <button onClick={handleUpload} style={{ background: '#e5e7eb', color: '#23272f', border: 'none', borderRadius: 8, padding: '8px 20px', cursor: 'pointer', fontWeight: 500, fontSize: 15, boxShadow: '0 1px 2px #e5e7eb' }}>
            Upload Document
          </button>
        </div>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {demoDocuments.map(doc => (
            <li key={doc.id}>
              <button
                onClick={() => handleDocClick(doc.id)}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  background: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: 8,
                  padding: '14px 20px',
                  marginBottom: 10,
                  cursor: 'pointer',
                  color: '#23272f',
                  fontSize: 16,
                  fontWeight: 500,
                  transition: 'background 0.2s',
                  boxShadow: '0 1px 2px #f1f3f6',
                }}
                onMouseOver={e => e.currentTarget.style.background = '#f3f4f6'}
                onMouseOut={e => e.currentTarget.style.background = '#fff'}
              >
                {doc.name}
              </button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default Dashboard
