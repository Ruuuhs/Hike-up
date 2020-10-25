import React, {
  useState,
  useCallback,
  useRef,
  useEffect,
  useContext,
} from "react";
import AppContext from "../contexts/AppContext";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

import { START_ALERT } from "../actions";

const sizeLimit = 1024 * 1024 * 100; // 制限サイズ

export default function CropImage({
  setEncodedData,
  setExt,
  circular = false,
}) {
  const { dispatch } = useContext(AppContext);
  const previewCanvasRef = useRef(null);
  const [upImg, setUpImg] = useState();
  const imgRef = useRef(null);
  const [crop, setCrop] = useState({
    unit: "%",
    width: 30,
    aspect: circular ? 1 : 3 / 2,
  });
  const [completedCrop, setCompletedCrop] = useState(null);

  const onSelectFile = (e) => {
    if (e.target.files[0].size > sizeLimit) {
      dispatch({
        type: START_ALERT,
        data: {
          message: "ファイルサイズは100MB以下にしてください",
          severity: "error",
        },
      });
      return; // この時点で処理を終了する
    }
    if (e.target.files && e.target.files.length > 0) {
      var pos = e.target.files[0].name.lastIndexOf(".");
      setExt(e.target.files[0].name.slice(pos));
      const reader = new FileReader();
      reader.addEventListener("load", () => setUpImg(reader.result));
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const onLoad = useCallback((img) => {
    imgRef.current = img;
  }, []);

  useEffect(() => {
    if (!completedCrop || !imgRef.current) {
      return;
    }

    const image = imgRef.current;
    const canvas = document.createElement("canvas");
    const crop = completedCrop;

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    var originWidth = crop.width * scaleX;
    var originHeight = crop.height * scaleY;
    // maximum width/height
    var maxWidth = 1200,
      maxHeight = 1200 / (3 / 2);
    var targetWidth = originWidth,
      targetHeight = originHeight;
    if (originWidth > maxWidth || originHeight > maxHeight) {
      if (originWidth / originHeight > maxWidth / maxHeight) {
        targetWidth = maxWidth;
        targetHeight = Math.round(maxWidth * (originHeight / originWidth));
      } else {
        targetHeight = maxHeight;
        targetWidth = Math.round(maxHeight * (originWidth / originHeight));
      }
    }
    // set canvas size
    canvas.width = targetWidth;
    canvas.height = targetHeight;

    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      targetWidth,
      targetHeight
    );

    const contentType = image.src.split(";")[0].split(":")[1];
    setEncodedData(canvas.toDataURL(contentType));
  }, [completedCrop, setEncodedData]);

  return (
    <div className="App">
      <div>
        <input
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          id="icon-button-file"
          onChange={onSelectFile}
        />
      </div>

      <ReactCrop
        src={upImg}
        onImageLoaded={onLoad}
        crop={crop}
        circularCrop={circular}
        onChange={(c) => setCrop(c)}
        onComplete={(c) => setCompletedCrop(c)}
      />
    </div>
  );
}
