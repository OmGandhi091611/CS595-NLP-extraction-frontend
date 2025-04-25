import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Typography, Paper, List, ListItem } from "@mui/material";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

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

  const handleDocClick = (doc) => {
	if (doc.status === "processed") {
		navigate(`/results/${doc.uuid}`);
	} else {
		window.alert("This Doc is currently under processing. Please click another one which is processed to see the results.")
	}
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
        {documents.length > 0 ? (
          documents.map((doc) => (
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
                onClick={() => handleDocClick(doc)}
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
                          ? "#10b981"
                          : doc.status === "processing"
                          ? "#f59e0b"
                          : "#9ca3af",
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
