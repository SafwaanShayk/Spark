import React, { useState, useEffect } from "react";

function MyDataGrid({ selectedProjects, setSelectedProjects }) {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // Update projects state when selectedProjects prop changes
    setProjects(selectedProjects);
  }, [selectedProjects]);

  const handleDelete = (projectId) => {
    // Filter out the project with the specified ID from the projects state
    const updatedProjects = projects.filter(
      (project) => project.project_Id !== projectId
    );

    // Update the projects state
    setProjects(updatedProjects);

    // Update the selectedProjects prop using a callback function
    setSelectedProjects(updatedProjects);
  };

  return (
    <div>
      <table
        style={{ margin: "0px 30px 50px 30px", width: "90%" }}
        className="table table-hover"
      >
        <thead className="table-light">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Project Name</th>
            <th scope="col">Description</th>
            <th scope="col">Cost</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {projects.length > 0 ? (
            projects.map((project, index) => (
              <tr key={project.project_Id}>
                <th scope="row">{index + 1}</th>
                <td>{project.projectName || "N/A"}</td>
                <td style={{ paddingRight: "20px" }}>
                  {project.description
                    ? project.description.substring(0, 60) + "..."
                    : "N/A"}
                </td>
                <td>${project.cost || "N/A"}</td>
                <td>
                  <i
                    className="bi bi-trash"
                    style={{ color: "red", cursor: "pointer" }}
                    onClick={() => handleDelete(project.project_Id)}
                  ></i>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No projects selected</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default MyDataGrid;
