import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import EmployeeForm from "../components/EmployeeForm";
import EmployeeTable from "../components/EmployeeTable";
import DashboardCards from "../components/DashboardCards";
import '../App.css';

export default function Dashboard() {
  const [employees, setEmployees] = useState([]);
  const [editing, setEditing] = useState(null);
  const [search, setSearch] = useState("");
  const [genderFilter, setGenderFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const storedEmployees =
      JSON.parse(localStorage.getItem("employees")) || [];
    setEmployees(storedEmployees);
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;

    localStorage.setItem(
      "employees",
      JSON.stringify(employees)
    );
  }, [employees, loaded]);

  const addOrUpdateEmployee = (emp) => {
    if (editing) {
      setEmployees(employees.map(e => e.id === emp.id ? emp : e));
      setEditing(null);
    } else {
      setEmployees([...employees, { ...emp, id: uuid() }]);
    }
  };

  const filteredEmployees = employees.filter(emp => {
  const matchesSearch = emp.name
    .toLowerCase()
    .includes(search.toLowerCase());

  const matchesGender =
    genderFilter ? emp.gender === genderFilter : true;

  const matchesStatus =
    statusFilter === ""
      ? true
      : emp.isActive === (statusFilter === "active");

  return matchesSearch && matchesGender && matchesStatus;
});


  const deleteEmployee = (id) => {
    if (window.confirm("Delete employee?")) {
      setEmployees(employees.filter(e => e.id !== id));
      if (editing && editing.id === id) {
      setEditing(null);
    }
    }
  };

  return (
    <>
    <div className="container">
        <DashboardCards employees={employees} />
        <EmployeeForm onSave={addOrUpdateEmployee} editing={editing} />
        <div className="flex gap-4 mb-4">
        <input
            className="border p-2 rounded"
            placeholder="Search by name"
            onChange={e => setSearch(e.target.value)}
        />

        <select
            className="border p-2 rounded"
            onChange={e => setGenderFilter(e.target.value)}
        >
            <option value="">All Genders</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
        </select>

        <select
            className="border p-2 rounded"
            onChange={e => setStatusFilter(e.target.value)}
        >
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
        </select>
    </div>

    <EmployeeTable
        employees={filteredEmployees}
        onEdit={setEditing}
        onDelete={deleteEmployee}
    />
    <button onClick={() => window.print()}>Print</button>      
    </div>
        
    </>
    
  );
}
