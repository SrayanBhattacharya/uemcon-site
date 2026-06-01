"use client";

import React, { useState } from "react";
import { Send, Info, CheckCircle2, AlertCircle } from "lucide-react";
import Container from "@/components/layout/Container";
import Section from "@/components/ui/Section";
import Heading from "@/components/ui/Heading";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import committeesData from "@/lib/committees.json";

interface Committee {
  id: string;
  name: string;
  fullName: string;
  color: string;
}

export default function EBRegisterPage() {
  const committees = committeesData as Committee[];

  const [formState, setFormState] = useState({
    name: "",
    institute: "",
    email: "",
    gender: "",
    phone: "",
    whatsapp: "",
    totalExperience: "",
    previousExperience: "",
    committeePref1: "",
    position1: "",
    committeePref2: "",
    position2: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<{
    type: "idle" | "submitting" | "success" | "error";
    message?: string;
  }>({ type: "idle" });

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formState.name.trim()) newErrors.name = "Full name is required";
    if (!formState.institute.trim()) newErrors.institute = "Institute is required";
    
    if (!formState.email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!/\S+@\S+\.\S+/.test(formState.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formState.gender) newErrors.gender = "Gender selection is required";
    
    if (!formState.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (formState.phone.length < 10) {
      newErrors.phone = "Phone number must be at least 10 digits";
    }

    if (!formState.whatsapp.trim()) {
      newErrors.whatsapp = "WhatsApp number is required";
    } else if (formState.whatsapp.length < 10) {
      newErrors.whatsapp = "WhatsApp number must be at least 10 digits";
    }

    if (!formState.totalExperience.trim()) newErrors.totalExperience = "Total experience is required";
    if (!formState.previousExperience.trim()) newErrors.previousExperience = "Previous experience description is required";
    
    if (!formState.committeePref1) newErrors.committeePref1 = "First preference committee is required";
    if (!formState.position1) newErrors.position1 = "Preferred position for committee 1 is required";
    
    if (!formState.committeePref2) newErrors.committeePref2 = "Second preference committee is required";
    if (!formState.position2) newErrors.position2 = "Preferred position for committee 2 is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) {
      setStatus({
        type: "error",
        message: "Please correct the highlighted errors in the fields below.",
      });
      return;
    }

    setStatus({ type: "submitting" });

    try {
      const response = await fetch("/api/register-eb", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formState),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus({
          type: "success",
          message: "EB applications successfully submitted! The secretariat desk will evaluate your credentials.",
        });
        setErrors({});
        // Reset form
        setFormState({
          name: "",
          institute: "",
          email: "",
          gender: "",
          phone: "",
          whatsapp: "",
          totalExperience: "",
          previousExperience: "",
          committeePref1: "",
          position1: "",
          committeePref2: "",
          position2: "",
        });
      } else {
        setStatus({
          type: "error",
          message: data.error || "Failed to submit EB application. Please try again.",
        });
      }
    } catch (err) {
      console.error(err);
      setStatus({
        type: "error",
        message: "An unexpected registry error occurred. Please contact academic affairs.",
      });
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormState((prev) => ({ ...prev, [id]: value }));
    
    // Clear field error on change
    if (errors[id]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[id];
        return next;
      });
    }
  };

  const getInputStyle = (fieldId: string) => {
    const hasError = !!errors[fieldId];
    return `w-full bg-paper border rounded-none px-4 py-2.5 font-sans text-xs text-ink focus:outline-none focus:ring-1 ${
      hasError
        ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
        : "border-warm-tan/35 focus:border-primary-blue focus:ring-primary-blue/30"
    }`;
  };

  const positions = [
    "Chairperson",
    "Vice-Chairperson",
    "Co-Chairperson",
    "Director",
    "Moderator",
    "Editor-in-Chief",
    "IP Editor",
  ];

  return (
    <div className="flex flex-col w-full">
      {/* Full-width warm-tan Header Banner */}
      <Section className="py-0 relative" animate={false}>
        <div className="w-full bg-[#CBAD7F] relative overflow-hidden flex items-center md:items-end px-6 md:px-12 lg:px-16 py-3 md:py-5 h-[90px] md:h-[155px] border-b border-warm-tan/30 select-none">
          {/* Giant Background Text */}
          <h2 className="font-sans font-black text-[#011E33]/12 text-[3.1rem] sm:text-[4.5rem] md:text-[5.5rem] lg:text-[7.5rem] xl:text-[9rem] 2xl:text-[10.5rem] uppercase tracking-tighter leading-none absolute top-1/2 -translate-y-1/2 md:top-auto md:translate-y-0 md:-bottom-3 left-6 md:left-12 lg:left-16 pointer-events-none whitespace-nowrap">
            APPLY
          </h2>

          {/* Banner Front Content */}
          <div className="relative z-10 w-full flex justify-between items-center md:items-end text-[#011E33] mb-0 md:mb-1">
            <span className="font-sans font-bold text-[9px] sm:text-xs tracking-[0.25em] uppercase whitespace-nowrap">
              EXECUTIVE BOARD PORTFOLIO
            </span>
            <span className="font-serif italic text-xs md:text-sm font-semibold max-w-[280px] sm:max-w-md text-right leading-snug hidden md:block">
              "Apply for the academic and moderating positions of UEMCON 2026"
            </span>
          </div>
        </div>
      </Section>

      <Section className="bg-paper py-12 md:py-20">
        <Container>
          <div className="max-w-4xl mx-auto">
            <Card interactive={false} className="border border-warm-tan/30 relative p-6 sm:p-10">
              {/* Corner decor */}
              <div className="absolute top-3 left-3 w-2.5 h-2.5 border-t border-l border-warm-tan/40" />
              <div className="absolute top-3 right-3 w-2.5 h-2.5 border-t border-r border-warm-tan/40" />
              <div className="absolute bottom-3 left-3 w-2.5 h-2.5 border-b border-l border-warm-tan/40" />
              <div className="absolute bottom-3 right-3 w-2.5 h-2.5 border-b border-r border-warm-tan/40" />

              <div className="mb-10 text-center md:text-left">
                <Heading level={3} className="text-xl md:text-2xl text-primary-blue font-serif uppercase tracking-wider mb-2">
                  EXECUTIVE BOARD PORTAL
                </Heading>
                <p className="font-sans text-xs text-ink/60">
                  Submit credentials and session preferences for academic board evaluation.
                </p>
                <div className="h-[1px] bg-warm-tan/20 w-full mt-4" />
              </div>

              <form onSubmit={handleSubmit} noValidate className="space-y-8">
                {/* Part 1: Personal Details */}
                <div className="space-y-6">
                  <h4 className="font-serif text-sm tracking-widest uppercase text-warm-tan font-bold pb-2 border-b border-warm-tan/10">
                    I. Personal & Academic Credentials
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Full Name */}
                    <div className="space-y-2">
                      <label htmlFor="name" className="block font-sans text-[10px] tracking-wider uppercase text-warm-tan/80 font-bold">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={formState.name}
                        onChange={handleInputChange}
                        className={getInputStyle("name")}
                        placeholder="John Doe"
                      />
                      {errors.name && <p className="text-[10px] text-red-400 mt-1 font-sans font-medium">{errors.name}</p>}
                    </div>

                    {/* Institute */}
                    <div className="space-y-2">
                      <label htmlFor="institute" className="block font-sans text-[10px] tracking-wider uppercase text-warm-tan/80 font-bold">
                        Institute Name
                      </label>
                      <input
                        type="text"
                        id="institute"
                        value={formState.institute}
                        onChange={handleInputChange}
                        className={getInputStyle("institute")}
                        placeholder="e.g. Institute of Engineering and Management"
                      />
                      {errors.institute && <p className="text-[10px] text-red-400 mt-1 font-sans font-medium">{errors.institute}</p>}
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <label htmlFor="email" className="block font-sans text-[10px] tracking-wider uppercase text-warm-tan/80 font-bold">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={formState.email}
                        onChange={handleInputChange}
                        className={getInputStyle("email")}
                        placeholder="john.doe@email.com"
                      />
                      {errors.email && <p className="text-[10px] text-red-400 mt-1 font-sans font-medium">{errors.email}</p>}
                    </div>

                    {/* Gender */}
                    <div className="space-y-2">
                      <label htmlFor="gender" className="block font-sans text-[10px] tracking-wider uppercase text-warm-tan/80 font-bold">
                        Gender
                      </label>
                      <select
                        id="gender"
                        value={formState.gender}
                        onChange={handleInputChange}
                        className={getInputStyle("gender")}
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                      {errors.gender && <p className="text-[10px] text-red-400 mt-1 font-sans font-medium">{errors.gender}</p>}
                    </div>

                    {/* Phone */}
                    <div className="space-y-2">
                      <label htmlFor="phone" className="block font-sans text-[10px] tracking-wider uppercase text-warm-tan/80 font-bold">
                        Contact Phone Number
                      </label>
                      <input
                        type="tel"
                        pattern="[0-9]*"
                        inputMode="numeric"
                        id="phone"
                        value={formState.phone}
                        onChange={(e) => {
                          const val = e.target.value;
                          if (val === "" || /^[0-9]+$/.test(val)) {
                            handleInputChange(e);
                          }
                        }}
                        className={getInputStyle("phone")}
                        placeholder="e.g. 9876543210"
                      />
                      {errors.phone && <p className="text-[10px] text-red-400 mt-1 font-sans font-medium">{errors.phone}</p>}
                    </div>

                    {/* WhatsApp */}
                    <div className="space-y-2">
                      <label htmlFor="whatsapp" className="block font-sans text-[10px] tracking-wider uppercase text-warm-tan/80 font-bold">
                        WhatsApp Number
                      </label>
                      <input
                        type="tel"
                        pattern="[0-9]*"
                        inputMode="numeric"
                        id="whatsapp"
                        value={formState.whatsapp}
                        onChange={(e) => {
                          const val = e.target.value;
                          if (val === "" || /^[0-9]+$/.test(val)) {
                            handleInputChange(e);
                          }
                        }}
                        className={getInputStyle("whatsapp")}
                        placeholder="e.g. 9876543210"
                      />
                      {errors.whatsapp && <p className="text-[10px] text-red-400 mt-1 font-sans font-medium">{errors.whatsapp}</p>}
                    </div>
                  </div>
                </div>

                {/* Part 2: EB Preferences */}
                <div className="space-y-6">
                  <h4 className="font-serif text-sm tracking-widest uppercase text-warm-tan font-bold pb-2 border-b border-warm-tan/10">
                    II. Board Preferences
                  </h4>

                  {/* Preference 1 */}
                  <div className="p-4 bg-[#022B4B]/30 border border-warm-tan/10 space-y-4">
                    <h5 className="font-sans font-bold text-[10px] uppercase text-primary-blue tracking-widest">
                      First preference
                    </h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="committeePref1" className="block font-sans text-[10px] tracking-wider uppercase text-ink/75 font-bold">
                          Committee Preference 1
                        </label>
                        <select
                          id="committeePref1"
                          value={formState.committeePref1}
                          onChange={handleInputChange}
                          className={getInputStyle("committeePref1")}
                        >
                          <option value="">Select Committee Choice 1</option>
                          {committees.map((c) => (
                            <option key={c.id} value={c.name}>
                              {c.fullName} ({c.name})
                            </option>
                          ))}
                        </select>
                        {errors.committeePref1 && <p className="text-[10px] text-red-400 mt-1 font-sans font-medium">{errors.committeePref1}</p>}
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="position1" className="block font-sans text-[10px] tracking-wider uppercase text-ink/75 font-bold">
                          Preferred Position 1
                        </label>
                        <select
                          id="position1"
                          value={formState.position1}
                          onChange={handleInputChange}
                          className={getInputStyle("position1")}
                        >
                          <option value="">Select Position Choice 1</option>
                          {positions.map((pos) => (
                            <option key={pos} value={pos}>
                              {pos}
                            </option>
                          ))}
                        </select>
                        {errors.position1 && <p className="text-[10px] text-red-400 mt-1 font-sans font-medium">{errors.position1}</p>}
                      </div>
                    </div>
                  </div>

                  {/* Preference 2 */}
                  <div className="p-4 bg-[#022B4B]/30 border border-warm-tan/10 space-y-4">
                    <h5 className="font-sans font-bold text-[10px] uppercase text-primary-blue tracking-widest">
                      Second preference
                    </h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="committeePref2" className="block font-sans text-[10px] tracking-wider uppercase text-ink/75 font-bold">
                          Committee Preference 2
                        </label>
                        <select
                          id="committeePref2"
                          value={formState.committeePref2}
                          onChange={handleInputChange}
                          className={getInputStyle("committeePref2")}
                        >
                          <option value="">Select Committee Choice 2</option>
                          {committees.map((c) => (
                            <option key={c.id} value={c.name}>
                              {c.fullName} ({c.name})
                            </option>
                          ))}
                        </select>
                        {errors.committeePref2 && <p className="text-[10px] text-red-400 mt-1 font-sans font-medium">{errors.committeePref2}</p>}
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="position2" className="block font-sans text-[10px] tracking-wider uppercase text-ink/75 font-bold">
                          Preferred Position 2
                        </label>
                        <select
                          id="position2"
                          value={formState.position2}
                          onChange={handleInputChange}
                          className={getInputStyle("position2")}
                        >
                          <option value="">Select Position Choice 2</option>
                          {positions.map((pos) => (
                            <option key={pos} value={pos}>
                              {pos}
                            </option>
                          ))}
                        </select>
                        {errors.position2 && <p className="text-[10px] text-red-400 mt-1 font-sans font-medium">{errors.position2}</p>}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Part 3: Experience details */}
                <div className="space-y-6">
                  <h4 className="font-serif text-sm tracking-widest uppercase text-warm-tan font-bold pb-2 border-b border-warm-tan/10">
                    III. Board Mandates & Experience
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Total Experience */}
                    <div className="space-y-2 col-span-2">
                      <label htmlFor="totalExperience" className="block font-sans text-[10px] tracking-wider uppercase text-warm-tan/80 font-bold">
                        Total Number of MUN / EB Sessions
                      </label>
                      <input
                        type="number"
                        min="0"
                        id="totalExperience"
                        value={formState.totalExperience}
                        onChange={(e) => {
                          const val = e.target.value;
                          if (val === "" || /^[0-9]+$/.test(val)) {
                            handleInputChange(e);
                          }
                        }}
                        className={getInputStyle("totalExperience")}
                        placeholder="e.g. 15"
                      />
                      {errors.totalExperience && <p className="text-[10px] text-red-400 mt-1 font-sans font-medium">{errors.totalExperience}</p>}
                    </div>
                  </div>

                  {/* Previous Experience */}
                  <div className="space-y-2">
                    <label htmlFor="previousExperience" className="block font-sans text-[10px] tracking-wider uppercase text-warm-tan/80 font-bold">
                      Summary of Previous Executive Board / Delegate Experience (List specific MUNs, committees chaired, or awards)
                    </label>
                    <textarea
                      id="previousExperience"
                      rows={6}
                      value={formState.previousExperience}
                      onChange={handleInputChange}
                      className={getInputStyle("previousExperience")}
                      placeholder="List details of committees you have previously chaired or delegate credentials..."
                    />
                    {errors.previousExperience && <p className="text-[10px] text-red-400 mt-1 font-sans font-medium">{errors.previousExperience}</p>}
                  </div>
                </div>

                {/* Submissions */}
                <div className="space-y-4 pt-4 border-t border-warm-tan/10">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-1.5 text-[10px] text-ink/50 uppercase tracking-widest font-semibold">
                      <Info className="h-3.5 w-3.5 text-warm-tan/60" />
                      <span>Transmitted securely to the UEMCON board</span>
                    </div>

                    <Button
                      variant="primary"
                      type="submit"
                      disabled={status.type === "submitting"}
                      className="flex items-center gap-2 px-8"
                    >
                      {status.type === "submitting" ? "Transmitting..." : "Submit Portfolio"}
                      <Send className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </form>
            </Card>

            {/* Status Banner */}
            {status.type === "success" && (
              <div className="mt-6 border border-green-500/30 bg-green-500/5 p-4 flex items-start gap-3 text-xs text-green-400">
                <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5" />
                <span>{status.message}</span>
              </div>
            )}

            {status.type === "error" && (
              <div className="mt-6 border border-red-500/30 bg-red-500/5 p-4 flex items-start gap-3 text-xs text-red-400">
                <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                <span>{status.message}</span>
              </div>
            )}
          </div>
        </Container>
      </Section>
    </div>
  );
}
