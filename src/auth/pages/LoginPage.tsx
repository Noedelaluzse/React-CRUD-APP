import { useMemo } from "react";
import "./LoginPage.css";
import { useForm } from "../../hooks/useForm";
import { checkingAuthentication, startCreatingUserWithEmailPassword, startGoogleSignIn } from "../../store/auth";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

export const LoginPage = () => {


  const { status } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

  const { email, password, onInputChange } = useForm<{
    email: string;
    password: string;
  }>({
    email: "noedelaluz06@gmail.com",
    password: "123456",
  });

  const { registerEmail, registerPassword, displayName, onInputChange: handleInputChange } = useForm<{
    registerEmail: string;
    registerPassword: string;
    displayName: string; 
  }>({
    registerEmail: "",
    registerPassword: "",
    displayName: ""
  });

  const isAuthenticating = useMemo(() => status === 'checking', [status]);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    console.log({
      email,
      password
    });

    dispatch(checkingAuthentication(email, password));
  };

  const onRegisterSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Validar el formulario


    // Aquí puedes agregar la lógica para registrar al usuario

    dispatch(startCreatingUserWithEmailPassword({
      email: registerEmail,
      password: registerPassword,
      displayName
    }));
  };

  const onGoogleSignIn = () => {
    dispatch(startGoogleSignIn());
  }

  return (
    <div className="container login-container">
      <div className="row">
        {/* Formulario de Ingreso */}
        <div className="col-md-6 login-form-1">
          <h3>Ingreso</h3>
          <form onSubmit={onSubmit}>
            <div className="form-group mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Correo"
                name="email"
                value={email}
                onChange={onInputChange}
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
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
                      <div className="d-grid mb-2 mt-3">
              <input
                disabled={isAuthenticating}
                type="submit"
                className="btnSubmit rounded"
                value="Google"
                onClick={onGoogleSignIn}
              />
            </div>
        </div>

        {/* Formulario para registrarse */}
        <div className="col-md-6 align-items-center consultation-form">
          <h3 className="mb-0">Registrarse</h3>
          <p className="text-white text-center mb-0 mt-2">
            Ingresa tu correo para registrarte.
          </p>

          <form onSubmit={onRegisterSubmit}>
            <div className="row">
              <div className="mb-3">
                <label
                  htmlFor="name"
                  className="form-label fw-bolder text-white"
                >
                  Nombre
                </label>
                <input
                  type="name"
                  className="form-control"
                  id="displayName"
                  name="displayName"
                  required
                  placeholder="Ingresa tu nombre"
                  onChange={handleInputChange}
                  value={displayName}
                />
              </div>

              <div className="mb-3">
                <label
                  htmlFor="email"
                  className="form-label fw-bolder text-white"
                >
                  Correo
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="registerEmail"
                  name="registerEmail"
                  required
                  placeholder="Ingresa tu correo"
                  onChange={handleInputChange}
                  value={registerEmail}
                />
              </div>

              <div className="mb-3">
                <label
                  htmlFor="password"
                  className="form-label fw-bolder text-white"
                >
                  Contraseña
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="registerPassword"
                  name="registerPassword"
                  required
                  placeholder="Ingresa una contraseña"
                  onChange={handleInputChange}
                  value={registerPassword}
                />
              </div>
            </div>

            {/* Botón pa registrarse */}
            <div className="d-grid mb-2">
              <input
                type="submit"
                className="btnSubmit rounded"
                value="Registrarse"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
