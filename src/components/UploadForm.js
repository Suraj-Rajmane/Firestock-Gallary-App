import { Context } from "../context/FirestoreContext";
import { useMemo, useContext } from "react";
import FireStore from "../handlers/firestore";
import Storage from "../handlers/storage";
import { useAuthContext } from "../context/AuthContext";

const { writeDoc } = FireStore;
const { uploadFile, downloadFile } = Storage;

const Preview = () => {
  const { state } = useContext(Context);
  const { inputs: { path } } = state;
  return (
    path && (
      <div
        className="rounded p-1 m-5"
        style={{
          width: "30%",
          height: "300px",
          backgroundImage: `url(${path}`,
          backgroundSize: "cover",
        }}
      ></div>
    )
  );
};

const UploadForm = () => {
  const { state, dispatch, read } = useContext(Context);

  const { inputs, isCollapsed } = state;

  const { currentUser } = useAuthContext();

  const isDisabled = useMemo(() => {
    return !!Object.values(inputs).some((input) => !input);
  }, [inputs]);

  const handleOnChange = (e) =>
    dispatch({ type: "setInputs", payload: { value: e } });

    const username = currentUser?.displayName.split(" ").join("")

  const handleOnSubmit = (e) => {
    e.preventDefault();
    uploadFile(inputs)
    .then(downloadFile)
    .then((url) => {
        writeDoc({...inputs, path: url, user: username.toLowerCase()},"stocks")
        .then(() => {
          read()
          dispatch({ type: "setCollapse", payload: { bool: false } });
        })
    });
  };

  return (
    isCollapsed && (
      <>
        <p className="display-6 text-center mb-3">Upload Stock Image</p>
      <div className="mb-5 d-flex align-items-center justify-content-center">
      <Preview />
      <form className="mb-2" style={{ textAlign: "left" }} onSubmit={handleOnSubmit}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              name="title"
              placeholder="title"
              aria-describedby="text"
              onChange={handleOnChange}
            />
          </div>
          <div className="mb-3">
            <input type="file" className="form-control" name="file" onChange={handleOnChange}/>
          </div>
          <button
            type="submit"
            className="btn btn-success float-end"
            disabled={isDisabled}
          >
            Save and upload
          </button>
        </form>
      </div>
      </>
    )
  );
};
export default UploadForm;
