import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { FiMapPin, FiSearch, FiFilter, FiChevronDown, FiChevronUp, FiNavigation } from 'react-icons/fi';
import { IoLocationSharp } from 'react-icons/io5';

// Fix for default markers in React Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const Coverage = () => {
  const [selectedDivision, setSelectedDivision] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showDistricts, setShowDistricts] = useState(false);
  const [mapCenter, setMapCenter] = useState([23.6850, 90.3563]); // Center of Bangladesh
  const [zoomLevel, setZoomLevel] = useState(7);

  // Bangladesh divisions with coordinates
  const divisions = [
    { 
      name: 'Dhaka', 
      districts: 13, 
      color: 'bg-green-100', 
      textColor: 'text-green-800',
      coordinates: [23.8103, 90.4125],
      majorCities: ['Dhaka', 'Gazipur', 'Narayanganj', 'Tangail']
    },
    { 
      name: 'Chittagong', 
      districts: 11, 
      color: 'bg-blue-100', 
      textColor: 'text-blue-800',
      coordinates: [22.3569, 91.7832],
      majorCities: ['Chittagong', 'Cox\'s Bazar', 'Comilla', 'Feni']
    },
    { 
      name: 'Rajshahi', 
      districts: 8, 
      color: 'bg-purple-100', 
      textColor: 'text-purple-800',
      coordinates: [24.3745, 88.6042],
      majorCities: ['Rajshahi', 'Bogra', 'Pabna', 'Natore']
    },
    { 
      name: 'Khulna', 
      districts: 10, 
      color: 'bg-yellow-100', 
      textColor: 'text-yellow-800',
      coordinates: [22.8456, 89.5403],
      majorCities: ['Khulna', 'Jessore', 'Satkhira', 'Bagerhat']
    },
    { 
      name: 'Barisal', 
      districts: 6, 
      color: 'bg-pink-100', 
      textColor: 'text-pink-800',
      coordinates: [22.7010, 90.3535],
      majorCities: ['Barisal', 'Patuakhali', 'Bhola', 'Pirojpur']
    },
    { 
      name: 'Sylhet', 
      districts: 4, 
      color: 'bg-indigo-100', 
      textColor: 'text-indigo-800',
      coordinates: [24.8949, 91.8687],
      majorCities: ['Sylhet', 'Moulvibazar', 'Habiganj', 'Sunamganj']
    },
    { 
      name: 'Rangpur', 
      districts: 8, 
      color: 'bg-orange-100', 
      textColor: 'text-orange-800',
      coordinates: [25.7439, 89.2752],
      majorCities: ['Rangpur', 'Dinajpur', 'Nilphamari', 'Gaibandha']
    },
    { 
      name: 'Mymensingh', 
      districts: 4, 
      color: 'bg-teal-100', 
      textColor: 'text-teal-800',
      coordinates: [24.7471, 90.4203],
      majorCities: ['Mymensingh', 'Netrokona', 'Jamalpur', 'Sherpur']
    },
  ];

  const districtsData = {
    'Dhaka': ['Dhaka', 'Gazipur', 'Narayanganj', 'Tangail', 'Manikganj', 'Munshiganj', 'Narsingdi', 'Faridpur', 'Rajbari', 'Gopalganj', 'Madaripur', 'Shariatpur', 'Kishoreganj'],
    'Chittagong': ['Chittagong', 'Cox\'s Bazar', 'Comilla', 'Feni', 'Brahmanbaria', 'Noakhali', 'Chandpur', 'Lakshmipur', 'Rangamati', 'Bandarban', 'Khagrachari'],
    'Rajshahi': ['Rajshahi', 'Bogra', 'Pabna', 'Natore', 'Naogaon', 'Sirajganj', 'Chapainawabganj', 'Joypurhat'],
    'Khulna': ['Khulna', 'Jessore', 'Satkhira', 'Bagerhat', 'Narail', 'Magura', 'Jhenaidah', 'Kushtia', 'Chuadanga', 'Meherpur'],
    'Barisal': ['Barisal', 'Patuakhali', 'Bhola', 'Pirojpur', 'Jhalokati', 'Barguna'],
    'Sylhet': ['Sylhet', 'Moulvibazar', 'Habiganj', 'Sunamganj'],
    'Rangpur': ['Rangpur', 'Dinajpur', 'Nilphamari', 'Gaibandha', 'Thakurgaon', 'Panchagarh', 'Kurigram', 'Lalmonirhat'],
    'Mymensingh': ['Mymensingh', 'Netrokona', 'Jamalpur', 'Sherpur']
  };

  const filteredDistricts = selectedDivision === 'all' 
    ? Object.values(districtsData).flat()
    : districtsData[selectedDivision] || [];

  const searchResults = filteredDistricts.filter(district =>
    district.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDivisionSelect = (division) => {
    setSelectedDivision(division.name);
    setMapCenter(division.coordinates);
    setZoomLevel(8);
  };

  const handleViewAll = () => {
    setSelectedDivision('all');
    setMapCenter([23.6850, 90.3563]);
    setZoomLevel(7);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-base-100 to-base-200 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Service Coverage <span className="text-primary">Map</span></h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Interactive map showing our service coverage across all 64 districts of Bangladesh
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Map Container */}
          <div className="lg:col-span-2">
            <div className="card bg-base-100 shadow-xl h-full">
              <div className="card-body">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="card-title flex items-center gap-2">
                    <FiMapPin className="text-primary" /> Interactive Map
                  </h3>
                  <button 
                    onClick={handleViewAll}
                    className="btn btn-sm btn-outline"
                  >
                    <FiNavigation className="mr-2" /> View All
                  </button>
                </div>
                
                <div className="h-[500px] rounded-lg overflow-hidden border border-base-300">
                  <MapContainer 
                    center={mapCenter} 
                    zoom={zoomLevel} 
                    style={{ height: '100%', width: '100%' }}
                    scrollWheelZoom={true}
                  >
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    
                    {/* Division Markers */}
                    {divisions.map(division => (
                      <Marker 
                        key={division.name} 
                        position={division.coordinates}
                        eventHandlers={{
                          click: () => handleDivisionSelect(division),
                        }}
                      >
                        <Popup>
                          <div className="p-2">
                            <h3 className="font-bold text-lg">{division.name} Division</h3>
                            <p className="text-sm text-gray-600">{division.districts} Districts</p>
                            <div className="mt-2">
                              <p className="font-medium">Major Cities:</p>
                              <p className="text-sm">{division.majorCities.slice(0, 3).join(', ')}</p>
                            </div>
                          </div>
                        </Popup>
                      </Marker>
                    ))}

                    {/* Service Coverage Circles */}
                    {divisions.map(division => (
                      <Circle
                        key={`circle-${division.name}`}
                        center={division.coordinates}
                        radius={30000}
                        pathOptions={{
                          fillColor: division.color.replace('bg-', '#').replace('-100', ''),
                          color: division.textColor.replace('text-', '#').replace('-800', ''),
                          fillOpacity: 0.3,
                          weight: 2
                        }}
                      />
                    ))}
                  </MapContainer>
                </div>

                <div className="mt-4 text-sm text-gray-600">
                  <p>Click on markers to view division details. Scroll to zoom, drag to pan.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - Districts List */}
          <div className="lg:col-span-1">
            <div className="card bg-base-100 shadow-xl h-full">
              <div className="card-body">
                <h3 className="card-title flex items-center gap-2">
                  <IoLocationSharp className="text-primary" /> Available Districts
                </h3>

                {/* Search and Filter */}
                <div className="space-y-4 mb-6">
                  <div className="relative">
                    <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search districts..."
                      className="input input-bordered pl-10 w-full"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <FiFilter />
                      <span className="font-medium">Filter by Division</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={handleViewAll}
                        className={`btn btn-sm ${selectedDivision === 'all' ? 'btn-primary' : 'btn-outline'}`}
                      >
                        All
                      </button>
                      {divisions.map(div => (
                        <button
                          key={div.name}
                          onClick={() => handleDivisionSelect(div)}
                          className={`btn btn-sm ${selectedDivision === div.name ? 'btn-primary' : 'btn-outline'}`}
                        >
                          {div.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Selected Division Info */}
                {selectedDivision !== 'all' && (
                  <div className="bg-base-200 p-4 rounded-lg mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className={`w-4 h-4 rounded-full ${divisions.find(d => d.name === selectedDivision)?.color}`}></div>
                      <h4 className="font-bold">{selectedDivision} Division</h4>
                    </div>
                    <div className="text-sm text-gray-600">
                      {districtsData[selectedDivision]?.length} Districts
                    </div>
                  </div>
                )}

                {/* Districts Count */}
                <div className="bg-primary/10 p-4 rounded-lg mb-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-2xl font-bold">{searchResults.length}</div>
                      <div className="text-sm text-gray-600">Available Districts</div>
                    </div>
                    <button
                      onClick={() => setShowDistricts(!showDistricts)}
                      className="btn btn-sm btn-ghost"
                    >
                      {showDistricts ? <FiChevronUp /> : <FiChevronDown />}
                      {showDistricts ? 'Hide' : 'Show'}
                    </button>
                  </div>
                </div>

                {/* Districts List */}
                {showDistricts && (
                  <div className="mt-4">
                    <div className="max-h-64 overflow-y-auto p-2 space-y-2">
                      {searchResults.map((district, index) => (
                        <div 
                          key={index} 
                          className="flex items-center gap-2 p-3 bg-base-200 rounded-lg hover:bg-base-300 transition-colors cursor-pointer"
                          onClick={() => {
                            // You can add click to focus on district coordinates
                          }}
                        >
                          <IoLocationSharp className="text-primary" />
                          <span className="font-medium">{district}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Map Legend */}
                <div className="mt-6 p-4 bg-base-200 rounded-lg">
                  <h4 className="font-bold mb-3">Map Legend</h4>
                  <div className="space-y-2">
                    {divisions.slice(0, 4).map(div => (
                      <div key={div.name} className="flex items-center gap-2">
                        <div className={`w-4 h-4 rounded-full ${div.color}`}></div>
                        <span className="text-sm">{div.name} Division</span>
                      </div>
                    ))}
                    <div className="flex items-center gap-2 mt-2">
                      <div className="w-4 h-4 rounded-full border-2 border-gray-600"></div>
                      <span className="text-sm">Service Coverage Area</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="stat bg-base-100 rounded-lg shadow p-6">
            <div className="stat-figure text-primary">
              <FiMapPin className="text-3xl" />
            </div>
            <div className="stat-title">Divisions Covered</div>
            <div className="stat-value">{divisions.length}</div>
          </div>
          
          <div className="stat bg-base-100 rounded-lg shadow p-6">
            <div className="stat-figure text-success">
              <IoLocationSharp className="text-3xl" />
            </div>
            <div className="stat-title">Districts Served</div>
            <div className="stat-value">64</div>
          </div>
          
          <div className="stat bg-base-100 rounded-lg shadow p-6">
            <div className="stat-figure text-info">
              <div className="text-3xl">🏙️</div>
            </div>
            <div className="stat-title">Major Cities</div>
            <div className="stat-value">8</div>
          </div>
          
          <div className="stat bg-base-100 rounded-lg shadow p-6">
            <div className="stat-figure text-warning">
              <div className="text-3xl">📍</div>
            </div>
            <div className="stat-title">Service Centers</div>
            <div className="stat-value">150+</div>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-8 card bg-base-100 shadow">
          <div className="card-body">
            <h3 className="card-title">How to Use the Map</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div className="text-center p-4">
                <div className="text-2xl mb-2">📍</div>
                <h4 className="font-bold">Click Markers</h4>
                <p className="text-sm text-gray-600">Click on division markers to view details</p>
              </div>
              <div className="text-center p-4">
                <div className="text-2xl mb-2">🔍</div>
                <h4 className="font-bold">Search Districts</h4>
                <p className="text-sm text-gray-600">Use search to find specific districts</p>
              </div>
              <div className="text-center p-4">
                <div className="text-2xl mb-2">🗺️</div>
                <h4 className="font-bold">Zoom & Pan</h4>
                <p className="text-sm text-gray-600">Scroll to zoom, drag to explore</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Coverage;