import { useRef } from "react";
import EmojiPicker from "./EmojiPicker";

export default function ImagePreview({
  text,
  user,
  setText,
  images,
  setImages,
  setShowPreview,
  setError,
}) {
  const imageInputRef = useRef(null);
  const handleImages = (e) => {
    let files = Array.from(e.target.files);
    files.forEach((img) => {
      console.log(img);
      if (
        img.type !== "image/jpeg" &&
        img.type !== "image/png" &&
        img.type !== "image/webp" &&
        img.type !== "image/gif"
      ) {
        setError(
          `${img.name} format is unsupported ! only Jpeg, Png, Webp, Gif are allowed.`
        );
        files = files.filter((item) => item.name !== img.name);
        return;
      } else if (img.size > 1024 * 1024 * 5) {
        setError(`${img.name} size is too large max 5mb allowed.`);
        files = files.filter((item) => item.name !== img.name);
        return;
      } else {
        const reader = new FileReader();
        reader.readAsDataURL(img);
        reader.onload = (readerEvent) => {
          setImages((images) => [...images, readerEvent.target.result]);
        };
      }
    });
  };
  return (
    <div className="overflow-a scrollbar">
      <EmojiPicker text={text} user={user} setText={setText} type2 />
      <div className="add-pics-wrap">
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          multiple
          hidden
          ref={imageInputRef}
          onChange={handleImages}
        />
        {images && images.length ? (
          <div className="add-pics-inside1 p0">
            <div className="preview-actions">
              <button>
                <i className="edit-icon"></i>
                Edit
              </button>
              <button
                onClick={() => {
                  imageInputRef.current.click();
                }}
              >
                <i className="addPhoto_icon"></i>
                Add Photos/Videos
              </button>
            </div>
            <div
              className="small-white-circle"
              onClick={() => {
                setImages([]);
              }}
            >
              <i className="exit_icon"></i>
            </div>
            <div
              className={
                images.length === 1
                  ? "preview1"
                  : images.length === 2
                  ? "preview2"
                  : images.length === 3
                  ? "preview3"
                  : images.length === 4
                  ? "preview4 "
                  : images.length === 5
                  ? "preview5"
                  : images.length % 2 === 0
                  ? "preview6"
                  : "preview6 singular_grid"
              }
            >
              {images.map((img, i) => (
                <img src={img} key={i} alt="" />
              ))}
            </div>
          </div>
        ) : (
          <div className="add-pics-inside1">
            <div
              className="small-white-circle"
              onClick={() => {
                setShowPreview(false);
              }}
            >
              <i className="exit_icon"></i>
            </div>
            <div
              className="add-col"
              onClick={() => {
                imageInputRef.current.click();
              }}
            >
              <div className="add-circle">
                <i className="addPhoto_icon"></i>
              </div>
              <span>Add Photos</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}