"use client";

import Container from "@/components/layout/Container";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Heading from "@/components/ui/Heading";
import Section from "@/components/ui/Section";
import committeesData from "@/lib/committees.json";
import { motion } from "framer-motion";
import {
  AlertCircle,
  CheckCircle2,
  Clock,
  Info,
  Lock,
  Send,
} from "lucide-react";
import React, { useState } from "react";

interface Committee {
  id: string;
  name: string;
  fullName: string;
  color: string;
}

export default function DelegateRegisterPage() {
  const committees = committeesData as Committee[];
  const isOpen = true; // Set to true when registrations open tomorrow

  const registrationCommittees = committees.flatMap((c) => {
    if (c.name === "IP") {
      return [
        {
          id: "ip-journalism",
          name: "IP Journalism",
          fullName: "International Press - Journalism",
          color: c.color,
        },
        {
          id: "ip-photography",
          name: "IP Photography",
          fullName: "International Press - Photography",
          color: c.color,
        },
      ];
    }
    return [c];
  });

  const [formState, setFormState] = useState({
    delegationType: "Single",
    name: "",
    institution: "",
    email: "",
    gender: "",
    phone: "",
    whatsapp: "",
    name2: "",
    institution2: "",
    email2: "",
    gender2: "",
    phone2: "",
    whatsapp2: "",
    previousMUNs: "",
    experience: "",
    committee1: "",
    committee1Portfolio1: "",
    committee1Portfolio2: "",
    committee1Portfolio3: "",
    committee2: "",
    committee2Portfolio1: "",
    committee2Portfolio2: "",
    committee2Portfolio3: "",
    committee3: "",
    committee3Portfolio1: "",
    committee3Portfolio2: "",
    committee3Portfolio3: "",
    foodPreference1: "Veg",
    foodPreference2: "Veg",
    accommodation: "",
    queries: "",
  });

  const filteredCommittees =
    formState.delegationType === "Double"
      ? registrationCommittees.filter(
          (c) => c.name !== "IP Journalism" && c.name !== "IP Photography",
        )
      : registrationCommittees;

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<{
    type: "idle" | "submitting" | "success" | "error";
    message?: string;
  }>({ type: "idle" });

  const validate = () => {
    const newErrors: Record<string, string> = {};

    // Member 1 / Single Delegate validation
    if (!formState.name.trim()) newErrors.name = "Full name is required";

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

    // Member 2 validation if Double Delegation
    if (formState.delegationType === "Double") {
      if (!formState.name2.trim())
        newErrors.name2 = "Member 2 full name is required";
      if (!formState.email2.trim()) {
        newErrors.email2 = "Member 2 email address is required";
      } else if (!/\S+@\S+\.\S+/.test(formState.email2)) {
        newErrors.email2 = "Please enter a valid email address for Member 2";
      }
      if (!formState.gender2)
        newErrors.gender2 = "Member 2 gender selection is required";
      if (!formState.phone2.trim()) {
        newErrors.phone2 = "Member 2 phone number is required";
      } else if (formState.phone2.length < 10) {
        newErrors.phone2 = "Member 2 phone number must be at least 10 digits";
      }
      if (!formState.whatsapp2.trim()) {
        newErrors.whatsapp2 = "Member 2 WhatsApp number is required";
      } else if (formState.whatsapp2.length < 10) {
        newErrors.whatsapp2 =
          "Member 2 WhatsApp number must be at least 10 digits";
      }
    }

    // Committee 1 preference
    if (!formState.committee1)
      newErrors.committee1 = "First preference committee is required";
    if (!formState.committee1Portfolio1.trim())
      newErrors.committee1Portfolio1 = "Portfolio Priority 1 is required";
    if (!formState.committee1Portfolio2.trim())
      newErrors.committee1Portfolio2 = "Portfolio Priority 2 is required";
    if (!formState.committee1Portfolio3.trim())
      newErrors.committee1Portfolio3 = "Portfolio Priority 3 is required";

    // Committee 2 preference
    if (!formState.committee2)
      newErrors.committee2 = "Second preference committee is required";
    if (!formState.committee2Portfolio1.trim())
      newErrors.committee2Portfolio1 = "Portfolio Priority 1 is required";
    if (!formState.committee2Portfolio2.trim())
      newErrors.committee2Portfolio2 = "Portfolio Priority 2 is required";
    if (!formState.committee2Portfolio3.trim())
      newErrors.committee2Portfolio3 = "Portfolio Priority 3 is required";

    // Committee 3 preference
    if (!formState.committee3)
      newErrors.committee3 = "Third preference committee is required";
    if (!formState.committee3Portfolio1.trim())
      newErrors.committee3Portfolio1 = "Portfolio Priority 1 is required";
    if (!formState.committee3Portfolio2.trim())
      newErrors.committee3Portfolio2 = "Portfolio Priority 2 is required";
    if (!formState.committee3Portfolio3.trim())
      newErrors.committee3Portfolio3 = "Portfolio Priority 3 is required";

    // Double delegation constraint: cannot select IP Journalism or IP Photography
    if (formState.delegationType === "Double") {
      const isIP = (c: string) =>
        c === "IP Journalism" || c === "IP Photography";
      if (
        isIP(formState.committee1) ||
        isIP(formState.committee2) ||
        isIP(formState.committee3)
      ) {
        newErrors.delegationType =
          "International Press (IP Journalism / IP Photography) does not support Double Delegation. Please choose a different committee or select Single Delegation.";
      }
    }

    if (!formState.previousMUNs.trim())
      newErrors.previousMUNs = "Number of previous Model UNs is required";
    if (!formState.foodPreference1)
      newErrors.foodPreference1 = "Member 1 food preference is required";
    if (formState.delegationType === "Double" && !formState.foodPreference2)
      newErrors.foodPreference2 = "Member 2 food preference is required";
    if (!formState.accommodation.trim())
      newErrors.accommodation = "Accommodation requirement is required (enter 'No' if not required)";
    if (!formState.experience.trim())
      newErrors.experience = "Brief experience summary is required";
    if (!formState.queries.trim())
      newErrors.queries = "Queries are required (enter 'None' if none)";

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
      const response = await fetch("/api/register", {
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
          message:
            "Registration dispatch successfully logged. The delegate relations desk will review your credentials shortly.",
        });
        setErrors({});
        // Reset form
        setFormState({
          delegationType: "Single",
          name: "",
          institution: "",
          email: "",
          gender: "",
          phone: "",
          whatsapp: "",
          name2: "",
          institution2: "",
          email2: "",
          gender2: "",
          phone2: "",
          whatsapp2: "",
          previousMUNs: "",
          experience: "",
          committee1: "",
          committee1Portfolio1: "",
          committee1Portfolio2: "",
          committee1Portfolio3: "",
          committee2: "",
          committee2Portfolio1: "",
          committee2Portfolio2: "",
          committee2Portfolio3: "",
          committee3: "",
          committee3Portfolio1: "",
          committee3Portfolio2: "",
          committee3Portfolio3: "",
          foodPreference1: "Veg",
          foodPreference2: "Veg",
          accommodation: "",
          queries: "",
        });
      } else {
        setStatus({
          type: "error",
          message:
            "Failed to transmit credentials. Please verify your connection and try again.",
        });
      }
    } catch (err) {
      console.error(err);
      setStatus({
        type: "error",
        message:
          "An unexpected registry error occurred. Please contact delegate relations.",
      });
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { id, value } = e.target;
    
    setFormState((prev) => {
      const updated = { ...prev, [id]: value };
      if (id === "committee1" && value === "IP Photography") {
        updated.committee1Portfolio1 = "NA";
        updated.committee1Portfolio2 = "NA";
        updated.committee1Portfolio3 = "NA";
      } else if (id === "committee2" && value === "IP Photography") {
        updated.committee2Portfolio1 = "NA";
        updated.committee2Portfolio2 = "NA";
        updated.committee2Portfolio3 = "NA";
      } else if (id === "committee3" && value === "IP Photography") {
        updated.committee3Portfolio1 = "NA";
        updated.committee3Portfolio2 = "NA";
        updated.committee3Portfolio3 = "NA";
      }
      return updated;
    });

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
    return `w-full bg-paper border rounded-none px-4 py-2.5 font-sans text-xs text-ink focus:outline-none focus:ring-1 disabled:opacity-50 disabled:cursor-not-allowed ${
      hasError
        ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
        : "border-warm-tan/35 focus:border-primary-blue focus:ring-primary-blue/30"
    }`;
  };

  return (
    <div className="flex flex-col w-full">
      {/* Full-width warm-tan Header Banner */}
      <div className="w-full bg-[#CBAD7F] relative overflow-hidden flex items-center md:items-end px-6 md:px-12 lg:px-16 py-3 md:py-5 h-[90px] md:h-[155px] border-b border-warm-tan/30 select-none">
        {/* Giant Background Text */}
        <h2 className="font-sans font-black text-[#011E33]/12 text-[3.1rem] sm:text-[4.5rem] md:text-[5.5rem] lg:text-[7.5rem] xl:text-[9rem] 2xl:text-[10.5rem] uppercase tracking-tighter leading-none absolute top-1/2 -translate-y-1/2 md:top-auto md:translate-y-0 md:-bottom-3 left-6 md:left-12 lg:left-16 pointer-events-none whitespace-nowrap">
          REGISTER
        </h2>

        {/* Banner Front Content */}
        <div className="relative z-10 w-full flex justify-between items-center md:items-end text-[#011E33] mb-0 md:mb-1">
          <span className="font-sans font-bold text-[9px] sm:text-xs tracking-[0.25em] uppercase whitespace-nowrap">
            DELEGATE ENTRY CREDENTIALS
          </span>
          <span className="font-serif italic text-xs md:text-sm font-semibold max-w-[280px] sm:max-w-md text-right leading-snug hidden md:block">
            "Request credentials for the official simulations of UEMCON 2026"
          </span>
        </div>
      </div>

      <Section className="bg-paper py-12 md:py-20">
        <Container>
          <div className="max-w-4xl mx-auto">
            <Card
              interactive={false}
              className="border border-warm-tan/30 relative p-6 sm:p-10"
            >
              {/* Corner decor */}
              <div className="absolute top-3 left-3 w-2.5 h-2.5 border-t border-l border-warm-tan/40" />
              <div className="absolute top-3 right-3 w-2.5 h-2.5 border-t border-r border-warm-tan/40" />
              <div className="absolute bottom-3 left-3 w-2.5 h-2.5 border-b border-l border-warm-tan/40" />
              <div className="absolute bottom-3 right-3 w-2.5 h-2.5 border-b border-r border-warm-tan/40" />

              <div className="mb-10 text-center md:text-left">
                <Heading
                  level={3}
                  className="text-xl md:text-2xl text-primary-blue font-serif uppercase tracking-wider mb-2"
                >
                  DELEGATE PORTAL
                </Heading>
                <p className="font-sans text-xs text-ink/60">
                  Please provide valid academic credentials and preferences for
                  dynamic committee placements.
                </p>

                {/* Delegation Fees Banner */}
                <div className="mt-6 p-5 bg-[#022B4B]/20 border border-warm-tan/20 text-left">
                  <h4 className="font-serif text-xs tracking-wider uppercase text-warm-tan font-bold mb-3 flex items-center gap-2">
                    <Info className="h-4 w-4 text-warm-tan" />
                    Delegation Fees (Early Bird)
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                    <div className="p-3 bg-[#011E33]/30 border border-warm-tan/10 text-center">
                      <p className="font-sans text-[10px] uppercase tracking-wider text-ink/65">
                        Single Delegation
                      </p>
                      <p className="font-sans text-lg font-bold text-primary-blue mt-1">
                        ₹849/-
                      </p>
                    </div>
                    <div className="p-3 bg-[#011E33]/30 border border-warm-tan/10 text-center">
                      <p className="font-sans text-[10px] uppercase tracking-wider text-ink/65">
                        Double Delegation
                      </p>
                      <p className="font-sans text-lg font-bold text-primary-blue mt-1">
                        ₹1669/-
                      </p>
                    </div>
                    <div className="p-3 bg-[#011E33]/30 border border-warm-tan/10 text-center">
                      <p className="font-sans text-[10px] uppercase tracking-wider text-ink/65">
                        IP (International Press)
                      </p>
                      <p className="font-sans text-lg font-bold text-primary-blue mt-1">
                        ₹799/-
                      </p>
                    </div>
                  </div>
                  <div className="pt-3 border-t border-warm-tan/10 text-[11px] font-sans text-ink/75 italic leading-relaxed space-y-1">
                    <div>
                      <span className="font-semibold text-warm-tan not-italic">
                        Note:{" "}
                      </span>
                      For Students of UEM Kolkata / IEM Newtown Campus,
                      Delegation Fees for all committees is{" "}
                      <span className="font-bold text-primary-blue">
                        ₹799/-
                      </span>
                    </div>
                    <div className="text-red-400 font-semibold">
                      * International Press (IP Journalism / IP Photography)
                      does not support Double Delegation.
                    </div>
                  </div>
                </div>

                <div className="h-[1px] bg-warm-tan/20 w-full mt-6" />
              </div>

              {isOpen ? (
                <form onSubmit={handleSubmit} noValidate className="space-y-8">
                  {/* Delegation Type Selection */}
                  <div className="space-y-4 p-4 bg-[#022B4B]/20 border border-warm-tan/10">
                    <label className="block font-serif text-xs tracking-wider uppercase text-warm-tan font-bold">
                      Delegation Type
                    </label>
                    <div className="flex gap-4">
                      <button
                        type="button"
                        onClick={() =>
                          setFormState((prev) => ({
                            ...prev,
                            delegationType: "Single",
                          }))
                        }
                        className={`flex-1 py-3 px-4 text-xs font-sans font-bold uppercase border tracking-wider transition-all rounded-none ${
                          formState.delegationType === "Single"
                            ? "bg-primary-blue text-paper border-primary-blue"
                            : "bg-paper text-ink/70 border-warm-tan/30 hover:border-warm-tan/60"
                        }`}
                      >
                        Single Delegation
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setFormState((prev) => {
                            const next = { ...prev, delegationType: "Double" };
                            const isIP = (c: string) =>
                              c === "IP Journalism" || c === "IP Photography";
                            if (isIP(next.committee1)) next.committee1 = "";
                            if (isIP(next.committee2)) next.committee2 = "";
                            if (isIP(next.committee3)) next.committee3 = "";
                            return next;
                          })
                        }
                        className={`flex-1 py-3 px-4 text-xs font-sans font-bold uppercase border tracking-wider transition-all rounded-none ${
                          formState.delegationType === "Double"
                            ? "bg-primary-blue text-paper border-primary-blue"
                            : "bg-paper text-ink/70 border-warm-tan/30 hover:border-warm-tan/60"
                        }`}
                      >
                        Double Delegation
                      </button>
                    </div>
                    {errors.delegationType && (
                      <p className="text-[10px] text-red-400 font-sans font-medium mt-1">
                        {errors.delegationType}
                      </p>
                    )}
                  </div>

                  {/* Part 1: Personal Details */}
                  <div className="space-y-6">
                    <h4 className="font-serif text-sm tracking-widest uppercase text-warm-tan font-bold pb-2 border-b border-warm-tan/10">
                      I.{" "}
                      {formState.delegationType === "Double"
                        ? "Member 1 - "
                        : ""}
                      Personal & Academic Credentials
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Full Name */}
                      <div className="space-y-2">
                        <label
                          htmlFor="name"
                          className="block font-sans text-[10px] tracking-wider uppercase text-warm-tan/85 font-bold"
                        >
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
                        {errors.name && (
                          <p className="text-[10px] text-red-400 mt-1 font-sans font-medium">
                            {errors.name}
                          </p>
                        )}
                      </div>

                      {/* Institution */}
                      <div className="space-y-2">
                        <label
                          htmlFor="institution"
                          className="block font-sans text-[10px] tracking-wider uppercase text-warm-tan/85 font-bold"
                        >
                          Institution Name (Optional)
                        </label>
                        <input
                          type="text"
                          id="institution"
                          value={formState.institution}
                          onChange={handleInputChange}
                          className={getInputStyle("institution")}
                          placeholder="e.g. Institute of Engineering and Management"
                        />
                      </div>

                      {/* Email */}
                      <div className="space-y-2">
                        <label
                          htmlFor="email"
                          className="block font-sans text-[10px] tracking-wider uppercase text-warm-tan/85 font-bold"
                        >
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
                        {errors.email && (
                          <p className="text-[10px] text-red-400 mt-1 font-sans font-medium">
                            {errors.email}
                          </p>
                        )}
                      </div>

                      {/* Gender */}
                      <div className="space-y-2">
                        <label
                          htmlFor="gender"
                          className="block font-sans text-[10px] tracking-wider uppercase text-warm-tan/85 font-bold"
                        >
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
                        {errors.gender && (
                          <p className="text-[10px] text-red-400 mt-1 font-sans font-medium">
                            {errors.gender}
                          </p>
                        )}
                      </div>

                      {/* Phone */}
                      <div className="space-y-2">
                        <label
                          htmlFor="phone"
                          className="block font-sans text-[10px] tracking-wider uppercase text-warm-tan/85 font-bold"
                        >
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
                        {errors.phone && (
                          <p className="text-[10px] text-red-400 mt-1 font-sans font-medium">
                            {errors.phone}
                          </p>
                        )}
                      </div>

                      {/* WhatsApp */}
                      <div className="space-y-2">
                        <label
                          htmlFor="whatsapp"
                          className="block font-sans text-[10px] tracking-wider uppercase text-warm-tan/85 font-bold"
                        >
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
                        {errors.whatsapp && (
                          <p className="text-[10px] text-red-400 mt-1 font-sans font-medium">
                            {errors.whatsapp}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Part 1.5: Member 2 Details if Double Delegation */}
                  {formState.delegationType === "Double" && (
                    <div className="space-y-6 pt-6 border-t border-warm-tan/10">
                      <h4 className="font-serif text-sm tracking-widest uppercase text-warm-tan font-bold pb-2 border-b border-warm-tan/10">
                        II. Member 2 - Personal & Academic Credentials
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Member 2 Name */}
                        <div className="space-y-2">
                          <label
                            htmlFor="name2"
                            className="block font-sans text-[10px] tracking-wider uppercase text-warm-tan/85 font-bold"
                          >
                            Full Name (Member 2)
                          </label>
                          <input
                            type="text"
                            id="name2"
                            value={formState.name2}
                            onChange={handleInputChange}
                            className={getInputStyle("name2")}
                            placeholder="Jane Doe"
                          />
                          {errors.name2 && (
                            <p className="text-[10px] text-red-400 mt-1 font-sans font-medium">
                              {errors.name2}
                            </p>
                          )}
                        </div>

                        {/* Member 2 Institution */}
                        <div className="space-y-2">
                          <label
                            htmlFor="institution2"
                            className="block font-sans text-[10px] tracking-wider uppercase text-warm-tan/85 font-bold"
                          >
                            Institution Name (Member 2 - Optional)
                          </label>
                          <input
                            type="text"
                            id="institution2"
                            value={formState.institution2}
                            onChange={handleInputChange}
                            className={getInputStyle("institution2")}
                            placeholder="e.g. Institute of Engineering and Management"
                          />
                        </div>

                        {/* Member 2 Email */}
                        <div className="space-y-2">
                          <label
                            htmlFor="email2"
                            className="block font-sans text-[10px] tracking-wider uppercase text-warm-tan/85 font-bold"
                          >
                            Email Address (Member 2)
                          </label>
                          <input
                            type="email"
                            id="email2"
                            value={formState.email2}
                            onChange={handleInputChange}
                            className={getInputStyle("email2")}
                            placeholder="jane.doe@email.com"
                          />
                          {errors.email2 && (
                            <p className="text-[10px] text-red-400 mt-1 font-sans font-medium">
                              {errors.email2}
                            </p>
                          )}
                        </div>

                        {/* Member 2 Gender */}
                        <div className="space-y-2">
                          <label
                            htmlFor="gender2"
                            className="block font-sans text-[10px] tracking-wider uppercase text-warm-tan/85 font-bold"
                          >
                            Gender (Member 2)
                          </label>
                          <select
                            id="gender2"
                            value={formState.gender2}
                            onChange={handleInputChange}
                            className={getInputStyle("gender2")}
                          >
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                          </select>
                          {errors.gender2 && (
                            <p className="text-[10px] text-red-400 mt-1 font-sans font-medium">
                              {errors.gender2}
                            </p>
                          )}
                        </div>

                        {/* Member 2 Phone */}
                        <div className="space-y-2">
                          <label
                            htmlFor="phone2"
                            className="block font-sans text-[10px] tracking-wider uppercase text-warm-tan/85 font-bold"
                          >
                            Contact Phone Number (Member 2)
                          </label>
                          <input
                            type="tel"
                            pattern="[0-9]*"
                            inputMode="numeric"
                            id="phone2"
                            value={formState.phone2}
                            onChange={(e) => {
                              const val = e.target.value;
                              if (val === "" || /^[0-9]+$/.test(val)) {
                                handleInputChange(e);
                              }
                            }}
                            className={getInputStyle("phone2")}
                            placeholder="e.g. 9876543210"
                          />
                          {errors.phone2 && (
                            <p className="text-[10px] text-red-400 mt-1 font-sans font-medium">
                              {errors.phone2}
                            </p>
                          )}
                        </div>

                        {/* Member 2 WhatsApp */}
                        <div className="space-y-2">
                          <label
                            htmlFor="whatsapp2"
                            className="block font-sans text-[10px] tracking-wider uppercase text-warm-tan/85 font-bold"
                          >
                            WhatsApp Number (Member 2)
                          </label>
                          <input
                            type="tel"
                            pattern="[0-9]*"
                            inputMode="numeric"
                            id="whatsapp2"
                            value={formState.whatsapp2}
                            onChange={(e) => {
                              const val = e.target.value;
                              if (val === "" || /^[0-9]+$/.test(val)) {
                                handleInputChange(e);
                              }
                            }}
                            className={getInputStyle("whatsapp2")}
                            placeholder="e.g. 9876543210"
                          />
                          {errors.whatsapp2 && (
                            <p className="text-[10px] text-red-400 mt-1 font-sans font-medium">
                              {errors.whatsapp2}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Part 2: Preferences */}
                  <div className="space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-warm-tan/10">
                      <h4 className="font-serif text-sm tracking-widest uppercase text-warm-tan font-bold">
                        {formState.delegationType === "Double" ? "III" : "II"}.
                        Committee & Portfolio Preferences
                      </h4>
                      <a
                        href="https://docs.google.com/spreadsheets/d/1Imrl30wNpPA_jqjcShpnrbfZDusGY3_9x2aRBkGCQfc/edit?gid=0#gid=0"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-sans text-[11px] uppercase tracking-wider text-[#CBAD7F] hover:text-[#ebdaba] font-bold flex items-center gap-1.5 transition-colors duration-200"
                      >
                        <Info className="h-3.5 w-3.5 text-[#CBAD7F]" />
                        <span>View Portfolio Matrix</span>
                      </a>
                    </div>

                    {/* Preference 1 */}
                    <div className="p-4 bg-[#022B4B]/30 border border-warm-tan/10 space-y-4">
                      <h5 className="font-sans font-bold text-[10px] uppercase text-primary-blue tracking-widest">
                        Preference 1 Choice
                      </h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label
                            htmlFor="committee1"
                            className="block font-sans text-[10px] tracking-wider uppercase text-ink/75 font-bold"
                          >
                            Committee
                          </label>
                          <select
                            id="committee1"
                            value={formState.committee1}
                            onChange={handleInputChange}
                            className={getInputStyle("committee1")}
                          >
                            <option value="">
                              Select First Choice Committee
                            </option>
                            {filteredCommittees.map((c) => (
                              <option key={c.id} value={c.name}>
                                {c.fullName} ({c.name})
                              </option>
                            ))}
                          </select>
                          {errors.committee1 && (
                            <p className="text-[10px] text-red-400 mt-1 font-sans font-medium">
                              {errors.committee1}
                            </p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <label
                            htmlFor="committee1Portfolio1"
                            className="block font-sans text-[10px] tracking-wider uppercase text-ink/75 font-bold"
                          >
                            Portfolio Priority 1
                          </label>
                          <input
                            type="text"
                            id="committee1Portfolio1"
                            value={formState.committee1Portfolio1}
                            onChange={handleInputChange}
                            disabled={formState.committee1 === "IP Photography"}
                            className={getInputStyle("committee1Portfolio1")}
                            placeholder="e.g. USA"
                          />
                          {errors.committee1Portfolio1 && (
                            <p className="text-[10px] text-red-400 mt-1 font-sans font-medium">
                              {errors.committee1Portfolio1}
                            </p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <label
                            htmlFor="committee1Portfolio2"
                            className="block font-sans text-[10px] tracking-wider uppercase text-ink/75 font-bold"
                          >
                            Portfolio Priority 2
                          </label>
                          <input
                            type="text"
                            id="committee1Portfolio2"
                            value={formState.committee1Portfolio2}
                            onChange={handleInputChange}
                            disabled={formState.committee1 === "IP Photography"}
                            className={getInputStyle("committee1Portfolio2")}
                            placeholder="e.g. UK"
                          />
                          {errors.committee1Portfolio2 && (
                            <p className="text-[10px] text-red-400 mt-1 font-sans font-medium">
                              {errors.committee1Portfolio2}
                            </p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <label
                            htmlFor="committee1Portfolio3"
                            className="block font-sans text-[10px] tracking-wider uppercase text-ink/75 font-bold"
                          >
                            Portfolio Priority 3
                          </label>
                          <input
                            type="text"
                            id="committee1Portfolio3"
                            value={formState.committee1Portfolio3}
                            onChange={handleInputChange}
                            disabled={formState.committee1 === "IP Photography"}
                            className={getInputStyle("committee1Portfolio3")}
                            placeholder="e.g. France"
                          />
                          {errors.committee1Portfolio3 && (
                            <p className="text-[10px] text-red-400 mt-1 font-sans font-medium">
                              {errors.committee1Portfolio3}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Preference 2 */}
                    <div className="p-4 bg-[#022B4B]/30 border border-warm-tan/10 space-y-4">
                      <h5 className="font-sans font-bold text-[10px] uppercase text-primary-blue tracking-widest">
                        Preference 2 Choice
                      </h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label
                            htmlFor="committee2"
                            className="block font-sans text-[10px] tracking-wider uppercase text-ink/75 font-bold"
                          >
                            Committee
                          </label>
                          <select
                            id="committee2"
                            value={formState.committee2}
                            onChange={handleInputChange}
                            className={getInputStyle("committee2")}
                          >
                            <option value="">
                              Select Second Choice Committee
                            </option>
                            {filteredCommittees.map((c) => (
                              <option key={c.id} value={c.name}>
                                {c.fullName} ({c.name})
                              </option>
                            ))}
                          </select>
                          {errors.committee2 && (
                            <p className="text-[10px] text-red-400 mt-1 font-sans font-medium">
                              {errors.committee2}
                            </p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <label
                            htmlFor="committee2Portfolio1"
                            className="block font-sans text-[10px] tracking-wider uppercase text-ink/75 font-bold"
                          >
                            Portfolio Priority 1
                          </label>
                          <input
                            type="text"
                            id="committee2Portfolio1"
                            value={formState.committee2Portfolio1}
                            onChange={handleInputChange}
                            disabled={formState.committee2 === "IP Photography"}
                            className={getInputStyle("committee2Portfolio1")}
                            placeholder="e.g. Russia"
                          />
                          {errors.committee2Portfolio1 && (
                            <p className="text-[10px] text-red-400 mt-1 font-sans font-medium">
                              {errors.committee2Portfolio1}
                            </p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <label
                            htmlFor="committee2Portfolio2"
                            className="block font-sans text-[10px] tracking-wider uppercase text-ink/75 font-bold"
                          >
                            Portfolio Priority 2
                          </label>
                          <input
                            type="text"
                            id="committee2Portfolio2"
                            value={formState.committee2Portfolio2}
                            onChange={handleInputChange}
                            disabled={formState.committee2 === "IP Photography"}
                            className={getInputStyle("committee2Portfolio2")}
                            placeholder="e.g. China"
                          />
                          {errors.committee2Portfolio2 && (
                            <p className="text-[10px] text-red-400 mt-1 font-sans font-medium">
                              {errors.committee2Portfolio2}
                            </p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <label
                            htmlFor="committee2Portfolio3"
                            className="block font-sans text-[10px] tracking-wider uppercase text-ink/75 font-bold"
                          >
                            Portfolio Priority 3
                          </label>
                          <input
                            type="text"
                            id="committee2Portfolio3"
                            value={formState.committee2Portfolio3}
                            onChange={handleInputChange}
                            disabled={formState.committee2 === "IP Photography"}
                            className={getInputStyle("committee2Portfolio3")}
                            placeholder="e.g. India"
                          />
                          {errors.committee2Portfolio3 && (
                            <p className="text-[10px] text-red-400 mt-1 font-sans font-medium">
                              {errors.committee2Portfolio3}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Preference 3 */}
                    <div className="p-4 bg-[#022B4B]/30 border border-warm-tan/10 space-y-4">
                      <h5 className="font-sans font-bold text-[10px] uppercase text-primary-blue tracking-widest">
                        Preference 3 Choice
                      </h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label
                            htmlFor="committee3"
                            className="block font-sans text-[10px] tracking-wider uppercase text-ink/75 font-bold"
                          >
                            Committee
                          </label>
                          <select
                            id="committee3"
                            value={formState.committee3}
                            onChange={handleInputChange}
                            className={getInputStyle("committee3")}
                          >
                            <option value="">
                              Select Third Choice Committee
                            </option>
                            {filteredCommittees.map((c) => (
                              <option key={c.id} value={c.name}>
                                {c.fullName} ({c.name})
                              </option>
                            ))}
                          </select>
                          {errors.committee3 && (
                            <p className="text-[10px] text-red-400 mt-1 font-sans font-medium">
                              {errors.committee3}
                            </p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <label
                            htmlFor="committee3Portfolio1"
                            className="block font-sans text-[10px] tracking-wider uppercase text-ink/75 font-bold"
                          >
                            Portfolio Priority 1
                          </label>
                          <input
                            type="text"
                            id="committee3Portfolio1"
                            value={formState.committee3Portfolio1}
                            onChange={handleInputChange}
                            disabled={formState.committee3 === "IP Photography"}
                            className={getInputStyle("committee3Portfolio1")}
                            placeholder="e.g. Germany"
                          />
                          {errors.committee3Portfolio1 && (
                            <p className="text-[10px] text-red-400 mt-1 font-sans font-medium">
                              {errors.committee3Portfolio1}
                            </p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <label
                            htmlFor="committee3Portfolio2"
                            className="block font-sans text-[10px] tracking-wider uppercase text-ink/75 font-bold"
                          >
                            Portfolio Priority 2
                          </label>
                          <input
                            type="text"
                            id="committee3Portfolio2"
                            value={formState.committee3Portfolio2}
                            onChange={handleInputChange}
                            disabled={formState.committee3 === "IP Photography"}
                            className={getInputStyle("committee3Portfolio2")}
                            placeholder="e.g. Japan"
                          />
                          {errors.committee3Portfolio2 && (
                            <p className="text-[10px] text-red-400 mt-1 font-sans font-medium">
                              {errors.committee3Portfolio2}
                            </p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <label
                            htmlFor="committee3Portfolio3"
                            className="block font-sans text-[10px] tracking-wider uppercase text-ink/75 font-bold"
                          >
                            Portfolio Priority 3
                          </label>
                          <input
                            type="text"
                            id="committee3Portfolio3"
                            value={formState.committee3Portfolio3}
                            onChange={handleInputChange}
                            disabled={formState.committee3 === "IP Photography"}
                            className={getInputStyle("committee3Portfolio3")}
                            placeholder="e.g. Brazil"
                          />
                          {errors.committee3Portfolio3 && (
                            <p className="text-[10px] text-red-400 mt-1 font-sans font-medium">
                              {errors.committee3Portfolio3}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Part 3: Credentials / Accommodations */}
                  <div className="space-y-6">
                    <h4 className="font-serif text-sm tracking-widest uppercase text-warm-tan font-bold pb-2 border-b border-warm-tan/10">
                      {formState.delegationType === "Double" ? "IV" : "III"}.
                      Experience & Accommodations
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Previous MUNs count */}
                      <div className="space-y-2">
                        <label
                          htmlFor="previousMUNs"
                          className="block font-sans text-[10px] tracking-wider uppercase text-warm-tan/85 font-bold"
                        >
                          Number of Previous Model UNs
                        </label>
                        <input
                          type="number"
                          min="0"
                          id="previousMUNs"
                          value={formState.previousMUNs}
                          onChange={(e) => {
                            const val = e.target.value;
                            if (val === "" || /^[0-9]+$/.test(val)) {
                              handleInputChange(e);
                            }
                          }}
                          className={getInputStyle("previousMUNs")}
                          placeholder="e.g. 5"
                        />
                        {errors.previousMUNs && (
                          <p className="text-[10px] text-red-400 mt-1 font-sans font-medium">
                            {errors.previousMUNs}
                          </p>
                        )}
                      </div>

                      {/* Food Preference */}
                      {formState.delegationType === "Single" ? (
                        <div className="space-y-2">
                          <label
                            htmlFor="foodPreference1"
                            className="block font-sans text-[10px] tracking-wider uppercase text-warm-tan/85 font-bold"
                          >
                            Food Preference
                          </label>
                          <select
                            id="foodPreference1"
                            value={formState.foodPreference1}
                            onChange={handleInputChange}
                            className={getInputStyle("foodPreference1")}
                          >
                            <option value="Veg">Vegetarian</option>
                            <option value="Non-Veg">Non-Vegetarian</option>
                          </select>
                          {errors.foodPreference1 && (
                            <p className="text-[10px] text-red-400 mt-1 font-sans font-medium">
                              {errors.foodPreference1}
                            </p>
                          )}
                        </div>
                      ) : (
                        <>
                          <div className="space-y-2">
                            <label
                              htmlFor="foodPreference1"
                              className="block font-sans text-[10px] tracking-wider uppercase text-warm-tan/85 font-bold"
                            >
                              Food Preference (Member 1)
                            </label>
                            <select
                              id="foodPreference1"
                              value={formState.foodPreference1}
                              onChange={handleInputChange}
                              className={getInputStyle("foodPreference1")}
                            >
                              <option value="Veg">Vegetarian</option>
                              <option value="Non-Veg">Non-Vegetarian</option>
                            </select>
                            {errors.foodPreference1 && (
                              <p className="text-[10px] text-red-400 mt-1 font-sans font-medium">
                                {errors.foodPreference1}
                              </p>
                            )}
                          </div>
                          <div className="space-y-2">
                            <label
                              htmlFor="foodPreference2"
                              className="block font-sans text-[10px] tracking-wider uppercase text-warm-tan/85 font-bold"
                            >
                              Food Preference (Member 2)
                            </label>
                            <select
                              id="foodPreference2"
                              value={formState.foodPreference2}
                              onChange={handleInputChange}
                              className={getInputStyle("foodPreference2")}
                            >
                              <option value="Veg">Vegetarian</option>
                              <option value="Non-Veg">Non-Vegetarian</option>
                            </select>
                            {errors.foodPreference2 && (
                              <p className="text-[10px] text-red-400 mt-1 font-sans font-medium">
                                {errors.foodPreference2}
                              </p>
                            )}
                          </div>
                        </>
                      )}

                      {/* Accommodation */}
                      <div className="space-y-2">
                        <label
                          htmlFor="accommodation"
                          className="block font-sans text-[10px] tracking-wider uppercase text-warm-tan/85 font-bold"
                        >
                          Accommodation Required
                        </label>
                        <input
                          type="text"
                          id="accommodation"
                          value={formState.accommodation}
                          onChange={handleInputChange}
                          className={getInputStyle("accommodation")}
                          placeholder="e.g. Yes, required for 2 delegates / No"
                        />
                        {errors.accommodation && (
                          <p className="text-[10px] text-red-400 mt-1 font-sans font-medium">
                            {errors.accommodation}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Experience description */}
                    <div className="space-y-2">
                      <label
                        htmlFor="experience"
                        className="block font-sans text-[10px] tracking-wider uppercase text-warm-tan/85 font-bold"
                      >
                        Brief Experience Summary / MUN Details (Awards,
                        Committees)
                      </label>
                      <textarea
                        id="experience"
                        rows={3}
                        value={formState.experience}
                        onChange={handleInputChange}
                        className={getInputStyle("experience")}
                        placeholder="List your previous committees, designations, or awards received (e.g. Best Delegate in UNEP, UEMCON 2025)..."
                      />
                      {errors.experience && (
                        <p className="text-[10px] text-red-400 mt-1 font-sans font-medium">
                          {errors.experience}
                        </p>
                      )}
                    </div>

                    {/* Queries */}
                    <div className="space-y-2">
                      <label
                        htmlFor="queries"
                        className="block font-sans text-[10px] tracking-wider uppercase text-warm-tan/85 font-bold"
                      >
                        Any Queries or Remarks for the Secretariat
                      </label>
                      <textarea
                        id="queries"
                        rows={2}
                        value={formState.queries}
                        onChange={handleInputChange}
                        className={getInputStyle("queries")}
                        placeholder="Let us know if you have specific registration queries or enter 'None'..."
                      />
                      {errors.queries && (
                        <p className="text-[10px] text-red-400 mt-1 font-sans font-medium">
                          {errors.queries}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Submissions & Messages */}
                  <div className="space-y-4 pt-4 border-t border-warm-tan/10">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-1.5 text-[10px] text-ink/50 uppercase tracking-widest font-semibold">
                        <Info className="h-3.5 w-3.5 text-warm-tan/60" />
                        <span>Transmitted securely to the UEMCON registry</span>
                      </div>

                      <Button
                        variant="primary"
                        type="submit"
                        disabled={status.type === "submitting"}
                        className="flex items-center gap-2 px-8"
                      >
                        {status.type === "submitting"
                          ? "Transmitting..."
                          : "Submit Registry Details"}
                        <Send className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </form>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
                    className="w-16 h-16 rounded-full bg-warm-tan/10 flex items-center justify-center mb-6 border border-warm-tan/30 relative"
                  >
                    <motion.div
                      className="absolute inset-0 rounded-full border border-warm-tan/40"
                      animate={{ scale: [1, 1.3, 1], opacity: [0.8, 0, 0.8] }}
                      transition={{
                        repeat: Infinity,
                        duration: 2,
                        ease: "easeInOut",
                      }}
                    />
                    <Lock className="h-6 w-6 text-warm-tan" />
                  </motion.div>

                  <h4 className="font-serif text-2xl md:text-3xl text-primary-blue uppercase tracking-wider mb-4">
                    COMING SOON
                  </h4>

                  <p className="font-sans text-sm md:text-base text-ink/80 max-w-md mb-8 leading-relaxed">
                    The Delegate registrations portal for UEMCON 2026 is
                    currently locked and will open soon.
                  </p>

                  <div className="flex flex-col sm:flex-row items-center gap-4 bg-[#022B4B]/30 border border-warm-tan/20 px-6 py-4 rounded-none max-w-md w-full justify-center">
                    <div className="flex items-center gap-3 text-left">
                      <Clock className="h-5 w-5 text-warm-tan shrink-0" />
                      <div>
                        <p className="font-sans text-[10px] uppercase tracking-wider text-warm-tan/85 font-bold">
                          Status
                        </p>
                        <p className="font-serif text-sm text-ink font-semibold flex items-center gap-1.5">
                          <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
                          Coming Soon
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </Card>

            {/* Status Banner outside/below the card */}
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
