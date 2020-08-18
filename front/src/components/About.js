import React, { useEffect, useState, useContext } from "react";
import axios from "axios";

import AppContext from "../contexts/AppContext";

import { CREATE_USER, READ_USERS, READ_USER, ROOT_URL } from "../actions";

const About = () => {
  const { state, dispatch } = useContext(AppContext);
  const [user, setUser] = useState("");

  // useEffect(() => {
  //   dispatch({
  //     type: READ_USERS,
  //   });

  //   console.log("test");
  //   console.log({ state });
  // });

  const readUsers = async () => {
    const response = await axios.get(`${ROOT_URL}/user`);
    dispatch({ type: READ_USER, data: response.data });
  };

  return (
    <>
      <button onClick={readUsers}>readUsers</button>
      <button onClick={() => console.log(state)}>console</button>
    </>
  );
};

export default About;
