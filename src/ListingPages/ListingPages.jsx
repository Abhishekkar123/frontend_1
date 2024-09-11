import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import Cards from '../card/Cards'
function ListingPages({title}) {

    const img='https://via.placeholder.com/100x180'
  return (
    <>

<Container>
      <Row className="py-3">
        <Col xs={12} style={{ fontWeight: 'bold', fontSize: '2rem'}}>
          {title}
        </Col>
      </Row>
    </Container>
    <Container>
      <Row className="justify-content-center">
        <Col xs="auto">
          <Cards img={img} />
        </Col>
        <Col xs="auto">
          <Cards img={img} />
        </Col>
        <Col xs="auto">
          <Cards img={img} />
        </Col>
      </Row>
    </Container>
      
    </>
  )
}

export default ListingPages
