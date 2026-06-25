import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'; // 🔥 Added useMap
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect } from 'react';

import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34]
});
L.Marker.prototype.options.icon = DefaultIcon;

// NEW: Custom Sub-Component to change map view dynamically when coordinates change
const ChangeMapCenter = ({ center }) => {
    const map = useMap();
    useEffect(() => {
        if (center[0] && center[1]) {
            map.flyTo(center, 13, {
                animate: true,
                duration: 1.5
            });
        }
    }, [center, map]);
    return null;
};

const WanderlustMap = ({ geometry, location }) => {
    console.log(geometry, 'geometry')
    // 🚨 GeoJSON Validation Check: Coordinates exist karte hain ya nahi?
    const hasCoordinates = geometry && geometry.coordinates && geometry.coordinates.length === 2;


    // 🔥 GeoJSON mein coordinates [lng, lat] hote hain, lekin Leaflet ko [lat, lng] chahiye!
    const position = hasCoordinates
        ? [geometry.coordinates[1], geometry.coordinates[0]] // [Latitude, Longitude]
        : [33.6844, 73.0479]; // Fallback coordinates (Islamabad)



    return (
        <div className="w-full h-[400px] rounded-xl overflow-hidden shadow-md border border-gray-200 mt-6">
            <MapContainer center={position} zoom={13} scrollWheelZoom={false} className="h-full w-full">
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {hasCoordinates && (
                    <Marker position={position}>
                        <Popup>
                            <span className="font-semibold">{location || "Exact Location"}</span>
                        </Popup>
                    </Marker>
                )}
            </MapContainer>
        </div>
    );
};

export default WanderlustMap;