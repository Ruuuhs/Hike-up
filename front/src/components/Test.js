import React, { Component } from "react";
import ReactPlayer from "react-player";
import AWS from "aws-sdk";
import axios from "axios";

AWS.config.update({
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_KEY,
  region: "ap-northeast-1",
});

const Test = () => {
  const [data, setData] = React.useState([]);

  const uploadS3_t = async (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const encodedData = e.target.result;
      const fileData = encodedData.replace(/^data:\w+\/\w+;base64,/, "");
      const decodedFile = new Buffer(fileData, "base64");

      const s3 = new AWS.S3();
      const params = {
        Bucket: process.env.REACT_APP_BUCKET,
        Key: file.name,
        Expires: 60,
        ContentType: file.type,
        Body: decodedFile,
        ACL: "public-read",
      };

      s3.putObject(params, function (err, data) {
        if (err) {
          console.log(err, err.message);
        } else {
          setData(
            "https://hike-up-bucket.s3-ap-northeast-1.amazonaws.com/post-video/" +
              file.name
          );
          console.log("アップロード成功！");
        }
      });
    };
    reader.readAsDataURL(file);
  };

  const uploadS3 = async (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    const url = await signatureURL(file);
    await axios
      .put(url, file, {
        headers: {
          "Content-Type": file.type,
        },
      })
      .then(() => {
        setData(
          "https://hike-up-bucket.s3-ap-northeast-1.amazonaws.com/user-image/" +
            "1.JPG"
        );
      })
      .catch((e) => console.log(e));
  };

  function signatureURL(file) {
    const s3 = new AWS.S3();
    const params = {
      Bucket: process.env.REACT_APP_BUCKET,
      Key: "user-image/" + "1.JPG",
      Expires: 60,
      ContentType: file.type,
      ACL: "public-read",
    };

    return new Promise((resolve, reject) => {
      s3.getSignedUrl("putObject", params, (err, url) => {
        if (err) {
          reject(err);
        }
        resolve(url);
      });
    });
  }

  return (
    <div style={{ width: 760, margin: "30px auto" }}>
      <h1>React S3 Image Uploader Sample</h1>
      <input
        // accept="video/*"
        id="icon-button-file"
        type="file"
        onChange={uploadS3}
      />

      {data.length !== 0 && <ReactPlayer url={data} controls width="600px" />}
    </div>
  );
};

export default Test;
