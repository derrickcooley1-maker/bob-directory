import { useState, useEffect } from "react";

const C = {
  bg: "#FAF3E8", surface: "#FFFFFF", surfaceAlt: "#F5EAD8",
  border: "#E8D9C8", accent: "#C4622D", accentLight: "#F2E4D8",
  gold: "#C9A84C", textPrimary: "#1C1008", textSecondary: "#6B4C3B",
  textMuted: "#A07860", textLight: "#C4A898", overlay: "rgba(28,16,8,0.6)",
};

const DATA = {
  TX: {
    name: "Texas",
    cities: {
      Dallas: {
        categories: {
          "Food & Dining": [
            { id: 1, name: "Smoky Crown BBQ", owner: "Marcus Williams", address: "4821 MLK Blvd, Dallas TX", phone: "(214) 555-0182", description: "Award-winning slow-smoked brisket and soul food sides. Family owned since 2009.", rating: 4.8, reviews: 142, verified: true, hours: "Tue–Sun 11am–9pm", tags: ["BBQ", "Soul Food", "Family-Owned"] },
            { id: 2, name: "Lena's Kitchen", owner: "Lena Booker", address: "2203 Forest Ave, Dallas TX", phone: "(214) 555-0341", description: "Home-style Southern cooking. Lena's been feeding the community for 20 years.", rating: 4.6, reviews: 89, verified: true, hours: "Mon–Sat 7am–3pm", tags: ["Southern", "Breakfast", "Comfort Food"] },
          ],
          "Beauty & Wellness": [
            { id: 3, name: "Crown & Glory Salon", owner: "Tiffany Reeves", address: "1102 Oak Cliff Blvd, Dallas TX", phone: "(214) 555-0774", description: "Natural hair specialists. Braids, locs, twists, and protective styles.", rating: 4.9, reviews: 203, verified: true, hours: "Wed–Mon 9am–7pm", tags: ["Natural Hair", "Braids", "Locs"] },
            { id: 4, name: "Urban Glow Spa", owner: "Denise Carter", address: "580 Cedar Springs Rd, Dallas TX", phone: "(214) 555-0612", description: "Full-service spa specializing in melanin-rich skincare treatments.", rating: 4.7, reviews: 67, verified: false, hours: "Tue–Sat 10am–6pm", tags: ["Spa", "Skincare", "Wellness"] },
          ],
          "Professional Services": [
            { id: 5, name: "Pinnacle Tax & Accounting", owner: "Darnell Hughes CPA", address: "8900 S Hampton Rd, Dallas TX", phone: "(214) 555-0293", description: "Full-service accounting for individuals and small businesses.", rating: 4.5, reviews: 54, verified: true, hours: "Mon–Fri 9am–5pm", tags: ["Accounting", "Tax", "Business Services"] },
          ],
          "Media & Creative": [
            { id: 6, name: "Golden Crown Media", owner: "Derrick & Alisha Cooley", address: "Dallas-Fort Worth, TX", phone: "(214) 555-0100", description: "Professional photography, drone cinematography, and media production for events, brands, and content creators.", rating: 5.0, reviews: 38, verified: true, hours: "By Appointment", tags: ["Photography", "Drone", "Video", "Events"], instagram: "@goldencrownmedia", tiktok: "@goldencrownmedia", facebook: "goldencrownmedia", website: "goldencrownmedia.com" },
          ],
        },
      },
      Houston: {
        categories: {
          "Food & Dining": [
            { id: 7, name: "Third Ward Kitchen", owner: "Bobby James", address: "3300 Dowling St, Houston TX", phone: "(713) 555-0451", description: "Soul food rooted in Third Ward tradition. Oxtails, fried catfish, and more.", rating: 4.7, reviews: 178, verified: true, hours: "Wed–Sun 12pm–8pm", tags: ["Soul Food", "Oxtail", "Southern"] },
          ],
          "Retail & Boutique": [
            { id: 8, name: "Melanin Market", owner: "Jasmine Ford", address: "5110 Almeda Rd, Houston TX", phone: "(713) 555-0839", description: "Curated Black-owned product boutique. Apparel, books, art, and gifts.", rating: 4.8, reviews: 91, verified: true, hours: "Tue–Sat 11am–7pm", tags: ["Boutique", "Gifts", "Apparel", "Books"] },
          ],
        },
      },
    },
  },
  GA: {
    name: "Georgia",
    cities: {
      Atlanta: {
        categories: {
          "Food & Dining": [
            { id: 9, name: "Sweet Auburn Bread Co.", owner: "Patricia Monroe", address: "322 Auburn Ave NE, Atlanta GA", phone: "(404) 555-0217", description: "Artisan breads and pastries rooted in Auburn Ave history.", rating: 4.9, reviews: 312, verified: true, hours: "Tue–Sun 7am–4pm", tags: ["Bakery", "Artisan", "Pastry"] },
          ],
          "Professional Services": [
            { id: 10, name: "Legacy Law Group", owner: "Attorney James Whitfield", address: "191 Peachtree St NE, Atlanta GA", phone: "(404) 555-0583", description: "Business law, estate planning, and civil rights litigation.", rating: 4.6, reviews: 41, verified: true, hours: "Mon–Fri 8am–5pm", tags: ["Law", "Business", "Estate Planning"] },
          ],
        },
      },
    },
  },
  IL: {
    name: "Illinois",
    cities: {
      Chicago: {
        categories: {
          "Food & Dining": [
            { id: 11, name: "Bronzeville Bites", owner: "Kevin & Tamara Shaw", address: "4700 S Cottage Grove, Chicago IL", phone: "(312) 555-0674", description: "Modern takes on classic Black American dishes in the heart of Bronzeville.", rating: 4.8, reviews: 156, verified: true, hours: "Thu–Mon 12pm–9pm", tags: ["Modern Soul", "Bronzeville", "Couples-Owned"] },
          ],
          "Beauty & Wellness": [
            { id: 12, name: "The Root Bar", owner: "Imani Styles", address: "2815 W Chicago Ave, Chicago IL", phone: "(312) 555-0321", description: "Natural hair bar offering wash-and-gos, twists, and curl care.", rating: 4.7, reviews: 88, verified: false, hours: "Mon–Sat 9am–6pm", tags: ["Natural Hair", "Curl Care", "Walk-Ins"] },
          ],
        },
      },
    },
  },
};

