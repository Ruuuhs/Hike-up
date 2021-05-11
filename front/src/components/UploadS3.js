import AWS from "aws-sdk";
// import axios from "axios";

AWS.config.update({
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_KEY,
  region: "ap-northeast-1",
});

const UploadS3 = async (encodedData, ext, p) => {
  const fileData = encodedData.replace(/^data:\w+\/\w+;base64,/, "");
  const decodedFile = new Buffer(fileData, "base64");
  const contentType = encodedData
    .toString()
    .slice(encodedData.indexOf(":") + 1, encodedData.indexOf(";"));

  const s3 = new AWS.S3();
  const params = {
    Bucket: process.env.REACT_APP_BUCKET,
    Key: p.dir + p.id + ext,
    Expires: 60,
    ContentType: contentType,
    Body: decodedFile,
    ACL: "public-read",
  };

  try {
    await s3.putObject(params).promise();
    console.log("Succes S3 upload!");
    return (
      "https://hike-up-bucket.s3-ap-northeast-1.amazonaws.com/" +
      p.dir +
      p.id +
      ext
    );
  } catch (err) {
    console.error(err);
    return null;
  }
};

export default UploadS3;

// function signatureURL(file, p, ext) {
//   const s3 = new AWS.S3();
//   const params = {
//     Bucket: process.env.REACT_APP_BUCKET,
//     Key: p.dir + p.id + ext,
//     Expires: 60,
//     ContentType: file.type,
//     ACL: "public-read",
//   };

//   return new Promise((resolve, reject) => {
//     s3.getSignedUrl("putObject", params, (err, url) => {
//       if (err) {
//         reject(err);
//       }
//       resolve(url);
//     });
//   });
// }

// const UploadS3 = async (file, params) => {
//   var pos = file.name.lastIndexOf(".");
//   if (pos === -1) return "";
//   const ext = file.name.slice(pos);

//   const url = await signatureURL(file, params, ext);
//   await axios
//     .put(url, file, {
//       headers: {
//         "Content-Type": file.type,
//       },
//     })
//     .then(() => {
//       console.log("upload success");
//     })
//     .catch((e) => {
//       console.log("error");
//     });
//   return (
//     "https://hike-up-bucket.s3-ap-northeast-1.amazonaws.com/" +
//     params.dir +
//     params.id +
//     ext
//   );
// };
