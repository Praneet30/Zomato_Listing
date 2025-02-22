import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const RestaurantList = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(10); 
    const [searchTerm, setSearchTerm] = useState('');

    const fetchRestaurants = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/restaurants?page=${page}&limit=12`);
            setRestaurants(response.data);
            setTotalPages(10); 
        } catch (error) {
            console.error("There was an error fetching the restaurants!", error);
        }
    };

    useEffect(() => {
        fetchRestaurants();
    }, [page]);

    // Filter restaurants based on search term
    const filteredRestaurants = restaurants.filter(restaurant => {
        const searchLower = searchTerm.toLowerCase();
        const nameMatch = restaurant.name.toLowerCase().includes(searchLower);
        const cuisinesMatch = restaurant.cuisines.toLowerCase().includes(searchLower);
        return nameMatch || cuisinesMatch;
    });

    const handlePreviousPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    const handleNextPage = () => {
        if (page < totalPages) {
            setPage(page + 1);
        }
    };

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px' }}>
            <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#2d3748', marginBottom: '24px' }}>Restaurants</h1>

            <input
                type="text"
                placeholder="Search by name or cuisines..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                    padding: '10px',
                    width: '100%',
                    marginBottom: '12px',
                    borderRadius: '8px',
                    border: '1px solid #e2e8f0',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                }}
            />

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>
                {filteredRestaurants.map((restaurant) => (
                    <Link 
                        to={`/restaurant/${restaurant.id}`} 
                        key={restaurant.id} 
                        style={{ textDecoration: 'none', color: 'inherit' }} 
                    >
                        <div
                            style={{
                                backgroundColor: '#ffffff',
                                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                                borderRadius: '8px',
                                overflow: 'hidden',
                                border: '1px solid #e2e8f0',
                                display: 'flex',
                                flexDirection: 'column',
                                height: '100%'
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
                            <div style={{ padding: '20px', flex: '1' }}>
                                <h2 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#1a202c', marginBottom: '8px' }}>
                                    {restaurant.name}
                                </h2>
                                <p style={{ color: '#718096', marginBottom: '12px' }}>{restaurant.cuisines}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '24px' }}>
                <button
                    onClick={handlePreviousPage}
                    disabled={page === 1}
                    style={{
                        backgroundColor: '#3182ce',
                        color: '#ffffff',
                        padding: '10px 16px',
                        marginRight: '8px',
                        borderRadius: '8px',
                        cursor: page === 1 ? 'not-allowed' : 'pointer',
                        opacity: page === 1 ? 0.5 : 1,
                    }}
                >
                    Previous
                </button>
                <span style={{ fontSize: '1rem', color: '#2d3748' }}>
                    Page {page} of {totalPages}
                </span>
                <button
                    onClick={handleNextPage}
                    disabled={page === totalPages}
                    style={{
                        backgroundColor: '#3182ce',
                        color: '#ffffff',
                        padding: '10px 16px',
                        marginLeft: '8px',
                        borderRadius: '8px',
                        cursor: page === totalPages ? 'not-allowed' : 'pointer',
                        opacity: page === totalPages ? 0.5 : 1,
                    }}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default RestaurantList;
