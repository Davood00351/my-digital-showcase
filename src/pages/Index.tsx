import { useRef, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Download, Mail, Phone, MapPin, Calendar, Briefcase, GraduationCap, Globe, CheckCircle, Github, Linkedin, Instagram, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import profileImg from "@/assets/profile.jpg";
import euFlag from "@/assets/eu-flag.png";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useCV } from "@/contexts/CVContext";

const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.73a8.19 8.19 0 004.76 1.52v-3.4a4.85 4.85 0 01-1-.16z"/>
  </svg>
);

const Index = () => {
  const cvRef = useRef<HTMLDivElement>(null);
  const { cv } = useCV();
  const navigate = useNavigate();

  // Secret admin access: tap profile 5 times
  const [tapCount, setTapCount] = useState(0);
  const tapTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleProfileTap = useCallback(() => {
    setTapCount(prev => {
      const next = prev + 1;
      if (next >= 5) {
        navigate("/admin-panel-secret");
        return 0;
      }
      return next;
    });
    if (tapTimerRef.current) clearTimeout(tapTimerRef.current);
    tapTimerRef.current = setTimeout(() => setTapCount(0), 2000);
  }, [navigate]);

  const socialLinks = [
    { key: "github", icon: Github, url: cv.socialLinks?.github, label: "GitHub" },
    { key: "linkedin", icon: Linkedin, url: cv.socialLinks?.linkedin, label: "LinkedIn" },
    { key: "instagram", icon: Instagram, url: cv.socialLinks?.instagram, label: "Instagram" },
    { key: "whatsapp", icon: MessageCircle, url: cv.socialLinks?.whatsapp, label: "WhatsApp" },
    { key: "tiktok", icon: TikTokIcon, url: cv.socialLinks?.tiktok, label: "TikTok" },
  ].filter(l => l.url);

  const handleDownloadPDF = async () => {
    const el = document.getElementById("cv-printable");
    if (!el) return;

    // Temporarily force light colors for PDF
    const noPrintEls = el.querySelectorAll('.no-print');
    noPrintEls.forEach(e => e.classList.remove('no-print'));

    // Clone element for clean capture
    const clone = el.cloneNode(true) as HTMLElement;
    clone.style.position = "absolute";
    clone.style.left = "-9999px";
    clone.style.top = "0";
    clone.style.width = "800px";
    clone.style.background = "#ffffff";
    clone.style.color = "#1a1a2e";

    // Force all text to dark colors in clone
    clone.querySelectorAll("*").forEach((child) => {
      const el = child as HTMLElement;
      const computed = window.getComputedStyle(el);
      const color = computed.color;
      // If text is too light, darken it
      if (color) {
        const match = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
        if (match) {
          const r = parseInt(match[1]);
          const g = parseInt(match[2]);
          const b = parseInt(match[3]);
          const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
          if (luminance > 0.6) {
            el.style.color = "#2d2d3f";
          }
        }
      }
      // Force backgrounds to white/light
      const bg = computed.backgroundColor;
      if (bg && bg !== "rgba(0, 0, 0, 0)" && bg !== "transparent") {
        const match = bg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
        if (match) {
          const r = parseInt(match[1]);
          const g = parseInt(match[2]);
          const b = parseInt(match[3]);
          const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
          if (luminance < 0.3) {
            el.style.backgroundColor = "#ffffff";
          }
        }
      }
    });

    // Fix skill bars to be visible
    clone.querySelectorAll(".skill-bar-track").forEach((track) => {
      (track as HTMLElement).style.backgroundColor = "#e5e7eb";
    });
    clone.querySelectorAll(".skill-bar-fill").forEach((fill) => {
      (fill as HTMLElement).style.background = "linear-gradient(90deg, #3b82f6, #1d4ed8)";
    });

    // Fix borders
    clone.querySelectorAll(".europass-section").forEach((section) => {
      (section as HTMLElement).style.backgroundColor = "#ffffff";
      (section as HTMLElement).style.borderColor = "#e5e7eb";
    });

    document.body.appendChild(clone);

    const canvas = await html2canvas(clone, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#ffffff',
      logging: false,
    });

    document.body.removeChild(clone);
    noPrintEls.forEach(e => e.classList.add('no-print'));

    const imgData = canvas.toDataURL("image/jpeg", 0.95);
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfW = pdf.internal.pageSize.getWidth();
    const pdfH = (canvas.height * pdfW) / canvas.width;
    const pageH = pdf.internal.pageSize.getHeight();

    if (pdfH <= pageH) {
      pdf.addImage(imgData, "JPEG", 0, 0, pdfW, pdfH);
    } else {
      let position = 0;
      let remaining = pdfH;
      while (remaining > 0) {
        pdf.addImage(imgData, "JPEG", 0, position, pdfW, pdfH);
        remaining -= pageH;
        position -= pageH;
        if (remaining > 0) pdf.addPage();
      }
    }
    pdf.save("Davood_Sharifi_CV.pdf");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div id="cv-printable">
        {/* Hero */}
        <section className="hero-gradient pt-24 pb-16 md:pb-24 no-print">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-8">
              <img src={euFlag} alt="European Union Flag" className="w-10 h-10 object-contain" />
              <span className="text-primary-foreground/90 text-xl font-heading font-bold tracking-wide">Europass</span>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
              <div 
                className="relative w-40 h-40 md:w-52 md:h-52 flex-shrink-0 flex items-center justify-center cursor-pointer select-none"
                onClick={handleProfileTap}
              >
                <div className="absolute inset-0 animate-spin" style={{ animationDuration: '20s' }}>
                  {Array.from({ length: 12 }).map((_, i) => {
                    const angle = (i * 30) * (Math.PI / 180);
                    const radius = 48;
                    const x = 50 + radius * Math.cos(angle);
                    const y = 50 + radius * Math.sin(angle);
                    return (
                      <span key={i} className="absolute text-yellow-400 text-[10px] md:text-xs"
                        style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)' }}>
                        ★
                      </span>
                    );
                  })}
                </div>
                <div className="w-32 h-32 md:w-44 md:h-44 rounded-full overflow-hidden border-4 border-primary-foreground/30 shadow-xl z-10">
                  <img src={profileImg} alt={cv.name} className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="text-center md:text-left">
                <h1 className="text-3xl md:text-5xl font-heading font-bold text-primary-foreground mb-2">
                  {cv.name}
                </h1>
                <p className="text-lg md:text-xl text-primary-foreground/80 mb-4">{cv.title}</p>
                <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-primary-foreground/70">
                  <span className="flex items-center gap-1"><MapPin size={14} /> {cv.location}</span>
                  <span className="flex items-center gap-1"><Phone size={14} /> {cv.phone}</span>
                  <span className="flex items-center gap-1"><Mail size={14} /> {cv.email}</span>
                </div>
                {/* Social Links */}
                {socialLinks.length > 0 && (
                  <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-4">
                    {socialLinks.map((s) => (
                      <a key={s.key} href={s.url} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 text-primary-foreground/90 text-xs font-medium transition-colors">
                        {s.key === "tiktok" ? <TikTokIcon /> : <s.icon size={14} />}
                        {s.label}
                      </a>
                    ))}
                  </div>
                )}
                <Button onClick={handleDownloadPDF}
                  className="mt-6 bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-semibold gap-2">
                  <Download size={16} /> Download CV as PDF
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* CV Content */}
        <div ref={cvRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
          {/* About Me */}
          <section className="europass-section animate-fade-in">
            <h2 className="europass-heading">About Me</h2>
            <p className="text-muted-foreground leading-relaxed">{cv.about}</p>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <section className="europass-section animate-fade-in" style={{ animationDelay: "0.1s" }}>
              <h2 className="europass-heading flex items-center gap-2">
                <GraduationCap size={20} className="text-primary" /> Education
              </h2>
              <div className="space-y-6">
                {cv.education.map((edu, i) => (
                  <div key={i} className="border-l-2 border-border pl-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                      <Calendar size={14} /> {edu.period}
                    </div>
                    <h3 className="font-semibold text-foreground">{edu.degree}</h3>
                    <p className="text-sm text-primary font-medium">{edu.school}</p>
                    <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                      {edu.details.map((d, j) => (<li key={j}>• {d}</li>))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            <section className="europass-section animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <h2 className="europass-heading flex items-center gap-2">
                <Briefcase size={20} className="text-primary" /> Work Experience
              </h2>
              <div className="space-y-5">
                {cv.experience.map((exp, i) => (
                  <div key={i} className="border-l-2 border-border pl-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                      <Calendar size={14} /> {exp.year}
                    </div>
                    <h3 className="font-semibold text-foreground text-sm">{exp.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{exp.desc}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Skills */}
          <section className="europass-section animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <h2 className="europass-heading">Skills</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                  <CheckCircle size={16} className="text-primary" /> Technical
                </h3>
                <div className="space-y-3">
                  {cv.technicalSkills.map((s) => (
                    <div key={s.name}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-foreground">{s.name}</span>
                        <span className="text-muted-foreground">{s.pct}%</span>
                      </div>
                      <div className="skill-bar-track"><div className="skill-bar-fill" style={{ width: `${s.pct}%` }} /></div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                  <CheckCircle size={16} className="text-primary" /> Creative
                </h3>
                <div className="space-y-3">
                  {cv.creativeSkills.map((s) => (
                    <div key={s.name}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-foreground">{s.name}</span>
                        <span className="text-muted-foreground">{s.pct}%</span>
                      </div>
                      <div className="skill-bar-track"><div className="skill-bar-fill" style={{ width: `${s.pct}%` }} /></div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Globe size={16} className="text-primary" /> Languages
                </h3>
                <div className="space-y-3">
                  {cv.languages.map((s) => (
                    <div key={s.name}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-foreground">{s.name}</span>
                        <span className="text-muted-foreground">{s.level}</span>
                      </div>
                      <div className="skill-bar-track"><div className="skill-bar-fill" style={{ width: `${s.pct}%` }} /></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Contact */}
          <section className="europass-section animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <h2 className="europass-heading">Contact Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { icon: Phone, label: "Phone", value: cv.phone },
                { icon: Mail, label: "Email", value: cv.email },
                { icon: MapPin, label: "Address", value: cv.address },
                { icon: Calendar, label: "Date of Birth", value: cv.dob },
              ].map((c) => (
                <div key={c.label} className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center flex-shrink-0">
                    <c.icon size={18} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">{c.label}</p>
                    <p className="text-sm font-medium text-foreground">{c.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <div className="text-center no-print">
            <Button onClick={handleDownloadPDF} className="gap-2" size="lg">
              <Download size={18} /> Download CV as PDF
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Index;
