// Import necessary libraries
import React from 'react';
import 'moment-timezone';

// Functional component for dispaying the info
const PriceTable = (props: any) => {
    // Get all the cinema names
    const locations = props.locations;
    return (
        
        <ol className="inner">
            {locations.map((location: any)=>(
                <li key={location.id}>
                <b>Place:</b> {location.properties.place}; <b>Magnitude:</b> {location.properties.mag}
                </li>
            ))}
        </ol>


    )
  }
  // Export the component as the default object
  export default PriceTable;
