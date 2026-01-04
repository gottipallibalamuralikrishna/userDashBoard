import { Employee } from "../models/Employee";

export const printEmployee = (emp: Employee) => {
  const html = `
    <html>
      <head>
        <title>Employee Details</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            padding: 20px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
          }
          td, th {
            border: 1px solid #000;
            padding: 8px;
          }
        </style>
      </head>
      <body>
        <h2>Employee Details</h2>
        <table>
          <tr><th>Name</th><td>${emp.fullName}</td></tr>
          <tr><th>Gender</th><td>${emp.gender}</td></tr>
          <tr><th>Date of Birth</th><td>${emp.dob}</td></tr>
          <tr><th>State</th><td>${emp.state}</td></tr>
          <tr><th>Status</th><td>${emp.active ? "Active" : "Inactive"}</td></tr>
        </table>
      </body>
    </html>
  `;

  const printWindow = window.open("", "_blank");

  if (!printWindow) return;

  printWindow.document.open();
  printWindow.document.write(html);
  printWindow.document.close();

  printWindow.focus();
  printWindow.print();
  printWindow.close();
};
