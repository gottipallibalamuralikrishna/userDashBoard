import { Box, Paper, Typography } from "@mui/material";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { Employee } from "../models/Employee";

interface Props {
  employees: Employee[];
}

const COLORS = ["#1b6ca8", "#2ecc71", "#f59e0b", "#ef4444", "#8b5cf6"];

const EmployeePieCharts: React.FC<Props> = ({ employees }) => {
  const genderData = ["Male", "Female", "Other"].map((g) => ({
    name: g,
    value: employees.filter((e) => e.gender === g).length,
  }));

  const statusData = [
    { name: "Active", value: employees.filter((e) => e.active).length },
    { name: "Inactive", value: employees.filter((e) => !e.active).length },
  ];

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          md: "repeat(2, 1fr)",
        },
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
              data={genderData}
              dataKey="value"
              nameKey="name"
              outerRadius={80}
              label
            >
              {genderData.map((_, i) => (
                <Cell key={i} fill={COLORS[i]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </Paper>

      <Paper sx={{ p: 2, borderRadius: 2 }}>
        <Typography fontWeight={600} mb={1}>
          Employee Status
        </Typography>

        <ResponsiveContainer width="100%" height={220}>
          <PieChart>
            <Pie
              data={statusData}
              dataKey="value"
              nameKey="name"
              outerRadius={80}
              label
            >
              <Cell fill="#2ecc71" />
              <Cell fill="#ef4444" />
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </Paper>
    </Box>
  );
};

export default EmployeePieCharts;
