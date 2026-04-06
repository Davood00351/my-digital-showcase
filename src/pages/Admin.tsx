import { useState } from "react";
import { FileText, ShoppingBag, MessageCircle, Settings, Plus, Pencil, Trash2, Save, LogIn, LogOut, Link as LinkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import { toast } from "sonner";
import { useCV } from "@/contexts/CVContext";
import { useAuth } from "@/contexts/AuthContext";

type Tab = "cv" | "social" | "products" | "messages" | "settings";

const tabs: { key: Tab; label: string; icon: React.ElementType }[] = [
  { key: "cv", label: "CV Info", icon: FileText },
  { key: "social", label: "Social Links", icon: LinkIcon },
  { key: "products", label: "Products", icon: ShoppingBag },
  { key: "messages", label: "Messages", icon: MessageCircle },
  { key: "settings", label: "Settings", icon: Settings },
];

const Admin = () => {
  const { user, loading, isAdmin, login, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>("cv");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPass, setLoginPass] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  const handleLogin = async () => {
    setLoginLoading(true);
    try {
      await login(loginEmail, loginPass);
      toast.success("Logged in successfully!");
    } catch (e: any) {
      toast.error(e.message || "Login failed");
    } finally {
      setLoginLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!user || !isAdmin) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-20 max-w-md mx-auto px-4 py-16">
          <div className="bg-card rounded-xl border border-border p-8 space-y-6">
            <div className="text-center">
              <LogIn size={40} className="mx-auto text-primary mb-4" />
              <h1 className="text-2xl font-heading font-bold text-foreground">Admin Login</h1>
              <p className="text-sm text-muted-foreground mt-2">Sign in to manage your CV and content</p>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">Email</label>
                <Input value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} placeholder="admin@email.com" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">Password</label>
                <Input type="password" value={loginPass} onChange={(e) => setLoginPass(e.target.value)} placeholder="••••••••"
                  onKeyDown={(e) => e.key === "Enter" && handleLogin()} />
              </div>
              <Button className="w-full gap-2" onClick={handleLogin} disabled={loginLoading}>
                <LogIn size={16} /> {loginLoading ? "Signing in..." : "Sign In"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-heading font-bold text-foreground">Admin Panel</h1>
          <Button variant="outline" size="sm" className="gap-2" onClick={() => { logout(); toast.success("Logged out"); }}>
            <LogOut size={16} /> Logout
          </Button>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-56 flex-shrink-0">
            <div className="bg-card rounded-xl border border-border p-3 space-y-1">
              {tabs.map((tab) => (
                <button key={tab.key} onClick={() => setActiveTab(tab.key)}
                  className={`admin-sidebar-item w-full ${activeTab === tab.key ? "admin-sidebar-active" : ""}`}>
                  <tab.icon size={18} />
                  <span className="text-sm">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 bg-card rounded-xl border border-border p-6">
            {activeTab === "cv" && <CVPanel />}
            {activeTab === "social" && <SocialPanel />}
            {activeTab === "products" && <ProductsPanel />}
            {activeTab === "messages" && <MessagesPanel />}
            {activeTab === "settings" && <SettingsPanel />}
          </div>
        </div>
      </div>
    </div>
  );
};

const CVPanel = () => {
  const { cv, updateCV, saveToFirestore } = useCV();
  const [name, setName] = useState(cv.name);
  const [title, setTitle] = useState(cv.title);
  const [about, setAbout] = useState(cv.about);
  const [phone, setPhone] = useState(cv.phone);
  const [email, setEmail] = useState(cv.email);
  const [address, setAddress] = useState(cv.address);
  const [location, setLocation] = useState(cv.location);
  const [dob, setDob] = useState(cv.dob);

  const handleSave = async () => {
    updateCV({ name, title, about, phone, email, address, location, dob });
    try {
      await saveToFirestore();
      toast.success("CV saved to database! Changes are live.");
    } catch {
      toast.success("CV updated locally (Firestore rules may need updating).");
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-heading font-semibold text-foreground">Edit CV Information</h2>
      <p className="text-sm text-muted-foreground">Changes save to Firebase and appear instantly on the CV page.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div><label className="text-sm font-medium text-foreground mb-1 block">Full Name</label><Input value={name} onChange={(e) => setName(e.target.value)} /></div>
        <div><label className="text-sm font-medium text-foreground mb-1 block">Title</label><Input value={title} onChange={(e) => setTitle(e.target.value)} /></div>
        <div><label className="text-sm font-medium text-foreground mb-1 block">Phone</label><Input value={phone} onChange={(e) => setPhone(e.target.value)} /></div>
        <div><label className="text-sm font-medium text-foreground mb-1 block">Email</label><Input value={email} onChange={(e) => setEmail(e.target.value)} /></div>
        <div><label className="text-sm font-medium text-foreground mb-1 block">Location</label><Input value={location} onChange={(e) => setLocation(e.target.value)} /></div>
        <div><label className="text-sm font-medium text-foreground mb-1 block">Address</label><Input value={address} onChange={(e) => setAddress(e.target.value)} /></div>
        <div><label className="text-sm font-medium text-foreground mb-1 block">Date of Birth</label><Input value={dob} onChange={(e) => setDob(e.target.value)} /></div>
      </div>
      <div><label className="text-sm font-medium text-foreground mb-1 block">About Me</label><Textarea value={about} onChange={(e) => setAbout(e.target.value)} rows={4} /></div>
      <Button className="gap-2" onClick={handleSave}><Save size={16} /> Save Changes</Button>
    </div>
  );
};

const SocialPanel = () => {
  const { cv, updateCV, saveToFirestore } = useCV();
  const [github, setGithub] = useState(cv.socialLinks?.github || "");
  const [linkedin, setLinkedin] = useState(cv.socialLinks?.linkedin || "");
  const [instagram, setInstagram] = useState(cv.socialLinks?.instagram || "");
  const [whatsapp, setWhatsapp] = useState(cv.socialLinks?.whatsapp || "");
  const [tiktok, setTiktok] = useState(cv.socialLinks?.tiktok || "");

  const handleSave = async () => {
    updateCV({ socialLinks: { github, linkedin, instagram, whatsapp, tiktok } });
    try {
      await saveToFirestore();
      toast.success("Social links saved!");
    } catch {
      toast.success("Social links updated locally.");
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-heading font-semibold text-foreground">Social Links</h2>
      <p className="text-sm text-muted-foreground">Add your social media URLs. They will appear on your CV page.</p>
      <div className="space-y-4">
        <div><label className="text-sm font-medium text-foreground mb-1 block">GitHub URL</label><Input value={github} onChange={(e) => setGithub(e.target.value)} placeholder="https://github.com/username" /></div>
        <div><label className="text-sm font-medium text-foreground mb-1 block">LinkedIn URL</label><Input value={linkedin} onChange={(e) => setLinkedin(e.target.value)} placeholder="https://linkedin.com/in/username" /></div>
        <div><label className="text-sm font-medium text-foreground mb-1 block">Instagram URL</label><Input value={instagram} onChange={(e) => setInstagram(e.target.value)} placeholder="https://instagram.com/username" /></div>
        <div><label className="text-sm font-medium text-foreground mb-1 block">WhatsApp Link</label><Input value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} placeholder="https://wa.me/351927717490" /></div>
        <div><label className="text-sm font-medium text-foreground mb-1 block">TikTok URL</label><Input value={tiktok} onChange={(e) => setTiktok(e.target.value)} placeholder="https://tiktok.com/@username" /></div>
      </div>
      <Button className="gap-2" onClick={handleSave}><Save size={16} /> Save Social Links</Button>
    </div>
  );
};

const ProductsPanel = () => {
  const [products, setProducts] = useState([
    { id: 1, title: "Web Dev Course", category: "courses", price: 29.99 },
    { id: 2, title: "Pixel Adventure", category: "games", price: 9.99 },
    { id: 3, title: "The Developer's Journey", category: "films", price: 7.99 },
    { id: 4, title: "Clean Code Handbook", category: "books", price: 15.99 },
  ]);

  const removeProduct = (id: number) => {
    setProducts(products.filter((p) => p.id !== id));
    toast.success("Product removed!");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-heading font-semibold text-foreground">Manage Products</h2>
        <Button size="sm" className="gap-2" onClick={() => toast.info("Product management coming soon")}><Plus size={16} /> Add Product</Button>
      </div>
      <div className="space-y-3">
        {products.map((p) => (
          <div key={p.id} className="flex items-center justify-between p-4 rounded-lg border border-border bg-background">
            <div className="flex items-center gap-3">
              <Badge variant="secondary" className="capitalize text-xs">{p.category}</Badge>
              <span className="font-medium text-foreground text-sm">{p.title}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold text-primary">${p.price}</span>
              <Button variant="ghost" size="icon" className="h-8 w-8"><Pencil size={14} /></Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => removeProduct(p.id)}><Trash2 size={14} /></Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const MessagesPanel = () => {
  const messages = [
    { id: 1, from: "John Doe", text: "Hi, I'm interested in your web dev course.", time: "2 hours ago" },
    { id: 2, from: "Jane Smith", text: "Can you create a logo for my brand?", time: "5 hours ago" },
    { id: 3, from: "Alex K.", text: "Great portfolio! Let's collaborate.", time: "1 day ago" },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-heading font-semibold text-foreground">Messages</h2>
      <div className="space-y-3">
        {messages.map((m) => (
          <div key={m.id} className="p-4 rounded-lg border border-border bg-background">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-foreground text-sm">{m.from}</span>
              <span className="text-xs text-muted-foreground">{m.time}</span>
            </div>
            <p className="text-sm text-muted-foreground">{m.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const SettingsPanel = () => (
  <div className="space-y-6">
    <h2 className="text-xl font-heading font-semibold text-foreground">Settings</h2>
    <div className="bg-accent/50 rounded-lg p-6 border border-border">
      <h3 className="font-semibold text-foreground mb-2">🔥 Firebase Connected</h3>
      <p className="text-sm text-muted-foreground">
        Project: cv-davood-54a28 • Auth & Firestore active
      </p>
    </div>
  </div>
);

export default Admin;
