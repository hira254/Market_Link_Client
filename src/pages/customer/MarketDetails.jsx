import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axiosInstance from "../../utils/BaseUrl";

import Navbar from "../../components/Navbar";
import { Store, MapPin, Clock, Calendar, ArrowLeft, Sprout } from "lucide-react";

function MarketDetails() {
  const { id } = useParams();

  const [market, setMarket] = useState(null);
  const [farmers, setFarmers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMarketData();
  }, [id]);

  const fetchMarketData = async () => {
    try {
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };

      const marketResponse = await axiosInstance.get(`/api/markets/${id}`, { headers });
      setMarket(marketResponse.data.market);

      const farmersResponse = await axiosInstance.get(`/api/markets/${id}/farmers`, { headers });
      setFarmers(farmersResponse.data.farmers || []);
    } catch (error) {
      console.log("MARKET DETAILS ERROR:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FBF9F5]">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-16 text-stone-500 text-xs font-bold">
          Loading market details...
        </div>
      </div>
    );
  }

  if (!market) {
    return (
      <div className="min-h-screen bg-[#FBF9F5]">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-16 text-rose-600 font-bold text-xs">
          Market not found.
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-[#12222E] font-sans flex flex-col justify-between">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 flex-grow w-full">
        
    
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200/80 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#EAF2E1] flex items-center justify-center text-[#566E3D] shrink-0">
                <Store className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#566E3D]">
                  LOCAL MARKET
                </span>
                <h1 className="text-2xl sm:text-3xl font-black text-[#12222E]">{market.name}</h1>
              </div>
            </div>
            <div className="flex gap-2">
              <Link to="/markets">
                <button className="px-4 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold rounded-xl transition flex items-center gap-1.5">
                  <ArrowLeft className="w-3.5 h-3.5" /> Back to Markets
                </button>
              </Link>
              <Link to="/dashboard">
                <button className="px-4 py-2.5 bg-[#566E3D] hover:bg-[#455931] text-white text-xs font-bold rounded-xl transition shadow-sm">
                  Dashboard
                </button>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs text-stone-600 pt-6 border-t border-stone-100">
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-[#566E3D] shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-[#12222E]">Location</p>
                <p>{market.address}, {market.city}</p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <Calendar className="w-4 h-4 text-[#566E3D] shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-[#12222E]">Operating Days</p>
                <p>{market.operatingDays?.length > 0 ? market.operatingDays.join(", ") : "Not specified"}</p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <Clock className="w-4 h-4 text-[#566E3D] shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-[#12222E]">Operating Hours</p>
                <p>{market.openingTime} – {market.closingTime}</p>
              </div>
            </div>

            {market.latitude != null && market.longitude != null && (
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#566E3D] shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-[#12222E]">Coordinates</p>
                  <p>{market.latitude}, {market.longitude}</p>
                </div>
              </div>
            )}
          </div>
        </div>

   
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-[#12222E] flex items-center gap-2">
            <Sprout className="w-5 h-5 text-[#566E3D]" /> Farmers Present at This Market
          </h2>

          {farmers.length === 0 ? (
            <div className="bg-white p-8 rounded-2xl text-center text-xs text-stone-500 border border-stone-200/80 shadow-sm">
              No approved farmers are currently listed for this market.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {farmers.map((farmer) => (
                <div key={farmer._id} className="bg-white p-6 rounded-2xl border border-stone-200/80 shadow-sm space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#EAF2E1] flex items-center justify-center text-[#566E3D]">
                      <Sprout className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-[#12222E]">{farmer.stallName}</h3>
                      {farmer.userId?.name && <p className="text-xs text-stone-500">{farmer.userId.name}</p>}
                    </div>
                  </div>

                  <div className="text-xs space-y-1.5 text-stone-600 pt-2 border-t border-stone-100">
                    {farmer.contactPerson && <p><strong>Contact Person:</strong> {farmer.contactPerson}</p>}
                    {farmer.userId?.phone && <p><strong>Phone:</strong> {farmer.userId.phone}</p>}
                    {farmer.address && <p><strong>Address:</strong> {farmer.address}</p>}
                    {farmer.operatingDays?.length > 0 && <p><strong>Operating Days:</strong> {farmer.operatingDays.join(", ")}</p>}
                    {farmer.pickupWindows?.length > 0 && <p><strong>Pickup Windows:</strong> {farmer.pickupWindows.join(", ")}</p>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </main>
    </div>
  );
}

export default MarketDetails;