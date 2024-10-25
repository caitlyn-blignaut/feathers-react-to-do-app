import { useContext, useState } from "react";
import { AuthContext } from "../../../auth/AuthContext";

export const useRegister = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const { register } = useContext(AuthContext);

  const validateForm = () => {
    const newErrors = { email: "", password: "" };
    if (!email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Email is invalid";
    if (!password) newErrors.password = "Password is required";
    else if (password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    return newErrors;
  };

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    const formErrors = validateForm();
    if (Object.values(formErrors).filter((x) => x.length > 0).length > 0) {
      setErrors(formErrors);
    } else {
      setErrors({ email: "", password: "" });
      console.log("Attempted to create user:", { email, password });
      register(name, email, password);
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    name,
    setName,
    errors,
    handleSubmit,
  };
};
