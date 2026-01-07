import '../App.css';

export default function DashboardCards({ employees }) {
  const total = employees.length;
  const active = employees.filter(e => e.isActive).length;
  const inactive = total - active;

  return (
    <>
    <h1 className='heading'>Employee Management System</h1>
    <div className="cards">
      <div>Total: {total}</div>
      <div>Active: {active}</div>
      <div>Inactive: {inactive}</div>
    </div>
    </>
    
  );
}
