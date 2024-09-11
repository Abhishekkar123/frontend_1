import React, { useEffect, useState } from 'react';
import { ProgressBar } from 'react-bootstrap';
import axios from 'axios';

function Form() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    Name:'',
    title: '',
    description: '',
    userAdType: '',
    postedBy:'',
    userType: '',
    location: {
      area: '',
      pincode: '',
      city: ''
    },
    price: '',
    communityAmenities: {
      pool: false,
      gym: false,
      clubhouse: false,
      playground: false,
      businessCenter: false,
      securitySystem: false,
      rooftopTerrace: false,
      solarPanels: false,
      recyclingProgram: false,
      age: '',
      maintenance: ''
    },
    images: [],
    userId:''
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    const nameParts = name.split('.');

    if (type === 'checkbox') {
      setFormData((prevData) => ({
        ...prevData,
        [nameParts[0]]: {
          ...prevData[nameParts[0]],
          [nameParts[1]]: checked
        }
      }));
    } else if (type === 'file') {
      setFormData((prevData) => ({
        ...prevData,
        images: files
      }));
    } else if (nameParts.length === 1) {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [nameParts[0]]: {
          ...prevData[nameParts[0]],
          [nameParts[1]]: value
        }
      }));
    }
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  useEffect(()=>{
    console.log(localStorage.getItem('id'))
  })

  const submitForm = async () => {
    console.log('Form submitted:', formData);
    
    // Prepare form data for submission
    const formDataToSend = new FormData();
    formDataToSend.append('name',formData.Name)
    formDataToSend.append('title', formData.title);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('userAdType', formData.userAdType);
    formDataToSend.append('postedBy', formData.postedBy);
    formDataToSend.append('userType', formData.userType);
    formDataToSend.append('location[area]', formData.location.area);
    formDataToSend.append('location[pincode]', formData.location.pincode);
    formDataToSend.append('location[city]', formData.location.city);
    formDataToSend.append('price', formData.price);
    formDataToSend.append('communityAmenities[pool]', formData.communityAmenities.pool);
    formDataToSend.append('communityAmenities[gym]', formData.communityAmenities.gym);
    formDataToSend.append('communityAmenities[clubhouse]', formData.communityAmenities.clubhouse);
    formDataToSend.append('communityAmenities[playground]', formData.communityAmenities.playground);
    formDataToSend.append('communityAmenities[businessCenter]', formData.communityAmenities.businessCenter);
    formDataToSend.append('communityAmenities.[securitySystem]', formData.communityAmenities.securitySystem);
    formDataToSend.append('communityAmenities.[rooftopTerrace]', formData.communityAmenities.rooftopTerrace);
    formDataToSend.append('communityAmenities.[solarPanels]', formData.communityAmenities.solarPanels);
    formDataToSend.append('communityAmenities.[recyclingProgram]', formData.communityAmenities.recyclingProgram);
    formDataToSend.append('communityAmenities.[age]', formData.communityAmenities.age);
    formDataToSend.append('communityAmenities.[maintenance]', formData.communityAmenities.maintenance);
    formDataToSend.append('userId',localStorage.getItem('id'))

    for (let i = 0; i < formData.images.length; i++) {
      formDataToSend.append('images', formData.images[i]);
    }

    try {
      const response = await axios.post("http://localhost:8000/add-property", formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div>
            <h3 className="text-center mb-4">Step 1: Property Details</h3>
            <div className="form-group mb-3">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                className="form-control"
                id="Name"
                name="Name"
                value={formData.Name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group mb-3">
              <label htmlFor="title">Title:</label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="description">Description:</label>
              <textarea
                className="form-control"
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="userAdType">Ad Type:</label>
              <select
                className="form-select"
                id="userAdType"
                name="userAdType"
                value={formData.userAdType}
                onChange={handleChange}
                required
              >
                <option value="">Select Ad Type</option>
                <option value="Rent">Rent</option>
                <option value="Resale">Resale</option>
                <option value="Pg">Pg</option>
                <option value="Flatmate">Flatmate</option>
              </select>
            </div>
            <div className="form-group mb-3">
              <label htmlFor="postedBy">Posted By:</label>
              <select
                className="form-select"
                id="postedBy"
                name="postedBy"
                value={formData.postedBy}
                onChange={handleChange}
                required
              >
                <option value="">Select Posted By</option>
                <option value="Owner">Owner</option>
                <option value="Builder">Builder</option>
                <option value="Agent">Agent</option>
                <option value="Flatmate">Flatmate</option>
              </select>
            </div>
            <div className="form-group mb-3">
              <label htmlFor="userType">User Type:</label>
              <select
                className="form-select"
                id="userType"
                name="userType"
                value={formData.userType}
                onChange={handleChange}
                required
              >
                <option value="">Select User Type</option>
                <option value="Commercial">Commercial</option>
                <option value="Residential">Residential</option>
                <option value="Pg">Pg</option>
              </select>
            </div>
            <div className="form-group mb-3">
              <label htmlFor="area">Area:</label>
              <input
                type="text"
                className="form-control"
                id="area"
                name="location.area"
                value={formData.location.area}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="pincode">Pincode:</label>
              <input
                type="text"
                className="form-control"
                id="pincode"
                name="location.pincode"
                value={formData.location.pincode}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="city">City:</label>
              <input
                type="text"
                className="form-control"
                id="city"
                name="location.city"
                value={formData.location.city}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group mb-4">
              <label htmlFor="price">Price:</label>
              <input
                type="number"
                className="form-control"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>
            <div className="d-flex justify-content-between">
              <button className="btn btn-primary" onClick={nextStep}>Next</button>
            </div>
          </div>
        );
      case 2:
        return (
          <div>
            <h3 className="text-center mb-4">Step 2: Community Amenities</h3>
            <div className="form-check mb-2">
              <input
                className="form-check-input"
                type="checkbox"
                id="pool"
                name="communityAmenities.pool"
                checked={formData.communityAmenities.pool}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="pool">
                Pool
              </label>
            </div>
            <div className="form-check mb-2">
              <input
                className="form-check-input"
                type="checkbox"
                id="gym"
                name="communityAmenities.gym"
                checked={formData.communityAmenities.gym}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="gym">
                Gym
              </label>
            </div>
            <div className="form-check mb-2">
              <input
                className="form-check-input"
                type="checkbox"
                id="clubhouse"
                name="communityAmenities.clubhouse"
                checked={formData.communityAmenities.clubhouse}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="clubhouse">
                Clubhouse
              </label>
            </div>
            <div className="form-check mb-2">
              <input
                className="form-check-input"
                type="checkbox"
                id="playground"
                name="communityAmenities.playground"
                checked={formData.communityAmenities.playground}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="playground">
                Playground
              </label>
            </div>
            <div className="form-check mb-2">
              <input
                className="form-check-input"
                type="checkbox"
                id="businessCenter"
                name="communityAmenities.businessCenter"
                checked={formData.communityAmenities.businessCenter}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="businessCenter">
                Business Center
              </label>
            </div>
            <div className="form-check mb-2">
              <input
                className="form-check-input"
                type="checkbox"
                id="securitySystem"
                name="communityAmenities.securitySystem"
                checked={formData.communityAmenities.securitySystem}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="securitySystem">
                Security System
              </label>
            </div>
            <div className="form-check mb-2">
              <input
                className="form-check-input"
                type="checkbox"
                id="rooftopTerrace"
                name="communityAmenities.rooftopTerrace"
                checked={formData.communityAmenities.rooftopTerrace}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="rooftopTerrace">
                Rooftop Terrace
              </label>
            </div>
            <div className="form-check mb-2">
              <input
                className="form-check-input"
                type="checkbox"
                id="solarPanels"
                name="communityAmenities.solarPanels"
                checked={formData.communityAmenities.solarPanels}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="solarPanels">
                Solar Panels
              </label>
            </div>
            <div className="form-check mb-2">
              <input
                className="form-check-input"
                type="checkbox"
                id="recyclingProgram"
                name="communityAmenities.recyclingProgram"
                checked={formData.communityAmenities.recyclingProgram}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="recyclingProgram">
                Recycling Program
              </label>
            </div>
            <div className="form-group mb-3">
              <label htmlFor="age">Age:</label>
              <input
                type="text"
                className="form-control"
                id="age"
                name="communityAmenities.age"
                value={formData.communityAmenities.age}
                onChange={handleChange}
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="maintenance">Maintenance:</label>
              <input
                type="text"
                className="form-control"
                id="maintenance"
                name="communityAmenities.maintenance"
                value={formData.communityAmenities.maintenance}
                onChange={handleChange}
              />
            </div>
            <div className="d-flex justify-content-between">
              <button className="btn btn-secondary" onClick={prevStep}>Back</button>
              <button className="btn btn-primary" onClick={nextStep}>Next</button>
            </div>
          </div>
        );
      case 3:
        return (
          <div>
            <h3 className="text-center mb-4">Step 3: Upload Images</h3>
            <div className="form-group mb-3">
              <label htmlFor="images">Upload Images:</label>
              <input
                type="file"
                className="form-control"
                id="images"
                name="images"
                multiple
                accept="image/*"
                onChange={handleChange}
              />
            </div>
            <div className="d-flex justify-content-between">
              <button className="btn btn-secondary" onClick={prevStep}>Back</button>
              <button className="btn btn-primary" onClick={nextStep}>Next</button>
            </div>
          </div>
        );
      case 4:
        return (
          <div>
            <h3 className="text-center mb-4">Review & Submit</h3>
            <div className="form-group mb-3">
              <label htmlFor="reviewTitle">Title:</label>
              <input
                type="text"
                className="form-control"
                id="reviewTitle"
                name="reviewTitle"
                value={formData.title}
                readOnly
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="reviewDescription">Description:</label>
              <textarea
                className="form-control"
                id="reviewDescription"
                name="reviewDescription"
                value={formData.description}
                readOnly
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="reviewUserAdType">Ad Type:</label>
              <input
                type="text"
                className="form-control"
                id="reviewUserAdType"
                name="reviewUserAdType"
                value={formData.userAdType}
                readOnly
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="reviewUserType">User Type:</label>
              <input
                type="text"
                className="form-control"
                id="reviewUserType"
                name="reviewUserType"
                value={formData.userType}
                readOnly
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="reviewArea">Area:</label>
              <input
                type="text"
                className="form-control"
                id="reviewArea"
                name="reviewArea"
                value={formData.location.area}
                readOnly
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="reviewPincode">Pincode:</label>
              <input
                type="text"
                className="form-control"
                id="reviewPincode"
                name="reviewPincode"
                value={formData.location.pincode}
                readOnly
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="reviewCity">City:</label>
              <input
                type="text"
                className="form-control"
                id="reviewCity"
                name="reviewCity"
                value={formData.location.city}
                readOnly
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="reviewPrice">Price:</label>
              <input
                type="number"
                className="form-control"
                id="reviewPrice"
                name="reviewPrice"
                value={formData.price}
                readOnly
              />
            </div>
            <div className="form-group mb-3">
              <label>Community Amenities:</label>
              <ul>
                {Object.keys(formData.communityAmenities).map((key) => (
                  <li key={key}>
                    {key.replace(/([A-Z])/g, ' $1').toUpperCase()}: {formData.communityAmenities[key] ? 'Yes' : 'No'}
                  </li>
                ))}
              </ul>
            </div>
            <div className="form-group mb-3">
              <label>Uploaded Images:</label>
              <div>
                {Array.from(formData.images).map((file, index) => (
                  <img
                    key={index}
                    src={URL.createObjectURL(file)}
                    alt={`Uploaded preview ${index + 1}`}
                    className="img-thumbnail"
                    style={{ maxWidth: '200px', margin: '5px' }}
                  />
                ))}
              </div>
            </div>
            <div className="d-flex justify-content-between mt-3">
              <button className="btn btn-secondary" onClick={prevStep}>Back</button>
              <button className="btn btn-success" onClick={submitForm}>Submit</button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="properties-container">
      <div className="d-flex justify-content-center mt-5 mb-4">
        <div className="col-md-8">
          <ProgressBar now={(step / 4) * 100} className="mb-4" />
          <div className="card shadow">
            <div className="card-body">
              {renderStepContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Form;
