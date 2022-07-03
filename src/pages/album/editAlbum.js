/*
Name: Stephanie Ranegar
Date: 6/20/2022
File: editAlbum.js
Description: This script creates a component that displays a form to edit album information
*/

import {useState, useEffect} from "react";
import UseFetch from "../../services/useFetch";
import {useNavigate} from "react-router-dom";
import {Button, Modal} from "semantic-ui-react";
import {useForm} from "react-hook-form";
import JSONPretty from "react-json-pretty";
import "./album.css";

const EditAlbum =
    ({showModal, setShowModal, data, reload, setReload, setSubHeading}) => {
        const {error, isLoading, data: response, update} = UseFetch();
        const navigate = useNavigate();
        const [submitted, setSubmitted] = useState(false);
        const [showButton, setShowButton] = useState(true);

        const {register, handleSubmit, formState: {errors}} = useForm({
            defaultValues: data,
            shouldUseNativeValidation: false
        });

        const editFormOptions = {
            number: {required: "ID is required"},
            title: {required: "Name is required"},
            total_tracks: {required: "Email is required"},
            image: {required: "Major is required"},
            description: {required: "GPA is required"}
        }

        const handleUpdate = (album) => {
            update(album);
            setSubmitted(true);
        }
        const handleCancel = () => {
            setShowModal(false);
            setSubHeading("All Albums");
            navigate("/albums")
        }
        const handleClose = () => {
            setShowModal(false);
            setShowButton(true);
            setSubmitted(false);
            setReload(!reload);
            setSubHeading("All Albums");
            navigate("/albums")
        }
        useEffect(() => {
            if (!submitted || error != null) {
                setShowButton(true);
            } else {
                setShowButton(false);
            }
        })


        return (

            <Modal open={showModal} onClose={handleClose} onOpen={() => setShowModal(true)} size='small' dimmer
                   closeIcon>
                <Modal.Header closeButton>
                    <h4>Edit Album</h4>
                </Modal.Header>
                <Modal.Content>
                    {error && <JSONPretty data={error} style={{color: "red"}}></JSONPretty>}
                    {isLoading &&
                        <div className="image-loading">
                            Please wait while data is being loaded
                        </div>
                    }
                    {response && <JSONPretty data={response}></JSONPretty>}
                    {(!submitted || error != null) &&
                        <form className="form-album" id="form-album-edit" onSubmit={handleSubmit(handleUpdate)}>
                            <ul className="form-album-errors">
                                {errors?.number && <li>{errors.number.message}</li>}
                                {errors?.title && <li>{errors.title.message}</li>}
                                {errors?.total_tracks && <li>{errors.total_tracks.message}</li>}
                                {errors?.image && <li>{errors.image.message}</li>}
                                {errors?.description && <li>{errors.description.message}</li>}
                            </ul>
                            <div className="form-group">
                                <label>Album Number</label>
                                <input name="number"
                                       readOnly="readOnly" {...register('number', editFormOptions.number)}/>
                            </div>
                            <div className="form-group">
                                <label>Title</label>
                                <input type="text" name="title" {...register('title', editFormOptions.title)}/>
                            </div>
                            <div className="form-group">
                                <label>Total Tracks</label>
                                <input name="total_tracks" {...register('total_tracks', editFormOptions.total_tracks)}/>
                            </div>
                            <div className="form-group">
                                <label>Image</label>
                                <input name="image" {...register('image', editFormOptions.image)}/>
                            </div>
                            <div className="form-group">
                                <label>Description</label>
                                <input name="description" {...register('description', editFormOptions.description)}/>
                            </div>
                        </form>}
                </Modal.Content>
                <Modal.Actions style={{justifyContent: "center"}}>
                    <Button type="submit" form="form-album-edit" primary
                            style={{display: (!showButton) ? "none" : ""}}>Update</Button>
                    <Button onClick={handleCancel}
                            style={{display: (!showButton) ? "none" : ""}}>Cancel</Button>
                    <Button primary onClick={handleClose}
                            style={{display: (!showButton) ? "" : "none"}}>Close</Button>
                </Modal.Actions>
            </Modal>
        );
    };

export default EditAlbum;