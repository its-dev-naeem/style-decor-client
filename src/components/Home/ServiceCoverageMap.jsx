import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import { FaMapMarkerAlt,  } from 'react-icons/fa';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in React Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const ServiceCoverageMap = () => {
  const [activeArea, setActiveArea] = useState('all');
  const [mapCenter] = useState([23.8103, 90.4125]); // Dhaka, Bangladesh coordinates
  const [mapZoom] = useState(12);

  // Custom marker icons
  const createCustomIcon = (color) => {
    return L.divIcon({
      html: `<div style="background-color:${color}; width: 24px; height: 24px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 10px rgba(0,0,0,0.3);"></div>`,
      iconSize: [24, 24],
      className: 'custom-marker'
    });
  };

  // Coverage areas with coordinates
  const coverageAreas = [
    {
      id: 1,
      name: "Gulshan Area",
      coordinates: [23.7940, 90.4150],
      radius: 1500,
      color: "#3B82F6",
      type: "premium",
      serviceCenters: 3,
      responseTime: "30 mins",
      rating: 4.9,
      neighborhoods: ["Gulshan-1", "Gulshan-2", "Banani", "Baridhara"]
    },
    {
      id: 2,
      name: "Dhanmondi Zone",
      coordinates: [23.7465, 90.3760],
      radius: 1200,
      color: "#10B981",
      type: "standard",
      serviceCenters: 2,
      responseTime: "45 mins",
      rating: 4.7,
      neighborhoods: ["Dhanmondi 27", "Dhanmondi 32", "Shukrabad", "Kalabagan"]
    },
    {
      id: 3,
      name: "Uttara Region",
      coordinates: [23.8759, 90.3795],
      radius: 2000,
      color: "#8B5CF6",
      type: "premium",
      serviceCenters: 4,
      responseTime: "40 mins",
      rating: 4.8,
      neighborhoods: ["Uttara Sector 1", "Uttara Sector 4", "Uttara Sector 7", "Uttara Sector 11"]
    },
    {
      id: 4,
      name: "Mirpur Sector",
      coordinates: [23.8223, 90.3654],
      radius: 1800,
      color: "#F59E0B",
      type: "standard",
      serviceCenters: 3,
      responseTime: "35 mins",
      rating: 4.6,
      neighborhoods: ["Mirpur 10", "Mirpur 11", "Mirpur 12", "Mirpur 14"]
    },
    {
      id: 5,
      name: "Motijheel District",
      coordinates: [23.7336, 90.4173],
      radius: 1000,
      color: "#EF4444",
      type: "commercial",
      serviceCenters: 2,
      responseTime: "25 mins",
      rating: 4.5,
      neighborhoods: ["Motijheel", "Purana Paltan", "Dilkusha", "Banglamotor"]
    },
    {
      id: 6,
      name: "Bashundhara R/A",
      coordinates: [23.8151, 90.4254],
      radius: 1600,
      color: "#EC4899",
      type: "premium",
      serviceCenters: 3,
      responseTime: "50 mins",
      rating: 4.9,
      neighborhoods: ["Bashundhara Block A", "Block B", "Block C", "Block D"]
    }
  ];

  // Service centers (markers)
  const serviceCenters = [
    { id: 1, name: "StyleDecor Main Studio", coordinates: [23.7940, 90.4150], area: "Gulshan Area", type: "studio" },
    { id: 2, name: "North Dhaka Service Point", coordinates: [23.8759, 90.3795], area: "Uttara Region", type: "service" },
    { id: 3, name: "Central Design Hub", coordinates: [23.7465, 90.3760], area: "Dhanmondi Zone", type: "studio" },
    { id: 4, name: "West Zone Center", coordinates: [23.8223, 90.3654], area: "Mirpur Sector", type: "service" },
    { id: 5, name: "Commercial Office", coordinates: [23.7336, 90.4173], area: "Motijheel District", type: "office" },
    { id: 6, name: "East Campus", coordinates: [23.8151, 90.4254], area: "Bashundhara R/A", type: "studio" }
  ];

  // Filter coverage areas based on active filter
  const filteredAreas = activeArea === 'all' 
    ? coverageAreas 
    : coverageAreas.filter(area => area.type === activeArea);

  // Get area type label


  return (
    <div className="py-16 bg-gradient-to-b from-base-100 to-base-200">
      <div className="container mx-auto px-4">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
            <FaMapMarkerAlt />
            <span>Service Coverage Areas</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Our <span className="text-primary">Service Coverage</span> Map
          </h1>
          <p className="text-lg opacity-80 max-w-3xl mx-auto">
            Check if we serve your area. We provide both in-studio consultations and on-site 
            decoration services across major locations in Dhaka and surrounding areas.
          </p>
        </div>

        <div className="">
          {/* Center Panel - Map */}
          <div className="lg:col-span-2">
            <div className="card bg-base-100 shadow-2xl overflow-hidden">
              <div className="card-body p-0">
                <div className="h-[500px] w-full relative">
                  {/* Map Container */}
                  <MapContainer
                    center={mapCenter}
                    zoom={mapZoom}
                    className="h-full w-full rounded-lg"
                  >
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    {/* Draw coverage areas */}
                    {filteredAreas.map((area) => (
                      <Circle
                        key={area.id}
                        center={area.coordinates}
                        radius={area.radius}
                        pathOptions={{
                          fillColor: area.color,
                          color: area.color,
                          fillOpacity: 0.1,
                          weight: 2
                        }}
                        eventHandlers={{
                          click: () => setSelectedMarker(area)
                        }}
                      />
                    ))}

                    {/* Service Center Markers */}
                    {serviceCenters.map((center) => (
                      <Marker
                        key={center.id}
                        position={center.coordinates}
                        icon={createCustomIcon("#FF6B6B")}
                        eventHandlers={{
                          click: () => setSelectedMarker(center)
                        }}
                      >
                        <Popup>
                          <div className="p-2">
                            <h3 className="font-bold">{center.name}</h3>
                            <p className="text-sm">{center.area}</p>
                            <p className="text-xs opacity-70">{center.type === 'studio' ? 'Design Studio' : 'Service Point'}</p>
                          </div>
                        </Popup>
                      </Marker>
                    ))}
                  </MapContainer>

                  {/* Map Controls Overlay */}
                  <div className="absolute top-4 left-4 bg-base-100/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
                    <div className="flex flex-col gap-2">
                      <button className="btn btn-xs" onClick={() => setActiveArea('all')}>
                        Reset View
                      </button>
                      <div className="text-xs opacity-70">
                        Click on areas for details
                      </div>
                    </div>
                  </div>
                </div>

                {/* Map Info Bar */}
                <div className="p-4 bg-base-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FaMapMarkerAlt className="text-primary" />
                      <span>{filteredAreas.length} areas shown</span>
                    </div>
                    <div className="text-sm opacity-70">
                      Zoom in/out to explore
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCoverageMap;