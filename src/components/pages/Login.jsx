import React, { useContext, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import image from "../../assets/loginbg.jpg";
import "./Login.scss";
import Button from "../atoms/Button";
import { AuthContext as Context } from "../../providers/AuthProvider";
import VanillaTilt from "vanilla-tilt";
import { resetPass } from "../../config";

const Login = () => {
  const { onLogin, error } = useContext(Context);
  const [send, setSend] = React.useState("");
  const tiltRef = useRef();

  useEffect(() => {
    VanillaTilt.init(tiltRef.current, {
      max: 5,
      speed: 200,
      glare: true,
      "max-glare": 0.25
    });

    return () => tiltRef.current.vanillaTilt.destroy();
  }, []);

  const handleLogin = e => {
    e.preventDefault();
    const form = e.target;

    const data = {
      email: form.email.value,
      password: form.password.value
    };

    onLogin(data);
  };

  const handleResetPassword = e => {
    e.preventDefault();
    const form = e.target;

    resetPass(form.email.value)
      .then(function() {
        setSend("Link enviado, revisa tu correo electronico");
      })
      .catch(function(error) {
        console.log("error", error);
      });
  };

  return (
    <div className="login">
      <div ref={tiltRef} className="login__tilt">
        <img className="login__image" src={image} alt="Login background" />
      </div>
      <div className="login-aside">
        <h1 style={{ textAlign: "center", fontSize: "32px", color: "#ff1f5a" }}>
          INDICADORES POLI
        </h1>
        <form className="login-form" onSubmit={handleLogin}>
          <h3>Registrarse</h3>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Correo"
            required
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Contrasena"
            required
          />
          <Button type="submit" theme="login__button">
            Entrar
          </Button>
          {error && error.message && (
            <p style={{ color: "red" }}>{error.message}</p>
          )}
        </form>
        <form
          sryle={{ marginTop: "3rem" }}
          className="reset-form"
          onSubmit={handleResetPassword}
        >
          <h4>Restaurar contrasena </h4>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Correo"
            required
          />
          <Button type="submit" theme="login__button">
            Recuperar
          </Button>
        </form>
        {send && <h1>{send}</h1>}
      </div>
    </div>
  );
};

export default Login;
