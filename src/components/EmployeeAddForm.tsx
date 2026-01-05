import { useRef, useState } from "react";
import {
  Button,
  TextField,
  MenuItem,
  Switch,
  Card,
  Typography,
  Box,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import { Employee } from "../models/Employee";
import { useEmployees } from "../context/EmployeeContext";
import { INDIAN_STATES } from "../utils/indianStates";

const emptyForm = {
  fullName: "",
  gender: "" as Employee["gender"],
  dob: "",
  state: "",
  active: true,
  image: "",
};

const EmployeeAddForm = () => {
  const { addEmployee } = useEmployees();
  const nameRef = useRef<HTMLInputElement | null>(null);

  const [form, setForm] = useState(emptyForm);
  const [preview, setPreview] = useState("");
  const [fileKey, setFileKey] = useState(Date.now());

  const resetForm = () => {
    setForm(emptyForm);
    setPreview("");
    setFileKey(Date.now());

    requestAnimationFrame(() => {
      nameRef.current?.focus();
    });
  };

  const handleSubmit = () => {
    if (!form.fullName || !form.state || !form.dob) return;

    addEmployee({
      id: Date.now(),
      ...form,
    });

    resetForm();
  };

  return (
    <Card sx={{ p: 2, mb: 2 }}>
      <Typography variant="h6" mb={2}>
        Add Employee
      </Typography>

      <Box sx={{ display: "grid", gap: 2 }}>
        <TextField
          label="Full Name"
          inputRef={nameRef}
          value={form.fullName}
          onChange={(e) => setForm({ ...form, fullName: e.target.value })}
          fullWidth
          required
        />

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
        >
          <MenuItem value="Male">Male</MenuItem>
          <MenuItem value="Female">Female</MenuItem>
          <MenuItem value="Other">Other</MenuItem>
        </TextField>

        <DatePicker
          label="Date of Birth"
          value={form.dob ? dayjs(form.dob) : null}
          disableFuture
          onChange={(d: Dayjs | null) =>
            setForm({
              ...form,
              dob: d ? d.format("YYYY-MM-DD") : "",
            })
          }
          slotProps={{
            textField: { fullWidth: true, required: true },
          }}
        />

        <TextField
          select
          label="State"
          value={form.state}
          onChange={(e) => setForm({ ...form, state: e.target.value })}
          required
        >
          <MenuItem value="">
            <em>Select State</em>
          </MenuItem>
          {INDIAN_STATES.map((s) => (
            <MenuItem key={s} value={s}>
              {s}
            </MenuItem>
          ))}
        </TextField>

        <Box display="flex" alignItems="center" gap={1}>
          <Typography>Inactive</Typography>
          <Switch
            checked={form.active}
            onChange={(e) => setForm({ ...form, active: e.target.checked })}
          />
          <Typography>Active</Typography>
        </Box>

        <input
          key={fileKey}
          type="file"
          accept="image/*"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (!f) return;
            const r = new FileReader();
            r.onload = () => setPreview(r.result as string);
            r.readAsDataURL(f);
          }}
        />

        {preview && <img src={preview} width={80} />}

        <Box display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            disabled={
              !form.fullName || !form.state || !form.dob || !form.gender
            }
            onClick={handleSubmit}
          >
            Add
          </Button>
        </Box>
      </Box>
    </Card>
  );
};

export default EmployeeAddForm;
