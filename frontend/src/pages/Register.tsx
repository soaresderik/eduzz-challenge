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

export default function Register() {
  const classes = loginStyled();
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
            autoComplete="email"
            autoFocus
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
