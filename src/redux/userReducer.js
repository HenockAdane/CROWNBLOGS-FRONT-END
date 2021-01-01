export const updateUser = (currentUser) => ({
    type: "UPDATEUSER",
    currentUser
})


const IS = {
    currentUser: null
}

const userReducer = (state = IS, action) => {
    switch(action.type){
        case "UPDATEUSER":
            return {...state, currentUser: action.currentUser};
        default: return state
    }
}

export default userReducer