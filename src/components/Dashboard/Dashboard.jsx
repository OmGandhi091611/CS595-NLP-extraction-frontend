import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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

  console.log(documents);

  return (
    <div
      style={{
        width: "90%",
        margin: "40px auto",
        padding: 32,
        background: "#fafbfc",
        borderRadius: 16,
        boxShadow: "0 4px 24px #e5e7eb",
      }}
    >
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
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 14,
          }}
        >
          <h2
            style={{
              color: "#23272f",
              fontSize: 20,
              margin: 0,
              fontWeight: 600,
            }}
          >
            Documents
          </h2>
          <button
            onClick={handleUpload}
            style={{
              background: "#e5e7eb",
              color: "#23272f",
              border: "none",
              borderRadius: 8,
              padding: "8px 20px",
              cursor: "pointer",
              fontWeight: 500,
              fontSize: 15,
              boxShadow: "0 1px 2px #e5e7eb",
            }}
          >
            Upload Document
          </button>
        </div>
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {documents.length > 0 ? (
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {documents.map((doc) => (
                <li key={doc.uuid}>
                  <button
                    onClick={() => handleDocClick(doc.uuid)}
                    style={{
                      width: "100%",
                      textAlign: "left",
                      background: "#fff",
                      border: "1px solid #e5e7eb",
                      borderRadius: 8,
                      padding: "14px 20px",
                      marginBottom: 10,
                      cursor: "pointer",
                      color: "#23272f",
                      fontSize: 16,
                      fontWeight: 500,
                      transition: "background 0.2s",
                      boxShadow: "0 1px 2px #f1f3f6",
                    }}
                    onMouseOver={(e) =>
                      (e.currentTarget.style.background = "#f3f4f6")
                    }
                    onMouseOut={(e) =>
                      (e.currentTarget.style.background = "#fff")
                    }
                  >
                    <div style={{ fontWeight: 600 }}>{doc.filename}</div>
                    <div
                      style={{ fontSize: 14, color: "#6b7280", marginTop: 6 }}
                    >
                      Status:{" "}
                      <span
                        style={{
                          color:
                            doc.status === "processed"
                              ? "#10b981" // green for processed
                              : doc.status === "processing"
                              ? "#f59e0b" // yellow for processing
                              : "#9ca3af", // gray for uploaded
                        }}
                      >
                        {doc.status.charAt(0).toUpperCase() +
                          doc.status.slice(1)}
                      </span>
                    </div>
                    <div
                      style={{ fontSize: 13, color: "#9ca3af", marginTop: 2 }}
                    >
                      Uploaded: {new Date(doc.uploaded_at).toLocaleString()}
                    </div>
                    <div
                      style={{ fontSize: 13, color: "#9ca3af", marginTop: 2 }}
                    >
                      Type:{" "}
                      {doc.content_type.includes("pdf") ? "PDF" : "Text File"}
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p style={{ color: "#6b7280", fontSize: 16, marginTop: 20 }}>
              No documents have been uploaded yet.
            </p>
          )}
        </ul>
      </section>
    </div>
  );
};

export default Dashboard;
