import React, { useContext } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import axios from "axios";
import AppContext from "../contexts/AppContext";

import {
  START_FETCH,
  FETCH_SUCCESS,
  INPUT_EDIT,
  TOGGLE_MODE,
  START_ALERT,
  ROOT_URL,
  TOKEN_KEY,
} from "../actions";

import Background from "../Switzerland.jpg";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Hike up
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: `url(${Background})`,
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  span: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    color: "teal",
    cursor: "pointer",
  },
  spanError: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    color: "fuchsia",
    marginTop: 10,
  },
}));

export default function Login() {
  const classes = useStyles();
  const { state, dispatch } = useContext(AppContext);

  const inputChangedSign = () => (event) => {
    const cred = state.login.credentialsSign;
    cred[event.target.name] = event.target.value;
    dispatch({
      type: INPUT_EDIT,
      payload: cred,
    });
  };

  const toggleView = () => {
    const cred = state.login.credentialsSign;
    cred.name = "";
    dispatch({
      type: INPUT_EDIT,
      payload: cred,
    });
    dispatch({ type: TOGGLE_MODE });
  };

  const login = async (event) => {
    event.preventDefault();
    if (state.login.isLoginView) {
      try {
        dispatch({ type: START_FETCH });
        const res = await axios.post(
          `${ROOT_URL}/auth/sign_in`,
          state.login.credentialsSign,
          { headers: { "Content-Type": "application/json" } }
        );
        const token = {
          "access-token": res.headers["access-token"],
          client: res.headers["client"],
          uid: res.headers["uid"],
        };
        localStorage.setItem(TOKEN_KEY, JSON.stringify(token));
        res.headers["access-token"]
          ? (window.location.href = "/")
          : (window.location.href = "/login");
        dispatch({ type: FETCH_SUCCESS });
      } catch {
        dispatch({
          type: START_ALERT,
          data: { message: "ログインに失敗しました", severity: "error" },
        });
      }
    } else {
      try {
        dispatch({ type: START_FETCH });
        const res = await axios.post(
          `${ROOT_URL}/auth`,
          state.login.credentialsSign,
          { headers: { "Content-Type": "application/json" } }
        );
        const token = {
          "access-token": res.headers["access-token"],
          client: res.headers["client"],
          uid: res.headers["uid"],
        };
        localStorage.setItem(TOKEN_KEY, JSON.stringify(token));
        res.headers["access-token"]
          ? (window.location.href = "/")
          : (window.location.href = "/login");
        dispatch({ type: FETCH_SUCCESS });
      } catch {
        dispatch({
          type: START_ALERT,
          data: {
            message: "アカウント作成に失敗しました",
            severity: "error",
          },
        });
      }
    }
  };

  const testLogin = async (event) => {
    event.preventDefault();
    const res = await axios.post(
      `${ROOT_URL}/auth/sign_in`,
      {
        name: "test",
        email: "test@example.com",
        password: "foobar",
        password_confirmation: "foobar",
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    const token = {
      "access-token": res.headers["access-token"],
      client: res.headers["client"],
      uid: res.headers["uid"],
    };
    localStorage.setItem(TOKEN_KEY, JSON.stringify(token));
    res.headers["access-token"]
      ? (window.location.href = "/")
      : (window.location.href = "/login");
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {state.login.isLoginView ? "ログイン" : "アカウント登録"}
          </Typography>
          <form className={classes.form} onSubmit={login}>
            {state.login.isLoginView ? (
              <></>
            ) : (
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="name"
                label="名前"
                name="name"
                autoComplete="name"
                autoFocus
                onChange={inputChangedSign()}
              />
            )}

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="メールアドレス"
              name="email"
              autoComplete="email"
              onChange={inputChangedSign()}
            />

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="パスワード"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={inputChangedSign()}
            />

            <span className={classes.spanError}>{state.login.error}</span>

            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}

            {state.login.isLoginView ? (
              !state.login.credentialsSign.password ||
              !state.login.credentialsSign.email ? (
                <Button
                  className={classes.submit}
                  type="submit"
                  fullWidth
                  disabled
                  variant="contained"
                  color="primary"
                >
                  ログイン
                </Button>
              ) : (
                <Button
                  className={classes.submit}
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                >
                  ログイン
                </Button>
              )
            ) : !state.login.credentialsSign.name ||
              !state.login.credentialsSign.password ||
              !state.login.credentialsSign.email ? (
              <Button
                className={classes.submit}
                type="submit"
                fullWidth
                disabled
                variant="contained"
                color="primary"
              >
                アカウント作成
              </Button>
            ) : (
              <Button
                className={classes.submit}
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              >
                アカウント作成
              </Button>
            )}

            <span onClick={() => toggleView()} className={classes.span}>
              {state.login.isLoginView
                ? "アカウント作成しますか?"
                : "ログインしますか?"}
            </span>

            <Button variant="contained" color="primary" onClick={testLogin}>
              TestUserでログイン
            </Button>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
