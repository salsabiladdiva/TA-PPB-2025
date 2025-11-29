import Navbar from "../../components/Navbar";

// Data Dummy Review menggunakan path lokal dari folder public/images
const DUMMY_REVIEWS = [
  {
    id: 1,
    // PATH LOKAL: Ganti dengan nama file gambar pesawat Anda
    photoUrl: "/images/plane-1.jpg", 
    review: "Pemesanan super cepat dan antarmuka yang sangat elegan. Boarding pass digitalnya sangat membantu dan praktis!",
    name: "A. Wibowo",
    title: "Traveler Profesional",
  },
  {
    id: 2,
    photoUrl: "/images/plane-2.jpg",
    review: "Tidak pernah semudah ini untuk check-in. Prosesnya mulus dari awal sampai akhir. CabinIn sangat direkomendasikan!",
    name: "B. Susanto",
    title: "Pebisnis",
  },
  {
    id: 3,
    photoUrl: "/images/plane-3.jpg",
    review: "Desain UI yang cantik dan modern, membuat pengalaman booking tidak terasa membosankan. Sangat stylish.",
    name: "C. Rahma",
    title: "Mahasiswa",
  },
  {
    id: 4,
    photoUrl: "/images/plane-4.jpg",
    review: "Layanan 24/7 dan informasi yang transparan. CabinIn benar-benar masa depan booking penerbangan yang andal.",
    name: "D. Hartono",
    title: "Product Manager",
  },
  {
    id: 5,
    photoUrl: "/images/plane-5.jpg",
    review: "Fitur check-in instan dengan alokasi kursi otomatis sangat praktis. Membuat perjalanan jadi bebas repot.",
    name: "E. Setiawan",
    title: "Freelancer",
  },
  {
    id: 6,
    photoUrl: "/images/plane-6.jpg",
    review: "Suka sekali dengan gaya Glass UI-nya! Antarmuka yang elegan dan profesional. Pelayanan bintang lima!",
    name: "F. Anjani",
    title: "Desainer Grafis",
  },
];

// Komponen Card untuk Review
const ReviewCard = ({ reviewData }) => (
  <div
    style={{
      background: "rgba(255,255,255,0.1)",
      padding: 20,
      borderRadius: 18,
      backdropFilter: "blur(10px)",
      border: "1px solid rgba(255,255,255,0.2)",
      boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
      display: "flex",
      flexDirection: "column",
      height: "100%", 
    }}
  >
    {/* Foto Pesawat / Ilustrasi */}
    {/* Menggunakan path lokal: /images/plane-N.jpg */}
    <img
      src={reviewData.photoUrl}
      alt="Airplane View"
      style={{
        width: "100%",
        height: 120,
        objectFit: "cover",
        borderRadius: 12,
        marginBottom: 15,
        opacity: 0.9,
      }}
    />

    {/* Ulasan */}
    <p style={{ flexGrow: 1, fontSize: 16, marginBottom: 15, fontStyle: "italic" }}>
        "{reviewData.review}"
    </p>

    {/* Detail Reviewer */}
    <div>
        <p style={{ fontWeight: 700, fontSize: 18 }}>{reviewData.name}</p>
        <p style={{ opacity: 0.7, fontSize: 14 }}>{reviewData.title}</p>
    </div>
  </div>
);


