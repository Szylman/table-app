import { Row, ListGroup, Col, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { getAllTables } from '../../redux/tablesRedux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const AllTables = () => {
    const tables = useSelector((state) => getAllTables(state));
    if (!tables)
    return (<span>Loading...</span>)
    return (
        <ListGroup variant='flush'>
        {tables.map((table) => (
            <ListGroup.Item key={table.id} className='px-0'>
            <Row>
                <Col md={2}>
                <h4>Table {table.id}</h4>
                </Col>
                <Col md={8} className='align-left'>
                <p>
                    <span >Status: </span>
                    {table.status}
                </p>
                </Col>
                <Col md={2}>
                <Link key={table.id} to={'/table/' + table.id}>
                    <Button>Show more</Button>
                </Link>
                </Col>
            </Row>
            </ListGroup.Item>
        ))}
        </ListGroup>
    );
};

AllTables.propTypes = {
    table: PropTypes.array,
};

export default AllTables;