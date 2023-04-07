import { useContext, useState } from "react";

import { ACTION_TYPES, storeContext } from "../store/store-context";

const useTrackLocation = () => {
    const [locationErrorMsg, setLocationErrorMsg] = useState(null);
    const [findingLocation, setFindingLocation] = useState(false);

    const { dispatch } = useContext(storeContext);

    const success = (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        dispatch({
            type: ACTION_TYPES.SET_LAT_LONG,
            payload: { latLong: `${latitude},${longitude}`}
        })
        setLocationErrorMsg(null);
        setFindingLocation(false);
    };
    
    const error = () => {
        setLocationErrorMsg('Unable to retrieve your location');
        setFindingLocation(false);
    };

    const handleTrackLocation = () => {
        setFindingLocation(true);

        if (!navigator.geolocation) {
            setLocationErrorMsg('Geolocation is not supported by your browser');
            setFindingLocation(false);
        } else {
            navigator.geolocation.getCurrentPosition(success, error);
        };
    };

    return {
        handleTrackLocation,
        locationErrorMsg,
        findingLocation
    };
};

export default useTrackLocation;