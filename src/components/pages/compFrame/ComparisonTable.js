// import React from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
// } from "@mui/material";

// const ComparisonTable = ({ data }) => {
//   // Parse the response data
//   const parsedData = parseResponse(data);

//   return (
//     <TableContainer component={Paper}>
//       <Table>
//         <TableHead>
//           <TableRow>
//             {parsedData.headers.map((header, index) => (
//               <TableCell key={index}>{header}</TableCell>
//             ))}
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {parsedData.rows.map((row, rowIndex) => (
//             <TableRow key={rowIndex}>
//               {row.map((cell, cellIndex) => (
//                 <TableCell key={cellIndex}>{cell}</TableCell>
//               ))}
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// };

// // Function to parse the response into headers and rows
// const parseResponse = (data) => {
//   const lines = data.trim().split("\n");
//   const headers = lines[0]
//     .split("|")
//     .map((header) => header.trim())
//     .filter((header) => header);
//   const rows = lines.slice(1).map((line) =>
//     line
//       .split("|")
//       .map((cell) => cell.trim())
//       .filter((cell) => cell)
//   );

//   return { headers, rows };
// };

// export default ComparisonTable;
