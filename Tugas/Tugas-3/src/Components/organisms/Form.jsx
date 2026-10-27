import { useState } from "react";
import FormField from "@/Components/molecules/FormField";

// Organism: kumpulan FormField + tombol aksi.
// fields        : [{ name, label, type, placeholder, disabled }]
// initialValues : nilai awal tiap field
// errors        : { namaField: "pesan error" }
// actions       : tombol-tombol di bagian bawah form
const Form = ({ fields, initialValues = {}, errors = {}, onSubmit, actions, children, className = "" }) => {
  const [values, setValues] = useState(() => Object.fromEntries(fields.map((f) => [f.name, initialValues[f.name] ?? ""])));

  const handleChange = (e) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(values);
  };

  return (
    <form onSubmit={handleSubmit} className={`space-y-4 ${className}`}>
      {fields.map((f) => (
        <FormField key={f.name} id={f.name} label={f.label} type={f.type} placeholder={f.placeholder} disabled={f.disabled} required value={values[f.name]} onChange={handleChange} error={errors[f.name]} />
      ))}
      {children}
      {actions}
    </form>
  );
};

export default Form;