export default function AboutPage() {
  return (
    <div
      style={{
        height: "100%",
        minHeight: "100vh",
        paddingBottom: "40px",
        background: "#c44569", 
        color: "white",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <Navbar />

      {/* HERO SECTION */}
      <div
        style={{
          textAlign: "center",
          padding: "120px 20px 40px",
        }}
      >
        <h1
          style={{
            fontSize: 48,
            fontWeight: 900,
            letterSpacing: 1,
            marginBottom: 10,
          }}
        >
          About CabinIn
        </h1>

        <p
          style={{
            fontSize: 20,
            opacity: 0.9,
            maxWidth: 700,
            margin: "0 auto",
          }}
        >
          Your modern gateway to a faster, simpler, and more elegant flight
          booking experience.
        </p>
      </div>

      {/* MAIN INFORMATIONAL CARD (Glassmorphism) */}
      <div
        style={{
          maxWidth: 900,
          margin: "30px auto",
          padding: 40,
          borderRadius: 25,
          background: "rgba(255,255,255,0.15)",
          backdropFilter: "blur(14px)",
          border: "1px solid rgba(255,255,255,0.3)",
          boxShadow: "0 12px 40px rgba(0,0,0,0.3)",
          lineHeight: 1.8,
          fontSize: 18,
        }}
      >
        {/* DESKRIPSI UTAMA */}
        <p style={{ marginBottom: 30, lineHeight: 1.6 }}>
          **CabinIn** adalah platform booking penerbangan modern yang dirancang
          untuk memberikan pengalaman terbaik — mulai dari pemesanan tiket yang
          cepat, proses check-in yang efisien, hingga mendapatkan boarding pass
          digital yang elegan. Kami berkomitmen untuk membuat perjalanan udara
          Anda semudah mungkin.
        </p>
        
        <hr style={{ border: "none", height: "1px", background: "rgba(255,255,255,0.4)", margin: "30px 0" }} />

        {/* BAGIAN VISI & MISI */}
        <div style={{ display: "flex", gap: 30, flexWrap: "wrap", marginBottom: 30 }}>
            {/* Visi */}
            <div style={{ flex: 1, minWidth: 250 }}>
                <h3 style={{ fontSize: 24, fontWeight: 800, marginBottom: 10, color: "#fff3cd" }}>
                    🎯 Visi Kami
                </h3>
                <p style={{ opacity: 0.9 }}>
                    Menjadi platform pemesanan penerbangan terdepan yang mendefinisikan ulang
                    pengalaman perjalanan digital dengan inovasi dan keandalan.
                </p>
            </div>

            {/* Misi */}
            <div style={{ flex: 1, minWidth: 250 }}>
                <h3 style={{ fontSize: 24, fontWeight: 800, marginBottom: 10, color: "#fff3cd" }}>
                    ✨ Misi Kami
                </h3>
                <p style={{ opacity: 0.9 }}>
                    Menyediakan layanan yang cepat, aman, dan user-friendly, didukung oleh
                    teknologi mutakhir untuk kenyamanan setiap pengguna.
                </p>
            </div>
        </div>
        
        <hr style={{ border: "none", height: "1px", background: "rgba(255,255,255,0.4)", margin: "30px 0" }} />

        {/* BAGIAN TEKNOLOGI */}
        <h3 style={{ fontSize: 24, fontWeight: 800, marginBottom: 15, color: "#fff3cd" }}>
          🛠️ Teknologi di Balik CabinIn
        </h3>

        <ul style={{ paddingLeft: 25, listStyleType: "none" }}>
          <li style={{ marginBottom: 10 }}>
            <span style={{ fontWeight: 700 }}>React + Vite:</span> Untuk performa **super cepat** dan pengalaman *single-page application* yang *seamless*.
          </li>
          <li style={{ marginBottom: 10 }}>
            <span style={{ fontWeight: 700 }}>Supabase:</span> Menggunakan layanan **Authentication** yang aman dan **Database (PostgreSQL)** yang andal.
          </li>
          <li>
            <span style={{ fontWeight: 700 }}>Glass UI Design:</span> Tampilan yang **modern, elegan,** dan memanjakan mata pengguna.
          </li>
        </ul>
      </div>

      {/* ---- REVIEW/TESTIMONIAL SECTION ---- */}
      <div
        style={{
          maxWidth: 1200,
          margin: "60px auto",
          padding: "0 20px",
          textAlign: "center",
        }}
      >
        <h2 style={{ fontSize: 40, fontWeight: 900, marginBottom: 40 }}>
            Apa Kata Mereka?
        </h2>

        {/* GRID OF REVIEWS */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 30,
            justifyContent: "center",
          }}
        >
          {DUMMY_REVIEWS.map((review) => (
            <ReviewCard key={review.id} reviewData={review} />
          ))}
        </div>
      </div>
    </div>
  );
}