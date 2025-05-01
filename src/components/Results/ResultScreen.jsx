import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Chip,
  Container,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
  Button,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./ReportScreen.css";
import sampleData from "../../assets/sampleResponse.json";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const ResultScreen = () => {
  const { uuid } = useParams();
  const navigate = useNavigate();
  const [result, setResult] = useState();

  useEffect(() => {
    const found = sampleData.find((item) => item.uuid === uuid);
    setResult(found);
  }, [uuid]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/document/result`, {
          params: { uuid },
        });
        setResult(response.data);
      } catch (error) {
        console.error("Error fetching result:", error);
      }
    };
    fetchData();
  }, [uuid]);

  const handleFileUpload = async () => {
    navigate("/dashboard");
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
              headers: { "Content-Type": "multipart/form-data" },
            }
          );
          alert("File uploaded successfully!");
        } catch (error) {
          alert("Failed to upload file.");
        }
      }
    };
    input.click();
  };

  if (!result) return null;

  const formatFilename = (filename) => {
    if (!filename) return "";
    const nameWithoutExtension = filename.replace(/\.[^/.]+$/, "");
    const parts = nameWithoutExtension.match(/[A-Z]?[a-z]+|[A-Z]+(?![a-z])/g);
    if (!parts || parts.length < 2) return filename;

    const extension = filename.split(".").pop();
    const formatted =
      parts.slice(0, -2).join(" ") +
      " - " +
      parts.slice(-2).join(" ") +
      `.${extension}`;
    return formatted;
  };

  console.log(result);

  return (
    <Container maxWidth="xl" className="results-container">
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          fontWeight: 700,
          color: "#004d40",
          mb: 3,
        }}
      >
        🧾 Report Results
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Card className="result-card">
            <Typography variant="subtitle2" className="result-title">
              📁 Uploaded File
            </Typography>
            <Typography variant="body2">
              Filename: {formatFilename(result.filename)}
            </Typography>
            <Typography variant="body2">
              Processed: {new Date(result.processed_at).toLocaleString()}
            </Typography>
            <Typography variant="body2">
              Status: <span style={{ color: "#2e7d32" }}>Success</span>
            </Typography>
            <Typography variant="body2">
              Severity:{" "}
              <b>
                {result.severity?.charAt(0).toUpperCase() +
                  result.severity?.slice(1)}
              </b>
            </Typography>
          </Card>

          <Card className="result-card">
            <Typography variant="subtitle2" className="result-title">
              🧠 Predicted Conditions
            </Typography>
            {result.conditions?.length ? (
              <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                {result.conditions.map((c, i) => (
                  <Chip
				  key={i}
				  label={
					<Box sx={{ textAlign: "center", lineHeight: 1.3 }}>
					  <div style={{ fontWeight: 600, fontSize: "0.8rem" }}>{c.name}</div>
					  <div style={{ fontSize: "0.7rem", color: "#555" }}>{c.code}</div>
					</Box>
				  }
				  size="medium"
				  className="result-chip"
				  sx={{
					height: "auto",
					paddingTop: "6px",
					paddingBottom: "6px",
					paddingX: "8px",
				  }}
				/>
                ))}
              </Box>
            ) : (
              <Typography variant="body2" color="text.secondary">
                No conditions
              </Typography>
            )}
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          {result.labs?.length > 0 && (
            <Card className="result-card">
              <Typography variant="subtitle2" className="result-title">
                🔬 Lab Reports
              </Typography>
              {result.labs.map((lab, idx) => (
                <Typography variant="body2" key={idx} sx={{ mb: 0.75 }}>
                  <b>{lab.name}</b>: {lab.value} {lab.unit}
                  {lab.interpretation && (
                    <div style={{ color: "#666", fontSize: "0.8rem" }}>
                      {lab.interpretation}
                    </div>
                  )}
                </Typography>
              ))}
            </Card>
          )}
        </Grid>

        <Grid item xs={12}>
          <Card className="result-card">
            <Typography variant="subtitle2" className="result-title">
              📌 Patient Summary
            </Typography>
            <Typography variant="body2">{result.summary}</Typography>
          </Card>
        </Grid>
      </Grid>

      <Divider sx={{ my: 2 }} />
      <Box display="flex" justifyContent="flex-end" gap={2}>
        <Button variant="outlined" onClick={handleFileUpload}>
          Upload New
        </Button>
        <Button variant="contained">Ask Medical Question</Button>
      </Box>
    </Container>
  );
};

export default ResultScreen;
