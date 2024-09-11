import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

function Footer() {
  return (
    <footer>
      <Container fluid>
        <Row className='bg-transparent blur text-white'>
          <Col>
          Column 1 Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odit vero illum magnam repudiandae laudantium minima, voluptas cum a excepturi alias similique voluptatem maxime deserunt debitis possimus omnis, fuga officiis iste!
          </Col>
          <Col>
          Column2
          </Col>
          <Col>
          Column3
          </Col>

        </Row>


      </Container>

    </footer>
  )
}

export default Footer
