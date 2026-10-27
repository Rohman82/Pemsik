import { useNavigate } from "react-router-dom";

import Button from "@/Components/atoms/Button";
import Link from "@/Components/atoms/Link";
import Heading from "@/Components/atoms/Heading";
import Card from "@/Components/molecules/Card";
import Form from "@/Components/organisms/Form";

import { dummyUser } from "@/Data/Dummy";

const fields = [
  { name: "email", label: "Email", type: "email", placeholder: "Masukkan email" },
  { name: "password", label: "Password", type: "password", placeholder: "Masukkan password" },
];

const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = ({ email, password }) => {
    if (email === dummyUser.email && password === dummyUser.password) {
      localStorage.setItem("user", JSON.stringify(dummyUser));
      navigate("/admin");
    } else {
      alert("Email atau password salah!");
    }
  };

  return (
    <Card className="max-w-md">
      <Heading as="h2">Login</Heading>
      <Form
        fields={fields}
        onSubmit={handleSubmit}
        actions={
          <Button type="submit" className="w-full">
            Login
          </Button>
        }
      >
        <div className="flex justify-between items-center">
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            <span className="text-sm text-gray-600">Ingat saya</span>
          </label>
          <Link href="#" className="text-sm">
            Lupa password?
          </Link>
        </div>
      </Form>
      <p className="text-sm text-center text-gray-600 mt-4">
        Belum punya akun? <Link href="#">Daftar</Link>
      </p>
    </Card>
  );
};

export default Login;
