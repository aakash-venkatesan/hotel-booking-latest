import React, { useEffect, useState } from "react";
import axios from "axios";

const FilterOptions = ({ onFilterChange }) => {
  const [loading, setLoading] = useState(true);

  const [priceRanges, setPriceRanges] = useState([
    { label: "Below $50", value: 50 },
    { label: "$50 - $100", value: 100 },
    { label: "$100 - $200", value: 200 },
    { label: "Above $200", value: 500 },
  ]);

  useEffect(() => {
    setLoading(false);
  }, []);

  const handleFilterChange = (event) => {
    const filterData = { priceRange: event.target.value };
    onFilterChange(filterData);
  };

  if (loading) {
    return <div>Loading filter options...</div>;
  }

  return (
    <div style={{ borderBottom: '2px solid #ddd', paddingBottom: '20px', paddingLeft: '20px', paddingRight: '20px' }}>
      <h2 style={{ fontSize: '2em', color: '#333', marginBottom: '15px' }}>Filter Options</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <label htmlFor="price-filter" style={{ fontSize: '1.1em', color: '#555' }}>
          Price Range:
        </label>
        <select
          id="price-filter"
          onChange={handleFilterChange}
          style={{ padding: '10px', fontSize: '1em', width: '100%', maxWidth: '250px' }}
        >
          <option value="all">All</option>
          {priceRanges.length > 0 ? (
            priceRanges.map((range, index) => (
              <option key={index} value={range.value}>
                {range.label}
              </option>
            ))
          ) : (
            <option value="default">No Price Ranges Available</option>
          )}
        </select>
      </div>
    </div>
  );
};

export default FilterOptions;
