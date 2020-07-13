import { makeStyles, Container } from "@material-ui/core";
import styled from "styled-components";

export const DashContainer = styled(Container)`
  margin: 0 auto;
  padding: 25px;
  background: #f1f1f1;
  flex-grow: 1;
`;

export const loginStyled = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
