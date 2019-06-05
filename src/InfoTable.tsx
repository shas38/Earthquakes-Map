// Import necessary libraries
import React from 'react';
import Table from 'react-bootstrap/Table'
import Moment from 'react-moment';
import 'moment-timezone';

// Functional component for dispaying the info
const PriceTable = (props: any) => {
    const location = props.location;
    console.log(location)
    return (
      <div>
        <Table striped bordered hover variant="dark">
          <tbody>
            <tr>
                <td colSpan={2}>
                  <b>Location</b>
                </td>
                <td>
                  {location.properties.place}
                </td> 
            </tr>
            <tr>
                <td colSpan={2}>
                  <b>Time</b>
                </td>
                <td>
                    <Moment date={location.properties.time} />
                </td> 
            </tr>
            <tr>
                <td colSpan={2}>
                  <b>Latitude</b>
                </td>
                <td>
                    {location.geometry.coordinates[1]}
                </td> 
            </tr>
            <tr>
                <td colSpan={2}>
                  <b>Longitude</b>
                </td>
                <td>
                    {location.geometry.coordinates[0]}
                </td> 
            </tr>
            <tr>
                <td colSpan={2}>
                  <b>Depth</b>
                </td>
                <td>
                    {location.geometry.coordinates[2]}
                </td> 
            </tr>
            <tr>
                <td colSpan={2}>
                  <b>Tsunami</b>
                </td>
                <td>
                    {location.properties.tsunami}
                </td> 
            </tr>
            <tr>
                <td colSpan={2}>
                  <b>Magnitude </b>
                </td>
                <td>
                    {location.properties.mag}
                </td> 
            </tr>
          </tbody>
        </Table>
      </div>
    )
  }
  // Export the component as the default object
  export default PriceTable;