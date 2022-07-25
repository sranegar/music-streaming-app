import { useState, useEffect } from "react";
import UseFetch from "../../services/useFetch";
import { Button, Modal } from "semantic-ui-react";
import { useForm } from "react-hook-form";
import JSONPretty from "react-json-pretty";
import "./artist.css";

const CreateArtist = ({
  showModal,
  setShowModal,
  reload,
  setReload,
  setSubHeading,
}) => {
  const { error, isLoading, data: response, create } = UseFetch();
  const [submitted, setSubmitted] = useState(false);
  const [showButton, setShowButton] = useState(true);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      id: "",
      name: "",
      description: "",
      image: "",
    },
    shouldUseNativeValidation: false,
  });
  const createFormOptions = {
    id: { required: "Artist ID is required" },
    name: { required: "Artist name is required" },
    description: { required: "Artist description is required" },
    image: { required: "Artist image is required" },
  };
  const handleCreate = (artist) => {
    create(artist);
    setShowModal(true);
    setSubmitted(true);
  };
  const handleCancel = () => {
    setShowModal(false);
    setSubHeading("All Artists");
  };
  const handleOnClose = () => {
    setShowModal(false);
    setReload(!reload);
    setShowButton(true);
    setSubmitted(false);
    setSubHeading("All Artists");
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
      onClose={handleOnClose}
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
        Create an Artist
      </Modal.Header>
      <Modal.Content>
        {error && (
          <JSONPretty
            data={error}
            style={{ color: "black", fontSize: "12px" }}
          ></JSONPretty>
        )}
        {isLoading && (
          <div className="image-loading">
            Please wait while data is being loaded
          </div>
        )}
        {response && (
          <JSONPretty
            data={response}
            style={{ color: "black", textAlign: "left", fontSize: "12px" }}
          ></JSONPretty>
        )}
        {(!submitted || error != null) && (
          <form
            autoComplete="off"
            className="form-album"
            id="form-album-edit"
            onSubmit={handleSubmit(handleCreate)}
          >
            <ul>
              {errors?.id && <li>{errors.id.message}</li>}
              {errors?.name && <li>{errors.name.message}</li>}
              {errors?.description && <li>{errors.description.message}</li>}
              {errors?.image && <li>{errors.image.message}</li>}
            </ul>
            <div className="form-group">
              <label>Artist ID</label>
              <input
                autoComplete="off"
                name="text"
                {...register("id", createFormOptions.id)}
              />
            </div>
            <div className="form-group">
              <label>Name</label>
              <input
                autoComplete="off"
                type="text"
                name="name"
                {...register("name", createFormOptions.name)}
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <input
                autoComplete="off"
                name="description"
                {...register("description", createFormOptions.description)}
              />
            </div>

            <div className="form-group">
              <label>Image</label>
              <input
                id="image"
         
                autoComplete="off"
                name="image"
                {...register("image", createFormOptions.image)}
              />
            </div>
          </form>
        )}
        <Modal.Actions style={{ padding: "20px 10px 40px" }}>
          <Button
            floated="right"
            size="small"
            secondary
            inverted
            onClick={handleCancel}
            style={{ display: !showButton ? "none" : "" }}
          >
            Cancel
          </Button>
          <Button
            floated="right"
            color="green"
            form="form-album-edit"
            type="submit"
            size="small"
            style={{ display: !showButton ? "none" : "" }}
          >
            Create
          </Button>
          <Button
            floated="right"
            primary
            onClick={handleOnClose}
            size="small"
            style={{ display: !showButton ? "" : "none" }}
          >
            Close
          </Button>
        </Modal.Actions>
      </Modal.Content>
    </Modal>
  );
};

export default CreateArtist;
