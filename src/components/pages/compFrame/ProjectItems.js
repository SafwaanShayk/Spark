import React, { useEffect } from "react";
import "./comparison.css";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import { useNavigate } from "react-router-dom";
function ProjectItems({
  description,
  projectName,
  imageUrl,
  selected,
  project,
  handleCardSelect,
  showSelectButton = false,
  showEditButton = false,
  showDeleteButton = false,
}) {
  const navigate = useNavigate();
  const handleBuyProject = () => {
    navigate("/dashboard/buy-project", {
      state: { project }, // Pass the selected project as state
      // Replace the current entry in the history stack
    });
  };

  // useEffect(() => {
  //   navigate("/dashboard/buy-project", { replace: true });
  // }, [navigate]);

  return (
    <div className="col-4">
      <div className="card">
        <img
          src={imageUrl}
          className="card-img-top"
          alt=""
          onError={(e) => {
            e.target.src = require("../../../images/image-not-available.png"); // Replace with the path to your alternate image
          }}
        />
        <div className="card-body">
          <h3 className="card-title">{projectName}</h3>
          <p className="card-text">
            {description.length > 100
              ? `${description.substring(0, 100)}...`
              : description}
          </p>
          <div className="d-flex align-items-center justify-content-between">
            <button className="btn btn-primary" onClick={handleBuyProject}>
              Buy
              <LocalMallIcon
                style={{ fontSize: "1.2rem", marginBottom: "0.2rem" }}
              />
            </button>

            {showSelectButton && (
              <div className="d-flex align-items-center">
                <p className="mb-0 me-2">Select</p>
                <div className="checkbox-wrapper-31">
                  <input
                    type="checkbox"
                    checked={selected}
                    onChange={() => handleCardSelect(project)}
                  />
                  <svg viewBox="0 0 35.6 35.6">
                    <circle
                      className="background"
                      cx="17.8"
                      cy="17.8"
                      r="17.8"
                    ></circle>
                    <circle
                      className="stroke"
                      cx="17.8"
                      cy="17.8"
                      r="14.37"
                    ></circle>
                    <polyline
                      className="check"
                      points="11.78 18.12 15.55 22.23 25.17 12.87"
                    ></polyline>
                  </svg>
                </div>
              </div>
            )}
            {showEditButton && (
              <button className="btn btn-warning ms-2">Edit</button>
            )}
            {showDeleteButton && (
              <button className="btn btn-danger ms-2">Delete</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectItems;
