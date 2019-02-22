const initialState = {
    users: [],
    page: 1,
    pages: 0,
    pageButtonNumber: 10,
    perPage: 10
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'STORE_DATA':
        return {
            ...state,
            users: state.users.concat(action.payload),
            pages: Math.ceil(action.payload.length/state.perPage)
        };
        case 'CHANGE_PAGE':
        return {
            ...state,
            page: action.payload
        }
        case 'REMOVE_DATA':
        return {
            ...state,
            users: state.users.filter(user => {
                return user.id !== action.payload;
            })
        }
        case 'CHANGE_PER_PAGE':
        return {
            ...state,
            perPage: parseInt(action.payload),
            pages: Math.ceil(state.users.length / action.payload),
            page: 1
        }
        default: 
        return state;
    } 
};

export default reducer;