import AWS from "aws-sdk";
import axios from "axios";

AWS.config.update({
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_KEY,
  region: "ap-northeast-1",
});

function signatureURL(file, p, ext) {
  const s3 = new AWS.S3();
  const params = {
    Bucket: process.env.REACT_APP_BUCKET,
    Key: p.dir + p.id + ext,
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

const UploadS3 = async (file, params) => {
  var pos = file.name.lastIndexOf(".");
  if (pos === -1) return "";
  const ext = file.name.slice(pos);

  const url = await signatureURL(file, params, ext);
  await axios
    .put(url, file, {
      headers: {
        "Content-Type": file.type,
      },
    })
    .then(() => {
      console.log("upload success");
    })
    .catch((e) => {
      console.log("error");
    });
  return (
    "https://hike-up-bucket.s3-ap-northeast-1.amazonaws.com/" +
    params.dir +
    params.id +
    ext
  );
};

export default UploadS3;
