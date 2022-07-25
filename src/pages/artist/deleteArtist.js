import { useState, useEffect } from "react";
import UseFetch from "../../services/useFetch";
import { Button, Header, Modal, Segment } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import JSONPretty from "react-json-pretty";
import "./artist.css";

const DeleteArtist = ({
  showModal,
  setShowModal,
  data,
  reload,
  setReload,
  setSubHeading,
}) => {
  const { error, isLoading, data: response, remove } = UseFetch();
  const [showButton, setShowButton] = useState(true);
  const navigate = useNavigate();

  const handleDelete = () => {
    remove(data.id);
    setShowButton(false);
  };

  const handleCancel = () => {
    setShowModal(false);
    setSubHeading("All Artists");
    navigate("/artists");
  };

  const handleClose = () => {
    setShowModal(false);
    setShowButton(true);
    setReload(!reload);
    setSubHeading("All Artists");
    navigate("/artists");
  };

  return (
    <>
      <Modal
        open={showModal}
        onClose={handleClose}
        onOpen={() => setShowModal(true)}
        closeIcon
        size="small"
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
          Delete Artist
        </Modal.Header>
        <Modal.Content>
          {isLoading && (
            <div className="image-loading">
              Please wait while data is being loaded
            </div>
          )}
          {response ? (
            <JSONPretty data={response}></JSONPretty>
          ) : (
            <Segment basic>
              <Header as="h4">
                {error
                  ? error
                  : "Are you sure you want to delete the following artist?"}
              </Header>

              <JSONPretty data={data}></JSONPretty>
            </Segment>
          )}
        </Modal.Content>
        <Modal.Actions style={{ justifyContent: "center" }}>
          <Button
            negative
            onClick={handleDelete}
            style={{ display: !showButton ? "none" : "" }}
          >
            Remove
          </Button>
          <Button
            onClick={handleCancel}
            style={{ display: !showButton ? "none" : "" }}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleClose}
            style={{ display: !showButton ? "" : "none" }}
          >
            Close
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
};

export default DeleteArtist;
