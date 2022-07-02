import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useParams, Link } from 'react-router-dom';
import { getLocation, getLocations } from '../../store/location';

function LocationsDisplay() {
  const dispatch = useDispatch();
  const locations = useSelector(state => {
    return Object.values(state.location)
  });
  const user = useSelector(state => {
    return state.session.user
  })


  useEffect(() => {
    dispatch(getLocations());
  }, [dispatch, user])

    if(!locations) {
      <h1>Nothing Loaded</h1>
    } else {

    return (
        <>
        {user !== undefined && user !== null ? <Link to='/location/new'>Create New Location</Link> : null}
        {locations ? locations.map(location => (
          // this fixed the re render issue but why
            <div key={location.id + 7} className='mainPageDisplayDivs'>

                <h1>
                    <Link to={`/location/${location.id}`}> {location.name} </Link>
                </h1>
                <p>
                    {location.city}, {location.country}
                </p>
            </div>
        )): null}
        </>
    );
    }
}

export default LocationsDisplay;
