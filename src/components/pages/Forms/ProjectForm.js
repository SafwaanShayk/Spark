import React, { useEffect, useState } from "react";
import {
  Autocomplete,
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  FormControl,
  FormHelperText,
  Snackbar,
  Alert,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import LoadingButton from "@mui/lab/LoadingButton";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useForm, Controller } from "react-hook-form";
import {
  createProject,
  fetchCategories,
  fetchFeatures,
  fetchTechnologyStacks,
  updateProject,
} from "../../../services/api";
import { useLocation, useNavigate } from "react-router-dom";

function ProjectForm() {
  const [categories, setCategories] = useState([]);
  const [featuresList, setFeaturesList] = useState([]);
  const [techStacks, setTechStacks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { isEditing, initialValues } = location.state || {
    isEditing: false,
    initialValues: null,
  };
  const {
    handleSubmit,
    control,
    setError,
    clearErrors,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      ProjectName: "",
      Description: "",
      Cost: "",
      Category: "",
      Features: [],
      TechnologyStack: [],
      UserInterface: null,
    },
  });

  const handleCancel = () => {
    navigate("/dashboard/your-project", { replace: true });
  };

  useEffect(() => {
    const fetchData = async () => {
      setCategories(await fetchCategories());
      setFeaturesList(await fetchFeatures());
      setTechStacks(await fetchTechnologyStacks());
      const fetchedTechStacks = await fetchTechnologyStacks();
      setTechStacks(fetchedTechStacks.filter((tech) => tech !== null));
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (initialValues) {
      reset({
        ProjectName: initialValues.projectName || "",
        Description: initialValues.description || "",
        Cost: initialValues.cost || "",
        Category: initialValues.category || "",

        Features: initialValues.features
          ? initialValues.features.split(", ")
          : [],
        TechnologyStack: initialValues.technologyStack
          ? initialValues.technologyStack.split(", ")
          : [],
        UserInterface: null,
      });
    }
  }, [initialValues, reset]);

  // useEffect(() => {
  //   console.log(initialValues);
  // }, [initialValues]);

  async function handleFormSubmit(data) {
    setIsLoading(true);
    const formattedData = {
      ...data,
      Cost: parseInt(data.Cost, 10),
      Features: data.Features.join(", "),
      TechnologyStack: data.TechnologyStack.join(", "),
    };
    try {
      if (initialValues) {
        const projectUpdated = await updateProject(
          initialValues.project_Id,
          formattedData
        );
        console.log("Project updated successfully:", projectUpdated);
      } else {
        const projectCreated = await createProject(formattedData);
        console.log("Project created successfully:", projectCreated);
      }
      setOpenSnackbar(true);
    } catch (error) {
      console.error("Error creating/updating project:", error);
    }
    setIsLoading(false);
  }

  const handleImageUpload = (onChange) => (event) => {
    const file = event.target.files[0];
    if (!file) {
      setError("UserInterface", {
        type: "manual",
        message: "User Interface is required.",
      });
    } else {
      clearErrors("UserInterface");
    }
    onChange(file);
  };

  const handleAutocompleteChange = (field, onChange) => (_, value) => {
    if (Array.isArray(value) && value.length > 3) {
      setError(field, {
        type: "manual",
        message: `You can select up to 3 ${
          field === "Features" ? "features" : "technology stacks"
        } only.`,
      });
    } else {
      clearErrors(field);
      onChange(value);
    }
  };

  return (
    <Container component="main" maxWidth="md">
      <Box
        sx={{
          marginTop: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h5">
          {isEditing ? "Edit Your Project" : "Add New Project"}
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(handleFormSubmit)}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            {[
              { name: "ProjectName", label: "Project Name" },
              {
                name: "Description",
                label: "Description",
                multiline: true,
                rows: 4,
              },
              { name: "Cost", label: "Cost in $", type: "number" },
            ].map(({ name, label, ...rest }) => (
              <Grid item xs={12} key={name}>
                <Controller
                  name={name}
                  control={control}
                  defaultValue={initialValues ? initialValues[name] : ""}
                  rules={{
                    required: `${label} is required.`,
                    ...(name === "Cost" && {
                      validate: (value) =>
                        value >= 1 || "Cost must be greater than zero.",
                    }),
                  }}
                  render={({ field }) => (
                    <TextField
                      fullWidth
                      label={label}
                      error={!!errors[name]}
                      helperText={errors[name]?.message}
                      {...field}
                      {...rest}
                    />
                  )}
                />
              </Grid>
            ))}
            {[
              { name: "Category", label: "Category", options: categories },
              {
                name: "Features",
                label: "Features",
                options: featuresList,
                multiple: true,
              },
              {
                name: "TechnologyStack",
                label: "Technology Stack",
                options: techStacks,
                multiple: true,
              },
            ].map(({ name, label, options, multiple }) => (
              <Grid item xs={12} sm={6} key={name}>
                <FormControl fullWidth error={!!errors[name]}>
                  <Controller
                    name={name}
                    control={control}
                    defaultValue={
                      initialValues ? initialValues[name] : multiple ? [] : ""
                    }
                    rules={{
                      required: `${label} is required.`,
                      validate: (value) =>
                        multiple && Array.isArray(value) && value.length > 3
                          ? `You can select up to 3 ${label.toLowerCase()} only.`
                          : true,
                    }}
                    render={({ field }) => (
                      <Autocomplete
                        {...field}
                        multiple={multiple}
                        options={options}
                        freeSolo={name !== "Category"}
                        isOptionEqualToValue={(option, value) =>
                          option === value
                        }
                        onChange={handleAutocompleteChange(
                          name,
                          field.onChange
                        )}
                        value={field.value || (multiple ? [] : null)} // Adjust the default value here
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label={label}
                            error={!!errors[name]}
                            helperText={errors[name]?.message}
                          />
                        )}
                      />
                    )}
                  />
                </FormControl>
              </Grid>
            ))}
            <Grid item xs={4}>
              <FormControl fullWidth error={!!errors.UserInterface}>
                <Controller
                  name="UserInterface"
                  control={control}
                  defaultValue={
                    initialValues ? initialValues.UserInterface : null
                  }
                  rules={{ required: "User Interface is required." }}
                  render={({ field }) => (
                    <>
                      <Button
                        component="label"
                        variant="outlined"
                        tabIndex={-1}
                        startIcon={<CloudUploadIcon />}
                      >
                        Upload Image
                        <input
                          type="file"
                          hidden
                          onChange={handleImageUpload(field.onChange)}
                        />
                      </Button>
                      {field.value && (
                        <Typography component={"span"}>
                          {field.value.name}
                        </Typography>
                      )}
                    </>
                  )}
                />
                {errors.UserInterface && (
                  <FormHelperText>
                    {errors.UserInterface?.message}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} sx={{ textAlign: "center" }}>
              {isEditing ? (
                <LoadingButton
                  type="submit"
                  variant="contained"
                  color="success"
                  sx={{ mt: 3, mb: 2 }}
                  endIcon={<EditIcon />}
                  disabled={isLoading}
                  loading={isLoading}
                  onClick={handleSubmit(handleFormSubmit)}
                  loadingPosition="end"
                >
                  <span>Edit</span>
                </LoadingButton>
              ) : (
                <LoadingButton
                  type="submit"
                  variant="contained"
                  color="success"
                  sx={{ mt: 3, mb: 2 }}
                  endIcon={<AddIcon />}
                  disabled={isLoading}
                  loading={isLoading}
                  onClick={handleSubmit(handleFormSubmit)}
                  loadingPosition="end"
                >
                  <span>Add</span>
                </LoadingButton>
              )}
              <Button
                variant="contained"
                sx={{ mt: 3, mb: 2, ml: 2 }}
                onClick={handleCancel}
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        {isEditing ? (
          <Alert
            onClose={() => setOpenSnackbar(false)}
            severity="info"
            sx={{ width: "100%" }}
          >
            Project Edited successfully!
          </Alert>
        ) : (
          <Alert
            onClose={() => setOpenSnackbar(false)}
            severity="success"
            sx={{ width: "100%" }}
          >
            Project added successfully!
          </Alert>
        )}
      </Snackbar>
    </Container>
  );
}

export default ProjectForm;
