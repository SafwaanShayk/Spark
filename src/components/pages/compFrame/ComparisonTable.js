// import React, { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
// } from "@mui/material";

// const ComparisonTable = () => {
//   const location = useLocation();
//   const [comparisonResultObject, setcomparisonResultObject] = useState(null);
//   useEffect(() => {
//     if (location.state && location.state.comparisonResult) {
//       const { comparisonResult } = location.state;
//       // console.log("comparisonResult", comparisonResult);

//       // Set the comparisonResultObject state
//       setcomparisonResultObject(comparisonResult);
//     }
//   }, [location, setcomparisonResultObject]); // Include setcomparisonResultObject in dependencies

//   if (!location.state) {
//     return (
//       <div>No comparison data available. Please go back and try again.</div>
//     );
//   }

//   // console.log(comparisonResultObject);
//   // Ensure comparisonResultObject is not null before accessing its properties
//   const Project1 = comparisonResultObject
//     ? comparisonResultObject["Project 1"]
//     : null;
//   const Project2 = comparisonResultObject
//     ? comparisonResultObject["Project 2"]
//     : null;
//   const Project3 = comparisonResultObject
//     ? comparisonResultObject["Project 3"]
//     : null;
//   const RecommendedProject = comparisonResultObject
//     ? comparisonResultObject["Recommended Project"]
//     : null;

//   console.log("comparisonResult", Project1);

//   //Check if the destructuring is successful
//   if (!Project1 || !Project2 || !Project3 || !RecommendedProject) {
//     console.error("Project data is incomplete or missing.");
//     return <div>Project data is incomplete or missing.</div>;
//   }

//   return (
//     <TableContainer component={Paper}>
//       <Table sx={{ minWidth: 650 }} aria-label="projects table">
//         <TableHead>
//           <TableRow>
//             <TableCell>Project</TableCell>
//             <TableCell>Description</TableCell>
//             <TableCell>Features</TableCell>
//             <TableCell>Cost</TableCell>
//             <TableCell>Pros</TableCell>
//             <TableCell>Cons</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           <TableRow key="Project1">
//             <TableCell>Project 1</TableCell>
//             <TableCell>{Project1.Description}</TableCell>
//             <TableCell>
//               {typeof Project1.Features === "object"
//                 ? Object.entries(Project1.Features).map(([feature, value]) => (
//                     <div key={feature}>
//                       {feature}: {value}
//                     </div>
//                   ))
//                 : Project1.Features}
//             </TableCell>
//             <TableCell>{Project1.Cost}</TableCell>
//             <TableCell>{Project1.Pros}</TableCell>
//             <TableCell>{Project1.Cons}</TableCell>
//           </TableRow>
//           <TableRow key="Project2">
//             <TableCell>Project 2</TableCell>
//             <TableCell>{Project2.Description}</TableCell>
//             <TableCell>
//               {typeof Project2.Features === "object"
//                 ? Object.entries(Project2.Features).map(([feature, value]) => (
//                     <div key={feature}>
//                       {feature}: {value}
//                     </div>
//                   ))
//                 : Project2.Features}
//             </TableCell>
//             <TableCell>{Project2.Cost}</TableCell>
//             <TableCell>{Project2.Pros}</TableCell>
//             <TableCell>{Project2.Cons}</TableCell>
//           </TableRow>
//           <TableRow key="Project3">
//             <TableCell>Project 3</TableCell>
//             <TableCell>{Project3.Description}</TableCell>
//             <TableCell>
//               {typeof Project3.Features === "object"
//                 ? Object.entries(Project3.Features).map(([feature, value]) => (
//                     <div key={feature}>
//                       {feature}: {value}
//                     </div>
//                   ))
//                 : Project3.Features}
//             </TableCell>
//             <TableCell>{Project3.Cost}</TableCell>
//             <TableCell>{Project3.Pros}</TableCell>
//             <TableCell>{Project3.Cons}</TableCell>
//           </TableRow>
//         </TableBody>
//       </Table>
//       <div style={{ padding: "16px" }}>
//         <h3>Recommended Project: {RecommendedProject}</h3>
//         <p>{comparisonResultObject[RecommendedProject]?.Description}</p>
//       </div>
//     </TableContainer>
//   );
// };

// export default ComparisonTable;

import React, { useEffect, useState } from "react";
import { Paper, Typography } from "@mui/material";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { styled } from "@mui/material/styles";
import { useLocation } from "react-router-dom";
import rehypeRaw from "rehype-raw";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.default,
  borderRadius: "0px",
}));

const StyledTableContainer = styled("div")(({ theme }) => ({
  "& table": {
    width: "100%",
    borderCollapse: "collapse",
    margin: theme.spacing(2, 0),
    borderRadius: "8px",
    overflow: "hidden",
  },
  "& th, & td": {
    border: `1px solid ${theme.palette.divider}`,
    padding: theme.spacing(1),
    textAlign: "left",
  },
  "& th": {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    fontWeight: "bold",
  },
  "& tr:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "& tr:nth-of-type(even)": {
    backgroundColor: theme.palette.background.default,
  },
}));

const ComparisonTable = () => {
  // const location = useLocation();
  const [comparisonResult, setComparisonResult] = useState("");

  // useEffect(() => {
  //   if (location.state && location.state.comparisonResult) {
  //     const { comparisonResult } = location.state;
  //     setComparisonResult(comparisonResult);
  //   }
  // }, [location]);
  useEffect(() => {
    const storedResult = localStorage.getItem("comparisonResult");
    if (storedResult) {
      setComparisonResult(JSON.parse(storedResult));
    }
  }, []);

  if (!comparisonResult) {
    return (
      <div>No comparison data available. Please go back and try again.</div>
    );
  }

  return (
    <>
     
      <main>
        <section className="text-center container">
          <div className="row">
            <h1 className="comp-h1">Comparative Analysis</h1>
          </div>
        </section>
      </main>
      {/* <Typography level="h3" gutterBottom>
        Comparative Analysis Table
      </Typography> */}
      <StyledPaper>
        <StyledTableContainer>
          <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
            {comparisonResult}
          </Markdown>
        </StyledTableContainer>
      </StyledPaper>
    </>
  );
};

export default ComparisonTable;
