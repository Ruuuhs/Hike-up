import React, { useContext } from "react";
import { Link } from "react-router-dom";

import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import Checkbox from "@material-ui/core/Checkbox";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
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
  TOKEN_KEY,
} from "../actions";

import Background from "../images/hike_up_login.jpg";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      Hike up {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  main: {
    height: "100vh",
    minHeight: "780px",
    backgroundImage: `url(${Background})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    overflow: "hidden",
  },
  paper: {
    width: 350,
    maxHeight: 630,
    margin: theme.spacing(8, 4),
    marginLeft: "50%",
    padding: 25,
    verticalAlign: "middle",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#fffffff1",
    borderRadius: "20px",
  },
  headerLogo: {
    height: 90,
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
          `${process.env.REACT_APP_API_URL}/auth/sign_in`,
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
          `${process.env.REACT_APP_API_URL}/auth`,
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
    console.log(process.env.REACT_APP_API_URL);
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/auth/sign_in`,
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
    console.log(res);
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
    <Grid container maxwidth="xl" className={classes.main}>
      <CssBaseline />
      <Grid item xs={12} sm={8} md={4} className={classes.paper}>
        <img
          src="/images/Hike_up_logo_text.png"
          alt="logo_hike_up"
          className={classes.headerLogo}
        />
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
        </form>
        <Button
          variant="contained"
          color="primary"
          onClick={testLogin}
          className={classes.submit}
        >
          テストユーザーでログイン
        </Button>
        <Link to="/about" style={{ textDecoration: "none" }}>
          <Typography variant="body1" color="textSecondary">
            Hike upについて
          </Typography>
        </Link>
        <Box mt={3}>
          <Copyright />
        </Box>
      </Grid>
    </Grid>
  );
}
