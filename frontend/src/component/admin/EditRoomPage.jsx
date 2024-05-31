import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ApiService from '../../service/ApiService';

const EditRoomPage = () => {
    const { roomId } = useParams();
    const navigate = useNavigate();
    const [roomDetails, setRoomDetails] = useState({
        roomPhotoUrl: '',
        roomType: '',
        roomPrice: '',
        roomDescription: '',
    });
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        const fetchRoomDetails = async () => {
            try {
                const response = await ApiService.getRoomById(roomId);
                setRoomDetails({
                    roomPhotoUrl: response.room.roomPhotoUrl,
                    roomType: response.room.roomType,
                    roomPrice: response.room.roomPrice,
                    roomDescription: response.room.roomDescription,
                });
            } catch (error) {
                setError(error.response?.data?.message || error.message);
            }
        };
        fetchRoomDetails();
    }, [roomId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRoomDetails(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setPreview(URL.createObjectURL(selectedFile));
        } else {
            setFile(null);
            setPreview(null);
        }
    };


    const handleUpdate = async () => {
        try {
            const formData = new FormData();
            formData.append('roomType', roomDetails.roomType);
            formData.append('roomPrice', roomDetails.roomPrice);
            formData.append('roomDescription', roomDetails.roomDescription);

            if (file) {
                formData.append('photo', file);
            }

            const result = await ApiService.updateRoom(roomId, formData);
            if (result.statusCode === 200) {
                setSuccess('Room updated successfully.');
                
                setTimeout(() => {
                    setSuccess('');
                    navigate('/admin/manage-rooms');
                }, 3000);
            }
            setTimeout(() => setSuccess(''), 5000);
        } catch (error) {
            setError(error.response?.data?.message || error.message);
            setTimeout(() => setError(''), 5000);
        }
    };

    const handleDelete = async () => {
        if (window.confirm('Do you want to delete this room?')) {
            try {
                const result = await ApiService.deleteRoom(roomId);
                if (result.statusCode === 200) {
                    setSuccess('Room Deleted successfully.');
                    
                    setTimeout(() => {
                        setSuccess('');
                        navigate('/admin/manage-rooms');
                    }, 3000);
                }
            } catch (error) {
                setError(error.response?.data?.message || error.message);
                setTimeout(() => setError(''), 5000);
            }
        }
    };

    return (
        <div className="edit-room-container">
            <h2>Edit Room</h2>
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}
            <div className="edit-room-form">
                <div className="form-group">
                    {preview ? (
                        <img src={preview} alt="Room Preview" className="room-photo-preview" />
                    ) : (
                        roomDetails.roomPhotoUrl && (
                            <img src={roomDetails.roomPhotoUrl} alt="Room" className="room-photo" />
                        )
                    )}
                    <input
                        type="file"
                        name="roomPhoto"
                        onChange={handleFileChange}
                    />
                </div>
                <div className="form-group">
                    <label>Room Type</label>
                    <input
                        type="text"
                        name="roomType"
                        value={roomDetails.roomType}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Room Price</label>
                    <input
                        type="text"
                        name="roomPrice"
                        value={roomDetails.roomPrice}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Room Description</label>
                    <textarea
                        name="roomDescription"
                        value={roomDetails.roomDescription}
                        onChange={handleChange}
                    ></textarea>
                </div>
                <button className="update-button" onClick={handleUpdate}>Update Room</button>
                <button className="delete-button" onClick={handleDelete}>Delete Room</button>
            </div>
        </div>
    );
};

export default EditRoomPage;
