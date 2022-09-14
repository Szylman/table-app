import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { editTableRequest, getTableById } from "../../../redux/tablesRedux";
import TableForm from "../../features/TableForm";


const SingleTable = props => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { tableId } = useParams();
    const tableData = useSelector(state => getTableById(state, tableId));

    const handleSubmit = table => {
        dispatch(editTableRequest({...tableData, ...table}));
        navigate('/');
    }

    if(!tableData) return <Navigate to="/" />
    else

	return (
    <TableForm 
    action={handleSubmit} 
    actionText="Edit table" 
    variant='edit' 
    status={tableData.status} 
    people={tableData.people}
    maxPeople={tableData.maxPeople} 
    bill={tableData.bill} 
    id={tableData.id}
    />
    )
};

export default SingleTable; 