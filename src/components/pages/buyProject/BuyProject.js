import React from "react";
import { useLocation } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  Grid,
  Box,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import CheckoutPage from "../../common/CheckoutPage";

const useStyles = makeStyles({
  card: {
    maxWidth: 1200,
    margin: "auto",
    marginTop: 20,
    padding: 20,
  },
  media: {
    height: 400,
  },
  content: {
    padding: 20,
  },
});

function BuyProject() {
  const location = useLocation();
  const selectedProject = location.state?.project;
  const classes = useStyles();

  if (!selectedProject) {
    return <div>No project details available.</div>;
  }

  return (
    <div>
      <Typography variant="h2" align="center">
        Purchase Summary
      </Typography>
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image={selectedProject.userInterface}
          title={selectedProject.projectName}
        />
        <CardContent className={classes.content}>
          <Typography gutterBottom variant="h4" component="div">
            {selectedProject.projectName}
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            {selectedProject.description}
          </Typography>
          {/* Add more project details here */}
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" color="text.secondary">
                <strong>Cost in $</strong> {selectedProject.cost || "N/A"}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" color="text.secondary">
                <strong>Features:</strong> {selectedProject.features || "N/A"}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="body2" color="text.secondary">
                <strong>Category:</strong> {selectedProject.category || "N/A"}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" color="text.secondary">
                <strong>Technology Stack:</strong>{" "}
                {selectedProject.technologyStack || "N/A"}
              </Typography>
            </Grid>
            {/* Add more fields as necessary */}
          </Grid>
        </CardContent>
        <CheckoutPage projectCheckout={selectedProject} />
      </Card>
    </div>
  );
}

export default BuyProject;
