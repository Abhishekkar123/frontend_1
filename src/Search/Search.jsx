import React from 'react';
import { Container, Row, Col, InputGroup, FormControl, Button } from 'react-bootstrap';

const Search = () => {
    return (
        <Container>
            <Row className="justify-content-center py-3">
                <Col xs={12} md={6}>
                    <InputGroup>
                        <FormControl
                            placeholder="Search..."
                            aria-label="Search"
                            aria-describedby="basic-addon2"
                        />
                        <Button variant="primary" id="button-addon2">
                            Search
                        </Button>
                    </InputGroup>
                </Col>
            </Row>
        </Container>
    );
};

export default Search;
