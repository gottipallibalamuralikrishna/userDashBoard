// src/components/Filters.tsx
import { Card, TextField, MenuItem, Box } from "@mui/material";

export type GenderFilter = "All" | "Male" | "Female" | "Other";
export type StatusFilter = "All" | "Active" | "Inactive";

interface FiltersProps {
  search: string;
  gender: GenderFilter;
  status: StatusFilter;
  onSearchChange: (value: string) => void;
  onGenderChange: (value: GenderFilter) => void;
  onStatusChange: (value: StatusFilter) => void;
}

const Filters: React.FC<FiltersProps> = ({
  search,
  gender,
  status,
  onSearchChange,
  onGenderChange,
  onStatusChange,
}) => {
  return (
    <Card sx={{ p: 2, my: 2 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 2,
        }}
      >
        {/* Search */}
        <TextField
          label="Search by Name"
          fullWidth
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />

        {/* Gender */}
        <TextField
          select
          label="Gender"
          fullWidth
          value={gender}
          onChange={(e) => onGenderChange(e.target.value as GenderFilter)}
        >
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="Male">Male</MenuItem>
          <MenuItem value="Female">Female</MenuItem>
          <MenuItem value="Other">Other</MenuItem>
        </TextField>

        {/* Status */}
        <TextField
          select
          label="Status"
          fullWidth
          value={status}
          onChange={(e) => onStatusChange(e.target.value as StatusFilter)}
        >
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="Active">Active</MenuItem>
          <MenuItem value="Inactive">Inactive</MenuItem>
        </TextField>
      </Box>
    </Card>
  );
};

export default Filters;
