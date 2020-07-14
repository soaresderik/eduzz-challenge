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
import { useHistory } from "react-router-dom";

export default function Register() {
  const classes = loginStyled();
  const history = useHistory();

  const [data, setData] = useState(() => ({
    name: "",
    email: "",
    password: "",
  }));

  const { register } = useAuth();

  async function handleRegister() {
    const res = await register({
      name: data.name,
      email: data.email,
      password: data.password,
    });

    if (res) history.push("/dashboard");
  }

  function handleChange(e: SyntheticEvent) {
    e.preventDefault();
    const target = e.target as HTMLInputElement;
    setData((inputs) => ({
      ...inputs,
      [target.name]: target.value,
    }));
  }

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOpenOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          Crie uma nova conta
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Seu nome completo"
            name="name"
            autoComplete="name"
            autoFocus
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Seu E-mail"
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
            onChange={handleChange}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleRegister}
          >
            CADASTRAR
          </Button>
          <Grid container>
            <Grid item>
              <Link to="/login">Ja tem uma conta? Entre aqui.</Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
