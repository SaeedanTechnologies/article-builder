import {
  Box,
  Menu,
  MenuItem,
  FormControlLabel,
  Typography,
  Checkbox,
  Button,
  Stack,
} from "@mui/material";
import { useState } from "react";
const SidebarContent = () => {
  const [anchorEl, setAnchorEl] = useState(true);
  return (
    <Box flex={1} sx={{ minHeight: "100%" }}>
      <Stack
        sx={{
          width: "100%",
          gap: 0.7,
        }}
      >
        <MenuItem>
          <Typography variant="h6">Refine by:</Typography>
        </MenuItem>

        <Typography variant="subtitle1" sx={{ ml: 2 }}>
          Categories
        </Typography>
        <MenuItem>
          <FormControlLabel control={<Checkbox />} label="Category 1" />
        </MenuItem>
        <MenuItem>
          <FormControlLabel control={<Checkbox />} label="Category 2" />
        </MenuItem>
        <MenuItem>
          <FormControlLabel control={<Checkbox />} label="Category 3" />
        </MenuItem>
        <MenuItem>
          <FormControlLabel control={<Checkbox />} label="Category 4" />
        </MenuItem>
        <Typography variant="subtitle1" sx={{ ml: 2 }}>
          Application supported
        </Typography>

        <MenuItem>
          <FormControlLabel control={<Checkbox />} label="App 1" />
        </MenuItem>
        <MenuItem>
          <FormControlLabel control={<Checkbox />} label="App 2" />
        </MenuItem>
        <MenuItem>
          <FormControlLabel control={<Checkbox />} label="App 3" />
        </MenuItem>
        <MenuItem>
          <FormControlLabel control={<Checkbox />} label="App 4" />
        </MenuItem>
        <Button variant="outlined" sx={{ m: 3, ml: 8 }}>
          Apply filters
        </Button>
      </Stack>
    </Box>
  );
};

export default SidebarContent;
