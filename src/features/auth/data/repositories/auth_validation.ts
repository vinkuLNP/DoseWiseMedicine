import { ErrorState, SignUpForm } from "../../constants/auth_constants";

export function validateSignUp(
  data: SignUpForm
): ErrorState {

  const errors: ErrorState = {};

  if (!data.name.trim()) {
    errors.name = "Name required";
  }

  if (!/\S+@\S+\.\S+/.test(data.email)) {
    errors.email = "Invalid email";
  }

  const passwordRegex =
  /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{6,}$/;

  if (!passwordRegex.test(data.password)) {
    errors.password = "Weak password";
  }

  if (data.password !== data.confirmPassword) {
    errors.confirmPassword = "Passwords mismatch";
  }

  return errors;
}