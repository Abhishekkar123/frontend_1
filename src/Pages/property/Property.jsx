import React, { useEffect, useState } from 'react';
import './property.css';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Property() {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [searchQuery, setSearchQuery] = useState(''); // State for the search query
  const [filteredProperties, setFilteredProperties] = useState([]); // State for filtered properties

  // Fetch properties from the backend
  useEffect(() => {
    axios.get('http://localhost:8000/listing-property')
      .then((response) => {
        console.log(response.data);
        setProperties(response.data);
        setFilteredProperties(response.data); // Initially, all properties are shown
      })
      .catch((error) => {
        console.error('Error fetching properties:', error);
      });
  }, []);

  // Handle search input change
  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase(); // Convert to lowercase for case-insensitive search
    setSearchQuery(query);

    // Filter properties based on the title or description
    const filtered = properties.filter((property) => 
      property.title.toLowerCase().includes(query) || 
      property.description.toLowerCase().includes(query)
    );

    setFilteredProperties(filtered); // Update filtered properties
  };

  // Navigate to the property details page
  const handleLink = (id) => {
    navigate(`/listing/properties/${id}`);
  };

  return (
    <>
      <div className="properties-container">
        {/* Search part */}
        <div className="container my-4">
          <div className="d-flex mb-3">
            <FormControl
              placeholder="Search by Title or Description"
              className="p-3 flex-grow-1"
              value={searchQuery}
              onChange={handleSearchChange} // Bind the input to handleSearchChange
            />
            <Button variant="primary">Search</Button>
          </div>

          {/* Display filtered properties */}
          {filteredProperties.map((property) => (
            <div className="card mb-3 property-card" key={property._id}>
              <div className="row g-0">
                <div className="col-md-4">
                  <img
                    src={property.images[0] || 'default-image.jpg'}
                    className="img-fluid rounded-start"
                    alt={property.title}
                  />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title">{property.title}</h5>
                    <p className="card-text">{property.description}</p>
                    <p className="card-text">
                      <small className="text-muted">Location: {property.location.city}</small>
                    </p>
                    <p className="card-text">
                      <small className="text-muted">Price: ${property.price}</small>
                    </p>
                    <Button variant="primary" onClick={() => handleLink(property._id)}>
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Property;
