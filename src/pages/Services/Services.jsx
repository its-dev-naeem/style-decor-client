import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaStar, FaEye, FaSearch, FaFilter, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router";

const API_URL = import.meta.env.VITE_API_URL;

const Services = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [priceFilter, setPriceFilter] = useState("all");
  const [sortBy, setSortBy] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 50;

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await axios.get(`${API_URL}/services`);
        setData(res.data);
        setFilteredData(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    let result = [...data];
    
    if (searchTerm) {
      result = result.filter(item =>
        item.serviceName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (priceFilter !== "all") {
      const price = parseInt(priceFilter);
      result = result.filter(item => {
        const itemPrice = parseInt(item.price);
        if (price === 100) return itemPrice <= 100;
        if (price === 500) return itemPrice > 100 && itemPrice <= 500;
        if (price === 1000) return itemPrice > 500 && itemPrice <= 1000;
        return itemPrice > 1000;
      });
    }
    
    if (sortBy === "price-low") {
      result.sort((a, b) => parseInt(a.price) - parseInt(b.price));
    } else if (sortBy === "price-high") {
      result.sort((a, b) => parseInt(b.price) - parseInt(a.price));
    } else if (sortBy === "rating") {
      result.sort((a, b) => parseFloat(b.AvgRating) - parseFloat(a.AvgRating));
    }
    
    setFilteredData(result);
    setCurrentPage(1);
  }, [searchTerm, priceFilter, sortBy, data]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  if (loading) {
    return (
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-3 bg-gray-200 h-10 w-64 mx-auto rounded animate-pulse"></h2>
            <p className="bg-gray-200 h-6 w-96 mx-auto rounded animate-pulse"></p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="card bg-white shadow-lg">
                <div className="skeleton h-48 w-full rounded-t-lg"></div>
                <div className="card-body p-6 space-y-4">
                  <div className="skeleton h-6 w-3/4"></div>
                  <div className="skeleton h-4 w-1/2"></div>
                  <div className="skeleton h-4 w-full"></div>
                  <div className="skeleton h-12 w-full rounded-lg"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            All <span className="text-primary">Services</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Browse all available services
          </p>
        </div>

        <div className="mb-8 bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FaSearch className="inline mr-2" /> Search
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search services..."
                  className="input input-bordered w-full pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FaFilter className="inline mr-2" /> Price
              </label>
              <select
                className="select select-bordered w-full"
                value={priceFilter}
                onChange={(e) => setPriceFilter(e.target.value)}
              >
                <option value="all">All Prices</option>
                <option value="100">Under BDT 100</option>
                <option value="500">BDT 100 - 500</option>
                <option value="1000">BDT 500 - 1000</option>
                <option value="1001">Above BDT 1000</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sort</label>
              <select
                className="select select-bordered w-full"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="default">Default</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rating</option>
              </select>
            </div>
          </div>

          {(searchTerm || priceFilter !== "all" || sortBy !== "default") && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm text-gray-600">Active:</span>
                {searchTerm && (
                  <span className="badge badge-primary gap-1">
                    {searchTerm}
                    <button onClick={() => setSearchTerm("")}>×</button>
                  </span>
                )}
                {priceFilter !== "all" && (
                  <span className="badge badge-secondary gap-1">
                    {priceFilter === "100" ? "Under BDT 100" :
                     priceFilter === "500" ? "BDT 100-500" :
                     priceFilter === "1000" ? "BDT 500-1000" : "Above BDT 1000"}
                    <button onClick={() => setPriceFilter("all")}>×</button>
                  </span>
                )}
                {sortBy !== "default" && (
                  <span className="badge badge-accent gap-1">
                    {sortBy === "price-low" ? "Price Low to High" :
                     sortBy === "price-high" ? "Price High to Low" : "Highest Rating"}
                    <button onClick={() => setSortBy("default")}>×</button>
                  </span>
                )}
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setPriceFilter("all");
                    setSortBy("default");
                  }}
                  className="btn btn-sm btn-ghost text-xs"
                >
                  Clear All
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="mb-6 flex justify-between items-center">
          <p className="text-gray-600">
            Showing {startIndex + 1}-{Math.min(endIndex, filteredData.length)} of {filteredData.length} services
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="btn btn-sm btn-outline"
            >
              <FaArrowLeft /> Prev
            </button>
            <span className="px-3 py-1 bg-gray-100 rounded-lg">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="btn btn-sm btn-outline"
            >
              Next <FaArrowRight />
            </button>
          </div>
        </div>

        {filteredData.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl shadow-lg border border-gray-100">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No Services Found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search or filter criteria</p>
            <button
              onClick={() => {
                setSearchTerm("");
                setPriceFilter("all");
                setSortBy("default");
              }}
              className="btn btn-primary"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentData.map((service) => (
                <div key={service._id} className="bg-white rounded-xl shadow-lg hover:shadow-xl border">
                  <div className="relative overflow-hidden">
                    <img
                      src={service.ServicImage}
                      alt={service.serviceName}
                      className="w-full h-48 object-cover hover:scale-105 transition-transform"
                    />
                    <div className="absolute top-3 right-3 bg-primary text-white px-3 py-1 rounded-full text-sm">
                      BDT{service.price}
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-1">{service.serviceName}</h3>
                    <p className="text-gray-500 text-sm mb-3">By: <span className="font-medium">{service.providerName}</span></p>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex text-yellow-500">
                        {[...Array(5)].map((_, i) => (
                          <FaStar key={i} className={i < Math.round(service.AvgRating) ? "fill-current" : "text-gray-300"} />
                        ))}
                      </div>
                      <span className="font-bold">{service.AvgRating}</span>
                      <span className="text-gray-500">({service.TotalRating})</span>
                    </div>
                    <p className="text-gray-600 mb-4 line-clamp-2 text-sm">{service.description}</p>
                    <Link to={`/services/${service._id}`} className="btn btn-primary w-full gap-2">
                      <FaEye /> View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Bottom */}
            {totalPages > 1 && (
              <div className="mt-8 flex justify-center gap-2">
                <button
                  onClick={() => setCurrentPage(1)}
                  disabled={currentPage === 1}
                  className="btn btn-sm btn-outline"
                >
                  First
                </button>
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="btn btn-sm btn-outline"
                >
                  <FaArrowLeft /> Prev
                </button>
                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`btn btn-sm ${currentPage === pageNum ? 'btn-primary' : 'btn-outline'}`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="btn btn-sm btn-outline"
                >
                  Next <FaArrowRight />
                </button>
                <button
                  onClick={() => setCurrentPage(totalPages)}
                  disabled={currentPage === totalPages}
                  className="btn btn-sm btn-outline"
                >
                  Last
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Services;