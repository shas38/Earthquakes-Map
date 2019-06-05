// Import necessary libraries
import React from 'react';
import Table from 'react-bootstrap/Table'
import Moment from 'react-moment';
import 'moment-timezone';

// Functional component for dispaying the info
const PriceTable = (props: any) => {
    // Get all the cinema names
    const locations = props.locations;
    return (

    <ul>
        {locations.map((location: any)=>(
            <li key={location.id}>
            {location.properties.place}
            </li>
        ))}
    </ul>

    )
  }
  // Export the component as the default object
  export default PriceTable;