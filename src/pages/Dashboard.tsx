import { useState, useMemo, useEffect } from "react";
import { Typography, Container, Box, Paper, Button } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import EmployeeAddForm from "../components/EmployeeAddForm";
import Table from "../components/Table";
import EmployeeEditDialog from "../components/EmployeeEditDialog";
import Filters, { GenderFilter, StatusFilter } from "../components/Filters";
import { Employee } from "../models/Employee";
import { useEmployees } from "../context/EmployeeContext";
import { useDebounce } from "../hooks/useDebounce";
import { printEmployee } from "../utils/printEmployee";
import EmployeePieCharts from "../components/EmployeePieChart";

const Dashboard = () => {
  const { employees } = useEmployees();
  const navigate = useNavigate();

  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);

  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 400);

  const [gender, setGender] = useState<GenderFilter>("All");
  const [status, setStatus] = useState<StatusFilter>("All");

  const [loading, setLoading] = useState(false);

  const filteredEmployees = useMemo(() => {
    return employees.filter((e) => {
      return (
        e.fullName.toLowerCase().includes(debouncedSearch.toLowerCase()) &&
        (gender === "All" || e.gender === gender) &&
        (status === "All" || e.active === (status === "Active"))
      );
    });
  }, [employees, debouncedSearch, gender, status]);

  /* stop loader when debounce completes */
  useEffect(() => {
    setLoading(false);
  }, [debouncedSearch, gender, status]);

  const handleSearchChange = (value: string) => {
    setLoading(true);
    setSearch(value);
  };

  const handleGenderChange = (value: GenderFilter) => {
    setLoading(true);
    setGender(value);
  };

  const handleStatusChange = (value: StatusFilter) => {
    setLoading(true);
    setStatus(value);
  };

  const handleLogout = () => {
    localStorage.removeItem("authUser");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: `
  radial-gradient(
    circle at top right,
    #0a192f 0%,
    #112240 40%,
    #233554 100%
  )
`,
        py: 5,
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        {/* HEADER */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: 600, color: "#fff" }}>
            Dashboard
          </Typography>

          <Button
            variant="contained"
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
            sx={{
              backgroundColor: "#ef4444",
              "&:hover": {
                backgroundColor: "#dc2626",
              },
              textTransform: "none",
              borderRadius: 2,
            }}
          >
            Logout
          </Button>
        </Box>

        <EmployeePieCharts employees={employees} />

        {/* ADD EMPLOYEE */}
        <Paper
          sx={{
            p: 2,
            borderRadius: 2,
            boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
          }}
        >
          <EmployeeAddForm />
        </Paper>

        {/* FILTERS */}
        <Paper
          sx={{
            p: 2,
            borderRadius: 2,
            boxShadow: "0 8px 24px rgba(0,0,0,0.22)",
          }}
        >
          <Filters
            search={search}
            gender={gender}
            status={status}
            onSearchChange={handleSearchChange}
            onGenderChange={handleGenderChange}
            onStatusChange={handleStatusChange}
          />
        </Paper>

        {/* TABLE */}
        <Paper
          sx={{
            borderRadius: 2,
            overflow: "hidden",
            boxShadow: "0 14px 40px rgba(0,0,0,0.28)",
          }}
        >
          <Table
            employees={filteredEmployees}
            onEdit={setEditingEmployee}
            handlePrint={printEmployee}
            loading={loading}
          />
        </Paper>

        {/* EDIT MODAL */}
        <EmployeeEditDialog
          employee={editingEmployee}
          onClose={() => setEditingEmployee(null)}
        />
      </Container>
    </Box>
  );
};

export default Dashboard;
