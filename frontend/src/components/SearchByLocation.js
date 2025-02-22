import React, { useState } from 'react';
import axios from 'axios';

const SearchByLocation = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [distance, setDistance] = useState(3);
    const searchByLocation = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/restaurants/search/location`, {
                params: { latitude, longitude, distance }
            });
            setRestaurants(response.data);
        } catch (error) {
            console.error("There was an error searching for restaurants by location!", error);
        }
    };

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px' }}>
            <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#2d3748', marginBottom: '24px' }}>Search by Location</h1>

            <div style={{ marginBottom: '24px' }}>
                <input
                    type="text"
                    placeholder="Longitude"
                    value={longitude}
                    onChange={(e) => setLongitude(e.target.value)}
                    style={{
                        padding: '10px',
                        marginRight: '12px',
                        borderRadius: '8px',
                        border: '1px solid #e2e8f0',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                    }}
                />
                <input
                    type="text"
                    placeholder="Latitude"
                    value={latitude}
                    onChange={(e) => setLatitude(e.target.value)}
                    style={{
                        padding: '10px',
                        marginRight: '12px',
                        borderRadius: '8px',
                        border: '1px solid #e2e8f0',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                    }}
                />
                <input
                    type="number"
                    placeholder="Distance (meters)"
                    value={distance}
                    onChange={(e) => setDistance(e.target.value)}
                    style={{
                        padding: '10px',
                        marginRight: '12px',
                        borderRadius: '8px',
                        border: '1px solid #e2e8f0',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                    }}
                />
                <button
                    onClick={searchByLocation}
                    style={{
                        backgroundColor: '#3182ce',
                        color: '#ffffff',
                        padding: '10px 16px',
                        borderRadius: '8px',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                        cursor: 'pointer',
                    }}
                >
                    Search by Location
                </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>
                {restaurants.map((restaurant) => (
                    <div
                        key={restaurant.id}
                        style={{
                            backgroundColor: '#ffffff',
                            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                            borderRadius: '8px',
                            overflow: 'hidden',
                            border: '1px solid #e2e8f0'
                        }}
                    >
                        <img
                            src={restaurant.featured_image}
                            alt={restaurant.name}
                            style={{
                                width: '100%',
                                height: '224px',
                                objectFit: 'cover',
                                transition: 'transform 0.3s',
                            }}
                        />
                        <div style={{ padding: '20px' }}>
                            <h2 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#1a202c', marginBottom: '8px' }}>
                                {restaurant.name}
                            </h2>
                            <p style={{ color: '#718096', marginBottom: '12px' }}>{restaurant.cuisines}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SearchByLocation;
