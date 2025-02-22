import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const RestaurantDetails = () => {
    const { id } = useParams(); 
    const [restaurant, setRestaurant] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRestaurant = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/restaurant/${id}`);
                setRestaurant(response.data);
                setLoading(false);
            } catch (error) {
                setError('There was an error fetching the restaurant details.');
                setLoading(false);
            }
        };

        fetchRestaurant();
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p style={{ color: '#f56565' }}>{error}</p>;

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px' }}>
            {restaurant ? (
                <div style={{
                    backgroundColor: '#ffffff',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    border: '1px solid #e2e8f0'
                }}>
                    <img
                        src={restaurant.featured_image}
                        alt={restaurant.name}
                        style={{
                            width: '100%',
                            height: '256px',
                            objectFit: 'cover'
                        }}
                    />
                    <div style={{ padding: '24px' }}>
                        <h1 style={{
                            fontSize: '2rem',
                            fontWeight: 'bold',
                            color: '#1a202c',
                            marginBottom: '16px'
                        }}>
                            {restaurant.name}
                        </h1>
                        <p style={{ color: '#718096', marginBottom: '16px' }}>{restaurant.cuisines}</p>
                        <p style={{
                            color: '#2d3748',
                            fontWeight: '600',
                            marginBottom: '16px'
                        }}>
                            ${restaurant.average_cost_for_two} for two
                        </p>
                        <p style={{ color: '#718096', marginBottom: '16px' }}>
                            Location: {restaurant.locality}, {restaurant.city}
                        </p>
                        <p style={{ color: '#718096', marginBottom: '16px' }}>
                            Rating: {restaurant.user_rating.aggregate_rating} ({restaurant.user_rating.votes} votes)
                        </p>
                        <a
                            href={restaurant.book_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                color: '#3182ce',
                                fontWeight: '500',
                                textDecoration: 'none',
                                ':hover': { color: '#2c5282' }
                            }}
                        >
                            Book a Table
                        </a>
                        <p style={{ color: '#718096', marginTop: '16px' }}>
                            More Info: <a href={restaurant.url} style={{ color: '#3182ce', textDecoration: 'none' }}>Restaurant Website</a>
                        </p>
                    </div>
                </div>
            ) : (
                <p style={{ color: '#718096' }}>Restaurant not found.</p>
            )}
        </div>
    );
};

export default RestaurantDetails;
