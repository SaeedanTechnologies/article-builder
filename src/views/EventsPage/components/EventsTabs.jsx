import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Bottoms from "./Bottom";

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
const CompetetionTabs = (props) => {
  const { children, index, ...other } = props;
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
      <Bottoms value={value} index={0}>
        Closest deadline first
      </Bottoms>
      <Bottoms value={value} index={1}>
        Project competitions first
      </Bottoms>
      <Bottoms value={value} index={2}>
        Ideas competitions
      </Bottoms>
    </Box>
  );
};

export default CompetetionTabs;
