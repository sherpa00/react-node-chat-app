import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { submitName, submitRoomId } from "../actions";

function HomePage() {

    const [username,setUsername] = useState("");
    const [userRoom,setUserRoom] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (username === "" || userRoom === "") {
            alert("Name and RoomId should not be empty");
        } else {
            dispatch(submitName(username));
            dispatch(submitRoomId(userRoom));
            navigate("/messages");
            setUserRoom("");
            setUsername("");
        }
    }

    const handleUserChange = (e) => {
        setUsername(e.target.value);
    }

    const handleRoomChange = (e) => {
        setUserRoom(e.target.value);
    }

    return ( 
        <div className="home-page">
            <h2>Welcome ! Buddy</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Your Name:</label>
                <input id="name" type="text" placeholder="...name" value={username} onChange={handleUserChange}/>
                <label htmlFor="room-id">Enter Room Id:</label>
                <input id="room-id" type="text" placeholder="...room id" value={userRoom} onChange={handleRoomChange}/>
                <button type="submit">Let's Go</button>
            </form>
        </div>
     );
}

export default HomePage;