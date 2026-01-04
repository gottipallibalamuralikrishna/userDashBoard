import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Box,
  Card,
  TableContainer,
  Paper,
  Tooltip,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { Employee } from "../models/Employee";
import { useEmployees } from "../context/EmployeeContext";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PrintIcon from "@mui/icons-material/Print";

interface EmployeeTableProps {
  employees: Employee[];
  onEdit: (employee: Employee) => void;
  handlePrint: (employee: Employee) => void;
  loading: boolean;
}

const EmployeeTable: React.FC<EmployeeTableProps> = ({
  employees,
  onEdit,
  handlePrint,
  loading,
}) => {
  const { deleteEmployee } = useEmployees();

  const formatDate = (date: string) => {
    const d = new Date(date);
    return d.toLocaleDateString("en-GB");
  };

  return (
    <TableContainer component={Paper} sx={{ maxHeight: 420 }}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 600 }}>Name</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Gender</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>State</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Date of Birth</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
            <TableCell sx={{ fontWeight: 600 }} align="center">
              Actions
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {loading && (
            <TableRow>
              <TableCell colSpan={6} align="center">
                <Box sx={{ py: 4 }}>
                  <CircularProgress size={32} />
                </Box>
              </TableCell>
            </TableRow>
          )}

          {!loading && employees.length === 0 && (
            <TableRow>
              <TableCell colSpan={6} align="center">
                <Card
                  elevation={0}
                  sx={{
                    p: 2,
                    backgroundColor: "#f9fafb",
                    color: "#6b7280",
                  }}
                >
                  No employees found.
                </Card>
              </TableCell>
            </TableRow>
          )}

          {!loading &&
            employees.map((emp) => (
              <TableRow
                key={emp.id}
                sx={{
                  height: 52,
                  "&:hover": {
                    backgroundColor: "#f8fafc",
                  },
                }}
              >
                <TableCell>{emp.fullName}</TableCell>
                <TableCell>{emp.gender}</TableCell>
                <TableCell>{emp.state}</TableCell>
                <TableCell>{formatDate(emp.dob)}</TableCell>
                <TableCell>{emp.active ? "Active" : "Inactive"}</TableCell>

                {/* ACTIONS */}
                <TableCell align="center">
                  <Box display="flex" justifyContent="center" gap={1}>
                    <Tooltip title="Edit">
                      <IconButton
                        size="small"
                        color="primary"
                        onClick={() => onEdit(emp)}
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Delete">
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => deleteEmployee(emp.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Print">
                      <IconButton size="small" onClick={() => handlePrint(emp)}>
                        <PrintIcon />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default EmployeeTable;
