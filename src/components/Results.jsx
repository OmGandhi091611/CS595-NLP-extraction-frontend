import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Paper, Button, TextField } from '@mui/material';

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
    <Box sx={{ maxWidth: 1000, margin: '40px auto', display: 'flex', flexDirection: 'column', gap: 4 }}>
      {/* Document Window */}
      <Paper elevation={2} sx={{ borderRadius: 3, boxShadow: '0 2px 8px #ececec', p: 3, minHeight: 180, mb: 0 }}>
        <Typography variant="h6" sx={{ fontSize: 20, color: '#23272f', mb: 1 }}>{doc.name}</Typography>
        <Typography component="pre" sx={{ whiteSpace: 'pre-wrap', color: '#444', fontSize: 15, fontFamily: 'inherit' }}>{doc.content}</Typography>
      </Paper>
      {/* Analysis Section */}
      <Paper elevation={1} sx={{ background: '#f8fafc', borderRadius: 3, boxShadow: '0 2px 8px #ececec', p: 3, minHeight: 120, mb: 0 }}>
        <Typography variant="subtitle1" sx={{ fontSize: 18, color: '#23272f', mb: 1 }}>Analysis</Typography>
        <Typography sx={{ color: '#555', fontSize: 15 }}>{analysis}</Typography>
      </Paper>
      {/* Chat Section */}
      <Paper elevation={0} sx={{ background: '#f9fafb', borderRadius: 3, boxShadow: '0 2px 8px #ececec', p: 3, minHeight: 180, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        <Typography variant="subtitle1" sx={{ fontSize: 18, color: '#23272f', mb: 1 }}>Chat</Typography>
        <Box sx={{ flex: 1, overflowY: 'auto', mb: 1.5, maxHeight: 220 }}>
          {chat.map((msg, idx) => (
            <Box key={idx} sx={{
              background: msg.sender === 'user' ? '#e0e7ef' : '#f3f4f6',
              color: '#23272f',
              borderRadius: 2,
              p: '8px 12px',
              mb: 0.75,
              alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
              maxWidth: '90%'
            }}>
              <strong style={{ fontWeight: 500 }}>{msg.sender === 'user' ? 'You' : 'System'}:</strong> {msg.text}
            </Box>
          ))}
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <TextField
            variant="outlined"
            size="small"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') handleSend(); }}
            placeholder="Type your message..."
            sx={{ flex: 1, borderRadius: 2, background: '#fff' }}
            InputProps={{ sx: { borderRadius: 2, fontSize: 15 } }}
          />
          <Button
            onClick={handleSend}
            variant="contained"
            sx={{ background: '#23272f', color: '#fff', borderRadius: 2, p: '8px 20px', fontWeight: 500, fontSize: 15, textTransform: 'none', boxShadow: 'none', '&:hover': { background: '#111827' } }}
          >Send</Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default Results;
