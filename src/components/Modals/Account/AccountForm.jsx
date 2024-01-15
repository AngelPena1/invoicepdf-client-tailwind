import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faLockOpen, faUser } from "@fortawesome/free-solid-svg-icons";

const AccountForm = (props) => {
  return (
    <>
      <div
        onClick={() => {
          props.toggleAccount();
        }}
        className="background"
      ></div>
      <section
        className={
          props.show
            ? "account-section-login-modal"
            : "account-section-register-modal"
        }
      >
        <div className="nav-modal">
          <ul>
            <li className={props.show? "selected-tab": ""} onClick={() => props.invertShow(true)}>
              <FontAwesomeIcon icon={faLockOpen} /> Inicia sesión
            </li>
            <li className={!props.show? "selected-tab": ""} onClick={() => props.invertShow(false)}>
              <FontAwesomeIcon icon={faUser} /> Registrate
            </li>
          </ul>
          <FontAwesomeIcon
            onClick={() => {
              props.toggleAccount();
            }}
            className="close-icon"
            icon={faXmark}
          />
        </div>
        {props.show ? (
          <div className="account-container showAccountContainerLogin">
            <div className="input-container">
              <label htmlFor="">Correo electrónico</label>
              <input placeHolder="pedro@example.com" type="text" />
            </div>
            <div className="input-container">
              <label htmlFor="">Contraseña</label>
              <input type="password" />
            </div>
            <div className="additional-options">
              <div className="remember-me">
                <input type="checkbox" name="" id="" />
                <h4>Recuérdame</h4>
              </div>
              <div className="forgot-password">
                <h4>¿Olvidaste tu contraseña?</h4>
              </div>
            </div>
            <button className="login-btn">Iniciar sesión</button>
          </div>
        ) : (
          <div className="account-container showAccountContainerRegister">
            <div className="input-container">
              <label htmlFor="">Nombre completo</label>
              <input placeholder="Pedro Rosario" type="text" />
            </div>
            <div className="input-container">
              <label htmlFor="">Correo electrónico</label>
              <input type="text" />
            </div>
            <div className="input-container">
              <label htmlFor="">Contraseña</label>
              <input type="text" />
            </div>
            <button className="login-btn">Registrarse</button>
          </div>
        )}
      </section>
    </>
  );
};

export default AccountForm;
