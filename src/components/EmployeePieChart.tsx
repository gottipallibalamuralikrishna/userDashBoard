import { Box, Paper, Typography } from "@mui/material";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { Employee } from "../models/Employee";

interface Props {
  employees: Employee[];
}

const COLORS = ["#1b6ca8", "#2ecc71", "#f59e0b"];

const EmployeePieCharts: React.FC<Props> = ({ employees }) => {
  const hasData = employees.length > 0;

  const genderData = [
    {
      name: "Male",
      value: employees.filter((e) => e.gender === "Male").length,
    },
    {
      name: "Female",
      value: employees.filter((e) => e.gender === "Female").length,
    },
    {
      name: "Other",
      value: employees.filter((e) => e.gender === "Other").length,
    },
  ];

  const statusData = [
    {
      name: "Active",
      value: employees.filter((e) => e.active).length,
    },
    {
      name: "Inactive",
      value: employees.filter((e) => !e.active).length,
    },
  ];

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" },
        gap: 3,
      }}
    >
      <Paper sx={{ p: 2, borderRadius: 2 }}>
        <Typography fontWeight={600} mb={1}>
          Employees by Gender
        </Typography>

        <ResponsiveContainer width="100%" height={220}>
          <PieChart>
            <Pie
              data={hasData ? genderData : [{ name: "No Data", value: 1 }]}
              dataKey="value"
              nameKey="name"
              outerRadius={80}
              label={hasData}
            >
              {(hasData ? genderData : [{ name: "No Data", value: 1 }]).map(
                (_, i) => (
                  <Cell key={i} fill={hasData ? COLORS[i] : "#e5e7eb"} />
                )
              )}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>

        {!hasData && (
          <Typography
            variant="caption"
            color="text.secondary"
            align="center"
            display="block"
          >
            No employees added yet
          </Typography>
        )}
      </Paper>

      <Paper sx={{ p: 2, borderRadius: 2 }}>
        <Typography fontWeight={600} mb={1}>
          Employee Status
        </Typography>

        <ResponsiveContainer width="100%" height={220}>
          <PieChart>
            <Pie
              data={hasData ? statusData : [{ name: "No Data", value: 1 }]}
              dataKey="value"
              nameKey="name"
              outerRadius={80}
              label={hasData}
            >
              {(hasData ? statusData : [{ name: "No Data", value: 1 }]).map(
                (entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={
                      hasData
                        ? entry.name === "Active"
                          ? "#2ecc71" // green
                          : "#ef4444" // red
                        : "#e5e7eb" // grey
                    }
                  />
                )
              )}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>

        {!hasData && (
          <Typography
            variant="caption"
            color="text.secondary"
            align="center"
            display="block"
          >
            No employees added yet
          </Typography>
        )}
      </Paper>
    </Box>
  );
};

export default EmployeePieCharts;
