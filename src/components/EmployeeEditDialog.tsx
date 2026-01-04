import { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Switch,
  Typography,
  Box,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import { Employee } from "../models/Employee";
import { useEmployees } from "../context/EmployeeContext";
import { INDIAN_STATES } from "../utils/indianStates";

interface EmployeeEditDialogProps {
  employee: Employee | null;
  onClose: () => void;
}

const EmployeeEditDialog: React.FC<EmployeeEditDialogProps> = ({
  employee,
  onClose,
}) => {
  const { updateEmployee } = useEmployees();

  const [form, setForm] = useState<Employee | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [fileKey, setFileKey] = useState<number>(Date.now());

  /* Populate form when dialog opens */
  useEffect(() => {
    if (employee) {
      setForm({ ...employee });
      setPreview(employee.image ?? "");
      setFileKey(Date.now());
    }
  }, [employee]);

  const handleUpdate = () => {
    if (!form || !form.fullName || !form.state || !form.dob) return;

    updateEmployee({
      ...form,
      image: preview || undefined,
    });

    onClose();
  };

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  if (!form) return null;

  return (
    <Dialog
      open={Boolean(employee)}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      keepMounted
      disableRestoreFocus
    >
      <DialogTitle>Edit Employee</DialogTitle>

      <DialogContent dividers>
        <Box sx={{ display: "grid", gap: 2, mt: 1 }}>
          {/* Full Name */}
          <TextField
            label="Full Name"
            value={form.fullName}
            onChange={(e) => setForm({ ...form, fullName: e.target.value })}
            fullWidth
            required
            autoFocus
          />

          {/* Gender */}
          <TextField
            select
            label="Gender"
            value={form.gender}
            onChange={(e) =>
              setForm({
                ...form,
                gender: e.target.value as Employee["gender"],
              })
            }
            fullWidth
          >
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </TextField>

          {/* Date of Birth */}
          <DatePicker
            label="Date of Birth"
            value={form.dob ? dayjs(form.dob) : null}
            onChange={(newValue: Dayjs | null) =>
              setForm({
                ...form,
                dob: newValue ? newValue.format("YYYY-MM-DD") : "",
              })
            }
            disableFuture
            slotProps={{
              textField: {
                fullWidth: true,
                required: true,
              },
            }}
          />

          {/* State */}
          <TextField
            select
            label="State"
            value={form.state}
            onChange={(e) => setForm({ ...form, state: e.target.value })}
            fullWidth
            required
          >
            <MenuItem value="">
              <em>Select State</em>
            </MenuItem>
            {INDIAN_STATES.map((state) => (
              <MenuItem key={state} value={state}>
                {state}
              </MenuItem>
            ))}
          </TextField>

          {/* Active */}
          <Box display="flex" alignItems="center" gap={1}>
            <Typography>Inactive</Typography>
            <Switch
              checked={form.active}
              onChange={(e) =>
                setForm({
                  ...form,
                  active: e.target.checked,
                })
              }
            />
            <Typography>Active</Typography>
          </Box>

          {/* Image Upload */}
          <input
            key={fileKey}
            type="file"
            accept="image/*"
            onChange={handleImage}
          />

          {preview && (
            <img
              src={preview}
              alt="Preview"
              width={80}
              style={{ marginTop: 8 }}
            />
          )}
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          variant="contained"
          disabled={!form.fullName || !form.state || !form.dob || !form.gender}
          onClick={handleUpdate}
        >
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EmployeeEditDialog;
