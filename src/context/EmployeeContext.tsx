import React, { createContext, useContext, useEffect, useState } from "react";
import { Employee } from "../models/Employee";

interface EmployeeContextType {
  employees: Employee[];
  addEmployee: (e: Employee) => void;
  updateEmployee: (e: Employee) => void;
  deleteEmployee: (id: number) => void;
}

const EmployeeContext = createContext<EmployeeContextType | null>(null);

export const EmployeeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    const data = localStorage.getItem("employees");
    if (data) setEmployees(JSON.parse(data));
  }, []);

  useEffect(() => {
    localStorage.setItem("employees", JSON.stringify(employees));
  }, [employees]);

  const addEmployee = (e: Employee) => setEmployees((prev) => [...prev, e]);
  const updateEmployee = (e: Employee) =>
    setEmployees(employees.map((emp) => (emp.id === e.id ? e : emp)));
  const deleteEmployee = (id: number) =>
    setEmployees(employees.filter((e) => e.id !== id));

  return (
    <EmployeeContext.Provider
      value={{ employees, addEmployee, updateEmployee, deleteEmployee }}
    >
      {children}
    </EmployeeContext.Provider>
  );
};

export const useEmployees = () => useContext(EmployeeContext)!;
