import HTTP from '../../Classes/HTTP';

const STORE_DATA = 'STORE_DATA';
const CHANGE_PAGE = 'CHANGE_PAGE';
const REMOVE_DATA = 'REMOVE_DATA';
const CHANGE_PER_PAGE = 'CHANGE_PER_PAGE';

export const storeData = (data) => {
    return {
        type: STORE_DATA,
        payload: data
    }
}

export const changePage = (page) => {
    return {
        type: CHANGE_PAGE,
        payload: page
    }
}

export const changePerPage = (entries) => {
    return {
        type: CHANGE_PER_PAGE,
        payload: entries
    }
}

export const removeData = (id) => {
    return {
        type: REMOVE_DATA,
        payload: id
    }
}

export const getData = () => {
    return async dispatch => {
        try {
            let users = await HTTP.get('https://contact-browser.herokuapp.com/contacts');
            users = Object.keys(users).map(key => {
                return {
                    id: key,
                    name: users[key]
                };
            });
            dispatch(storeData(users));
        }
        catch (err) {
            console.log(err);
        }
    }
}

export const deleteData = (id, e) => {
    e.stopPropagation();
    return async dispatch => {
        let removedUserArray = [];
        try {
            await HTTP.delete('https://contact-browser.herokuapp.com/contact/', id);
            removedUserArray.splice(removedUserArray.findIndex(elem => {
                return elem.id === id
            }), 1);
            dispatch(removeData(id));
        } catch (err) {
            console.log(err);
        }
    }
}

