import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

// Demo data for document content and analysis
const demoDocuments = {
  1: {
    name: 'Resume.pdf',
    content: 'This is a demo of the Resume.pdf content.\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod...'
  },
  2: {
    name: 'Project_Proposal.docx',
    content: 'This is a demo of the Project Proposal document.\nAliquam erat volutpat. Nulla facilisi. Etiam euismod...'
  },
  3: {
    name: 'Notes.txt',
    content: 'These are your notes:\n- Item 1\n- Item 2\n- Item 3\n...'
  }
};
const demoAnalysis = {
  1: 'Analysis for Resume.pdf: Detected key skills, education, and experience sections.',
  2: 'Analysis for Project_Proposal.docx: Identified objectives, methodology, and timeline.',
  3: 'Analysis for Notes.txt: Simple text notes, no advanced structures detected.'
};

const Results = () => {
  const { id } = useParams();
  const doc = demoDocuments[id] || { name: 'Unknown', content: 'No content available.' };
  const analysis = demoAnalysis[id] || 'No analysis available.';

  const [chat, setChat] = useState([
    { sender: 'system', text: 'Welcome! Ask anything about this document.' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    setChat([...chat, { sender: 'user', text: input }]);
    setInput('');
    // For demo: echo back
    setTimeout(() => {
      setChat(current => [...current, { sender: 'system', text: `You said: "${input}" (demo reply)` }]);
    }, 500);
  };

  return (
    <div style={{ maxWidth: 1000, margin: '40px auto', display: 'flex', flexDirection: 'column', gap: 32 }}>
      {/* Document Window */}
      <section style={{ background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px #ececec', padding: 24, minHeight: 180, marginBottom: 0 }}>
        <h2 style={{ fontSize: 20, color: '#23272f', marginBottom: 12 }}>{doc.name}</h2>
        <pre style={{ whiteSpace: 'pre-wrap', color: '#444', fontSize: 15, fontFamily: 'inherit' }}>{doc.content}</pre>
      </section>
      {/* Analysis Section */}
      <section style={{ background: '#f8fafc', borderRadius: 12, boxShadow: '0 2px 8px #ececec', padding: 24, minHeight: 120, marginBottom: 0 }}>
        <h3 style={{ fontSize: 18, color: '#23272f', marginBottom: 10 }}>Analysis</h3>
        <div style={{ color: '#555', fontSize: 15 }}>{analysis}</div>
      </section>
      {/* Chat Section */}
      <section style={{ background: '#f9fafb', borderRadius: 12, boxShadow: '0 2px 8px #ececec', padding: 24, minHeight: 180, display: 'flex', flexDirection: 'column', gap: 12 }}>
        <h3 style={{ fontSize: 18, color: '#23272f', marginBottom: 10 }}>Chat</h3>
        <div style={{ flex: 1, overflowY: 'auto', marginBottom: 12, maxHeight: 220 }}>
          {chat.map((msg, idx) => (
            <div key={idx} style={{
              background: msg.sender === 'user' ? '#e0e7ef' : '#f3f4f6',
              color: '#23272f',
              borderRadius: 8,
              padding: '8px 12px',
              marginBottom: 6,
              alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
              maxWidth: '90%'
            }}>
              <strong style={{ fontWeight: 500 }}>{msg.sender === 'user' ? 'You' : 'System'}:</strong> {msg.text}
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') handleSend(); }}
            placeholder="Type your message..."
            style={{ flex: 1, padding: '8px 12px', borderRadius: 8, border: '1px solid #e5e7eb', fontSize: 15 }}
          />
          <button
            onClick={handleSend}
            style={{ background: '#23272f', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 20px', fontWeight: 500, fontSize: 15, cursor: 'pointer' }}
          >Send</button>
        </div>
      </section>
    </div>
  );
};

export default Results;
