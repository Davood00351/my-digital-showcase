import { useState, useRef, useEffect } from "react";
import { Send, Bot, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/Navbar";

interface Message {
  id: number;
  text: string;
  sender: "user" | "admin";
  time: string;
}

const adminReplies = [
  "Thanks for your message! I'll get back to you shortly.",
  "That's a great question! Let me check and respond soon.",
  "I appreciate your interest! Feel free to browse my shop while you wait.",
  "Got it! I'll review this and reply as soon as possible.",
  "Thank you for reaching out! How can I help you further?",
];

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hello! Welcome to my portfolio. How can I help you today?", sender: "admin", time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) },
  ]);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;
    const now = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const userMsg: Message = { id: Date.now(), text: input, sender: "user", time: now };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    setTimeout(() => {
      const reply = adminReplies[Math.floor(Math.random() * adminReplies.length)];
      const replyTime = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      setMessages((prev) => [...prev, { id: Date.now() + 1, text: reply, sender: "admin", time: replyTime }]);
    }, 1000 + Math.random() * 1500);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <div className="flex-1 flex flex-col max-w-3xl mx-auto w-full px-4 pt-20 pb-4">
        <div className="text-center py-6">
          <h1 className="text-2xl font-heading font-bold text-foreground">Chat with Admin</h1>
          <p className="text-sm text-muted-foreground mt-1">Send a message and I'll respond as soon as possible.</p>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto space-y-4 pb-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex items-end gap-2 ${msg.sender === "user" ? "flex-row-reverse" : ""}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                msg.sender === "admin" ? "bg-primary text-primary-foreground" : "bg-accent text-accent-foreground"
              }`}>
                {msg.sender === "admin" ? <Bot size={16} /> : <User size={16} />}
              </div>
              <div>
                <div className={msg.sender === "user" ? "chat-bubble-user" : "chat-bubble-admin"}>
                  {msg.text}
                </div>
                <p className={`text-xs text-muted-foreground mt-1 ${msg.sender === "user" ? "text-right" : ""}`}>
                  {msg.time}
                </p>
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="flex gap-2 border-t border-border pt-4">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Type your message..."
            className="flex-1"
          />
          <Button onClick={sendMessage} size="icon" disabled={!input.trim()}>
            <Send size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
