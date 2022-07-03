/*
Name: Stephanie Ranegar
Date: 6/19/2022
File: createAlbum.js
Description: This script creates a component for inserting a new album
*/

import {useState, useEffect} from "react";
import UseFetch from "../../services/useFetch";
import {Button, Modal} from "semantic-ui-react";
import {useForm} from "react-hook-form";
import JSONPretty from "react-json-pretty";
import "./album.css";


const CreateAlbum = ({showModal, setShowModal, reload, setReload, setSubHeading}) => {
    const {error, isLoading, data: response, create} = UseFetch();
    const [submitted, setSubmitted] = useState(false);
    const [showButton, setShowButton] = useState(true);
    const {register, handleSubmit, formState: {errors}} = useForm({
        defaultValues: {number: "", title: "", total_tracks: "", image: "", description: ""},
        shouldUseNativeValidation: false
    });
    const createFormOptions = {
        number: {required: "Album number is required"},
        title: {required: "Title is required"},
        total_tracks: {required: "Total tracks are required"},
        image: {required: "Image is required"},
        description: {required: "Description is required"}
    }
    const handleCreate = (album) => {
        create(album);
        setShowModal(true);
        setSubmitted(true);
    }
    const handleCancel = () => {
        setShowModal(false);
        setSubHeading("All Albums");
    }
    const handleOnClose = () => {
        setShowModal(false);
        setReload(!reload);
        setShowButton(true);
        setSubmitted(false);
        setSubHeading("All Albums");
    }
    useEffect(() => {
        if (!submitted || error != null) {
            setShowButton(true);
        } else {
            setShowButton(false);
        }
    })


    return (
        <Modal open={showModal} onClose={handleOnClose} onOpen={() => setShowModal(true)} size='small' dimmer closeIcon>

            <Modal.Header><h4>Create an Album</h4></Modal.Header>
            <Modal.Content>
                {error && <JSONPretty data={error} style={{color: "black", fontSize: '12px'}}></JSONPretty>}
                {isLoading &&
                    <div className="image-loading">
                        Please wait while data is being loaded
                    </div>
                }
                {response && <JSONPretty data={response} style={{color: 'black', textAlign: 'left', fontSize: '12px'}}></JSONPretty>}
                {(!submitted || error != null) &&
                    <form className="form-album" id="form-album-edit" onSubmit={handleSubmit(handleCreate)}>
                        <ul>
                            {errors?.number && <li>{errors.number.message}</li>}
                            {errors?.title && <li>{errors.title.message}</li>}
                            {errors?.total_tracks && <li>{errors.total_tracks.message}</li>}
                            {errors?.image && <li>{errors.image.message}</li>}
                            {errors?.description && <li>{errors.description.message}</li>}
                        </ul>
                        <div className="form-group">
                            <label>Album ID</label>
                            <input name="text" {...register('number', createFormOptions.number)}/>
                        </div>
                        <div className="form-group">
                            <label>Title</label>
                            <input type="text" name="title" {...register('title', createFormOptions.title)}/>
                        </div>
                        <div className="form-group">
                            <label>Total_tracks</label>
                            <input name="number" {...register('total_tracks', createFormOptions.total_tracks)}/>
                        </div>
                        <div className="form-group">
                            <label>Description</label>
                            <textarea name="description" {...register('description', createFormOptions.description)}/>
                        </div>
                        <div className="form-group">
                            <label>Image</label>
                            <input name="image" {...register('image', createFormOptions.image)}/>
                        </div>
                    </form>
                }
                <Modal.Actions style={{padding: '20px 10px 40px'}}>
                <Button floated='right' size='small' secondary inverted onClick={handleCancel} style={{display: (!showButton) ? "none" : ""}}
                >Cancel</Button>
                <Button floated='right' color='green' form="form-album-edit" type="submit" size='small'
                        style={{display: (!showButton) ? "none" : ""}}
                >Create</Button>
                <Button floated='right' primary onClick={handleOnClose} size='small'
                        style={{display: (!showButton) ? "" : "none"}}>Close</Button>
                </Modal.Actions>
            </Modal.Content>

        </Modal>
    );
};

export default CreateAlbum;