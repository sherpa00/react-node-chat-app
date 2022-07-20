const myState = [
    
];

const messageListReducer = (state=myState,action) => {
    switch (action.type) {
        case "ADD":
            return [...state,action.payload.msgObject];
        default:
            return state;
    }
}

export default messageListReducer;