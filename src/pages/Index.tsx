import { useRef } from "react";
import { Download, Mail, Phone, MapPin, Calendar, Briefcase, GraduationCap, Globe, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import profileImg from "@/assets/profile.jpg";
import euFlag from "@/assets/eu-flag.png";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const handleDownloadPDF = async () => {
  const el = document.getElementById("cv-printable");
  if (!el) return;
  const canvas = await html2canvas(el, { scale: 2, useCORS: true });
  const imgData = canvas.toDataURL("image/png");
  const pdf = new jsPDF("p", "mm", "a4");
  const pdfW = pdf.internal.pageSize.getWidth();
  const pdfH = (canvas.height * pdfW) / canvas.width;
  pdf.addImage(imgData, "PNG", 0, 0, pdfW, pdfH);
  pdf.save("Davood_Sharifi_CV.pdf");
};

const Index = () => {
  const cvRef = useRef<HTMLDivElement>(null);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Europass Header */}
      <div id="cv-printable">
      <section className="hero-gradient pt-24 pb-16 md:pb-24 no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Europass Badge */}
          <div className="flex items-center gap-3 mb-8">
            <img src={euFlag} alt="European Union Flag" className="w-10 h-10 object-contain" />
            <span className="text-primary-foreground/90 text-xl font-heading font-bold tracking-wide">Europass</span>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
            <div className="w-32 h-32 md:w-44 md:h-44 rounded-full overflow-hidden border-4 border-primary-foreground/30 shadow-xl flex-shrink-0">
              <img src={profileImg} alt="Davood Sharifi" className="w-full h-full object-cover" />
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-3xl md:text-5xl font-heading font-bold text-primary-foreground mb-2">
                Davood Sharifi
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/80 mb-4">
                Software Developer & Creative Designer
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-primary-foreground/70">
                <span className="flex items-center gap-1"><MapPin size={14} /> Braga, Portugal</span>
                <span className="flex items-center gap-1"><Phone size={14} /> +351 927 717 490</span>
                <span className="flex items-center gap-1"><Mail size={14} /> davood00351@gmail.com</span>
              </div>
              <Button
                onClick={handleDownloadPDF}
                className="mt-6 bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-semibold gap-2"
              >
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
          <p className="text-muted-foreground leading-relaxed">
            I'm a 19-year-old passionate software developer and creative designer. I practice various sports including gym workouts, swimming, ping-pong, tennis, and volleyball. I am a disciplined and energetic person, always looking for opportunities to grow both personally and professionally. I combine technical skills with creative vision to deliver compelling digital experiences.
          </p>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Education */}
          <section className="europass-section animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <h2 className="europass-heading flex items-center gap-2">
              <GraduationCap size={20} className="text-primary" /> Education
            </h2>
            <div className="space-y-6">
              <div className="border-l-2 border-border pl-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                  <Calendar size={14} /> 2018 – 2022
                </div>
                <h3 className="font-semibold text-foreground">Bachelor's in Computer Science / Software Engineering</h3>
                <p className="text-sm text-primary font-medium">University of Minho, Braga</p>
                <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                  <li>• Software development (React, JavaScript)</li>
                  <li>• Database management (SQL, Firebase)</li>
                  <li>• Cloud computing (GCP, Vercel)</li>
                  <li>• Algorithms & Data Structures</li>
                  <li>• Version control (Git, GitHub)</li>
                </ul>
              </div>
              <div className="border-l-2 border-border pl-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                  <Calendar size={14} /> 2023 – 2026
                </div>
                <h3 className="font-semibold text-foreground">Professional School</h3>
                <p className="text-sm text-primary font-medium">Braga Professional School</p>
                <p className="text-sm text-muted-foreground mt-1">Currently in 12th Grade</p>
              </div>
            </div>
          </section>

          {/* Work Experience */}
          <section className="europass-section animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <h2 className="europass-heading flex items-center gap-2">
              <Briefcase size={20} className="text-primary" /> Work Experience
            </h2>
            <div className="space-y-5">
              {[
                { year: "2022 – Present", title: "Software Developer (Freelance)", desc: "Web app development with React & JavaScript. Cloud infrastructure, database design, OAuth integration, e-commerce platforms." },
                { year: "2025", title: "Retail Trainee – Worten", desc: "Hands-on experience in retail operations, customer service, and team collaboration in electronics retail." },
                { year: "2025", title: "YouTube Content Creator", desc: "Founded and manage a YouTube channel producing original comedic short-form content." },
                { year: "2023", title: "Event Organizer", desc: "Organized football matches, coordinated team events, scheduling, and venue management." },
                { year: "2021", title: "Brand Content Creator", desc: "Full-service content creation: photography, videography, graphic design, motion graphics, and music production." },
                { year: "2020", title: "YouTube Video Editor", desc: "Creating and editing YouTube videos, designing logos and thumbnails." },
              ].map((exp, i) => (
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
                {[
                  { name: "Web & App Development", pct: 85 },
                  { name: "JavaScript / React", pct: 85 },
                  { name: "SQL / Database", pct: 75 },
                  { name: "Git / GitHub", pct: 80 },
                  { name: "Cloud (GCP, Vercel)", pct: 70 },
                  { name: "Technical SEO", pct: 75 },
                ].map((s) => (
                  <div key={s.name}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-foreground">{s.name}</span>
                      <span className="text-muted-foreground">{s.pct}%</span>
                    </div>
                    <div className="skill-bar-track">
                      <div className="skill-bar-fill" style={{ width: `${s.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <CheckCircle size={16} className="text-primary" /> Creative
              </h3>
              <div className="space-y-3">
                {[
                  { name: "Graphic Design", pct: 90 },
                  { name: "Motion Graphics", pct: 80 },
                  { name: "Photography & Video", pct: 85 },
                  { name: "Interior/Exterior Design", pct: 70 },
                  { name: "Audio / Music Production", pct: 75 },
                ].map((s) => (
                  <div key={s.name}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-foreground">{s.name}</span>
                      <span className="text-muted-foreground">{s.pct}%</span>
                    </div>
                    <div className="skill-bar-track">
                      <div className="skill-bar-fill" style={{ width: `${s.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <Globe size={16} className="text-primary" /> Languages
              </h3>
              <div className="space-y-3">
                {[
                  { name: "Persian", pct: 100, level: "Native" },
                  { name: "Portuguese", pct: 90, level: "Fluent" },
                  { name: "English", pct: 60, level: "Intermediate" },
                ].map((s) => (
                  <div key={s.name}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-foreground">{s.name}</span>
                      <span className="text-muted-foreground">{s.level}</span>
                    </div>
                    <div className="skill-bar-track">
                      <div className="skill-bar-fill" style={{ width: `${s.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Contact Info */}
        <section className="europass-section animate-fade-in" style={{ animationDelay: "0.4s" }}>
          <h2 className="europass-heading">Contact Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Phone, label: "Phone", value: "+351 927 717 490" },
              { icon: Mail, label: "Email", value: "davood00351@gmail.com" },
              { icon: MapPin, label: "Address", value: "Rua do Raio, nº 75, Braga" },
              { icon: Calendar, label: "Date of Birth", value: "22/05/2006" },
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

        {/* Download button (print) */}
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
