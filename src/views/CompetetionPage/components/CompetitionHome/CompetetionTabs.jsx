import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ClosestDeadlines from "./ClosestDeadlines";
import ProjectCompetition from "./ProjectCompetition";
import CompetitionIdea from "./CompetitionIdea";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
const CompetetionTabs = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", px: 20, pt: 5 }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab
            label="Closest deadline first"
            sx={{ textTransform: "none" }}
            {...a11yProps(0)}
          />
          <Tab
            label="Project competitions first"
            sx={{ textTransform: "none" }}
            {...a11yProps(1)}
          />
          <Tab
            label="Ideas competitions"
            sx={{ textTransform: "none" }}
            {...a11yProps(2)}
          />
        </Tabs>
      </Box>
      <ClosestDeadlines value={value} index={0}>
        Closest deadline first
      </ClosestDeadlines>
      <ProjectCompetition value={value} index={1}>
        Project competitions first
      </ProjectCompetition>
      <CompetitionIdea value={value} index={2}>
        Ideas competitions
      </CompetitionIdea>
    </Box>
  );
};

export default CompetetionTabs;