const CATEGORIES = ["Food & Dining", "Beauty & Wellness", "Professional Services", "Media & Creative", "Retail & Boutique", "Health & Fitness", "Auto & Repair", "Home Services"];

const StarRating = ({ rating, size = 14 }) => {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  return (
    <span style={{ display: "inline-flex", gap: 1 }}>
      {[1,2,3,4,5].map(i => (
        <span key={i} style={{ fontSize: size, color: i <= full ? "#C9A84C" : i === full + 1 && half ? "#C9A84C" : C.border }}>
          {i <= full ? "★" : i === full + 1 && half ? "⯨" : "☆"}
        </span>
      ))}
    </span>
  );
};

const ReviewModal = ({ business, onClose, onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [text, setText] = useState("");
  const [name, setName] = useState("");

  const inputStyle = {
    width: "100%", background: C.surfaceAlt, border: `1px solid ${C.border}`,
    borderRadius: 8, padding: "10px 12px", color: C.textPrimary,
    fontSize: 14, outline: "none", boxSizing: "border-box", fontFamily: "Inter, sans-serif"
  };

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div style={{ background: C.surface, borderRadius: 16, padding: 28, width: "100%", maxWidth: 440, border: `1px solid ${C.border}` }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
          <div>
            <div style={{ color: C.accent, fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", marginBottom: 4 }}>Leave a Review</div>
            <div style={{ color: C.textPrimary, fontSize: 18, fontWeight: 700 }}>{business.name}</div>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", color: C.textMuted, fontSize: 22, cursor: "pointer", padding: 0, lineHeight: 1 }}>×</button>
        </div>

        <div style={{ marginBottom: 16 }}>
          <div style={{ color: C.textMuted, fontSize: 12, marginBottom: 8 }}>Your Rating</div>
          <div style={{ display: "flex", gap: 6 }}>
            {[1,2,3,4,5].map(i => (
              <span key={i} onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(0)}
                onClick={() => setRating(i)}
                style={{ fontSize: 28, cursor: "pointer", color: i <= (hover || rating) ? "#C9A84C" : "#333", transition: "color 0.15s" }}>★</span>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 14 }}>
          <div style={{ color: C.textMuted, fontSize: 12, marginBottom: 6 }}>Your Name</div>
          <input style={inputStyle} placeholder="First name or initials" value={name} onChange={e => setName(e.target.value)} />
        </div>

        <div style={{ marginBottom: 20 }}>
          <div style={{ color: C.textMuted, fontSize: 12, marginBottom: 6 }}>Your Experience</div>
          <textarea style={{ ...inputStyle, minHeight: 100, resize: "vertical" }} placeholder="Tell the community about your experience..." value={text} onChange={e => setText(e.target.value)} />
        </div>

        <button onClick={() => { if (rating && text && name) { onSubmit({ rating, text, name, date: "Just now" }); onClose(); }}}
          style={{ width: "100%", background: rating && text && name ? C.accent : C.border, color: rating && text && name ? "#fff" : C.textLight, border: "none", borderRadius: 10, padding: "13px 0", fontSize: 14, fontWeight: 700, cursor: rating && text && name ? "pointer" : "default", transition: "all 0.2s", fontFamily: "Inter, sans-serif" }}>
          Submit Review
        </button>
      </div>
    </div>
  );
};

const BusinessCard = ({ biz, onSelect }) => (
  <div onClick={() => onSelect(biz)} style={{ background: C.surface, borderRadius: 14, border: `1px solid ${C.border}`, cursor: "pointer", transition: "all 0.15s", overflow: "hidden", boxShadow: "0 2px 8px rgba(28,16,8,0.06)" }}
    onMouseEnter={e => { e.currentTarget.style.borderColor = C.accent; e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 4px 16px rgba(196,98,45,0.12)"; }}
    onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 2px 8px rgba(28,16,8,0.06)"; }}>
    {biz.photo
      ? <img src={biz.photo} alt={biz.name} style={{ width: "100%", height: 120, objectFit: "cover", display: "block" }} />
      : <div style={{ width: "100%", height: 80, background: `linear-gradient(135deg, ${C.accentLight} 0%, ${C.border} 100%)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ color: C.accent, fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", opacity: 0.6 }}>{biz.tags[0] || "Business"}</span>
        </div>
    }
    <div style={{ padding: 16 }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 4 }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
            <div style={{ color: C.textPrimary, fontSize: 15, fontWeight: 700 }}>{biz.name}</div>
            {biz.verified && <span style={{ background: "#FFF8E8", color: C.gold, fontSize: 10, fontWeight: 700, padding: "2px 7px", borderRadius: 20, border: "1px solid #C9A84C44" }}>✓ VERIFIED</span>}
          </div>
          <div style={{ color: C.textMuted, fontSize: 12, marginBottom: 8 }}>by {biz.owner}</div>
        </div>
      </div>
      <div style={{ color: C.textSecondary, fontSize: 13, lineHeight: 1.5, marginBottom: 12 }}>{biz.description}</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 12 }}>
        {biz.tags.map(t => <span key={t} style={{ background: C.accentLight, color: C.accent, fontSize: 11, padding: "3px 8px", borderRadius: 20 }}>{t}</span>)}
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <StarRating rating={biz.rating} />
          <span style={{ color: C.gold, fontSize: 13, fontWeight: 700 }}>{biz.rating}</span>
          <span style={{ color: C.textMuted, fontSize: 12 }}>({biz.reviews} reviews)</span>
        </div>
        <div style={{ color: C.textLight, fontSize: 11 }}>{biz.hours}</div>
      </div>
    </div>
  </div>
);

const BusinessDetail = ({ biz, onBack, reviews, onAddReview }) => {
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [shared, setShared] = useState(false);
  const [photo, setPhoto] = useState(biz.photo || null);
  const bizReviews = reviews[biz.id] || [];

  const handleShare = () => {
    const text = `Check out ${biz.name} on B.O.B — Black Owned Businesses!\n${biz.address}\n${biz.phone}`;
    if (navigator.share) {
      navigator.share({ title: biz.name, text });
    } else {
      navigator.clipboard.writeText(text).then(() => { setShared(true); setTimeout(() => setShared(false), 2500); });
    }
  };

  const mapUrl = `https://maps.apple.com/?q=${encodeURIComponent(biz.address)}`;

  return (
    <div>
      {showReviewModal && <ReviewModal business={biz} onClose={() => setShowReviewModal(false)} onSubmit={r => onAddReview(biz.id, r)} />}

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
        <button onClick={onBack} style={{ background: "none", border: "none", color: C.accent, fontSize: 13, cursor: "pointer", padding: 0, fontFamily: "Inter, sans-serif", fontWeight: 600 }}>← Back to results</button>
        <button onClick={handleShare} style={{ display: "flex", alignItems: "center", gap: 6, background: shared ? C.accentLight : C.surfaceAlt, border: `1px solid ${shared ? C.accent : C.border}`, borderRadius: 8, padding: "7px 14px", fontSize: 12, fontWeight: 600, color: shared ? C.accent : C.textSecondary, cursor: "pointer", fontFamily: "Inter, sans-serif", transition: "all 0.2s" }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
          {shared ? "Copied!" : "Share"}
        </button>
      </div>

      <div style={{ background: C.surface, borderRadius: 16, border: `1px solid ${C.border}`, marginBottom: 16, overflow: "hidden", boxShadow: "0 2px 12px rgba(28,16,8,0.08)" }}>
        {photo
          ? <img src={photo} alt={biz.name} style={{ width: "100%", height: 200, objectFit: "cover", display: "block" }} />
          : <div style={{ width: "100%", height: 120, background: `linear-gradient(135deg, ${C.accentLight} 0%, ${C.border} 100%)`, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
              <span style={{ color: C.accent, fontSize: 12, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", opacity: 0.5 }}>{biz.tags[0] || "Business"}</span>
            </div>
        }

        <div style={{ padding: 24 }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 4 }}>
            <div style={{ color: C.textPrimary, fontSize: 22, fontWeight: 800, lineHeight: 1.2, fontFamily: "'Playfair Display', serif" }}>{biz.name}</div>
            {biz.verified && <span style={{ background: "#FFF8E8", color: C.gold, fontSize: 11, fontWeight: 700, padding: "4px 10px", borderRadius: 20, border: "1px solid #C9A84C44", whiteSpace: "nowrap", marginLeft: 12 }}>✓ VERIFIED</span>}
          </div>
          <div style={{ color: C.textMuted, fontSize: 13, marginBottom: 16 }}>Owned by {biz.owner}</div>

          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
            <StarRating rating={biz.rating} size={18} />
            <span style={{ color: C.gold, fontSize: 16, fontWeight: 700 }}>{biz.rating}</span>
            <span style={{ color: C.textMuted, fontSize: 13 }}>({biz.reviews + bizReviews.length} reviews)</span>
          </div>

          <div style={{ color: C.textSecondary, fontSize: 14, lineHeight: 1.7, marginBottom: 20 }}>{biz.description}</div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 20 }}>
            <a href={mapUrl} target="_blank" rel="noopener noreferrer"
              style={{ background: C.surfaceAlt, borderRadius: 10, padding: "12px 14px", border: `1px solid ${C.border}`, textDecoration: "none", display: "block", transition: "border-color 0.15s" }}
              onMouseEnter={e => e.currentTarget.style.borderColor = C.accent}
              onMouseLeave={e => e.currentTarget.style.borderColor = C.border}>
              <div style={{ color: C.textMuted, fontSize: 11, marginBottom: 4 }}>📍 Address</div>
              <div style={{ color: C.accent, fontSize: 13 }}>{biz.address}</div>
              <div style={{ color: C.textLight, fontSize: 10, marginTop: 4 }}>Tap to open in Maps →</div>
            </a>
            <a href={`tel:${biz.phone}`} style={{ background: C.surfaceAlt, borderRadius: 10, padding: "12px 14px", border: `1px solid ${C.border}`, textDecoration: "none", display: "block", transition: "border-color 0.15s" }}
              onMouseEnter={e => e.currentTarget.style.borderColor = C.accent}
              onMouseLeave={e => e.currentTarget.style.borderColor = C.border}>
              <div style={{ color: C.textMuted, fontSize: 11, marginBottom: 4 }}>📞 Phone</div>
              <div style={{ color: C.textPrimary, fontSize: 13 }}>{biz.phone}</div>
              <div style={{ color: C.textLight, fontSize: 10, marginTop: 4 }}>Tap to call →</div>
            </a>
            <div style={{ background: C.surfaceAlt, borderRadius: 10, padding: "12px 14px", border: `1px solid ${C.border}` }}>
              <div style={{ color: C.textMuted, fontSize: 11, marginBottom: 4 }}>🕐 Hours</div>
              <div style={{ color: C.textPrimary, fontSize: 13 }}>{biz.hours}</div>
            </div>
            {biz.website && (
              <a href={biz.website.startsWith("http") ? biz.website : `https://${biz.website}`} target="_blank" rel="noopener noreferrer"
                style={{ background: C.surfaceAlt, borderRadius: 10, padding: "12px 14px", border: `1px solid ${C.border}`, textDecoration: "none", display: "block", transition: "border-color 0.15s", overflow: "hidden" }}
                onMouseEnter={e => e.currentTarget.style.borderColor = C.accent}
                onMouseLeave={e => e.currentTarget.style.borderColor = C.border}>
                <div style={{ color: C.textMuted, fontSize: 11, marginBottom: 4 }}>🌐 Website</div>
                <div style={{ color: C.accent, fontSize: 13, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{biz.website}</div>
                <div style={{ color: C.textLight, fontSize: 10, marginTop: 4 }}>Visit site →</div>
              </a>
            )}
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: (biz.instagram || biz.tiktok || biz.facebook) ? 16 : 0 }}>
            {biz.tags.map(t => <span key={t} style={{ background: C.accentLight, color: C.accent, fontSize: 11, padding: "4px 10px", borderRadius: 20 }}>{t}</span>)}
          </div>

          {(biz.instagram || biz.tiktok || biz.facebook) && (
            <div>
              <div style={{ color: C.textMuted, fontSize: 11, letterSpacing: 1, textTransform: "uppercase", marginBottom: 10 }}>Follow on Social</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {biz.instagram && (
                  <a href={`https://instagram.com/${biz.instagram.replace("@","")}`} target="_blank" rel="noopener noreferrer"
                    style={{ display: "flex", alignItems: "center", gap: 7, background: C.surfaceAlt, border: `1px solid ${C.border}`, borderRadius: 8, padding: "8px 12px", textDecoration: "none", transition: "border-color 0.15s" }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = C.accent}
                    onMouseLeave={e => e.currentTarget.style.borderColor = C.border}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#E1306C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="#E1306C" stroke="none"/></svg>
                    <span style={{ color: C.textSecondary, fontSize: 12 }}>{biz.instagram}</span>
                  </a>
                )}
                {biz.tiktok && (
                  <a href={`https://tiktok.com/${biz.tiktok.replace("@","")}`} target="_blank" rel="noopener noreferrer"
                    style={{ display: "flex", alignItems: "center", gap: 7, background: C.surfaceAlt, border: `1px solid ${C.border}`, borderRadius: 8, padding: "8px 12px", textDecoration: "none", transition: "border-color 0.15s" }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = C.accent}
                    onMouseLeave={e => e.currentTarget.style.borderColor = C.border}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill={C.textPrimary}><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.76a4.85 4.85 0 01-1.01-.07z"/></svg>
                    <span style={{ color: C.textSecondary, fontSize: 12 }}>{biz.tiktok}</span>
                  </a>
                )}
                {biz.facebook && (
                  <a href={`https://facebook.com/${biz.facebook}`} target="_blank" rel="noopener noreferrer"
                    style={{ display: "flex", alignItems: "center", gap: 7, background: C.surfaceAlt, border: `1px solid ${C.border}`, borderRadius: 8, padding: "8px 12px", textDecoration: "none", transition: "border-color 0.15s" }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = C.accent}
                    onMouseLeave={e => e.currentTarget.style.borderColor = C.border}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="#1877F2"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                    <span style={{ color: C.textSecondary, fontSize: 12 }}>{biz.facebook}</span>
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <div style={{ color: C.textPrimary, fontSize: 16, fontWeight: 700, fontFamily: "'Playfair Display', serif" }}>Community Reviews</div>
        <button onClick={() => setShowReviewModal(true)} style={{ background: C.accent, color: "#fff", border: "none", borderRadius: 8, padding: "8px 16px", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "Inter, sans-serif" }}>+ Write a Review</button>
      </div>

      {bizReviews.length === 0 && (
        <div style={{ background: C.surface, borderRadius: 12, padding: 24, border: `1px solid ${C.border}`, textAlign: "center", color: C.textLight, fontSize: 14 }}>
          Be the first to review {biz.name}
        </div>
      )}
      {bizReviews.map((r, i) => (
        <div key={i} style={{ background: C.surface, borderRadius: 12, padding: 18, border: `1px solid ${C.border}`, marginBottom: 10 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 32, height: 32, borderRadius: "50%", background: C.accentLight, border: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center", color: C.accent, fontSize: 13, fontWeight: 700 }}>{r.name[0]}</div>
              <div style={{ color: C.textPrimary, fontSize: 14, fontWeight: 600 }}>{r.name}</div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <StarRating rating={r.rating} size={13} />
              <span style={{ color: C.textLight, fontSize: 11 }}>{r.date}</span>
            </div>
          </div>
          <div style={{ color: C.textSecondary, fontSize: 13, lineHeight: 1.6 }}>{r.text}</div>
        </div>
      ))}
    </div>
  );
};

const SubmitBusiness = ({ onBack, onSubmit }) => {
  const [form, setForm] = useState({ name: "", owner: "", state: "", city: "", category: "", address: "", phone: "", hours: "", description: "", tags: "", website: "", instagram: "", tiktok: "", facebook: "", photo: null });
  const [photoPreview, setPhotoPreview] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const f = (k, v) => setForm(p => ({ ...p, [k]: v }));
  const inputStyle = { width: "100%", background: C.surfaceAlt, border: `1px solid ${C.border}`, borderRadius: 8, padding: "10px 12px", color: C.textPrimary, fontSize: 14, outline: "none", boxSizing: "border-box", fontFamily: "Inter, sans-serif" };
  const labelStyle = { color: C.textMuted, fontSize: 12, marginBottom: 6, display: "block" };

  if (submitted) return (
    <div style={{ textAlign: "center", padding: "60px 20px" }}>
      <div style={{ color: C.accent, fontSize: 22, fontWeight: 800, marginBottom: 12 }}>Submission Received</div>
      <div style={{ color: C.textMuted, fontSize: 14, lineHeight: 1.7, maxWidth: 320, margin: "0 auto 24px" }}>
        Your business has been submitted for review. Our team will verify your listing within 2–3 business days.
      </div>
      <button onClick={onBack} style={{ background: C.accent, color: "#fff", border: "none", borderRadius: 10, padding: "12px 28px", fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "Inter, sans-serif" }}>
        Back to Directory
      </button>
    </div>
  );

  return (
    <div>
      <button onClick={onBack} style={{ background: "none", border: "none", color: C.accent, fontSize: 13, cursor: "pointer", padding: "0 0 20px 0", fontFamily: "Inter, sans-serif" }}>
        ← Back
      </button>
      <div style={{ color: C.accent, fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", marginBottom: 6 }}>List Your Business</div>
      <div style={{ color: C.textPrimary, fontSize: 22, fontWeight: 800, marginBottom: 6 }}>Join the Directory</div>
      <div style={{ color: C.textMuted, fontSize: 13, marginBottom: 28, lineHeight: 1.6 }}>All submissions are manually reviewed before going live. We verify ownership to protect the community.</div>

      <div style={{ display: "grid", gap: 16 }}>
        {[["Business Name", "name", "text", "e.g. Crown Beauty Supply"], ["Owner Name", "owner", "text", "Your full name"], ["State", "state", "text", "e.g. Texas"], ["City", "city", "text", "e.g. Dallas"], ["Address", "address", "text", "Street address"], ["Phone Number", "phone", "tel", "(000) 000-0000"], ["Business Hours", "hours", "text", "e.g. Mon–Fri 9am–5pm"]].map(([label, key, type, ph]) => (
          <div key={key}>
            <label style={labelStyle}>{label}</label>
            <input type={type} style={inputStyle} placeholder={ph} value={form[key]} onChange={e => f(key, e.target.value)} />
          </div>
        ))}

        <div>
          <label style={labelStyle}>Category</label>
          <select style={{ ...inputStyle, appearance: "none" }} value={form.category} onChange={e => f("category", e.target.value)}>
            <option value="">Select a category</option>
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        <div>
          <label style={labelStyle}>Business Description</label>
          <textarea style={{ ...inputStyle, minHeight: 90, resize: "vertical" }} placeholder="Tell the community what makes your business special..." value={form.description} onChange={e => f("description", e.target.value)} />
        </div>

        <div>
          <label style={labelStyle}>Tags (comma separated)</label>
          <input style={inputStyle} placeholder="e.g. Natural Hair, Walk-Ins, Women-Owned" value={form.tags} onChange={e => f("tags", e.target.value)} />
        </div>

        <div>
          <label style={labelStyle}>Business Website (Optional)</label>
          <div style={{ position: "relative" }}>
            <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: C.textMuted, fontSize: 11 }}>https://</span>
            <input style={{ ...inputStyle, paddingLeft: 62 }} placeholder="yourwebsite.com" value={form.website} onChange={e => f("website", e.target.value)} />
          </div>
        </div>

        <div>
          <label style={labelStyle}>Business Photo (Optional)</label>
          <div style={{ border: `2px dashed ${photoPreview ? C.accent : C.border}`, borderRadius: 10, padding: photoPreview ? 0 : "24px 16px", textAlign: "center", cursor: "pointer", transition: "border-color 0.2s", overflow: "hidden", background: C.surfaceAlt }}
            onClick={() => document.getElementById("photo-upload").click()}>
            {photoPreview
              ? <div style={{ position: "relative" }}>
                  <img src={photoPreview} alt="Preview" style={{ width: "100%", height: 140, objectFit: "cover", display: "block" }} />
                  <div style={{ position: "absolute", bottom: 8, right: 8, background: "rgba(28,16,8,0.6)", color: "#fff", fontSize: 11, padding: "4px 10px", borderRadius: 6, cursor: "pointer" }}>Change photo</div>
                </div>
              : <>
                  <div style={{ fontSize: 28, marginBottom: 8 }}>📷</div>
                  <div style={{ color: C.textSecondary, fontSize: 13, fontWeight: 600 }}>Upload a photo</div>
                  <div style={{ color: C.textLight, fontSize: 11, marginTop: 4 }}>Storefront, logo, or interior — JPG or PNG</div>
                </>
            }
          </div>
          <input id="photo-upload" type="file" accept="image/*" style={{ display: "none" }} onChange={e => {
            const file = e.target.files[0];
            if (file) {
              const reader = new FileReader();
              reader.onload = ev => { setPhotoPreview(ev.target.result); f("photo", ev.target.result); };
              reader.readAsDataURL(file);
            }
          }} />
        </div>

        <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 16 }}>
          <div style={{ color: C.accent, fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", marginBottom: 14 }}>Social Media (Optional)</div>
          <div style={{ display: "grid", gap: 12 }}>
            <div>
              <label style={labelStyle}>Instagram Handle</label>
              <div style={{ position: "relative" }}>
                <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: C.textLight, fontSize: 14 }}>@</span>
                <input style={{ ...inputStyle, paddingLeft: 28 }} placeholder="yourhandle" value={form.instagram} onChange={e => f("instagram", e.target.value)} />
              </div>
            </div>
            <div>
              <label style={labelStyle}>TikTok Handle</label>
              <div style={{ position: "relative" }}>
                <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: C.textLight, fontSize: 14 }}>@</span>
                <input style={{ ...inputStyle, paddingLeft: 28 }} placeholder="yourhandle" value={form.tiktok} onChange={e => f("tiktok", e.target.value)} />
              </div>
            </div>
            <div>
              <label style={labelStyle}>Facebook Page</label>
              <div style={{ position: "relative" }}>
                <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: C.textLight, fontSize: 11, whiteSpace: "nowrap" }}>fb.com/</span>
                <input style={{ ...inputStyle, paddingLeft: 52 }} placeholder="yourpage" value={form.facebook} onChange={e => f("facebook", e.target.value)} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <button onClick={() => { if (form.name && form.owner && form.state && form.city && form.category) setSubmitted(true); }}
        style={{ width: "100%", marginTop: 24, background: form.name && form.owner && form.state && form.city && form.category ? C.accent : C.border, color: form.name && form.owner && form.state && form.city && form.category ? "#fff" : C.textLight, border: "none", borderRadius: 12, padding: "15px 0", fontSize: 15, fontWeight: 800, cursor: "pointer", fontFamily: "Inter, sans-serif", transition: "all 0.2s" }}>
        Submit for Review
      </button>
      <div style={{ color: C.textLight, fontSize: 11, textAlign: "center", marginTop: 10 }}>Submissions reviewed within 2–3 business days</div>
    </div>
  );
};

const AdminPanel = ({ pending, onApprove, onReject, onBack }) => (
  <div>
    <button onClick={onBack} style={{ background: "none", border: "none", color: C.accent, fontSize: 13, cursor: "pointer", padding: "0 0 20px 0", fontFamily: "Inter, sans-serif" }}>← Back</button>
    <div style={{ color: C.accent, fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", marginBottom: 6 }}>Admin</div>
    <div style={{ color: C.textPrimary, fontSize: 20, fontWeight: 800, marginBottom: 4 }}>Pending Approvals</div>
    <div style={{ color: C.textMuted, fontSize: 13, marginBottom: 24 }}>{pending.length} submission{pending.length !== 1 ? "s" : ""} awaiting review</div>

    {pending.length === 0 && (
      <div style={{ background: C.surface, borderRadius: 12, padding: 32, textAlign: "center", color: C.textLight, fontSize: 14, border: `1px solid ${C.border}` }}>
        No pending submissions. The directory is up to date.
      </div>
    )}

    {pending.map((biz, i) => (
      <div key={i} style={{ background: C.surface, borderRadius: 14, padding: 20, border: `1px solid ${C.border}`, marginBottom: 12 }}>
        <div style={{ color: C.textPrimary, fontSize: 16, fontWeight: 700, marginBottom: 4 }}>{biz.name}</div>
        <div style={{ color: C.textMuted, fontSize: 12, marginBottom: 12 }}>by {biz.owner} · {biz.city}, {biz.state} · {biz.category}</div>
        <div style={{ color: C.textSecondary, fontSize: 13, lineHeight: 1.5, marginBottom: 16 }}>{biz.description || "No description provided."}</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          <div style={{ background: C.surfaceAlt, borderRadius: 8, padding: "10px 12px", border: `1px solid ${C.border}` }}>
            <div style={{ color: C.textLight, fontSize: 11 }}>📍 Address</div>
            <div style={{ color: C.textSecondary, fontSize: 12, marginTop: 2 }}>{biz.address || "—"}</div>
          </div>
          <div style={{ background: C.surfaceAlt, borderRadius: 8, padding: "10px 12px", border: `1px solid ${C.border}` }}>
            <div style={{ color: C.textLight, fontSize: 11 }}>📞 Phone</div>
            <div style={{ color: C.textSecondary, fontSize: 12, marginTop: 2 }}>{biz.phone || "—"}</div>
          </div>
        </div>
        {(biz.instagram || biz.tiktok || biz.facebook) && (
          <div style={{ marginTop: 10, background: C.surfaceAlt, borderRadius: 8, padding: "10px 12px", border: `1px solid ${C.border}` }}>
            <div style={{ color: C.textLight, fontSize: 11, marginBottom: 6 }}>📱 Social</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {biz.instagram && <span style={{ color: "#E1306C", fontSize: 12 }}>IG: @{biz.instagram.replace("@","")}</span>}
              {biz.tiktok && <span style={{ color: C.textSecondary, fontSize: 12 }}>TT: @{biz.tiktok.replace("@","")}</span>}
              {biz.facebook && <span style={{ color: "#1877F2", fontSize: 12 }}>FB: {biz.facebook}</span>}
            </div>
          </div>
        )}
        <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
          <button onClick={() => onApprove(i)} style={{ flex: 1, background: C.accent, color: "#fff", border: "none", borderRadius: 8, padding: "10px 0", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "Inter, sans-serif" }}>
            ✓ Approve
          </button>
          <button onClick={() => onReject(i)} style={{ flex: 1, background: C.surfaceAlt, color: C.textSecondary, border: `1px solid ${C.border}`, borderRadius: 8, padding: "10px 0", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "Inter, sans-serif" }}>
            ✕ Reject
          </button>
        </div>
      </div>
    ))}
  </div>
);

export default function App() {
  const [view, setView] = useState("home");
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedBiz, setSelectedBiz] = useState(null);
  const [reviews, setReviews] = useState({});
  const [pending, setPending] = useState([
    { name: "Braids by Keisha", owner: "Keisha Monroe", state: "TX", city: "Dallas", category: "Beauty & Wellness", address: "7701 S Westmoreland Rd, Dallas TX", phone: "(214) 555-0911", description: "Knotless braids, box braids, and cornrows. 10+ years experience.", hours: "Tue–Sun 9am–6pm", tags: ["Braids", "Natural Hair"] }
  ]);
  const [adminCode, setAdminCode] = useState("");
  const [adminAuth, setAdminAuth] = useState(false);
  const [adminError, setAdminError] = useState(false);
  const [search, setSearch] = useState("");
  const [intro, setIntro] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setIntro(false), 2200);
    return () => clearTimeout(t);
  }, []);

  const addReview = (bizId, review) => setReviews(p => ({ ...p, [bizId]: [...(p[bizId] || []), review] }));
  const approvePending = (i) => {
    const biz = pending[i];
    setPending(p => p.filter((_, idx) => idx !== i));
  };
  const rejectPending = (i) => setPending(p => p.filter((_, idx) => idx !== i));

  const stateData = selectedState ? DATA[selectedState] : null;
  const cityData = selectedState && selectedCity ? DATA[selectedState]?.cities[selectedCity] : null;
  const businesses = cityData && selectedCategory ? (cityData.categories[selectedCategory] || []) : [];
  const filteredBiz = search ? businesses.filter(b => b.name.toLowerCase().includes(search.toLowerCase()) || b.description.toLowerCase().includes(search.toLowerCase()) || b.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))) : businesses;

  const font = "'Inter', -apple-system, sans-serif";
  const serif = "'Playfair Display', Georgia, serif";

  if (intro) return (
    <div style={{ background: C.bg, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: font }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ color: C.accent, fontSize: 13, fontWeight: 700, letterSpacing: 4, textTransform: "uppercase", marginBottom: 8, opacity: 0, animation: "fadeIn 0.8s ease forwards" }}>Black Owned Businesses</div>
        <div style={{ color: C.textPrimary, fontSize: 32, fontWeight: 800, fontFamily: serif, opacity: 0, animation: "fadeIn 0.8s ease 0.4s forwards" }}>B.O.B</div>
        <style>{`@keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }`}</style>
      </div>
    </div>
  );

  return (
    <div style={{ background: C.bg, minHeight: "100vh", fontFamily: font, color: C.textPrimary }}>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />

      {/* Header */}
      <div style={{ background: C.surface, borderBottom: `1px solid ${C.border}`, padding: "0 20px", position: "sticky", top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: 680, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 56 }}>
          <div onClick={() => { setView("home"); setSelectedState(null); setSelectedCity(null); setSelectedCategory(null); setSelectedBiz(null); }} style={{ cursor: "pointer" }}>
              <div style={{ color: "#C9A84C", fontSize: 18, fontWeight: 800, fontFamily: serif, lineHeight: 1 }}>B.O.B</div>
              <div style={{ color: C.textLight, fontSize: 9, letterSpacing: 2, textTransform: "uppercase" }}>Black Owned Businesses</div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={() => setView("submit")} style={{ background: C.accent, color: "#fff", border: "none", borderRadius: 8, padding: "7px 14px", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: font }}>+ List Business</button>
            <button onClick={() => setView("admin")} style={{ background: "none", color: C.textLight, border: `1px solid ${C.border}`, borderRadius: 8, padding: "7px 12px", fontSize: 11, cursor: "pointer", fontFamily: font }}>Admin</button>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 680, margin: "0 auto", padding: "24px 20px 60px" }}>

        {/* Submit View */}
        {view === "submit" && <SubmitBusiness onBack={() => setView("home")} onSubmit={biz => { setPending(p => [...p, biz]); setView("home"); }} />}

        {/* Admin View */}
        {view === "admin" && !adminAuth && (
          <div style={{ maxWidth: 360, margin: "60px auto", textAlign: "center" }}>
            <div style={{ color: C.accent, fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>Restricted Access</div>
            <div style={{ color: C.textPrimary, fontSize: 20, fontWeight: 800, marginBottom: 24 }}>Admin Login</div>
            <input type="password" placeholder="Enter admin code" value={adminCode} onChange={e => { setAdminCode(e.target.value); setAdminError(false); }}
              style={{ width: "100%", background: C.surfaceAlt, border: `1px solid ${adminError ? C.accent : C.border}`, borderRadius: 8, padding: "12px 16px", color: C.textPrimary, fontSize: 14, outline: "none", boxSizing: "border-box", fontFamily: font, marginBottom: 8 }} />
            {adminError && <div style={{ color: C.accent, fontSize: 12, marginBottom: 8 }}>Incorrect code. Try: admin123</div>}
            <button onClick={() => { if (adminCode === "admin123") setAdminAuth(true); else setAdminError(true); }}
              style={{ width: "100%", background: C.accent, color: "#fff", border: "none", borderRadius: 8, padding: "12px 0", fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: font }}>
              Enter
            </button>
            <button onClick={() => setView("home")} style={{ background: "none", border: "none", color: C.textLight, fontSize: 12, cursor: "pointer", marginTop: 12, fontFamily: font }}>Cancel</button>
          </div>
        )}
        {view === "admin" && adminAuth && <AdminPanel pending={pending} onApprove={approvePending} onReject={rejectPending} onBack={() => { setView("home"); setAdminAuth(false); }} />}

        {/* Main Directory Flow */}
        {view === "home" && (
          <>
            {/* Business Detail */}
            {selectedBiz && (
              <BusinessDetail biz={selectedBiz} onBack={() => setSelectedBiz(null)} reviews={reviews} onAddReview={addReview} />
            )}

            {/* Business List */}
            {!selectedBiz && selectedCategory && (
              <>
                <div style={{ marginBottom: 20 }}>
                  <button onClick={() => setSelectedCategory(null)} style={{ background: "none", border: "none", color: C.accent, fontSize: 13, cursor: "pointer", padding: "0 0 12px 0", fontFamily: font }}>← Back to categories</button>
                  <div style={{ color: C.textMuted, fontSize: 11, letterSpacing: 2, textTransform: "uppercase", marginBottom: 4 }}>{stateData?.name} · {selectedCity}</div>
                  <div style={{ color: C.textPrimary, fontSize: 20, fontWeight: 800, marginBottom: 16 }}>{selectedCategory}</div>
                  <input placeholder="Search businesses..." value={search} onChange={e => setSearch(e.target.value)}
                    style={{ width: "100%", background: C.surface, border: `1px solid ${C.border}`, borderRadius: 10, padding: "11px 16px", color: C.textPrimary, fontSize: 14, outline: "none", boxSizing: "border-box", fontFamily: font }} />
                </div>
                {filteredBiz.length === 0 ? (
                  <div style={{ textAlign: "center", padding: "48px 0", color: C.textLight, fontSize: 14 }}>No businesses found. Try adjusting your search.</div>
                ) : (
                  <div style={{ display: "grid", gap: 12 }}>
                    {filteredBiz.map(biz => <BusinessCard key={biz.id} biz={biz} onSelect={setSelectedBiz} />)}
                  </div>
                )}
              </>
            )}

            {/* Category Picker */}
            {!selectedBiz && !selectedCategory && selectedCity && (
              <>
                <button onClick={() => setSelectedCity(null)} style={{ background: "none", border: "none", color: C.accent, fontSize: 13, cursor: "pointer", padding: "0 0 12px 0", fontFamily: font }}>← Back to cities</button>
                <div style={{ color: C.textMuted, fontSize: 11, letterSpacing: 2, textTransform: "uppercase", marginBottom: 4 }}>{stateData?.name} · {selectedCity}</div>
                <div style={{ color: C.textPrimary, fontSize: 20, fontWeight: 800, marginBottom: 20 }}>What are you looking for?</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                  {CATEGORIES.map(cat => {
                    const count = cityData?.categories[cat]?.length || 0;
                    return (
                      <button key={cat} onClick={() => setSelectedCategory(cat)}
                        style={{ background: count > 0 ? C.surface : C.surfaceAlt, border: `1px solid ${C.border}`, borderRadius: 12, padding: "16px 14px", textAlign: "left", cursor: count > 0 ? "pointer" : "default", opacity: count > 0 ? 1 : 0.5, fontFamily: font, transition: "border-color 0.15s" }}
                        onMouseEnter={e => { if (count > 0) e.currentTarget.style.borderColor = C.accent; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; }}>
                        <div style={{ color: C.textPrimary, fontSize: 13, fontWeight: 700, marginBottom: 4 }}>{cat}</div>
                        <div style={{ color: count > 0 ? C.accent : C.textLight, fontSize: 12 }}>{count > 0 ? `${count} listed` : "Coming soon"}</div>
                      </button>
                    );
                  })}
                </div>
              </>
            )}

            {/* City Picker */}
            {!selectedBiz && !selectedCategory && !selectedCity && selectedState && (
              <>
                <button onClick={() => setSelectedState(null)} style={{ background: "none", border: "none", color: C.accent, fontSize: 13, cursor: "pointer", padding: "0 0 12px 0", fontFamily: font }}>← Back to states</button>
                <div style={{ color: C.textMuted, fontSize: 11, letterSpacing: 2, textTransform: "uppercase", marginBottom: 4 }}>{stateData?.name}</div>
                <div style={{ color: C.textPrimary, fontSize: 20, fontWeight: 800, marginBottom: 20 }}>Select a City</div>
                <div style={{ display: "grid", gap: 10 }}>
                  {Object.keys(stateData.cities).map(city => (
                    <button key={city} onClick={() => setSelectedCity(city)}
                      style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: "18px 20px", textAlign: "left", cursor: "pointer", fontFamily: font, display: "flex", justifyContent: "space-between", alignItems: "center", transition: "all 0.15s", boxShadow: "0 1px 4px rgba(28,16,8,0.05)" }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = C.accent; e.currentTarget.style.boxShadow = "0 3px 12px rgba(196,98,45,0.1)"; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.boxShadow = "0 1px 4px rgba(28,16,8,0.05)"; }}>
                      <div style={{ color: C.textPrimary, fontSize: 16, fontWeight: 700 }}>{city}</div>
                      <div style={{ color: C.accent, fontSize: 12 }}>{Object.values(stateData.cities[city].categories).flat().length} businesses →</div>
                    </button>
                  ))}
                </div>
              </>
            )}

            {/* State Picker / Home */}
            {!selectedBiz && !selectedCategory && !selectedCity && !selectedState && (
              <>
                <div style={{ marginBottom: 32 }}>
                  <div style={{ color: C.textPrimary, fontSize: 28, fontWeight: 800, fontFamily: serif, lineHeight: 1.2, marginBottom: 12 }}>Find Black-Owned Businesses Near You</div>
                  <div style={{ color: C.textMuted, fontSize: 14, lineHeight: 1.7 }}>Verified, community-reviewed businesses. Spend your dollar with intention.</div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 32 }}>
                  {[["✓", "Verified Listings"], ["★", "Community Reviews"], ["🔒", "Manual Approval"]].map(([icon, label]) => (
                    <div key={label} style={{ background: C.surface, borderRadius: 10, padding: "14px 10px", textAlign: "center", border: `1px solid ${C.border}` }}>
                      <div style={{ color: C.accent, fontSize: 18, marginBottom: 4 }}>{icon}</div>
                      <div style={{ color: C.textMuted, fontSize: 11, lineHeight: 1.3 }}>{label}</div>
                    </div>
                  ))}
                </div>

                <div style={{ color: C.textPrimary, fontSize: 16, fontWeight: 700, marginBottom: 14 }}>Select a State</div>
                <div style={{ display: "grid", gap: 10 }}>
                  {Object.entries(DATA).map(([code, state]) => {
                    const total = Object.values(state.cities).reduce((a, c) => a + Object.values(c.categories).flat().length, 0);
                    return (
                      <button key={code} onClick={() => setSelectedState(code)}
                        style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: "18px 20px", textAlign: "left", cursor: "pointer", fontFamily: font, display: "flex", justifyContent: "space-between", alignItems: "center", transition: "all 0.15s", boxShadow: "0 1px 4px rgba(28,16,8,0.05)" }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = C.accent; e.currentTarget.style.boxShadow = "0 3px 12px rgba(196,98,45,0.1)"; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.boxShadow = "0 1px 4px rgba(28,16,8,0.05)"; }}>
                        <div>
                          <div style={{ color: C.textPrimary, fontSize: 16, fontWeight: 700 }}>{state.name}</div>
                          <div style={{ color: C.textLight, fontSize: 12, marginTop: 2 }}>{Object.keys(state.cities).length} cities</div>
                        </div>
                        <div style={{ color: C.accent, fontSize: 13, fontWeight: 700 }}>{total} businesses →</div>
                      </button>
                    );
                  })}
                </div>

                <div style={{ marginTop: 24, background: C.accentLight, borderRadius: 12, padding: "16px 20px", border: `1px solid ${C.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ color: C.textPrimary, fontSize: 14, fontWeight: 700 }}>Own a Black business?</div>
                    <div style={{ color: C.textMuted, fontSize: 12, marginTop: 2 }}>Get listed in the directory</div>
                  </div>
                  <button onClick={() => setView("submit")} style={{ background: C.accent, color: "#fff", border: "none", borderRadius: 8, padding: "10px 16px", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: font, whiteSpace: "nowrap" }}>
                    Apply Now
                  </button>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
