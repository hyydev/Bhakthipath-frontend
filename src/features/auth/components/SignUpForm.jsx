import { useState } from "react";

import { Button, Input } from "../../../components/ui";
import { useRegister } from "../hooks/useRegister";

export default function SignUpForm() {
  const { register, isPending } = useRegister();

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    mobile_number: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    register(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 animate-fade-in">
      <Input
        type="text"
        name="full_name"
        placeholder="Full Name"
        data-testid="signup-fullname-input"
        value={formData.full_name}
        onChange={handleChange}
      />

      <Input
        type="email"
        name="email"
        placeholder="Email"
        data-testid="signup-email-input"
        value={formData.email}
        onChange={handleChange}
      />

      <Input
        type="text"
        name="mobile_number"
        placeholder="Mobile Number"
        data-testid="signup-mobile-input"
        value={formData.mobile_number}
        onChange={handleChange}
      />

      <Input
        type="password"
        name="password"
        placeholder="Password"
        data-testid="signup-password-input"
        value={formData.password}
        onChange={handleChange}
      />

      <Button
        type="submit"
        name="submit"
        variant="gradient"
        size="md"
        disabled={isPending}
        data-testid="signup-submit-button"
        className="w-full"
      >
        {isPending ? "Registering..." : "Create Account"}
      </Button>
    </form>
  );
}
