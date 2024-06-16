import axios from "axios";

const projectsUrl = "http://localhost:5298/api/projects";
const userAuth = "http://localhost:5298/api/auth";
const token = localStorage.getItem("token");

async function fetchProjects(
  search,
  category,
  selectedTechnology,
  currentPage,
  postsPerPage,
  sortBy,
  sortOrder
) {
  const url = `${projectsUrl}?search=${search}&category=${category}&techStack=${selectedTechnology}&page=${currentPage}&pageSize=${postsPerPage}&sortBy=${sortBy}&sortDirection=${sortOrder}`;
  const response = await axios.get(url);
  return response.data;
}

async function fetchData(url) {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

async function fetchProjectsAll() {
  return fetchData(`${projectsUrl}/all`);
}

async function fetchProjectById(id) {
  return fetchData(`${projectsUrl}/${id}`);
}

async function fetchCategories() {
  const projects = await fetchProjectsAll();
  const categories = projects.map((project) => project.category);
  return [...new Set(categories)]; // Return unique categories
}

async function fetchFeatures() {
  const projects = await fetchProjectsAll();
  const features = projects.map((project) => project.features);
  return [...new Set(features)]; // Return unique features
}

async function fetchTechnologyStacks() {
  const projects = await fetchProjectsAll();
  let techStacks = projects.map((project) => project.technologyStack);
  // techStacks = techStacks.slice(techStacks.length / 2, techStacks.length - 1);
  // console.log(techStacks);
  return [...new Set(techStacks)]; // Return unique technology stacks from the first 20 entries
}

// async function fetchTechnologyStacks() {
//   const projects = await fetchProjectsAll();
//   const techStacks = projects.flatMap(
//     (project) => project.technologyStackArray
//   );
//   const uniqueTechStacks = [...new Set(techStacks)];

//   return uniqueTechStacks.map((tech) => [tech].slice(0, 10));
// }
async function createProject(projectData, userInterfaceFile) {
  const formData = new FormData();
  // Append all projectData fields to formData
  for (const key in projectData) {
    formData.append(key, projectData[key]);
  }
  // Append the file
  formData.append("UserInterface", userInterfaceFile);

  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(`${projectsUrl}/add`, formData, config);
  return response.data;
}

async function updateProject(projectId, projectData) {
  const formData = new FormData();
  for (const key in projectData) {
    formData.append(key, projectData[key]);
  }

  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  };
  console.log(formData);
  const response = await axios.put(
    `${projectsUrl}/update/${projectId}`,
    formData,
    config
  );
  return response.data;
}

async function deleteProject(id) {
  const response = await axios.delete(`${projectsUrl}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

const UserAuth = {
  login: (values) =>
    axios.post(`${userAuth}/login`, values, {
      headers: {
        "Content-Type": "application/json",
      },
    }),
  register: (values) =>
    axios.post(`${userAuth}/register`, values, {
      headers: {
        "Content-Type": "application/json",
      },
    }),
  currentUserProject: () =>
    axios.get(`${projectsUrl}/user-projects`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
};

export {
  fetchProjects,
  fetchProjectById,
  fetchCategories,
  fetchFeatures,
  fetchTechnologyStacks,
  createProject,
  updateProject,
  deleteProject,
  UserAuth,
};
