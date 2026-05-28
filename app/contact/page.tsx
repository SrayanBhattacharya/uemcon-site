"use client";

import React, { useState } from "react";
import { Mail, Phone, Landmark, Send, Info } from "lucide-react";
import Container from "@/components/layout/Container";
import Section from "@/components/ui/Section";
import Heading from "@/components/ui/Heading";
import Divider from "@/components/ui/Divider";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    institution: "",
    delegationType: "Single Delegate",
    intent: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const type = params.get("type");
      if (type === "eb") {
        setFormState((prev) => ({ ...prev, delegationType: "Executive Board" }));
      } else if (type === "delegate") {
        setFormState((prev) => ({ ...prev, delegationType: "Single Delegate" }));
      }
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormState({
        name: "",
        email: "",
        institution: "",
        delegationType: "Single Delegate",
        intent: "",
      });
    }, 4000);
  };

  return (
    <div className="flex flex-col w-full">
      {/* Full-width warm-tan Header Banner styled like the Committees banner */}
      <Section className="py-0 relative" animate={false}>
        <div className="w-full bg-[#CBAD7F] relative overflow-hidden flex items-center md:items-end px-6 md:px-12 lg:px-16 py-3 md:py-5 h-[90px] md:h-[155px] border-b border-warm-tan/30 select-none">
          {/* Giant Background Text */}
          <h2 className="font-sans font-black text-[#011E33]/12 text-[3.1rem] sm:text-[4.5rem] md:text-[5.5rem] lg:text-[7.5rem] xl:text-[9rem] 2xl:text-[10.5rem] uppercase tracking-tighter leading-none absolute top-1/2 -translate-y-1/2 md:top-auto md:translate-y-0 md:-bottom-3 left-6 md:left-12 lg:left-16 pointer-events-none whitespace-nowrap">
            REGISTRY
          </h2>
          
          {/* Banner Front Content */}
          <div className="relative z-10 w-full flex justify-between items-center md:items-end text-[#011E33] mb-0 md:mb-1">
            <span className="font-sans font-bold text-[9px] sm:text-xs tracking-[0.25em] uppercase whitespace-nowrap">
              DIPLOMATIC INQUIRIES
            </span>
            <span className="font-serif italic text-xs md:text-sm font-semibold max-w-[280px] sm:max-w-md text-right leading-snug hidden md:block">
              "Submit a credentials request and contact the secretariat desk"
            </span>
          </div>
        </div>
      </Section>

      {/* Main Grid */}
      <Section className="bg-paper">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left: Contact Info (4 Columns) */}
            <div className="lg:col-span-4 space-y-8">
              <Heading level={3} className="text-xl md:text-2xl text-primary-blue font-serif uppercase tracking-wider">
                Registry Desks
              </Heading>
              <p className="font-sans text-xs text-ink/75 leading-relaxed">
                Direct your dispatches to the respective departments. Institutional delegations can contact the Delegate Relations chair directly.
              </p>

              <div className="space-y-6">
                <Card interactive={false} className="p-5 flex gap-4">
                  <div className="text-warm-tan mt-1">
                    <Mail className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <h5 className="font-serif text-[10px] tracking-widest uppercase font-bold text-primary-blue">
                      Secretariat Dispatch
                    </h5>
                    <p className="font-sans text-xs text-ink/80 mt-1">
                      secretariat@uemcon.org
                    </p>
                    <p className="font-sans text-[10px] text-ink/40">General inquiries, rules of procedure.</p>
                  </div>
                </Card>

                <Card interactive={false} className="p-5 flex gap-4">
                  <div className="text-warm-tan mt-1">
                    <Phone className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <h5 className="font-serif text-[10px] tracking-widest uppercase font-bold text-primary-blue">
                      Delegate Relations
                    </h5>
                    <p className="font-sans text-xs text-ink/80 mt-1">
                      +91 98765 43210
                    </p>
                    <p className="font-sans text-[10px] text-ink/40">Payment gateways, hostel lodging.</p>
                  </div>
                </Card>

                <Card interactive={false} className="p-5 flex gap-4">
                  <div className="text-warm-tan mt-1">
                    <Landmark className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <h5 className="font-serif text-[10px] tracking-widest uppercase font-bold text-primary-blue">
                      Conference Venue
                    </h5>
                    <p className="font-sans text-xs text-ink/80 mt-1">
                      University of Engineering & Management Campus
                    </p>
                    <p className="font-sans text-[10px] text-ink/40">New Town, Kolkata, WB, India.</p>
                  </div>
                </Card>
              </div>
            </div>

            {/* Right: Registry Form (8 Columns) */}
            <div className="lg:col-span-8">
              <Card interactive={false} className="border border-warm-tan/30 relative">
                <div className="absolute top-3 left-3 w-2 h-2 border-t border-l border-warm-tan/40" />
                <div className="absolute top-3 right-3 w-2 h-2 border-t border-r border-warm-tan/40" />
                <div className="absolute bottom-3 left-3 w-2 h-2 border-b border-l border-warm-tan/40" />
                <div className="absolute bottom-3 right-3 w-2 h-2 border-b border-r border-warm-tan/40" />

                <div className="mb-6">
                  <Heading level={3} className="text-lg md:text-xl text-primary-blue font-serif uppercase tracking-wider mb-2">
                    Submit Diplomatic Inquiry
                  </Heading>
                  <p className="font-sans text-[11px] text-ink/60">
                    All registry transmissions are cataloged under general archives.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Full Name */}
                    <div className="space-y-2">
                      <label htmlFor="name" className="block font-serif text-[10px] tracking-wider uppercase text-warm-tan font-bold">
                        Full Name / Chief Delegate
                      </label>
                      <input
                        type="text"
                        id="name"
                        required
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        className="w-full bg-paper border border-warm-tan/35 rounded-none px-4 py-2.5 font-sans text-xs text-ink focus:outline-none focus:border-primary-blue focus:ring-1 focus:ring-primary-blue/30"
                        placeholder="John Doe"
                      />
                    </div>

                    {/* Email Dispatch */}
                    <div className="space-y-2">
                      <label htmlFor="email" className="block font-serif text-[10px] tracking-wider uppercase text-warm-tan font-bold">
                        Email Address for Dispatch
                      </label>
                      <input
                        type="email"
                        id="email"
                        required
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        className="w-full bg-paper border border-warm-tan/35 rounded-none px-4 py-2.5 font-sans text-xs text-ink focus:outline-none focus:border-primary-blue focus:ring-1 focus:ring-primary-blue/30"
                        placeholder="delegate@domain.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Institution */}
                    <div className="space-y-2">
                      <label htmlFor="institution" className="block font-serif text-[10px] tracking-wider uppercase text-warm-tan font-bold">
                        Institution / University Name
                      </label>
                      <input
                        type="text"
                        id="institution"
                        required
                        value={formState.institution}
                        onChange={(e) => setFormState({ ...formState, institution: e.target.value })}
                        className="w-full bg-paper border border-warm-tan/35 rounded-none px-4 py-2.5 font-sans text-xs text-ink focus:outline-none focus:border-primary-blue focus:ring-1 focus:ring-primary-blue/30"
                        placeholder="University of Engineering & Management"
                      />
                    </div>

                    {/* Delegation Type */}
                    <div className="space-y-2">
                      <label htmlFor="delegationType" className="block font-serif text-[10px] tracking-wider uppercase text-warm-tan font-bold">
                        Delegation Category
                      </label>
                      <select
                        id="delegationType"
                        value={formState.delegationType}
                        onChange={(e) => setFormState({ ...formState, delegationType: e.target.value })}
                        className="w-full bg-paper border border-warm-tan/35 rounded-none px-4 py-2.5 font-sans text-xs text-ink focus:outline-none focus:border-primary-blue focus:ring-1 focus:ring-primary-blue/30"
                      >
                        <option value="Single Delegate">Single Delegate</option>
                        <option value="Double Delegation">Double Delegation</option>
                        <option value="Observer Envoy">Observer Envoy</option>
                        <option value="Executive Board">Executive Board</option>
                      </select>
                    </div>
                  </div>

                  {/* Intent / Statement */}
                  <div className="space-y-2">
                    <label htmlFor="intent" className="block font-serif text-[10px] tracking-wider uppercase text-warm-tan font-bold">
                      Statement of Diplomatic Intent (Optional)
                    </label>
                    <textarea
                      id="intent"
                      rows={4}
                      value={formState.intent}
                      onChange={(e) => setFormState({ ...formState, intent: e.target.value })}
                      className="w-full bg-paper border border-warm-tan/35 rounded-none px-4 py-2.5 font-sans text-xs text-ink focus:outline-none focus:border-primary-blue focus:ring-1 focus:ring-primary-blue/30 resize-none"
                      placeholder="Briefly state your preferred allocation or inquiries regarding research portfolios..."
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="flex items-center justify-between pt-4 border-t border-warm-tan/10">
                    <div className="flex items-center gap-1.5 text-[10px] text-ink/50 uppercase tracking-widest font-semibold">
                      <Info className="h-3.5 w-3.5 text-warm-tan/60" />
                      <span>Transmitted securely</span>
                    </div>

                    <Button variant="primary" type="submit" className="flex items-center gap-2">
                      {isSubmitted ? "Transmitting..." : "Send Dispatch"}
                      <Send className="h-3 w-3" />
                    </Button>
                  </div>

                  {/* Success Banner */}
                  {isSubmitted && (
                    <div className="border border-primary-blue/30 bg-primary-blue/5 p-4 text-center text-xs text-primary-blue font-serif uppercase tracking-wider animate-fade-in">
                      ✔ Dispatch logged under ID #{Math.floor(100000 + Math.random() * 900000)}. The secretariat relations deck has been notified.
                    </div>
                  )}
                </form>
              </Card>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
