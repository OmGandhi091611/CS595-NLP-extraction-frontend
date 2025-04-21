import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const demoAPIDocs = [
	{
		"id": 1,
		"filename": "HIPAA_Awareness_for_Business_Associates_Certificate_for_Nirmal_Patel.pdf",
		"content_type": "application/pdf",
		"uploaded_at": "2025-04-21T05:54:52.453835",
		"uploader": "anonymous"
	},
	{
		"id": 2,
		"filename": "I don't love you anymore _ moving on and living your best -- Rithvik Singh -- 1, 2024 -- Penguin Random House India Private Limited -- 9780143469131 -- 0ad687b3daca3ec2c0be06eda46af5ed -- Anna’s Archive.pdf",
		"content_type": "application/pdf",
		"uploaded_at": "2025-04-21T06:00:48.166523",
		"uploader": "anonymous"
	}
];

const Dashboard = () => {
  const navigate = useNavigate();

  const [documents, setDocuments] = useState([]);

  const handleDocClick = (docId) => {
	navigate(`/results/${docId}`);
  };

  const handleUpload = async () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".pdf,.txt";
    input.onchange = async (e) => {
      const file = e.target.files[0];
      if (file) {
        try {
          const formData = new FormData();
          formData.append("file", file);

          const response = await axios.post(
            `${baseUrl}/document/upload`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );

          console.log("Upload successful:", response.data);
          alert("File uploaded successfully!");
        } catch (error) {
          console.error("Upload failed:", error);
          alert("Failed to upload file.");
        }
      }
    };
    input.click();
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const response = await axios.get(`${baseUrl}/document`);
      if (response.data && response.data.files) {
        setDocuments(response.data.files);
      }
    } catch (error) {
      console.error("Error fetching documents:", error);
    }
  };

  return (
    <div style={{ width: '90%', margin: '40px auto', padding: 32, background: '#fafbfc', borderRadius: 16, boxShadow: '0 4px 24px #e5e7eb' }}>
      {/* Profile Section */}
      {/* <section style={{ marginBottom: 36, paddingBottom: 18, borderBottom: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', gap: 32 }}>
        <div style={{ width: 64, height: 64, background: '#e0e7ef', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, color: '#7b8794', fontWeight: 700 }}>
          {demoProfile.name[0]}
        </div>
        <div>
          <div style={{ fontSize: 20, fontWeight: 600, color: '#23272f', marginBottom: 4 }}>{demoProfile.name}</div>
          <div style={{ fontSize: 15, color: '#6b7280' }}>{demoProfile.email}</div>
        </div>
      </section> */}

      {/* Document Section */}
      <section>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <h2 style={{ color: '#23272f', fontSize: 20, margin: 0, fontWeight: 600 }}>Documents</h2>
          <button onClick={handleUpload} style={{ background: '#e5e7eb', color: '#23272f', border: 'none', borderRadius: 8, padding: '8px 20px', cursor: 'pointer', fontWeight: 500, fontSize: 15, boxShadow: '0 1px 2px #e5e7eb' }}>
            Upload Document
          </button>
        </div>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {demoAPIDocs.map(doc => (
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
                {doc.filename}
              </button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default Dashboard
