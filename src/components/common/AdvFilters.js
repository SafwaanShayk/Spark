/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import Pagination from "./Pagination";
import "./advfilters.css";
function AdvFilters({
  activeFilter,
  handleTechnologyFilter,
  category,
  categories,
  handleCategoryChange,
  sortBy,
  handleSortByChange,
  sortOrder,
  handleSortOrderChange,
  search,
  handleSearchChange,
}) {
  // const [activeFilter, setActiveFilter] = useState(""); // State to keep track of active filter

  // const handleTechnologyFilter = (tech) => {
  //   setActiveFilter(tech); // Update active filter state
  //   // Perform filtering based on the selected technology
  // };
  const techStack = [
    { key: "All", value: "All" },
    { key: "Artificial Intelligence", value: "AI" },
    { key: "Mobile Development", value: "Mobile Development" },
    { key: "Web Development", value: "Web Development" },
    { key: "NLP", value: "NLP" },
    { key: "Database", value: "Database" },
    { key: "Security", value: "Security" },
    { key: "IoT Devices", value: "IoT Devices" },
  ];
  // Render options for categories
  const categoryOptions = categories.map((category, index) => (
    <option key={index} value={category}>
      {category}
    </option>
  ));
  return (
    <div className="container">
      <div className="row">
        <div className="col" style={{ marginRight: "-20px", marginTop: "6px" }}>
          <label htmlFor="categorySelect" className="form-label">
            Filter by Category:
          </label>
        </div>
        <div className="col">
          {/* Category dropdown */}
          <select
            id="categorySelect"
            className="form-select"
            value={category} // Use the category prop as value
            onChange={handleCategoryChange}
          >
            <option value="">All</option>
            {categoryOptions}
          </select>
        </div>

        <div className="col">
          <select
            className="form-select"
            value={sortBy}
            onChange={handleSortByChange}
          >
            <option value="">All</option>
            <option value="projectName">Name</option>
            <option value="cost">Cost</option>
          </select>
        </div>

        <div className="col">
          <select
            className="form-select"
            value={sortOrder}
            onChange={handleSortOrderChange}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>

        <div className="col">
          <div className="input-group">
            <input
              onChange={handleSearchChange}
              placeholder="Search"
              type="search"
              className="search-input form-control"
              value={search}
            />
            <span className="input-group-text">
              <i className="bi bi-search"></i>
            </span>
          </div>
        </div>
      </div>

      <div className="row">
        {techStack.map((tech) => (
          <div className="col-2" key={tech.value}>
            {/* Render a button/link for each unique technology */}
            <a
              href="#"
              className={`btn btn-primary btn-sm ${
                activeFilter === tech.value ? "active" : ""
              }`}
              role="button"
              data-bs-toggle="button"
              aria-pressed="true"
              onClick={() => handleTechnologyFilter(tech.value)} // Handle click for each technology
            >
              {tech.key}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdvFilters;
