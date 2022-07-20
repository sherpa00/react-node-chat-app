import messageListReducer from "./messageList";
import nameReducer from "./name";
import roomIdReducer from "./roomId";
import {combineReducers} from "redux";

const joinedReducer = combineReducers({
    name: nameReducer,
    roomId: roomIdReducer,
    messageList: messageListReducer
});

export default joinedReducer;