import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Button,
  Divider,
  Grid,
} from "@mui/material";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const mockResult = {
  fileName: "Lab_Report_2025.pdf",
  uploadedAt: "April 20, 2025",
  extractedElements: [
    { label: "Hemoglobin", value: "10.2 g/dL", interpretation: "Low" },
    { label: "WBC Count", value: "7.5 x10^9/L", interpretation: "Normal" },
    { label: "Platelets", value: "145 x10^9/L", interpretation: "Normal" },
  ],
  predictedConditions: [
    { condition: "Anemia", confidence: 0.88 },
    { condition: "Leukopenia", confidence: 0.43 },
  ],
  patientSummary:
    "Based on the uploaded report, the hemoglobin level is lower than the normal range, which may indicate a mild form of anemia. No immediate signs of infection or abnormal white cell counts were detected.",
};

const ResultScreen = () => {
	const { uuid } = useParams();
	const navigate = useNavigate();

	const [result, setResult] = useState();

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
	} 

  return (
    <Container maxWidth="xl" sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Report Results
      </Typography>

      <Card variant="outlined" sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6">Uploaded File</Typography>
          <Typography>Filename: {result?.filename}</Typography>
          <Typography>Processed At: {new Date(result?.processed_at).toLocaleString()}</Typography>
          <Typography color="success.main">Status: Processed Successfully</Typography>
        </CardContent>
      </Card>

      <Card variant="outlined" sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6">🔬 Extracted Diagnostic Elements</Typography>
          <List>
            {mockResult.extractedElements.map((item, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={`${item.label}: ${item.value}`}
                  secondary={`Interpretation: ${item.interpretation}`}
                />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>

      <Card variant="outlined" sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6">🧠 Predicted Medical Conditions</Typography>
          <List>
            {mockResult.predictedConditions.map((cond, idx) => (
              <ListItem key={idx}>
                <ListItemText
                  primary={cond.condition}
                  secondary={`Confidence: ${(cond.confidence * 100).toFixed(1)}%`}
                />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>

      <Card variant="outlined" sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6">🗣️ Summary for Patients</Typography>
          <Typography>{result?.summary}</Typography>
        </CardContent>
      </Card>

      <Divider sx={{ my: 3 }} />
      <Grid container spacing={2} justifyContent="flex-end">
        <Grid item>
          <Button variant="outlined" onClick={() => {handleFileUpload()}}>
            Upload New Report
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" color="primary">
            Ask a Medical Question
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ResultScreen;
