import React from "react";
import Avatar from "@material-ui/core/Avatar";

export default function UserImage({ user }) {
  return (
    <>
      {user.image ? (
        <Avatar aria-label="recipe" src={user.image} />
      ) : (
        <Avatar aria-label="recipe" src="/images/defaultUser.png" />
      )}
    </>
  );
}
