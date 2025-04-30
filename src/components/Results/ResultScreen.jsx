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

  const laboratoryReport = {
    uuid: "c520fda9-739c-424c-a38a-f0a9c070bc6e",
    filename: "LabReportJaneSmith.pdf",
    summary:
      "Jane Smith, a 43-year-old female, presented with mild anemia indicated by a hemoglobin level of 10.2 g/dL, and mild thrombocytopenia with a platelet count of 145 x10^9/L. Additionally, her fasting blood glucose level was elevated at 130 mg/dL, suggesting impaired glucose tolerance. The laboratoryReport indicates that her white blood cell count and creatinine levels were within normal ranges. Overall, the findings suggest mild health concerns that may require monitoring and management.",
    severity: "mild",
    processed_at: "2025-04-30T15:06:55.201333",
    conditions: [
      {
        name: "Mild Anemia",
        code: "D50.9",
        coding_system: "ICD-10",
      },
      {
        name: "Mild Thrombocytopenia",
        code: "D69.6",
        coding_system: "ICD-10",
      },
      {
        name: "Impaired Glucose Tolerance",
        code: "R73.9",
        coding_system: "ICD-10",
      },
    ],
    labs: [
      {
        name: "Hemoglobin",
        value: "10.2",
        unit: "g/dL",
        interpretation: "Mild anemia",
        loinc_code: "",
      },
      {
        name: "White Blood Cell Count",
        value: "7.5",
        unit: "x10^9/L",
        interpretation: "",
        loinc_code: "",
      },
      {
        name: "Platelets",
        value: "145",
        unit: "x10^9/L",
        interpretation: "Mild thrombocytopenia",
        loinc_code: "",
      },
      {
        name: "Blood Glucose (Fasting)",
        value: "130",
        unit: "mg/dL",
        interpretation:
          "Elevated fasting glucose suggestive of impaired glucose tolerance",
        loinc_code: "",
      },
      {
        name: "Creatinine",
        value: "1.0",
        unit: "mg/dL",
        interpretation: "",
        loinc_code: "",
      },
      {
        name: "ALT (SGPT)",
        value: "55",
        unit: "U/L",
        interpretation: "",
        loinc_code: "",
      },
    ],
    procedures: [],
    medications: [],
  };

  const pathologyReport = {
    uuid: "189b85c2-e695-4577-8925-bbbef2ab794a",
    filename: "PathologyReportLauraAnderson.pdf",
    summary:
      "Laura Anderson underwent a core needle biopsy of a left breast mass, which revealed moderately differentiated invasive ductal carcinoma (Grade II). The tumor exhibits a positive status for estrogen and progesterone receptors, while being negative for HER2. No lymphovascular invasion was identified in the biopsy. The findings suggest a localized breast cancer that may respond to hormone therapy due to its receptor status.",
    severity: "moderate",
    processed_at: "2025-04-30T15:34:24.879465",
    conditions: [
      {
        name: "Invasive ductal carcinoma",
        code: "C50.912",
        coding_system: "ICD-10",
      },
    ],
    labs: [],
    procedures: [
      {
        name: "Core needle biopsy",
        cpt_code: "19100",
      },
    ],
    medications: [],
  };

  const radiologyReport = {
    uuid: "804aee43-76dd-42df-9eb4-3eb5c6bf20d4",
    filename: "RadiologyReportMarkJohnson.pdf",
    summary:
      "The MRI Brain study of Mark Johnson reveals a 6 mm T2 hyperintense lesion in the right frontal white matter, with no associated diffusion restriction or enhancement. The ventricular system appears normal, and there is no evidence of acute infarction, hemorrhage, or mass effect. The impression suggests that the T2 hyperintensity is likely due to non-specific chronic microvascular changes, with no signs of acute pathology.",
    severity: "mild",
    processed_at: "2025-04-30T15:35:12.987819",
    conditions: [
      {
        name: "T2 hyperintensity in right frontal lobe",
        code: "I67.4",
        coding_system: "ICD-10",
      },
    ],
    labs: [],
    procedures: [
      {
        name: "MRI Brain without contrast",
        cpt_code: "70551",
      },
    ],
    medications: [],
  };

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
              Filename: {laboratoryReport.filename}
            </Typography>
            <Typography variant="body2">
              Processed:{" "}
              {new Date(laboratoryReport.processed_at).toLocaleString()}
            </Typography>
            <Typography variant="body2" color="success.main">
              Status: Success
            </Typography>
            <Typography variant="body2">
              Severity: <b>{laboratoryReport.severity}</b>
            </Typography>
          </Card>

          <Card className="result-card">
            <Typography variant="subtitle2" className="result-title">
              🧠 Predicted Conditions
            </Typography>
            {laboratoryReport.conditions?.length ? (
              <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                {laboratoryReport.conditions.map((c, i) => (
                  <Chip
                    key={i}
                    label={`${c.name} (${c.code})`}
                    size="small"
                    className="result-chip"
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
          {laboratoryReport.labs?.length > 0 && (
            <Card className="result-card">
              <Typography variant="subtitle2" className="result-title">
                🔬 Lab Reports
              </Typography>
              {laboratoryReport.labs.map((lab, idx) => (
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
            <Typography variant="body2">{laboratoryReport.summary}</Typography>
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
