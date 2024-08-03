// src/components/TechTrendsCharts.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Chart } from "react-google-charts";
import {
  Container,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TableRow,
  TableCell,
  TableContainer,
  TableHead,
  Paper,
  TableBody,
  Table,
} from "@mui/material";
import styled from "@emotion/styled";
import LoadingBar from "../../utils/LoadingBar"; // Import the LoadingBar component

// Custom Styles
const StyledTable = styled(Table)(({ theme }) => ({
  minWidth: 500,
  "& thead": {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  "& th, & td": {
    padding: theme.spacing(2),
    textAlign: "left",
  },
  "& tbody tr:nth-of-type(even)": {
    backgroundColor: theme.palette.action.hover,
  },
  "& a": {
    color: theme.palette.primary.main,
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },
}));

const TechTrendsCharts = () => {
  const [data, setData] = useState([]);
  const [selectedYear, setSelectedYear] = useState(2024);

  const [loading, setLoading] = useState(true);
  //   const [loadingMarketSize, setLoadingMarketSize] = useState(true);
  //   const [loadingPublications, setLoadingPublications] = useState(true);
  //   const [loadingAdoptionRate, setLoadingAdoptionRate] = useState(true);
  //   const [loadingMarketSizeDistribution, setLoadingMarketSizeDistribution] =
  //     useState(true);
  //   const [loadingInvestmentsStartups, setLoadingInvestmentsStartups] =
  //     useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5298/api/techtrends")
      .then((response) => {
        setData(response.data);
        setLoading(false);
        // setLoadingMarketSize(false);
        // setLoadingPublications(false);
        // setLoadingAdoptionRate(false);
        // setLoadingMarketSizeDistribution(false);
        // setLoadingInvestmentsStartups(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
        // setLoadingMarketSize(false);
        // setLoadingPublications(false);
        // setLoadingAdoptionRate(false);
        // setLoadingMarketSizeDistribution(false);
        // setLoadingInvestmentsStartups(false);
      });
  }, []);

  const generateChartData = (parameter, year = null) => {
    const chartData = [
      [
        "Year",
        "Ecommerce",
        "AI/ML",
        "IoT",
        "ERP Systems",
        "Cybersecurity",
        "AR/VR",
        "Blockchain",
        "Fintechs",
      ],
    ];

    data
      .filter((item) => !year || item.year === year)
      .forEach((item) => {
        const yearIndex = chartData.findIndex((row) => row[0] === item.year);
        if (yearIndex === -1) {
          const newRow = new Array(9).fill(0);
          newRow[0] = parseInt(item.year, 10); // Ensure year is an integer
          newRow[chartData[0].indexOf(item.technology)] = item[parameter];
          chartData.push(newRow);
        } else {
          chartData[yearIndex][chartData[0].indexOf(item.technology)] =
            item[parameter];
        }
      });

    return chartData;
  };
  //   const chartData = generateChartData("publications", selectedYear);
  //   console.log(chartData);
  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  return (
    <Container>
      {loading ? (
        <LoadingBar /> // Show the loader if loading is true
      ) : (
        <>
          {/* <Typography variant="h4" gutterBottom>
           
          </Typography> */}
          <div className="thirteen">
            <h1> Technology Trends Over the Years</h1>
          </div>

          <Grid container spacing={4}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Market Size (Billion USD)
              </Typography>

              {data.length > 0 && (
                <Chart
                  chartType="LineChart"
                  data={generateChartData("marketSizeBillionUsd")}
                  width="100%"
                  height="400px"
                  options={{
                    hAxis: {
                      title: "Year",
                      format: "####",
                    },
                    vAxis: { title: "Market Size (Billion USD)" },
                    chartArea: {
                      width: "70%", // Adjust width as needed
                      height: "70%", // Adjust height as needed
                    },
                    series: {
                      0: { color: "#e2431e" },
                      1: { color: "#f1ca3a" },
                      2: { color: "#6f9654" },
                      3: { color: "#1c91c0" },
                      4: { color: "#43459d" },
                      5: { color: "#e7711b" },
                      6: { color: "#e49307" },
                      7: { color: "#b9c246" },
                    },
                  }}
                />
              )}
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Publications
              </Typography>
              <FormControl sx={{ width: "11%" }} variant="outlined">
                <InputLabel>Year</InputLabel>
                <Select
                  value={selectedYear}
                  onChange={handleYearChange}
                  label="Year"
                >
                  <MenuItem value="">
                    <em>All Years</em>
                  </MenuItem>
                  {data
                    .map((item) => item.year)
                    .filter((year, index, self) => self.indexOf(year) === index) // Unique years
                    .sort()
                    .map((year) => (
                      <MenuItem key={year} value={year}>
                        {year}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
              {data.length > 0 && (
                <Chart
                  chartType="ColumnChart"
                  data={generateChartData("publications", selectedYear)}
                  width="100%"
                  height="400px"
                  options={{
                    vAxis: { title: "Publications" },
                    hAxis: { title: "Year", format: "####" },
                    chartArea: {
                      width: "70%", // Adjust width as needed
                      height: "70%", // Adjust height as needed
                    },
                    series: {
                      0: { color: "#e2431e" },
                      1: { color: "#f1ca3a" },
                      2: { color: "#6f9654" },
                      3: { color: "#1c91c0" },
                      4: { color: "#43459d" },
                      5: { color: "#e7711b" },
                      6: { color: "#e49307" },
                      7: { color: "#b9c246" },
                    },
                  }}
                />
              )}
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Adoption Rate
              </Typography>
              {data.length > 0 && (
                <Chart
                  chartType="AreaChart"
                  data={generateChartData("adoptionRate")}
                  width="100%"
                  height="400px"
                  options={{
                    hAxis: { title: "Year", format: "####" },
                    vAxis: { title: "Adoption Rate (%)" },
                    chartArea: {
                      width: "70%", // Adjust width as needed
                      height: "70%", // Adjust height as needed
                    },
                    series: {
                      0: { color: "#e2431e" },
                      1: { color: "#f1ca3a" },
                      2: { color: "#6f9654" },
                      3: { color: "#1c91c0" },
                      4: { color: "#43459d" },
                      5: { color: "#e7711b" },
                      6: { color: "#e49307" },
                      7: { color: "#b9c246" },
                    },
                  }}
                />
              )}
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Market Size Distribution
              </Typography>
              <FormControl sx={{ width: "20%" }} variant="outlined">
                <InputLabel>Year</InputLabel>
                <Select
                  value={selectedYear}
                  onChange={handleYearChange}
                  label="Year"
                >
                  <MenuItem value="">
                    <em>All Years</em>
                  </MenuItem>
                  {data
                    .map((item) => item.year)
                    .filter((year, index, self) => self.indexOf(year) === index) // Unique years
                    .sort()
                    .map((year) => (
                      <MenuItem key={year} value={year}>
                        {year}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
              {data.length > 0 && (
                <Chart
                  chartType="PieChart"
                  data={[
                    ["Technology", "Market Size (Billion USD)"],
                    ...data
                      .filter(
                        (item) => !selectedYear || item.year === selectedYear
                      )
                      .map((item) => [
                        item.technology,
                        item.marketSizeBillionUsd,
                      ]),
                  ]}
                  width="100%"
                  height="400px"
                  options={{
                    pieHole: 0.4,
                  }}
                />
              )}
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Investments vs. Number of Startups
              </Typography>
              <FormControl sx={{ width: "30%" }} variant="outlined">
                <InputLabel>Year</InputLabel>
                <Select
                  value={selectedYear}
                  onChange={handleYearChange}
                  label="Year"
                >
                  <MenuItem value="">
                    <em>All Years</em>
                  </MenuItem>
                  {data
                    .map((item) => item.year)
                    .filter((year, index, self) => self.indexOf(year) === index) // Unique years
                    .sort()
                    .map((year) => (
                      <MenuItem key={year} value={year}>
                        {year}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
              {data.length > 0 && (
                <Chart
                  chartType="ScatterChart"
                  data={[
                    [
                      "Technology",
                      "Number of Startups",
                      "Investment (Billion USD)",
                    ],
                    ...data
                      .filter(
                        (item) => !selectedYear || item.year === selectedYear
                      )
                      .map((item) => [
                        item.technology,
                        item.numberOfStartups,
                        item.investmentBillionUsd,
                      ]),
                  ]}
                  width="100%"
                  height="400px"
                  options={{
                    hAxis: { title: "Number of Startups" },
                    vAxis: { title: "Investment (Billion USD)" },
                  }}
                />
              )}
            </Grid>
          </Grid>
          <hr />

          <div className="thirteen" style={{ margin: "85px 0 50px 0" }}>
            <h1> Data Sources and References</h1>
          </div>
          {/* <Typography variant="h5" gutterBottom sx={{ marginTop: "100px" }}>
            Data Sources and References
          </Typography> */}
          <TableContainer component={Paper}>
            <StyledTable>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <strong>Name</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Purpose</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Links</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {[
                  {
                    name: "Statista",
                    purpose:
                      "Market size and adoption rates for various technologies.",
                    link: "https://www.statista.com/statistics/379046/worldwide-retail-e-commerce-sales/",
                  },
                  {
                    name: "Gartner",
                    purpose:
                      "Reports on emerging technologies and market trends.",
                    link: "https://www.gartner.com/en/documents/5467895",
                  },
                  {
                    name: "CB Insights",
                    purpose:
                      "Data on startups, investments, and industry trends.",
                    link: "https://www.cbinsights.com/research/report/blockchain-trends-2022/",
                  },
                  {
                    name: "Google Trends",
                    purpose: "Search trend indices for different technologies.",
                    link: "https://trends.google.com",
                  },

                  {
                    name: "Forbes",
                    purpose: "IoT Trends and Projections.",
                    link: "https://www.forbes.com/sites/bernardmarr/2023/10/19/2024-iot-and-smart-device-trends-what-you-need-to-know-for-the-future/",
                  },
                  {
                    name: "Cybersecurity Ventures",
                    purpose: "Cybersecurity Market Report.",
                    link: "https://cybersecurityventures.com/cybersecurity-market-report/",
                  },
                  {
                    name: "Digi-Capital",
                    purpose: "AR/VR Investment and Growth.",
                    link: "https://venturebeat.com/business/digi-capital-over-4-1-billion-invested-in-ar-and-vr-in-2019/",
                  },
                  {
                    name: "PwC",
                    purpose: "Blockchain Market Trends.",
                    link: "https://www.pwc.de/en/digitale-transformation/blockchain.html",
                  },
                ].map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.purpose}</TableCell>
                    <TableCell>
                      <a
                        href={row.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {row.name}
                      </a>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </StyledTable>
          </TableContainer>
        </>
      )}
    </Container>
  );
};

export default TechTrendsCharts;
