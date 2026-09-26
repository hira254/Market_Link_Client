import { useEffect, useState } from "react";
import axiosInstance from "../../utils/BaseUrl";

import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";


function RecenterMap({ userLocation }) {
  const map = useMap();

  useEffect(() => {
    if (userLocation) {
      map.setView([userLocation.latitude, userLocation.longitude], 13);
    }
  }, [userLocation, map]);

  return null;
}


function Markets() {
  const [markets, setMarkets] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedDay, setSelectedDay] = useState("");
  const [filterTab, setFilterTab] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [userLocation, setUserLocation] = useState(null);
  const [locationLoading, setLocationLoading] = useState(false);
  const [maxDistance, setMaxDistance] = useState(10);


  const [preferredMarket, setPreferredMarket] = useState(() => {
    try {
      const stored = localStorage.getItem("preferredMarket");
      return stored ? JSON.parse(stored) : null;
    } catch (e) {
      console.warn("Storage access blocked by tracking prevention:", e);
      return null;
    }
  });

  const [successMessage, setSuccessMessage] = useState("");

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  useEffect(() => {
    fetchMarkets();
  }, []);

  const fetchMarkets = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axiosInstance.get("/api/markets");

      console.log("MARKET RESPONSE:", response.data);
      console.log("MARKETS WITH COORDINATES:", response.data.markets);

      setMarkets(response.data.markets || []);
    } catch (error) {
      console.log("MARKET ERROR:", error.response?.data || error.message);
      setError(
        error.response?.data?.message || "Failed to load markets."
      );
    } finally {
      setLoading(false);
    }
  };


  const setPreferred = (market) => {
    try {
      localStorage.setItem("preferredMarket", JSON.stringify(market));
    } catch (e) {
      console.warn("Could not save to localStorage:", e);
    }
    setPreferredMarket(market);
    setSuccessMessage(`${market.name} is now your preferred market.`);

    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  };


  const removePreferred = () => {
    try {
      localStorage.removeItem("preferredMarket");
    } catch (e) {
      console.warn("Could not remove from localStorage:", e);
    }
    setPreferredMarket(null);
  };

  const getUserLocation = () => {
    if (!navigator.geolocation) {
      setError("Location is not supported by your browser.");
      return;
    }

    setLocationLoading(true);
    setError("");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        setLocationLoading(false);
      },
      (error) => {
        console.log("LOCATION ERROR:", error.message);
        setError("Unable to get location. Please allow permission.");
        setLocationLoading(false);
      }
    );
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };


  const filteredMarkets = markets
    .map((market) => {
      let distance = null;

      if (userLocation && market.latitude != null && market.longitude != null) {
        distance = calculateDistance(
          userLocation.latitude,
          userLocation.longitude,
          Number(market.latitude),
          Number(market.longitude)
        );
      }

      return {
        ...market,
        distance,
      };
    })
   .filter((market) => {
      const searchText = search.toLowerCase().trim();

      
      const matchesSearch =
        !searchText ||
        (market.name && market.name.toLowerCase().includes(searchText)) ||
        (market.address && market.address.toLowerCase().includes(searchText)) ||
        (market.city && market.city.toLowerCase().includes(searchText));

   
      const matchesDay =
        !selectedDay ||
        (market.operatingDays &&
          market.operatingDays.some(
            (day) => day.toLowerCase() === selectedDay.toLowerCase()
          ));

    
      let matchesTab = true;
      if (filterTab === "weekend") {
        matchesTab =
          market.operatingDays &&
          market.operatingDays.some((day) =>
            ["saturday", "sunday"].includes(day.toLowerCase())
          );
      } else if (filterTab === "weekday") {
        matchesTab =
          market.operatingDays &&
          market.operatingDays.some((day) =>
            ["monday", "tuesday", "wednesday", "thursday", "friday"].includes(
              day.toLowerCase()
            )
          );
      }

    
      const matchesDistance =
        !userLocation ||
        searchText.length > 0 || 
        (market.distance !== null && market.distance <= maxDistance);

      return matchesSearch && matchesDay && matchesTab && matchesDistance;
    })
    .sort((a, b) => {
      if (userLocation && a.distance !== null && b.distance !== null) {
        return a.distance - b.distance;
      }
      return 0;
    });

  const mapCenter = userLocation
    ? [userLocation.latitude, userLocation.longitude]
    : [24.8607, 67.0011];

  const clearFilters = () => {
    setSearch("");
    setSelectedDay("");
    setFilterTab("all");
    setUserLocation(null);
    setMaxDistance(10);
  };

  const hasFilters = search || selectedDay || filterTab !== "all" || userLocation;

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-slate-800 font-sans">
      <Navbar />

      <section className="bg-gradient-to-b from-[#F2EFE9] to-[#FBF9F5] pt-12 pb-10 border-b border-stone-200/60">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-xs font-bold uppercase tracking-widest text-[#566E3D] mb-2">
            EXPLORE LOCAL MARKETS
          </p>
          <h1 className="text-4xl md:text-5xl font-black text-[#1C2819] tracking-tight">
            Find your next market stop.
          </h1>
          <p className="text-sm md:text-base text-stone-600 mt-2 max-w-2xl leading-relaxed">
            Discover weekly farmers markets, see what is available, and plan your pickup before you leave home.
          </p>

          <div className="flex flex-wrap items-center gap-3 mt-6">
            <button
              onClick={() => setFilterTab("all")}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${
                filterTab === "all"
                  ? "bg-[#566E3D] text-white shadow-sm"
                  : "bg-white text-stone-700 border border-stone-300 hover:bg-stone-50"
              }`}
            >
              All markets
            </button>
            <button
              onClick={() => setFilterTab("weekend")}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${
                filterTab === "weekend"
                  ? "bg-[#566E3D] text-white shadow-sm"
                  : "bg-white text-stone-700 border border-stone-300 hover:bg-stone-50"
              }`}
            >
              Weekend
            </button>
            <button
              onClick={() => setFilterTab("weekday")}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${
                filterTab === "weekday"
                  ? "bg-[#566E3D] text-white shadow-sm"
                  : "bg-white text-stone-700 border border-stone-300 hover:bg-stone-50"
              }`}
            >
              Weekday
            </button>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {successMessage && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-5 py-3.5 rounded-2xl text-xs font-semibold flex items-center justify-between">
            <span>✓ {successMessage}</span>
          </div>
        )}

        {preferredMarket && (
          <div className="bg-[#FFFDF5] border border-amber-200/80 rounded-2xl p-5 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700">
                Your Preferred Market
              </span>
              <h2 className="text-lg font-bold text-[#1C2819] mt-0.5">
                ⭐ {preferredMarket.name}
              </h2>
              <p className="text-xs text-stone-600 mt-0.5">
                📍 {preferredMarket.address}, {preferredMarket.city}
              </p>
            </div>
            <button
              onClick={removePreferred}
              className="px-4 py-2 bg-white border border-stone-300 text-stone-700 rounded-xl text-xs font-bold hover:bg-stone-50 transition"
            >
              Remove
            </button>
          </div>
        )}

        {/* SEARCH AND FILTER CONTROL PANEL */}
        <section className="bg-white border border-stone-200/80 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-stone-800 uppercase tracking-wide">
              Filter Markets
            </h2>
            {hasFilters && (
              <button
                onClick={clearFilters}
                className="text-xs font-semibold text-rose-600 hover:underline"
              >
                Clear All Filters
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
         
            <div className="md:col-span-6 relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400 text-sm">
                🔍
              </span>
              <input
                type="text"
                placeholder="Search market, city, or address..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 bg-stone-50/50 text-xs text-stone-800 outline-none focus:bg-white focus:border-[#566E3D] focus:ring-1 focus:ring-[#566E3D]"
              />
            </div>

            <div className="md:col-span-3">
              <select
                value={selectedDay}
                onChange={(e) => setSelectedDay(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 bg-stone-50/50 text-xs text-stone-800 outline-none focus:bg-white focus:border-[#566E3D]"
              >
                <option value="">All Operating Days</option>
                {days.map((day) => (
                  <option key={day} value={day}>
                    {day}
                  </option>
                ))}
              </select>
            </div>

          
            <div className="md:col-span-3">
              <select
                value={maxDistance}
                onChange={(e) => setMaxDistance(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 bg-stone-50/50 text-xs text-stone-800 outline-none focus:bg-white focus:border-[#566E3D]"
              >
                <option value={5}>Within 5 km</option>
                <option value={10}>Within 10 km</option>
                <option value={20}>Within 20 km</option>
                <option value={50}>Within 50 km</option>
              </select>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-stone-100 flex flex-wrap items-center justify-between gap-3">
            <button
              onClick={getUserLocation}
              disabled={locationLoading}
              className="px-4 py-2.5 bg-[#566E3D] hover:bg-[#455931] text-white text-xs font-bold rounded-xl transition shadow-sm disabled:opacity-60"
            >
              {locationLoading ? "Locating..." : "📍 Find Nearby Markets"}
            </button>

            {userLocation && (
              <span className="text-xs text-emerald-700 font-semibold bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-100">
                ✓ Showing markets near your coordinates
              </span>
            )}
          </div>
        </section>

        {error && (
          <div className="bg-rose-50 border border-rose-200 text-rose-700 px-4 py-3 rounded-xl text-xs font-medium">
            {error}
          </div>
        )}

       
        <section className="bg-white border border-stone-200/80 rounded-2xl overflow-hidden shadow-sm">
          <div className="p-4 border-b border-stone-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-base">🗺️</span>
              <h3 className="text-xs font-bold uppercase tracking-wider text-stone-700">
                Interactive Market Map
              </h3>
            </div>
            <span className="text-[11px] font-bold text-stone-500">
              {filteredMarkets.length} locations visible
            </span>
          </div>

          <div className="h-[380px] w-full relative">
            <MapContainer
              center={mapCenter}
              zoom={11}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              <RecenterMap userLocation={userLocation} />

              {userLocation && (
                <Marker position={[userLocation.latitude, userLocation.longitude]}>
                  <Popup>
                    <span className="font-bold text-xs">📍 You are here</span>
                  </Popup>
                </Marker>
              )}

              {filteredMarkets
                .filter(
                  (market) =>
                    market.latitude != null && market.longitude != null
                )
                .map((market) => (
                  <Marker
                    key={market._id}
                    position={[Number(market.latitude), Number(market.longitude)]}
                  >
                    <Popup>
                      <div className="min-w-[180px] p-1 space-y-2">
                        <strong className="text-xs text-slate-900 block font-bold">
                          🛒 {market.name}
                        </strong>
                        <p className="text-[11px] text-stone-600 m-0 leading-tight">
                          {market.address}, {market.city}
                        </p>
                        <p className="text-[10px] text-stone-500 m-0">
                          {market.openingTime} - {market.closingTime}
                        </p>

                        <button
                          onClick={() => setPreferred(market)}
                          className="w-full mt-2 px-2.5 py-1.5 bg-[#566E3D] text-white rounded text-[10px] font-bold"
                        >
                          {preferredMarket?._id === market._id
                            ? "⭐ Preferred"
                            : "⭐ Set Preferred"}
                        </button>
                      </div>
                    </Popup>
                  </Marker>
                ))}
            </MapContainer>
          </div>
        </section>

        {/* MARKET CARDS GRID */}
        <section>
          {loading ? (
            <div className="bg-white rounded-2xl border border-stone-200/80 p-12 text-center">
              <div className="text-4xl mb-3">🛒</div>
              <p className="text-xs font-bold text-stone-500">Loading markets...</p>
            </div>
          ) : filteredMarkets.length === 0 ? (
            <div className="bg-white rounded-2xl border border-stone-200/80 p-12 text-center">
              <div className="text-4xl mb-3">🔎</div>
              <h3 className="text-sm font-bold text-stone-800">No markets match your criteria</h3>
              <p className="text-xs text-stone-500 mt-1">
                Try adjusting your search query, day selection, or distance radius.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredMarkets.map((market) => (
                <div
                  key={market._id}
                  className="bg-white border border-stone-200/80 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="relative h-32 w-full bg-gradient-to-r from-stone-100 to-stone-200 rounded-xl overflow-hidden flex items-center justify-center">
                      <span className="text-stone-400 font-extrabold text-sm opacity-60">
                        👨‍🌾 Farmers market
                      </span>

                      <span className="absolute top-3 left-3 bg-amber-100 text-amber-800 text-[10px] font-bold px-2.5 py-1 rounded-full border border-amber-200/60">
                        {market.operatingDays?.[0] || "Open"}
                      </span>

                      {preferredMarket?._id === market._id && (
                        <span className="absolute top-3 right-3 bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2.5 py-1 rounded-full border border-emerald-200">
                          ⭐ Preferred
                        </span>
                      )}
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-[#1C2819]">{market.name}</h3>
                      <p className="text-xs text-stone-500">{market.city || market.address}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-100">
                        <span className="text-[10px] text-stone-400 font-semibold block uppercase">
                          Market day
                        </span>
                        <span className="font-bold text-stone-800">
                          {market.operatingDays?.join(", ") || "N/A"}
                        </span>
                      </div>

                      <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-100">
                        <span className="text-[10px] text-stone-400 font-semibold block uppercase">
                          Hours
                        </span>
                        <span className="font-bold text-stone-800">
                          {market.openingTime && market.closingTime
                            ? `${market.openingTime} – ${market.closingTime}`
                            : "Varies"}
                        </span>
                      </div>
                    </div>

                    {market.distance !== null && market.distance !== undefined && (
                      <p className="text-xs text-emerald-700 font-bold">
                        📍 {market.distance.toFixed(1)} km away from you
                      </p>
                    )}
                  </div>

                  <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between">
                    <button
                      onClick={() => setPreferred(market)}
                      className="text-xs font-bold text-stone-500 hover:text-stone-800"
                    >
                      {preferredMarket?._id === market._id
                        ? "⭐ Preferred"
                        : "Set Preferred"}
                    </button>

                    <Link
                      to={`/markets/${market._id}`}
                      className="text-[#566E3D] hover:underline text-xs font-bold flex items-center gap-1"
                    >
                      Browse produce &rarr;
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="bg-[#12222E] text-white rounded-2xl p-8 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
              CAN'T FIND YOURS?
            </p>
            <h3 className="text-xl md:text-2xl font-bold mt-1">
              Know a market that should be on MarketLink?
            </h3>
          </div>

          <Link
            to="/contact"
            className="px-6 py-3 bg-[#566E3D] hover:bg-[#455931] text-white text-xs font-bold rounded-xl transition shadow-sm self-start md:self-auto shrink-0"
          >
            Suggest a market
          </Link>
        </section>
      </main>
    </div>
  );
}

export default Markets;