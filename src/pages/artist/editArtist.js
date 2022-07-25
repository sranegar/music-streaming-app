import { useState, useEffect } from "react";
import UseFetch from "../../services/useFetch";
import { useNavigate } from "react-router-dom";
import { Button, Modal } from "semantic-ui-react";
import { useForm } from "react-hook-form";
import JSONPretty from "react-json-pretty";
import "./artist.css";

const EditArtist = ({
  showModal,
  setShowModal,
  data,
  reload,
  setReload,
  setSubHeading,
}) => {
  const { error, isLoading, data: response, update } = UseFetch();
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [showButton, setShowButton] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({

    defaultValues: {
      ...data,
          image: data.image.slice(46),
    
    },
    shouldUseNativeValidation: false,
  });


  const editFormOptions = {
    id: { required: "Artist ID is required" },
    name: { required: "Artist name is required" },
    description: { required: "Artist description is required" },
  };

  const handleUpdate = (artist) => {
    update(artist);
    setSubmitted(true);
  };
  const handleCancel = () => {
    setShowModal(false);
    setSubHeading("All Artists");
    navigate("/artists");
  };
  const handleClose = () => {
    setShowModal(false);
    setShowButton(true);
    setSubmitted(false);
    setReload(!reload);
    setSubHeading("All Artists");
    navigate("/artists");
  };
  useEffect(() => {
    if (!submitted || error != null) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  });

  return (
    <Modal
      open={showModal}
      onClose={handleClose}
      onOpen={() => setShowModal(true)}
      size="small"
      dimmer
      closeIcon
    >
      <Modal.Header
        as="h3"
        style={{
          display: "flex",
          textAlign: "center",
          alignItems: "center",
          color: "24c8ad",
        }}
      >
        Edit Artist
      </Modal.Header>
      <Modal.Content>
        {error && (
          <JSONPretty data={error} style={{ color: "red" }}></JSONPretty>
        )}
        {isLoading && (
          <div className="image-loading">
            Please wait while data is being loaded
          </div>
        )}
        {response && <JSONPretty data={response}></JSONPretty>}
        {(!submitted || error != null) && (
          <form
            className="form-album"
            id="form-artist-edit"
            onSubmit={handleSubmit(handleUpdate)}
          >
            <ul className="form-album-errors">
              {errors?.id && <li>{errors.id.message}</li>}
              {errors?.name && <li>{errors.name.message}</li>}
              {errors?.description && <li>{errors.description.message}</li>}
              {errors?.image && <li>{errors.image.message}</li>}
            </ul>
            <div className="form-group">
              <label>Artist ID</label>
              <input
                name="id"
                readOnly="readOnly"
                {...register("id", editFormOptions.id)}
              />
            </div>
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                name="name"
                {...register("name", editFormOptions.name)}
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea
                rows="3"
                name="description"
                {...register("description", editFormOptions.description)}
              />
            </div>
            <div className="form-group">
              <label>Image</label>
              <input
                name="image"
                {...register("image", editFormOptions.image)}
              />
            </div>
          </form>
        )}
      </Modal.Content>
      <Modal.Actions style={{ justifyContent: "center" }}>
        <Button
          type="submit"
          form="form-artist-edit"
          primary
          style={{ display: !showButton ? "none" : "" }}
        >
          Update
        </Button>
        <Button
          onClick={handleCancel}
          style={{ display: !showButton ? "none" : "" }}
        >
          Cancel
        </Button>
        <Button
          primary
          onClick={handleClose}
          style={{ display: !showButton ? "" : "none" }}
        >
          Close
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default EditArtist;
