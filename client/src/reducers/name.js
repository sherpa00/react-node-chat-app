const nameReducer = (state="unknown",action) => {
    switch (action.type) {
        case "SUBMIT_NAME":
            return action.payload.name;
        default:
            return state;
    }
}

export default nameReducer;