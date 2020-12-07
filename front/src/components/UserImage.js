import React from "react";
import Avatar from "@material-ui/core/Avatar";

export default function UserImage({ user }) {
  return (
    <>
      <meta httpEquiv="Cache-Control" content="no-cache"></meta>
      {user.image ? (
        <Avatar aria-label="recipe" src={user.image} />
      ) : (
        <Avatar aria-label="recipe" src="/images/defaultUser.png" />
      )}
    </>
  );
}
