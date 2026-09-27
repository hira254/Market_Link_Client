// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
// import { Mail, Clock, MapPin, Send } from "lucide-react";

// function Contact() {
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     alert("Thank you! Your message has been sent.");
//   };

//   return (
//     <div className="min-h-screen bg-[#FBF9F5] text-[#12222E] font-sans flex flex-col justify-between">
//       <Navbar />

//       <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex-grow w-full">
//         {/* SUBHEADER / CATEGORY */}
//         <div className="mb-3">
//           <span className="text-xs font-bold tracking-widest uppercase text-[#566E3D]">
//             CONTACT
//           </span>
//         </div>

//         {/* HERO TITLE & DESCRIPTION */}
//         <div className="max-w-4xl mb-12">
//           <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#12222E] tracking-tight leading-tight mb-4">
//             We would love to hear from you
//           </h1>
//           <p className="text-sm sm:text-base text-stone-600 leading-relaxed font-medium">
//             Questions about a pre-order, listing your stall or using the platform? Reach out and we will get back to you.
//           </p>
//         </div>

//         {/* INFO CARDS (Matching Screenshot 1) */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          
//           {/* EMAIL CARD */}
//           <div className="bg-white rounded-2xl p-6 border border-stone-200/70 shadow-sm flex items-center gap-4">
//             <div className="w-12 h-12 rounded-full bg-[#EAF2E1] flex items-center justify-center shrink-0">
//               <Mail className="w-5 h-5 text-[#566E3D]" />
//             </div>
//             <div>
//               <span className="block text-xs text-stone-500 font-semibold mb-0.5">Email</span>
//               <span className="text-sm sm:text-base font-bold text-[#12222E]">
//                 support@marketlink.example
//               </span>
//             </div>
//           </div>

//           {/* SUPPORT HOURS CARD */}
//           <div className="bg-white rounded-2xl p-6 border border-stone-200/70 shadow-sm flex items-center gap-4">
//             <div className="w-12 h-12 rounded-full bg-[#EAF2E1] flex items-center justify-center shrink-0">
//               <Clock className="w-5 h-5 text-[#566E3D]" />
//             </div>
//             <div>
//               <span className="block text-xs text-stone-500 font-semibold mb-0.5">Support hours</span>
//               <span className="text-sm sm:text-base font-bold text-[#12222E]">
//                 Mon – Sat, 9am – 6pm
//               </span>
//             </div>
//           </div>

//         </div>

//         {/* OPTIONAL FORM CARD */}
//         <div className="bg-white rounded-3xl p-8 sm:p-10 border border-stone-200/70 shadow-sm max-w-2xl">
//           <h3 className="text-xl font-bold text-[#12222E] mb-2">Send us a direct message</h3>
//           <p className="text-xs text-stone-500 mb-6">Fill in the fields below and we'll reply to your email directly.</p>

//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div>
//               <label className="block text-xs font-bold text-stone-600 mb-1.5">Your Name</label>
//               <input 
//                 type="text" 
//                 required 
//                 placeholder="John Doe" 
//                 className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-stone-50/50 text-xs text-stone-800 outline-none focus:bg-white focus:border-[#566E3D] focus:ring-1 focus:ring-[#566E3D] transition" 
//               />
//             </div>
//             <div>
//               <label className="block text-xs font-bold text-stone-600 mb-1.5">Your Email</label>
//               <input 
//                 type="email" 
//                 required 
//                 placeholder="john@example.com" 
//                 className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-stone-50/50 text-xs text-stone-800 outline-none focus:bg-white focus:border-[#566E3D] focus:ring-1 focus:ring-[#566E3D] transition" 
//               />
//             </div>
//             <div>
//               <label className="block text-xs font-bold text-stone-600 mb-1.5">Message</label>
//               <textarea 
//                 rows="4" 
//                 required 
//                 placeholder="How can we help you?" 
//                 className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-stone-50/50 text-xs text-stone-800 outline-none focus:bg-white focus:border-[#566E3D] focus:ring-1 focus:ring-[#566E3D] transition"
//               ></textarea>
//             </div>
//             <button 
//               type="submit" 
//               className="w-full py-3.5 bg-[#566E3D] hover:bg-[#455931] text-white text-xs font-bold rounded-xl shadow-sm transition flex items-center justify-center gap-2"
//             >
//               Send Message <Send className="w-3.5 h-3.5" />
//             </button>
//           </form>
//         </div>
//       </main>

//       <Footer />
//     </div>
//   );
// }

// export default Contact;