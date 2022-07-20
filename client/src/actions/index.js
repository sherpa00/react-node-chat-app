export const submitName = (name) => {
    return {
        type: "SUBMIT_NAME",
        payload: {
            name: name
        }
    }
}

export const submitRoomId = (roomId) => {
    return {
        type: "SUBMIT_ROOMID",
        payload: {
            roomId: roomId
        }
    }
}

export const addMessage = (msgObject) => {
    return {
        type: "ADD",
        payload: {
            msgObject: msgObject
        }
    }
}

