import React, { useState, SyntheticEvent } from "react";
import {
  Container,
  Avatar,
  Typography,
  TextField,
  Button,
  Grid,
} from "@material-ui/core";
import { LockOpenOutlined } from "@material-ui/icons";
import { loginStyled } from "./styles";
import { Link } from "react-router-dom";

import { useAuth } from "../store/auth";

export default function Login() {
  const classes = loginStyled();
  const [data, setData] = useState(() => ({
    email: "",
    password: "",
  }));

  const { login } = useAuth();

  const handleChange = (e: SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as HTMLInputElement;
    setData((inputs) => ({
      ...inputs,
      [target.name]: target.value,
    }));
  };

  const handleSubmit = async () => {
    await login({ email: data.email, password: data.password });
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOpenOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          Entre com sua conta
        </Typography>
        <form className={classes.form}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Seu e-mail"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Sua senha"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handleChange}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
          >
            ENTRAR
          </Button>
          <Grid container>
            <Grid item>
              <Link to="/register">
                Ainda não tem uma conta? Cadastre-se aqui.
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
