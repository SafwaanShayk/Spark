import React from "react";
import "./comparison.css";
function ProjectItems({
  description,
  projectName,
  imageUrl,
  selected,
  project,
  handleCardSelect,
}) {
  return (
    <>
      <div className="col-4">
        <div className="card">
          <img
            src={imageUrl}
            className="card-img-top"
            alt=""
            onError={(e) => {
              e.target.src = require("../../../images/image-not-available.png"); // Replace 'path_to_alternate_image' with the path to your alternate image
            }}
          />
          <div className="card-body">
            <h3 className="card-title">{projectName}</h3>
            <p className="card-text">
              {description.length > 100
                ? `${description.substring(0, 100)}...`
                : description}
            </p>
            <div className="row">
              <div className="col-5">
                <a href="/#" className="btn btn-primary">
                  Details <i className="bi bi-box-arrow-in-right"></i>
                </a>
              </div>
              {/* Add checkbox for selecting the card */}
              {/* <input
              type="checkbox"
              checked={selected} // Use selected prop to determine checkbox state
              onChange={() => handleCardSelect(projectId)}
            /> */}
              <div className="col-3">
                <p>Select</p>
              </div>
              <div className="col-2">
                <div className="checkbox-wrapper-31">
                  <input
                    type="checkbox"
                    checked={selected} // Use selected prop to determine checkbox state
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProjectItems;
