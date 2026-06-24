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

const WanderlustMap = ({ lat, lng, locationName }) => {
    if (!lat || !lng) {
        return (
            <div className='p-4 bg-gray-50 text-center rounded-xl text-xs text-gray-400 font-medium border border-dashed'>
                No spatial coordinates available to render map for this location.
            </div>
        );
    }

    const currentPosition = [lat, lng];

    return (
        <div className='w-full h-64 rounded-xl overflow-hidden border border-gray-200 z-0 relative shadow-sm'>
            <MapContainer
                center={currentPosition}
                zoom={13}
                className='h-full w-full'
                scrollWheelZoom={false} // Prevents annoying page scroll jumps
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />

                {/* 🌟 Dynamic Center Control trigger */}
                <ChangeMapCenter center={currentPosition} />

                <Marker position={currentPosition}>
                    <Popup>
                        <div className='font-semibold text-sm text-gray-900'>{locationName || "Property Point"}</div>
                        <p className='text-xs text-gray-500 m-0'>Exact location after booking</p>
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    );
};

export default WanderlustMap;