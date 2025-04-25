import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Typography, Paper, List, ListItem } from "@mui/material";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const demoAPIDocs = [
  {
    uuid: "c6920bf2-2327-4796-aedc-da0b70f8d8e7",
    filename: "report1.txt",
    uploaded_at: "2025-04-25T13:10:53.761807",
    uploader: "anonymous",
    processed_at: null,
    status: "uploaded",
    content_type: "text/plain",
  },
  {
    uuid: "c6920bf2-2327-4796-aedc",
    filename: "report1.txt",
    uploaded_at: "2025-04-25T13:10:53.761807",
    uploader: "anonymous",
    processed_at: null,
    status: "processing",
    content_type: "text/plain"
  },
  {
    uuid: "c6920bf2-2327-4796-aedc-fenfjw",
    filename: "report1.txt",
    uploaded_at: "2025-04-25T13:10:53.761807",
    uploader: "anonymous",
    processed_at: null,
    status: "processed",
    content_type: "text/plain"
  },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/document`);
        if (response.data && response.data) {
          setDocuments(response.data);
        }
      } catch (error) {
        console.error("Error fetching result:", error);
      }
    };
    fetchData();
  }, []);

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

  // Use demoAPIDocs for display
  const docsToShow = demoAPIDocs;

  return (
    <Box sx={{ width: '90%', margin: '40px auto', p: 4, background: '#fafbfc', borderRadius: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, pb: 1, borderBottom: '1px solid #e5e7eb' }}>
        <Typography variant="h5" sx={{ color: '#23272f', m: 0, fontWeight: 600 }}>
          Documents
        </Typography>
        <Button
          onClick={handleUpload}
          sx={{
            background: '#e5e7eb',
            color: '#23272f',
            borderRadius: 1,
            p: '8px 20px',
            fontWeight: 500,
            fontSize: 15,
            boxShadow: '0 1px 2px #e5e7eb',
            textTransform: 'none',
            '&:hover': { background: '#e0e7ef' }
          }}
        >
          Upload Document
        </Button>
      </Box>
      <List sx={{ width: '100%', p: 0, m: 0 }}>
        {docsToShow.length > 0 ? (
          docsToShow.map((doc) => (
            <ListItem key={doc.uuid} disablePadding sx={{ mb: 1 }}>
              <Paper
                elevation={1}
                sx={{
                  width: '100%',
                  borderRadius: 1,
                  boxShadow: '0 1px 2px #f1f3f6',
                  border: '1px solid #e5e7eb',
                  mb: 0.5,
                  '&:hover': { background: '#f3f4f6', cursor: 'pointer' },
                  transition: 'background 0.2s',
                }}
                onClick={() => handleDocClick(doc.uuid)}
              >
                <Box sx={{ p: '14px 20px', display: 'flex', flexDirection: 'column' }}>
                  <Typography sx={{ color: '#23272f', fontSize: 16, fontWeight: 500 }}>
                    {doc.filename}
                  </Typography>
                  <Typography sx={{ color: '#6b7280', fontSize: 13 }}>
                    Status: 
                    <span style={{
                      color:
                        doc.status === "processed"
                          ? "#10b981" // green for processed
                          : doc.status === "processing"
                          ? "#f59e0b" // yellow for processing
                          : "#9ca3af", // gray for uploaded
                    }}>
                      {doc.status.charAt(0).toUpperCase() +
                        doc.status.slice(1)}
                    </span>
                  </Typography>
                  <Typography sx={{ fontSize: 13, color: "#9ca3af", marginTop: 2 }}>
                    Uploaded: {new Date(doc.uploaded_at).toLocaleString()}
                  </Typography>
                  <Typography sx={{ fontSize: 13, color: "#9ca3af", marginTop: 2 }}>
                    Type:{" "}
                    {doc.content_type.includes("pdf") ? "PDF" : "Text File"}
                  </Typography>
                </Box>
              </Paper>
            </ListItem>
          ))
        ) : (
          <Typography>No documents found.</Typography>
        )}
      </List>
    </Box>
  );
};

export default Dashboard;
