/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from "react";
import ProjectItems from "./ProjectItems";
import Pagination from "../../common/Pagination";
import Toast from "react-bootstrap/Toast";
import MyDataGrid from "../../common/MyDataGrid";
import "./comparison.css";
import AdvFilters from "../../common/AdvFilters";

function Comparison() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(9);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [selectedTechnology, setSelectedTechnology] = useState(null);
  const [sortBy, setSortBy] = useState(""); // Default sorting by title
  const [sortOrder, setSortOrder] = useState("asc"); // Default sorting order
  const [loading, setLoading] = useState(true); // State to track loading status
  const [selectedCards, setSelectedCards] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [activeFilter, setActiveFilter] = useState(""); // State to keep track of active filter
  const [error, setError] = useState({ hasError: false, message: "" });
  const categories = [
    ...new Set(data.projects?.map((project) => project.category)),
  ];

  useEffect(() => {
    fetchData();
  }, [currentPage, category, sortBy, sortOrder]);
  // }, [category, currentPage]); // Run effect only when apiUrl changes

  const fetchData = async () => {
    try {
      let url = "http://localhost:5298/api/projects";
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setData(data);
      setLoading(false); // Set loading state to false after data is fetched
    } catch (error) {
      console.error("Error fetching data:", error);
      setError({
        hasError: true,
        message: "Failed to load data. Please try again later.",
      });
      setLoading(false);
    }
  };

  // Sorting Logic: Modify the sorting logic to handle different data types and improve consistency
  const sortedProjects = data.projects?.sort((a, b) => {
    if (sortBy === "id" || sortBy === "cost") {
      // Numeric sorting
      return sortOrder === "asc"
        ? a[sortBy] - b[sortBy]
        : b[sortBy] - a[sortBy];
    } else {
      // String sorting
      const aValue = a[sortBy]?.toLowerCase() || "";
      const bValue = b[sortBy]?.toLowerCase() || "";
      return sortOrder === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }
  });

  // Filtering Logic: Adjust the filtering logic to prevent unintended reordering
  const filteredProjects = sortedProjects?.filter((project) => {
    const categoryFilter = category === "" || project.category === category;
    const technologyStackFilter =
      selectedTechnology === "All" ||
      project.technologyStackArray?.includes(selectedTechnology) ||
      selectedTechnology === null;

    const searchFilter =
      !search ||
      project.projectName.toLowerCase().includes(search.toLowerCase());

    return categoryFilter && technologyStackFilter && searchFilter;
  });
  // Pagination: Ensure that pagination doesn't change the order of projects being displayed
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredProjects?.slice(
    indexOfFirstPost,
    indexOfLastPost
  );

  // Define handleTechnologyFilter function to filter projects based on selected technology
  const handleTechnologyFilter = (technology) => {
    setActiveFilter(technology);
    setSelectedTechnology(technology === "All" ? null : technology);
  };

  const handleSortByChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleSortOrderChange = (event) => {
    setSortOrder(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };
  const handleCardSelect = (project) => {
    if (selectedCards.length >= 2 && !selectedCards.includes(project)) {
      setShowToast(true);
      return;
    }

    if (selectedCards.some((p) => p.id === project.id)) {
      setSelectedCards(selectedCards.filter((p) => p.id !== project.id));
    } else {
      // Find the project object from the projects array using its ID
      const selectedProject = data.projects?.find((p) => p.id === project.id);

      if (selectedProject) {
        setSelectedCards([...selectedCards, selectedProject]);
      }
    }
  };

  const handleDismissToast = () => {
    setShowToast(false);
  };
  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <main>
        <section className="py-5 text-center container">
          <div className="row py-lg-5">
            <h1 className="comp-h1">Comparison Framework</h1>
            <div className="col-lg-6 col-md-8 mx-auto">
              <p className="lead text-body-secondary">
                Empower your decision-making process with our Comparative
                Analysis Framework. Evaluate and distinguish multiple project
                concepts, identify uniqueness among other projects, and compare
                past projects with yours. Make informed decisions that set your
                projects apart and lead to success.
              </p>
            </div>
          </div>
        </section>
      </main>

      <button class="animated-button">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="arr-2"
          viewBox="0 0 24 24"
        >
          <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
        </svg>
        <span class="text">Compare Now</span>
        <span class="circle"></span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="arr-1"
          viewBox="0 0 24 24"
        >
          <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
        </svg>
      </button>

      <MyDataGrid
        selectedProjects={selectedCards}
        setSelectedProjects={setSelectedCards} // Pass the setter function
      />

      <Toast
        show={showToast}
        onClose={handleDismissToast}
        style={{
          position: "fixed",
          top: "10px",
          right: "10px",
          zIndex: 9999,
          color: "white",
        }}
        delay={2000}
        autohide
        bg="danger" // Add bg="danger" to set the background color to red
      >
        <Toast.Header>
          <strong className="me-auto">Danger</strong>
        </Toast.Header>
        <Toast.Body text="white"> Choose max 2 Projects</Toast.Body>
      </Toast>

      {loading ? ( // Render spinner if loading is true
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "100vh" }}
        >
          <div
            className="spinner-border text-success"
            role="status"
            style={{ width: "6rem", height: "6rem", borderWidth: "0.6rem" }}
          >
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <>
          <div className="row">
            <div className="col-md-8">
              <AdvFilters
                activeFilter={activeFilter}
                categories={categories}
                handleCategoryChange={handleCategoryChange}
                sortBy={sortBy}
                handleSortByChange={handleSortByChange}
                sortOrder={sortOrder}
                handleSortOrderChange={handleSortOrderChange}
                search={search}
                handleSearchChange={handleSearchChange}
                totalPosts={data.projects ? data.projects.length : 0}
                postsPerPage={postsPerPage}
                currentPage={currentPage}
                paginate={paginate}
                handleTechnologyFilter={handleTechnologyFilter}
                category={category}
              />
            </div>
            <div className="col-md-4">
              <Pagination
                postsPerPage={postsPerPage}
                totalPosts={filteredProjects.length}
                paginate={paginate}
                currentPage={currentPage}
                pagesToShow={5}
              />
            </div>
          </div>

          {error.hasError && (
            <div className="alert alert-danger" role="alert">
              {error.message}
            </div>
          )}
          <div
            className="row row-cols-1 row-cols-md-8 g-4"
            style={{ margin: "10px" }}
          >
            {currentPosts &&
              currentPosts.map((project) => (
                <ProjectItems
                  key={project.id}
                  projectName={project.projectName || "N/A"}
                  description={project.description || "N/A"}
                  imageUrl={project.userInterface}
                  project={project}
                  selected={selectedCards.some((p) => p.id === project.id)}
                  handleCardSelect={() => handleCardSelect(project)}
                />
              ))}
          </div>
          <div
            className="pagination"
            style={{ marginTop: "30px", marginLeft: "200px" }}
          >
            <div className="container text-center">
              <div className="row">
                <div className="col-6">
                  {data.projects && data.projects.length > 0 && (
                    <Pagination
                      postsPerPage={postsPerPage}
                      totalPosts={filteredProjects.length}
                      paginate={paginate}
                      currentPage={currentPage}
                      pagesToShow={15}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Comparison;
