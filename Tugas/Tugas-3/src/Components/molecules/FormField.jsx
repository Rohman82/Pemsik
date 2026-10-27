import Label from "@/Components/atoms/Label";
import Input from "@/Components/atoms/Input";

// Molecule: gabungan Label + Input (+ pesan error)
const FormField = ({ id, label, error, ...props }) => {
  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} {...props} />
      {error && <p className="text-red-600 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default FormField;
