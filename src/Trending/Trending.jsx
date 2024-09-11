import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import Cards from '../card/Cards'
// import img from '../card/card.css'
function Trending() {
    const img='https://via.placeholder.com/100x180'
  return (
    <>
     {/* <Container>
            <Row className="py-3">
                <Col xs={12} style={{ fontWeight: 'bold', fontSize: '2rem', textAlign: 'center' }}>
                    Trending
                </Col>
            </Row>
        </Container> */}

     <Container>
      <Row className="py-3">
        <Col xs={12} style={{ fontWeight: 'bold', fontSize: '2rem'}}>
          Trending
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

export default Trending
