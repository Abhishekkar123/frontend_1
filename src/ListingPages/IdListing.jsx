import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
const apiUrl = import.meta.env.VITE_API_URL;
function IdListing() {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    // Fetch property details from the backend using Axios
    axios
      .get(`${apiUrl}/listing-property/${id}`)
      .then((response) => {
        console.log(response.data);
        setData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching property details:', error);
      });
  }, [id]);

  if (!data) return <p>Loading...</p>;

  return (
    <Container className="property-details mt-5">
      <Row>
        <Col md={10}>
          {/* Property Title and Description */}
          <Card className="mb-4 shadow-sm">
            <Card.Body>
              {data.images.length > 0 ? (
                data.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Property Image ${index + 1}`}
                    className="img-fluid mb-2"
                    style={{ width: '100%', height: 'auto', borderRadius: '5px' }}
                  />
                ))
              ) : (
                <p>No images available.</p>
              )}
              <Card.Title className="text-primary mb-3">{data.title}</Card.Title>
              <Card.Subtitle className="mb-3 text-muted">{data.isAvailable ? 'Available' : 'Not Available'}</Card.Subtitle>
              <Card.Text><strong>Description:</strong> {data.description}</Card.Text>
              <Card.Text><strong>Price:</strong> ${data.price}</Card.Text>
              <Card.Text><strong>Posted By:</strong> {data.postedBy}</Card.Text>
              <Button variant="success" className="me-2">Contact Owner</Button>
              <Button variant="outline-primary">Schedule Visit</Button>
            </Card.Body>
          </Card>

          {/* Location Details */}
          <Card className="mb-4 shadow-sm">
            <Card.Body>
              <Card.Title>Location</Card.Title>
              <Row>
                <Col><strong>City:</strong> {data.location.city}</Col>
                <Col><strong>Area:</strong> {data.location.area}</Col>
                <Col><strong>Pincode:</strong> {data.location.pincode}</Col>
              </Row>
            </Card.Body>
          </Card>

          {/* Amenities */}
          <Card className="mb-4 shadow-sm">
            <Card.Body>
              <Card.Title>General Amenities</Card.Title>
              <ul>
                {Object.entries(data.generalAmenities).map(([amenity, available]) => (
                  <li key={amenity}>
                    <strong>{amenity.charAt(0).toUpperCase() + amenity.slice(1)}:</strong> {available ? 'Yes' : 'No'}
                  </li>
                ))}
              </ul>
            </Card.Body>
          </Card>

          <Card className="mb-4 shadow-sm">
            <Card.Body>
              <Card.Title>Community Amenities</Card.Title>
              <ul>
                {Object.entries(data.communityAmenities).map(([amenity, available]) => (
                  <li key={amenity}>
                    <strong>{amenity.charAt(0).toUpperCase() + amenity.slice(1)}:</strong> {available ? 'Yes' : 'No'}
                  </li>
                ))}
              </ul>
            </Card.Body>
          </Card>
        </Col>

        
      </Row>
    </Container>
  );
}

export default IdListing;
