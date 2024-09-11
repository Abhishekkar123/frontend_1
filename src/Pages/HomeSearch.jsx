import React from 'react';
import { Container, Row, Col} from 'react-bootstrap';
import Search from '../Search/Search';

const HomeSearch = () => {
    return (
        <>
        <Container>
        <Row className="align-items-center justify-content-center py-3">
            {/* Left side: Buy and Rent boxes */}
            <Col xs="auto" className="d-flex">
            <div className="mx-2 p-2 border rounded" >Buy</div>
            <div className="mx-2 p-2 border rounded">Rent</div>
            </Col>

            {/* Right side: Commercial and Residential boxes */}
            <Col xs="auto" className="d-flex">
            <div className="mx-2 p-2 border rounded">Commercial</div>
            <div className="mx-2 p-2 border rounded" >Residential</div>
            <div className="mx-2 p-2 border rounded" >Pg</div>
            </Col>
            </Row>
            </Container>
      <Search/>
      </>

    );
};

export default HomeSearch;
