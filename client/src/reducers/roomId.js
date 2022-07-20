const roomIdReducer = (state="unknown",action) => {
    switch (action.type) {
        case "SUBMIT_ROOMID":
            return action.payload.roomId;
        default:
            return state;
    }
}

export default roomIdReducer;