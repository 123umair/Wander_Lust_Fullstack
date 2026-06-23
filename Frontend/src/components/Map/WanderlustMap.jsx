import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css'; //
// 1. Manually import the assets so Webpack/Vite bundles them correctly
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// 2. Re-configure the default icon object of Leaflet
let DefaultIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41],     // Width and height of the icon in pixels
    iconAnchor: [12, 41],   // The point of the icon which will correspond to marker's location
    popupAnchor: [1, -34]   // The point from which the popup should open relative to the iconAnchor
});

L.Marker.prototype.options.icon = DefaultIcon;
const WanderlustMap = ({ lat, lng, locationName }) => {
    if (!lat || !lng) {
        return (
            <div className='p-4 bg-gray-50 text-center rounded-xl text-xs text-gray-400 font-medium'>
                No spatial coordinates available to render.
            </div>
        )
    }
    return (
        <div className='w-full h-64 rounded-xl overflow-hidden border border-gray-200 z-0 relative'>
            <MapContainer center={[lat, lng]} zoom={13} className='h-full w-full' >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    ttribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={[lat, lng]}>
                    <Popup>
                        <span className='font-medium text-xs text-gray-800'>{locationName || "Property Point"}</span>
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    )
}

export default WanderlustMap