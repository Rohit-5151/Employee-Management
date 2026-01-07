import { useEffect, useState, useRef } from "react";
import '../App.css';

export default function EmployeeForm({ onSave, editing }) {
  const [form, setForm] = useState({
    name: "",
    gender: "",
    dob: "",
    state: "",
    image: "",
    isActive: true
  });

  const fileRef = useRef(null);

  useEffect(() => {
  if (!editing) {
    setForm({
      name: "",
      gender: "",
      dob: "",
      state: "",
      image: "",
      isActive: true
    });
  }
}, [editing]);

  useEffect(() => {
    if (editing) setForm(editing);
  }, [editing]);

  const handleImage = (e) => {
    const file = e.target.files[0];
  if (!file) return;

  const imageUrl = URL.createObjectURL(file);

  if (form.image) {
    URL.revokeObjectURL(form.image);
  }

  setForm({ ...form, image: imageUrl });
  };

  const handleSubmit = () => {
    if (!form.name || !form.gender || !form.dob || !form.state) {
      alert("All fields required");
      return;
    }
    onSave(form);
    setForm({ name: "", gender: "", dob: "", state: "", image: "", isActive: true });
    if (fileRef.current) 
    {
        fileRef.current.value = "";
    }
  };

  return (
    <div className="form">
      <input placeholder="Full Name" value={form.name}
        onChange={e => setForm({ ...form, name: e.target.value })} />

      <select onChange={e => setForm({ ...form, gender: e.target.value })} value={form.gender}>
        <option value="">Gender</option>
        <option>Male</option>
        <option>Female</option>
        <option>Other</option>
      </select>

      <input type="date" value={form.dob}
        onChange={e => setForm({ ...form, dob: e.target.value })} />

      <select value={form.state}
        onChange={e => setForm({ ...form, state: e.target.value })}>
        <option value="">State</option>
        <option>Gujrat</option>
        <option>Maharashtra</option>
        <option>Delhi</option>
        <option>Haryana</option>
      </select>

      <input type="file" ref={fileRef} onChange={handleImage} className="file" />
      {form.image && <img src={form.image} alt="preview" width="60" />}

      <label className="checkbox">
        Active
        <input type="checkbox"
          checked={form.isActive}
          onChange={e => setForm({ ...form, isActive: e.target.checked })} />
      </label>

      <button onClick={handleSubmit}>
        {editing ? "Update" : "Add"}
      </button>
    </div>
  );
}
