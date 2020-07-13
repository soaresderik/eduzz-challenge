import React from "react";
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

export default function Login() {
  const classes = loginStyled();
  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOpenOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          Entre com sua conta
        </Typography>
        <form className={classes.form} noValidate>
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
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
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
