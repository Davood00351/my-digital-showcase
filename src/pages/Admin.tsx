import { useState } from "react";
import { FileText, ShoppingBag, MessageCircle, Settings, Plus, Pencil, Trash2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import { toast } from "sonner";
import { useCV } from "@/contexts/CVContext";

type Tab = "cv" | "products" | "messages" | "settings";

const tabs: { key: Tab; label: string; icon: React.ElementType }[] = [
  { key: "cv", label: "CV Info", icon: FileText },
  { key: "products", label: "Products", icon: ShoppingBag },
  { key: "messages", label: "Messages", icon: MessageCircle },
  { key: "settings", label: "Settings", icon: Settings },
];

const Admin = () => {
  const [activeTab, setActiveTab] = useState<Tab>("cv");

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <h1 className="text-2xl font-heading font-bold text-foreground mb-8">Admin Panel</h1>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-56 flex-shrink-0">
            <div className="bg-card rounded-xl border border-border p-3 space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`admin-sidebar-item w-full ${activeTab === tab.key ? "admin-sidebar-active" : ""}`}
                >
                  <tab.icon size={18} />
                  <span className="text-sm">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 bg-card rounded-xl border border-border p-6">
            {activeTab === "cv" && <CVPanel />}
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
  const { cv, updateCV } = useCV();
  const [name, setName] = useState(cv.name);
  const [title, setTitle] = useState(cv.title);
  const [about, setAbout] = useState(cv.about);
  const [phone, setPhone] = useState(cv.phone);
  const [email, setEmail] = useState(cv.email);
  const [address, setAddress] = useState(cv.address);
  const [location, setLocation] = useState(cv.location);
  const [dob, setDob] = useState(cv.dob);

  const handleSave = () => {
    updateCV({ name, title, about, phone, email, address, location, dob });
    toast.success("CV info updated! Changes are now live on the CV page.");
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-heading font-semibold text-foreground">Edit CV Information</h2>
      <p className="text-sm text-muted-foreground">Changes will be reflected instantly on the CV page.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-foreground mb-1 block">Full Name</label>
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label className="text-sm font-medium text-foreground mb-1 block">Title</label>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div>
          <label className="text-sm font-medium text-foreground mb-1 block">Phone</label>
          <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
        </div>
        <div>
          <label className="text-sm font-medium text-foreground mb-1 block">Email</label>
          <Input value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label className="text-sm font-medium text-foreground mb-1 block">Location</label>
          <Input value={location} onChange={(e) => setLocation(e.target.value)} />
        </div>
        <div>
          <label className="text-sm font-medium text-foreground mb-1 block">Address</label>
          <Input value={address} onChange={(e) => setAddress(e.target.value)} />
        </div>
        <div>
          <label className="text-sm font-medium text-foreground mb-1 block">Date of Birth</label>
          <Input value={dob} onChange={(e) => setDob(e.target.value)} />
        </div>
      </div>
      <div>
        <label className="text-sm font-medium text-foreground mb-1 block">About Me</label>
        <Textarea value={about} onChange={(e) => setAbout(e.target.value)} rows={4} />
      </div>
      <Button className="gap-2" onClick={handleSave}>
        <Save size={16} /> Save Changes
      </Button>
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
        <Button size="sm" className="gap-2" onClick={() => toast.info("Connect Firebase to add products")}>
          <Plus size={16} /> Add Product
        </Button>
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
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => toast.info("Edit coming with Firebase")}>
                <Pencil size={14} />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => removeProduct(p.id)}>
                <Trash2 size={14} />
              </Button>
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
      <h3 className="font-semibold text-foreground mb-2">🔥 Firebase Integration</h3>
      <p className="text-sm text-muted-foreground mb-4">
        Connect Firebase to enable persistent data storage, authentication, real-time chat, and file storage.
      </p>
      <div className="space-y-3">
        <div>
          <label className="text-sm font-medium text-foreground mb-1 block">Firebase API Key</label>
          <Input placeholder="Enter your Firebase API key..." />
        </div>
        <div>
          <label className="text-sm font-medium text-foreground mb-1 block">Firebase Project ID</label>
          <Input placeholder="Enter your Firebase project ID..." />
        </div>
        <Button className="gap-2" onClick={() => toast.info("Firebase integration coming soon!")}>
          Connect Firebase
        </Button>
      </div>
    </div>
  </div>
);

export default Admin;
