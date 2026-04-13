"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import LabelText from "./labelText";

interface LatLngLiteral {
    lat: number;
    lng: number;
}

const libraries: "places"[] = ["places"];

const mapContainerStyle = {
    width: "100%",
    height: "400px",
};

const defaultCenter: LatLngLiteral = {
    lat: 37.7749, // San Francisco
    lng: -122.4194,
};

const API_KEY = process.env.NEXT_PUBLIC_MAP_KEY as string;

interface ViewMapProps {
    lat?: number;
    lng?: number;
}

export default function ViewMap({ lat, lng }: ViewMapProps) {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: API_KEY,
        libraries,
    });

    const [location, setLocation] = useState<LatLngLiteral>(defaultCenter);

    const mapRef = useRef<google.maps.Map | null>(null);

    const onMapLoad = useCallback((map: google.maps.Map) => {
        mapRef.current = map;
    }, []);

    const options: google.maps.MapOptions = {
        disableDefaultUI: true,
        zoomControl: true,
    };

    // Update location if props change
    useEffect(() => {
        if (lat !== undefined && lng !== undefined) {
            setLocation({ lat, lng });
        }
    }, [lat, lng]);

    if (loadError) return <div>Error loading maps</div>;
    if (!isLoaded) return <div>Loading maps...</div>;

    return (
        <div className=" w-full flex flex-col gap-3 items-center " >
            <LabelText>Location Map</LabelText>

<GoogleMap
            mapContainerStyle={mapContainerStyle}
            zoom={16}
            center={location}
            options={options}
            onLoad={onMapLoad}
        >
            <Marker position={location} />
        </GoogleMap>
        </div>
    );
}
