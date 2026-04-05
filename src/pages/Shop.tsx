import { useState } from "react";
import { BookOpen, Film, Gamepad2, GraduationCap, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "sonner";

type Category = "all" | "courses" | "games" | "films" | "books";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  category: Category;
  image: string;
}

const products: Product[] = [
  { id: 1, title: "Complete Web Development Course", description: "Learn React, JavaScript, and modern web development from scratch.", price: 29.99, category: "courses", image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=250&fit=crop" },
  { id: 2, title: "Advanced JavaScript Masterclass", description: "Deep dive into ES6+, async patterns, and performance optimization.", price: 24.99, category: "courses", image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=250&fit=crop" },
  { id: 3, title: "UI/UX Design Fundamentals", description: "Master the principles of user interface and experience design.", price: 19.99, category: "courses", image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=250&fit=crop" },
  { id: 4, title: "Pixel Adventure", description: "A retro-style platformer game with 50+ levels.", price: 9.99, category: "games", image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=250&fit=crop" },
  { id: 5, title: "Space Commander", description: "Strategic space exploration and combat simulator.", price: 14.99, category: "games", image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=400&h=250&fit=crop" },
  { id: 6, title: "Code Warriors", description: "Learn programming through an exciting RPG adventure.", price: 12.99, category: "games", image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=250&fit=crop" },
  { id: 7, title: "The Developer's Journey", description: "A documentary about the life of indie developers.", price: 7.99, category: "films", image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&h=250&fit=crop" },
  { id: 8, title: "Digital Nomad Life", description: "Exploring remote work culture around the world.", price: 5.99, category: "films", image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=250&fit=crop" },
  { id: 9, title: "Clean Code Handbook", description: "Best practices for writing maintainable and scalable code.", price: 15.99, category: "books", image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=250&fit=crop" },
  { id: 10, title: "The Creative Developer", description: "Bridging the gap between design and development.", price: 12.99, category: "books", image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=250&fit=crop" },
  { id: 11, title: "Startup Playbook", description: "From idea to launch — a practical guide.", price: 18.99, category: "books", image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&h=250&fit=crop" },
];

const categories: { key: Category; label: string; icon: React.ElementType }[] = [
  { key: "all", label: "All", icon: ShoppingCart },
  { key: "courses", label: "Courses", icon: GraduationCap },
  { key: "games", label: "Games", icon: Gamepad2 },
  { key: "films", label: "Films", icon: Film },
  { key: "books", label: "Books", icon: BookOpen },
];

const Shop = () => {
  const [active, setActive] = useState<Category>("all");
  const filtered = active === "all" ? products : products.filter((p) => p.category === active);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground">Shop</h1>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
            Browse my collection of courses, games, films, and books.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <Button
              key={cat.key}
              variant={active === cat.key ? "default" : "outline"}
              size="sm"
              onClick={() => setActive(cat.key)}
              className="gap-2"
            >
              <cat.icon size={16} />
              {cat.label}
            </Button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((product) => (
            <div key={product.id} className="shop-card">
              <div className="h-48 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary" className="text-xs capitalize">{product.category}</Badge>
                  <span className="text-lg font-bold text-primary">${product.price}</span>
                </div>
                <h3 className="font-heading font-semibold text-foreground mb-1">{product.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{product.description}</p>
                <Button
                  className="w-full gap-2"
                  onClick={() => toast.success(`"${product.title}" added to cart!`)}
                >
                  <ShoppingCart size={16} /> Add to Cart
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Shop;
