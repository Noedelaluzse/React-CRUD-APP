import { useMemo } from "react";
import "./LoginPage.css";
import { useForm } from "../../hooks/useForm";
import {
  startCreatingUserWithEmailPassword,
  startGoogleSignIn,
  startLoginWithEmailPassword,
} from "../../store/auth";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { FcGoogle } from "react-icons/fc";

const formData = {
  email: "",
  password: "",
};

const registerFormData = {
  registerEmail: "",
  registerPassword: "",
  displayName: "",
};

export const LoginPage = () => {
  const { status, errorMessage } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

  // Formulario de ingreso
  const { email, password, onInputChange } = useForm<{
    email: string;
    password: string;
  }>(formData);

  // Formulario de registro
  const {
    registerEmail,
    registerPassword,
    displayName,
    onInputChange: handleInputChange,
  } = useForm<{
    registerEmail: string;
    registerPassword: string;
    displayName: string;
  }>(registerFormData);

  // Estado para el formulario de registro
  const isAuthenticating = useMemo(() => status === "checking", [status]);

  // Funcion para el ingreso
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    dispatch(startLoginWithEmailPassword(email, password));
  };

  // Funcion para registrar el usuario
  const onRegisterSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Validar el formulario

    dispatch(
      startCreatingUserWithEmailPassword({
        email: registerEmail,
        password: registerPassword,
        displayName,
      })
    );
  };

  const onGoogleSignIn = () => {
    dispatch(startGoogleSignIn());
  };

  return (
    <div className="container login-container animate__animated animate__fadeIn animate__faster">
      <div className="row">
        {/* Formulario de Ingreso */}
        <div className="col-md-6 login-form-1">
          <h3>Sign In</h3>
          <form onSubmit={onSubmit}>
            <div className="form-group mb-2">
            <label
                  htmlFor="name"
                  className="form-label fw-bolder"
                >
                  Email
                </label>
              <input
                type="text"
                className="form-control"
                placeholder="Email"
                name="email"
                value={email}
                onChange={onInputChange}
              />
            </div>
            <div className="form-group mb-2">
            <label
                  htmlFor="name"
                  className="form-label fw-bolder"
                >
                  Password
                </label>
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                name="password"
                value={password}
                onChange={onInputChange}
              />
            </div>
            <div className="d-grid mb-2 mt-3">
              <input
                disabled={isAuthenticating}
                type="submit"
                className="btnSubmit rounded"
                value="Login"
              />
            </div>
          </form>

          {/* google */}
          <hr />
          <div className="d-grid mb-2 mt-3">
            <button
              disabled={isAuthenticating}
              type="button"
              onClick={onGoogleSignIn}
              className="btnSubmit rounded d-flex align-items-center justify-content-center gap-2"
              style={{ backgroundColor: "#ffffff", color: "#000000" }}
            >
              <FcGoogle size={20} />
              Sign in with Google
            </button>
          </div>
        </div>

        {/* Formulario para registrarse */}
        <div className="col-md-6 align-items-center consultation-form">
          <h3 className="mb-0">Register</h3>
          <p className="text-white text-center mb-0 mt-2">
            Enter your email to register.
          </p>

          <form onSubmit={onRegisterSubmit}>
            <div className="row">
              <div className="mb-3">
                <label
                  htmlFor="name"
                  className="form-label fw-bolder text-white"
                >
                  Name
                </label>
                <input
                  type="name"
                  className="form-control"
                  id="displayName"
                  name="displayName"
                  required
                  placeholder="Enter your name"
                  onChange={handleInputChange}
                  value={displayName}
                />
              </div>

              <div className="mb-3">
                <label
                  htmlFor="email"
                  className="form-label fw-bolder text-white"
                >
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="registerEmail"
                  name="registerEmail"
                  required
                  placeholder="Enter your email"
                  onChange={handleInputChange}
                  value={registerEmail}
                />
              </div>

              <div className="mb-3">
                <label
                  htmlFor="password"
                  className="form-label fw-bolder text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="registerPassword"
                  name="registerPassword"
                  required
                  placeholder="Enter a password"
                  onChange={handleInputChange}
                  value={registerPassword}
                />
              </div>
            </div>

            {/* Botón pa registrarse */}
            <div className="d-grid mb-2">
              <input
                disabled={isAuthenticating}
                type="submit"
                className="btnSubmit rounded"
                value="Register"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
