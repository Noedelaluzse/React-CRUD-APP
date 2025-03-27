import React from "react";
import "./LoginPage.css";

export const LoginPage = () => {
  return (
    <div className="container login-container">
      <div className="row">
        {/* Formulario de Ingreso */}
        <div className="col-md-6 login-form-1">
          <h3>Ingreso</h3>
          <form>
            <div className="form-group mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Correo"
                name="loginEmail"
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
                name="loginPassword"
              />
            </div>
            <div className="d-grid mb-2 mt-3">
              <input
                type="submit"
                className="btnSubmit rounded"
                value="Login"
              />
            </div>
          </form>
        </div>

        {/* Formulario para registrarse */}
        <div className="col-md-6 align-items-center consultation-form">
          <h3 className="mb-0">Registrarse</h3>
          <p className="text-white text-center mb-0 mt-2">
            Ingresa tu correo para registrarte.
          </p>

          <form>
            <div className="row">
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
                  id="employeeEmailTwo"
                  name="employeeEmailTwo"
                  required
                  placeholder="Correo"
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
