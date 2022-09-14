import shortid from 'shortid';

//selectors
export const getAllTables = ({ tables }) => tables;
export const getTableById = ({ tables }, tableId) => tables.find(table => table.id === tableId);

// actions
const createActionName = actionName => `app/tables/${actionName}`;

const REMOVE_TABLE = createActionName('REMOVE_TABLE')
const ADD_TABLE = createActionName('ADD_TABLE');
const EDIT_TABLE = createActionName('EDIT_TABLE');
const UPDATE_TABLES = createActionName('UPDATE_TABLES');

// action creators
export const removeTable = payload => ({type: REMOVE_TABLE, payload})
export const addTable = payload => ({type: ADD_TABLE, payload})
export const editTable = payload => ({type: EDIT_TABLE, payload})
export const updateTables = payload => ({type: UPDATE_TABLES, payload})

export const fetchData = () => {
    return (dispatch) => {
        fetch('http://localhost:3131/tables')
            .then(res => res.json())
            .then(tables => dispatch(updateTables(tables)))        
    }
};

export const editTableRequest = (editedTable) => {
    return (dispatch) => {
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(editedTable),
        };
        fetch('http://localhost:3131/tables/' + editedTable.id, options)
        .then(() => dispatch(editTable(editedTable)))
    }
};

const tablesReducer = (statePart = [], action) => {
    switch(action.type) {
        case REMOVE_TABLE:
            return statePart.filter(table => table.id !== action.payload);
        
        case ADD_TABLE:
            return [...statePart, { ...action.payload, id: shortid()}]
        
        case EDIT_TABLE:
            return statePart.map(table => (table.id === action.payload.id ? { ...table, ...action.payload } : table));
        
        case UPDATE_TABLES:
            return [...action.payload]
        
        default:
            return statePart;
    }
}

export default tablesReducer