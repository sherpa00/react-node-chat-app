import { createRef, useEffect, useRef, useState } from "react";
import Picker from "emoji-picker-react";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "../actions";
import io from "socket.io-client";

const socket = io.connect("http://localhost:3001");

function ChatPage() {

    const messageList = useSelector(store => store.messageList);
    const name = useSelector(store => store.name);
    const roomId = useSelector(store => store.roomId);

    useEffect(() => {
        socket.emit("join_room",roomId);
    },[roomId])

    useEffect(() => {

        socket.on("console",() => {
            console.log("Okay consoled!")
        })
        socket.on("get message",(data) => {
            console.log("Receive Message");
            dispatch(addMessage({
                msg: data.msg,
                type: data.type,
                name: `${data.name}`,
                room: `${data.room}`
            }))
        });
    },[socket])

    const dispatch = useDispatch();

    const handleMessageSent = (msg) => {
        dispatch(addMessage({
            msg: msg,
            type: "sent",
            name: `${name}`
        }));
        socket.emit("send_message", {
            msg: msg,
            type: "received",
            name: `${name}`,
            room: `${roomId}`
        });
    }

    return ( 
        <div className="chat-page">
            <h2>Room Id: <u>{roomId}</u> <br></br>Username: <u>{name}</u></h2>
            <ChatDisplay
                messages={messageList}
                socket={socket}
            />
            <InputMessage
                onMessageHandle={handleMessageSent}
            />
        </div>
     );
}

function ChatDisplay(props) {

    const messages = props.messages;

    return (
        <div className="chat-display">
            {
                messages === [] ? null : messages.map((el,index) => {
                    return <SingleChat
                                text={el.msg}
                                class={el.type}
                                name={el.name}
                                key={index}
                            />
                })
            }
        </div>
    )
}

function SingleChat(props) {
    const chatRef = createRef();

    useEffect(() => {
        chatRef.current.scrollIntoView({
            behavior: "smooth"
        });
    },[])

    return (
        <div className="single-chat" id={props.class} ref={chatRef}>
            <p id="name">{props.name}</p>
            <p id="msg">{props.text}</p>
        </div>
    )
}

function InputMessage(props) {

    const [message,setMessage] = useState("");
    const [showEmoji,setShowEmoji] = useState(false);

    const handleMessageSent = (e) => {
        e.preventDefault();
        props.onMessageHandle(message);
        setMessage("");
        setShowEmoji(false);
    }

    const handleMessageChange = (e) => {
        setMessage(e.target.value);
    }

    //show emoji picker
    const handleShowEmoji = () => {
        setShowEmoji(prevState => !prevState);
    }

    // emoji change handler
    const onEmojiClick = (event,emojiObject) => {
        setMessage(message+emojiObject.emoji)
    }

    return (
        <div className="input-message">
            {
                showEmoji ? <div id="emoji-picker"><Picker onEmojiClick={onEmojiClick} id="emoji-picker"/></div> : null
            }
            <form onSubmit={handleMessageSent}>
                <input type="text" id="input-message" placeholder="...type something" value={message} onChange={handleMessageChange}/>
                <span className="material-symbols-outlined" id="smiley-icon" title="emoji" onClick={handleShowEmoji}>
                    sentiment_satisfied
                </span>
                <button type="submit">Send</button>
            </form>
        </div>
    )
}
export default ChatPage;