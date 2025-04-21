import React from "react";
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
  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Report Results
      </Typography>

      <Card variant="outlined" sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6">Uploaded File</Typography>
          <Typography>Filename: {mockResult.fileName}</Typography>
          <Typography>Uploaded At: {mockResult.uploadedAt}</Typography>
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
          <Typography>{mockResult.patientSummary}</Typography>
        </CardContent>
      </Card>

      <Divider sx={{ my: 3 }} />
      <Grid container spacing={2} justifyContent="flex-end">
        <Grid item>
          <Button variant="outlined">
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
