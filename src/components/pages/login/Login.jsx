import React, { useState, useContext } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import { Context } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { setUserGlobal, setPasswordGlobal } from "../../../constantes";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import "./Login.css";

const Login = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const { handleLogin } = useContext(Context);
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const loginButton = async () => {
    setUserGlobal(user);
    setPasswordGlobal(password);

    setLoading(true);
    var ret = await handleLogin();
    console.log("teste");

    if (ret) {
      setLoading(false);
      navigate("dashboard");
    } else {
      setTimeout(() => {
        setLoading(false);
        alert("Falha no Login");
      }, 1000);
    }
  };

  return (
    <div className="body">
      <div className="login-body">
        <div></div>
        <div className="img-size"></div>

        <div className="p-3 login-data size " style={{ width: 400 }}>
          <h2 style={{ marginBottom: 30, textAlign: "center" }}>UEX</h2>
          <div className="mb-3">
            <TextField
              required
              id="outlined-basic"
              label="Login"
              variant="outlined"
              fullWidth
              value={user}
              onChange={(e) => setUser(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <TextField
              required
              id="outlined-basic"
              label="Senha"
              variant="outlined"
              fullWidth
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.keyCode === 13) loginButton();
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handlePasswordVisibility}
                      edge="end"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </div>

          <center>
            <LoadingButton
              loading={loading}
              variant="contained"
              onClick={loginButton}
              className="loginButton"
            >
              Entrar
            </LoadingButton>
          </center>
        </div>
      </div>
    </div>
  );
};

export default Login;
