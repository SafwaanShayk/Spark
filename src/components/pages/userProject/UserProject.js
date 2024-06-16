import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActions,
  Button,
  Grid,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import {
  deleteProject,
  fetchProjectById,
  UserAuth,
} from "../../../services/api";
import ProjectForm from "../Forms/ProjectForm";
import { useNavigate } from "react-router-dom";
import CustomSnackbar from "../../../utils/CustomSnackbar"; // Import CustomSnackbar

function UserProject() {
  const [projects, setProjects] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [error, setError] = useState(null);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAndSetProjects = async () => {
      try {
        const response = await UserAuth.currentUserProject();
        setProjects(response.data);
      } catch (err) {
        console.error("Error fetching user project:", err);
      }
    };

    fetchAndSetProjects();
  }, []);

  const handleEditClick = (project) => {
    setIsEditing(true);
    navigate("/dashboard/project-form", {
      state: { isEditing: true, initialValues: project },
      replace: true,
    });
  };

  const handleDeleteClick = (projectId) => {
    console.log(projectId);
    setSelectedProjectId(projectId);
    setOpenDialog(true);
  };

  const handleDialogClose = async (confirm) => {
    setOpenDialog(false);
    try {
      if (confirm) {
        await deleteProject(selectedProjectId); // Assuming you have the project ID available
        setProjects(null); // Clear the project state or update it accordingly
        setOpenSnackbar(true);
        console.log("Project Deleted successfully");
      }
    } catch (err) {
      console.error("Error deleting project:", err);
      setError(err.message);
    }
  };

  return (
    <Container>
      {projects && projects.length > 0 ? (
        <Grid container spacing={4} justifyContent="center">
          {projects.map((project) => (
            <Grid item xs={12} sm={10} md={8} key={project.id}>
              <Card sx={{ margin: 2 }}>
                <CardMedia
                  component="img"
                  height="300"
                  image={
                    project.userInterface || "/path/to/alternate-image.jpg"
                  }
                  alt={`${project.projectName} image`}
                />
                <CardContent>
                  <Typography gutterBottom variant="h3" component="div">
                    {project.projectName}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {project.description}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" mt={2}>
                    <strong>Cost:</strong> ${project.cost}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    <strong>Category:</strong> {project.category}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    <strong>Features:</strong> {project.features}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    <strong>Technology Stack:</strong> {project.technologyStack}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="large"
                    color="primary"
                    onClick={() => handleEditClick(project)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="large"
                    color="error"
                    onClick={() => handleDeleteClick(project.project_Id)}
                  >
                    Delete
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography>You have no projects available.</Typography>
      )}
      <Dialog open={openDialog} onClose={() => handleDialogClose(false)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this project?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleDialogClose(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={() => handleDialogClose(true)} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <CustomSnackbar
        open={openSnackbar}
        message="Project deleted successfully!"
        onClose={() => setOpenSnackbar(false)}
        severity="success"
      />
      <CustomSnackbar
        open={!!error}
        message={error}
        onClose={() => setError(null)}
        severity="error"
      />
    </Container>
  );
}

export default UserProject;
