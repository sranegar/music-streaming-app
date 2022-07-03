/*
Name: Stephanie Ranegar
Date: 6/19/2022
File: deleteAlbum.js
Description: This script creates a component for deleting an album
*/

import {useState, useEffect} from "react";
import UseFetch from "../../services/useFetch";
import {Button, Modal} from "semantic-ui-react";
import {useNavigate} from "react-router-dom";
import JSONPretty from "react-json-pretty";


const DeleteAlbum = ({showModal, setShowModal, data, reload, setReload, setSubHeading}) => {
    const {error, isLoading, data: response, remove} = UseFetch();
    const [showButton, setShowButton] = useState(true);
    const navigate = useNavigate();

 
    const handleDelete = () => {
        remove(data.number);
        setShowButton(false);
    }

    const handleCancel = () => {
        setShowModal(false);
        setSubHeading("All Albums");
        navigate("/albums");
    }

    const handleClose = () => {
        setShowModal(false);
        setShowButton(true);
        setReload(!reload);
        setSubHeading("All Albums");
        navigate("/albums");
    }

    return (
        <>
            <Modal open={showModal} onClose={handleClose} onOpen={() => setShowModal(true)} closeIcon size='small'>
                <Modal.Header>
                    <h4>Delete Album</h4>
                </Modal.Header>
                <Modal.Content>
                    {error && <JSONPretty data={error} style={{color: "red"}}></JSONPretty>}
                    {isLoading &&
                        <div className="image-loading">
                            Please wait while data is being loaded
                        </div>
                    }
                    {response
                        ? <JSONPretty data={response}></JSONPretty>
                        : <div>
                            <span style={{color: "red"}}>Are you sure you want to delete the following album?</span>
                            <span><JSONPretty data={data} ></JSONPretty></span>
                        </div>
                    }
                </Modal.Content>
                <Modal.Actions style={{justifyContent: "center"}}>
                    <Button negative onClick={handleDelete}
                            style={{display: (!showButton) ? "none" : ""}}>Remove</Button>
                    <Button onClick={handleCancel}
                            style={{display: (!showButton) ? "none" : ""}}>Cancel</Button>
                    <Button variant="primary" onClick={handleClose}
                            style={{display: (!showButton) ? "" : "none"}}>Close</Button>
                </Modal.Actions>
            </Modal>
        </>
    );
};

export default DeleteAlbum;