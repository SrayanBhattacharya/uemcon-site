"use client";

import React, { useState, useRef } from "react";
import { Send, Info, CheckCircle2, AlertCircle } from "lucide-react";
import Container from "@/components/layout/Container";
import Section from "@/components/ui/Section";
import Heading from "@/components/ui/Heading";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import committeesData from "@/lib/committees.json";
import { motion, useScroll, useTransform, useSpring, AnimatePresence, Variants } from "framer-motion";

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

  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<{
    type: "idle" | "submitting" | "success" | "error";
    message?: string;
  }>({ type: "idle" });

  // Scroll animations setup
  const formRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: formRef,
    offset: ["start end", "end start"],
  });

  // Scroll-aware motion limits (max 10-15px)
  const yHeader = useTransform(scrollYProgress, [0, 1], [-5, 10]);
  const yLine = useTransform(scrollYProgress, [0, 1], [0, 8]);
  const ySection = useTransform(scrollYProgress, [0, 1], [-3, 3]);
  const yAmbient = useTransform(scrollYProgress, [0, 1], [-10, 15]);

  const springYHeader = useSpring(yHeader, { stiffness: 100, damping: 30 });
  const springYLine = useSpring(yLine, { stiffness: 100, damping: 30 });
  const springYSection = useSpring(ySection, { stiffness: 80, damping: 40 });
  const springYAmbient = useSpring(yAmbient, { stiffness: 50, damping: 20 });

  // Entrance and Exit Variants
  const containerVariants: Variants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
    exit: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  };

  const titleVariants: Variants = {
    hidden: { opacity: 0, y: 15, filter: "blur(4px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.4, ease: "easeOut" },
    },
    exit: { opacity: 0, y: -10, filter: "blur(2px)", transition: { duration: 0.3 } },
  };

  const documentVariants: Variants = {
    hidden: { clipPath: "inset(0% 0% 100% 0%)", opacity: 0 },
    visible: {
      clipPath: "inset(-20% -20% -20% -20%)", // expand past bounds for shadows
      opacity: 1,
      transition: {
        duration: 0.7,
        ease: [0.25, 1, 0.5, 1],
        staggerChildren: 0.1,
        delayChildren: 0.15,
      },
    },
    exit: {
      clipPath: "inset(0% 0% 100% 0%)",
      opacity: 0,
      transition: { duration: 0.4, ease: "easeIn" },
    },
  };

  const sectionVariants: Variants = {
    hidden: { opacity: 0, y: 20, borderColor: "rgba(203, 173, 127, 0)" },
    visible: {
      opacity: 1,
      y: 0,
      borderColor: "rgba(203, 173, 127, 0.1)",
      transition: { duration: 0.4, ease: "easeOut" },
    },
    exit: { opacity: 0, y: -15, transition: { duration: 0.3 } },
  };

  const fieldVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" },
    },
    exit: { opacity: 0, transition: { duration: 0.2 } },
  };

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

    if (formState.committeePref1 && formState.committeePref2 && formState.committeePref1 === formState.committeePref2) {
      newErrors.committeePref2 = "Second preference committee must be different from first preference";
    }

    if (!resumeFile) {
      newErrors.resume = "Resume is required";
    } else if (resumeFile.size > 2 * 1024 * 1024) {
      newErrors.resume = "Resume file size must be under 2MB";
    }

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

    let resumeBase64 = "";
    if (resumeFile) {
      try {
        resumeBase64 = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = (err) => reject(err);
          reader.readAsDataURL(resumeFile);
        });
      } catch (err) {
        console.error(err);
        setStatus({
          type: "error",
          message: "Failed to process the uploaded resume file.",
        });
        return;
      }
    }

    try {
      const response = await fetch("/api/register-eb", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formState,
          resume: resumeBase64,
          resumeFilename: resumeFile?.name,
          resumeMimetype: resumeFile?.type,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus({
          type: "success",
          message: "EB applications successfully submitted! The secretariat desk will evaluate your credentials.",
        });
        setErrors({});
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
        setResumeFile(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setErrors((prev) => ({ ...prev, resume: "Resume file size must be under 2MB" }));
        setResumeFile(null);
      } else {
        setResumeFile(file);
        setErrors((prev) => {
          const next = { ...prev };
          delete next.resume;
          return next;
        });
      }
    } else {
      setResumeFile(null);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormState((prev) => {
      const updated = { ...prev, [id]: value };
      if (id === "committeePref1") {
        const valid = getPositionsForCommittee(value);
        if (!valid.includes(prev.position1)) {
          updated.position1 = "";
        }
      }
      if (id === "committeePref2") {
        const valid = getPositionsForCommittee(value);
        if (!valid.includes(prev.position2)) {
          updated.position2 = "";
        }
      }
      return updated;
    });

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
    return `w-full bg-paper/50 border rounded-none px-4 py-2.5 font-sans text-xs text-ink focus:outline-none transition-colors duration-300 relative z-10 ${
      hasError
        ? "border-red-500/60"
        : "border-warm-tan/30"
    }`;
  };

  const getMotionInputProps = (hasError: boolean) => ({
    whileFocus: {
      boxShadow: hasError
        ? "inset 0 0 8px rgba(239,68,68,0.1), 0 0 0 1px rgba(239,68,68,0.5)"
        : "inset 0 0 12px rgba(203,173,127,0.06), 0 0 0 1px rgba(203,173,127,0.45)",
      borderColor: hasError ? "rgba(239,68,68,0.7)" : "rgba(203,173,127,0.6)",
      y: -1,
    },
    transition: { duration: 0.3, ease: "easeOut" as const },
  });

  const getPositionsForCommittee = (committeeName: string) => {
    if (!committeeName) return [];
    
    const normalized = committeeName.trim().toUpperCase();

    // 1. IP (International Press)
    if (normalized === "IP" || normalized === "INTERNATIONAL PRESS") {
      return ["Editor-in-Chief", "Photography Head"];
    }

    // 2. DISEC (Disarmament and International Security Committee)
    if (
      normalized === "UNGA-DISEC" ||
      normalized === "DISEC" ||
      normalized === "DISARMAMENT AND INTERNATIONAL SECURITY COMMITTEE"
    ) {
      return ["Chairperson", "Vice-Chairperson", "Rapporteur"];
    }

    // 3. JPC (Joint Parliamentary Committee)
    if (normalized === "JPC" || normalized === "JOINT PARLIAMENTARY COMMITTEE") {
      return ["Moderator", "Deputy Moderator", "Scribe"];
    }

    // 4. IMO (International Maritime Organization)
    if (normalized === "IMO" || normalized === "INTERNATIONAL MARITIME ORGANIZATION") {
      return ["Director", "Assistant Director", "Rapporteur"];
    }

    // 5. UNW (UN Women)
    if (normalized === "UN WOMEN" || normalized === "UNW") {
      return ["Executive Director", "Deputy Executive Director", "Rapporteur"];
    }

    // 6. UNFCCC (UN Framework Convention on Climate Change)
    if (
      normalized === "UNFCCC" ||
      normalized === "UNITED NATIONS FRAMEWORK CONVENTION OF CLIMATE CHANGE" ||
      normalized.includes("CLIMATE CHANGE")
    ) {
      return ["President", "Vice-President", "Rapporteur"];
    }

    // 7. Flagship: UN Civil Society Conference (UN CSC)
    if (
      normalized === "UN CSC" ||
      normalized === "UN CIVIL SOCIETY CONFERENCE" ||
      normalized === "UNCSC"
    ) {
      return ["Conference Co-Chair", "Civil Society Liaison", "Rapporteur"];
    }

    // Fallback/Default positions
    return [
      "Chairperson",
      "Vice-Chairperson",
      "Rapporteur",
      "Director",
      "Moderator",
      "Editor-in-Chief",
    ];
  };

  return (
    <div className="flex flex-col w-full bg-paper">
      {/* Full-width warm-tan Header Banner */}
      <Section className="py-0 relative" animate={false}>
        <div className="w-full bg-[#CBAD7F] relative overflow-hidden flex items-center md:items-end px-6 md:px-12 lg:px-16 py-3 md:py-5 h-[90px] md:h-[155px] border-b border-warm-tan/30 select-none">
          {/* Giant Background Text */}
          <motion.div 
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <h2 className="font-sans font-black text-[#011E33]/12 text-[3.1rem] sm:text-[4.5rem] md:text-[5.5rem] lg:text-[7.5rem] xl:text-[9rem] 2xl:text-[10.5rem] uppercase tracking-tighter leading-none absolute top-1/2 -translate-y-1/2 md:top-auto md:translate-y-0 md:-bottom-3 left-6 md:left-12 lg:left-16 whitespace-nowrap">
              APPLY
            </h2>
          </motion.div>

          {/* Banner Front Content */}
          <div className="relative z-10 w-full flex justify-between items-center md:items-end text-[#011E33] mb-0 md:mb-1 overflow-hidden">
            <motion.span 
              className="font-sans font-bold text-[9px] sm:text-xs tracking-[0.25em] uppercase whitespace-nowrap"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            >
              EXECUTIVE BOARD PORTFOLIO
            </motion.span>
            <motion.span 
              className="font-serif italic text-xs md:text-sm font-semibold max-w-[280px] sm:max-w-md text-right leading-snug hidden md:block"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
            >
              "Apply for the academic and moderating positions of UEMCON 2026"
            </motion.span>
          </div>
        </div>
      </Section>

      <Section className="py-12 md:py-20 overflow-hidden relative">
        {/* Ambient Diplomatic Details */}
        <motion.div
          className="absolute inset-0 pointer-events-none z-0 flex justify-center items-center opacity-[0.025]"
          style={{ y: springYAmbient }}
        >
          <svg width="800" height="800" viewBox="0 0 800 800" fill="none" xmlns="http://www.w3.org/2000/svg" className="max-w-full">
            <circle cx="400" cy="400" r="380" stroke="#CBAD7F" strokeWidth="1" strokeDasharray="4 12" />
            <circle cx="400" cy="400" r="360" stroke="#CBAD7F" strokeWidth="0.5" />
            <path d="M400 0L400 800" stroke="#CBAD7F" strokeWidth="0.5" />
            <path d="M0 400L800 400" stroke="#CBAD7F" strokeWidth="0.5" />
            <rect x="200" y="200" width="400" height="400" transform="rotate(45 400 400)" stroke="#CBAD7F" strokeWidth="0.5" />
            <circle cx="400" cy="400" r="150" stroke="#CBAD7F" strokeWidth="1" />
            <circle cx="400" cy="400" r="130" stroke="#CBAD7F" strokeWidth="0.5" strokeDasharray="2 6" />
          </svg>
        </motion.div>

        <Container>
          <motion.div
            className="max-w-4xl mx-auto relative z-10"
            ref={formRef}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.1, margin: "-10% 0px -10% 0px" }}
            exit="exit"
            variants={containerVariants}
          >
            {/* Stage 1: The outer frame appears first */}
            <motion.div className="absolute inset-0 pointer-events-none z-20">
              {/* Border lines draw themselves */}
              <motion.div
                className="absolute top-0 left-0 right-0 h-[1px] bg-warm-tan/30 origin-left"
                initial={{ scaleX: 0 }}
                variants={{ visible: { scaleX: 1, transition: { duration: 0.8, ease: "easeOut" } }, exit: { scaleX: 0, transition: { duration: 0.4 } } }}
              />
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-[1px] bg-warm-tan/30 origin-right"
                initial={{ scaleX: 0 }}
                variants={{ visible: { scaleX: 1, transition: { duration: 0.8, ease: "easeOut" } }, exit: { scaleX: 0, transition: { duration: 0.4 } } }}
              />
              <motion.div
                className="absolute top-0 bottom-0 left-0 w-[1px] bg-warm-tan/30 origin-top"
                initial={{ scaleY: 0 }}
                variants={{ visible: { scaleY: 1, transition: { duration: 0.8, ease: "easeOut" } }, exit: { scaleY: 0, transition: { duration: 0.4 } } }}
              />
              <motion.div
                className="absolute top-0 bottom-0 right-0 w-[1px] bg-warm-tan/30 origin-bottom"
                initial={{ scaleY: 0 }}
                variants={{ visible: { scaleY: 1, transition: { duration: 0.8, ease: "easeOut" } }, exit: { scaleY: 0, transition: { duration: 0.4 } } }}
              />

              {/* Corner brackets emerge */}
              <motion.div
                className="absolute top-3 left-3 w-2.5 h-2.5 border-t border-l border-warm-tan/60"
                initial={{ opacity: 0, x: -5, y: -5 }}
                variants={{ visible: { opacity: 1, x: 0, y: 0, transition: { duration: 0.6, delay: 0.2 } }, exit: { opacity: 0 } }}
              />
              <motion.div
                className="absolute top-3 right-3 w-2.5 h-2.5 border-t border-r border-warm-tan/60"
                initial={{ opacity: 0, x: 5, y: -5 }}
                variants={{ visible: { opacity: 1, x: 0, y: 0, transition: { duration: 0.6, delay: 0.2 } }, exit: { opacity: 0 } }}
              />
              <motion.div
                className="absolute bottom-3 left-3 w-2.5 h-2.5 border-b border-l border-warm-tan/60"
                initial={{ opacity: 0, x: -5, y: 5 }}
                variants={{ visible: { opacity: 1, x: 0, y: 0, transition: { duration: 0.6, delay: 0.2 } }, exit: { opacity: 0 } }}
              />
              <motion.div
                className="absolute bottom-3 right-3 w-2.5 h-2.5 border-b border-r border-warm-tan/60"
                initial={{ opacity: 0, x: 5, y: 5 }}
                variants={{ visible: { opacity: 1, x: 0, y: 0, transition: { duration: 0.6, delay: 0.2 } }, exit: { opacity: 0 } }}
              />
              
              {/* Gold tracing effect accent */}
              <motion.div
                className="absolute top-0 left-0 h-[1px] bg-warm-tan/80"
                initial={{ width: "0%", opacity: 0 }}
                variants={{ visible: { width: "15%", opacity: [0, 1, 0], transition: { duration: 1.5, delay: 0.4, ease: "easeInOut", times: [0, 0.5, 1] } }, exit: { opacity: 0 } }}
              />
            </motion.div>

            <div className="relative p-6 sm:p-10 bg-transparent">
              {/* Stage 2: Title becomes visible */}
              <motion.div className="mb-10 text-center md:text-left" variants={titleVariants} style={{ y: springYHeader }}>
                <Heading level={3} className="text-xl md:text-2xl text-primary-blue font-serif uppercase tracking-wider mb-2">
                  <motion.span style={{ textShadow: "0px 1px 1px rgba(255,255,255,0.05)" }}>
                    EXECUTIVE BOARD PORTAL
                  </motion.span>
                </Heading>
                <p className="font-sans text-xs text-ink/60">
                  Submit credentials and session preferences for academic board evaluation.
                </p>
                <motion.div
                  className="h-[1px] bg-warm-tan/20 w-full mt-4 origin-left"
                  initial={{ scaleX: 0 }}
                  variants={{ visible: { scaleX: 1, transition: { duration: 0.8, delay: 0.4, ease: "easeOut" } }, exit: { scaleX: 0 } }}
                  style={{ y: springYLine }}
                />
              </motion.div>

              {/* Stage 3: Document unfolds */}
              <motion.div variants={documentVariants} style={{ transformOrigin: "top center" }}>
                <form onSubmit={handleSubmit} noValidate className="space-y-8">
                  {/* Part 1: Personal Details */}
                  <motion.div className="space-y-6" variants={sectionVariants}>
                    <motion.h4
                      className="font-serif text-sm tracking-widest uppercase text-warm-tan font-bold pb-2 border-b border-warm-tan/10"
                      style={{ y: springYSection }}
                    >
                      I. Personal & Academic Credentials
                    </motion.h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <motion.div className="space-y-2" variants={fieldVariants}>
                        <label htmlFor="name" className="block font-sans text-[10px] tracking-wider uppercase text-warm-tan/80 font-bold">
                          Full Name
                        </label>
                        <motion.input
                          type="text"
                          id="name"
                          value={formState.name}
                          onChange={handleInputChange}
                          className={getInputStyle("name")}
                          placeholder="John Doe"
                          {...getMotionInputProps(!!errors.name)}
                        />
                        <AnimatePresence>
                          {errors.name && (
                            <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="text-[10px] text-red-400 mt-1 font-sans font-medium">{errors.name}</motion.p>
                          )}
                        </AnimatePresence>
                      </motion.div>

                      <motion.div className="space-y-2" variants={fieldVariants}>
                        <label htmlFor="institute" className="block font-sans text-[10px] tracking-wider uppercase text-warm-tan/80 font-bold">
                          Institute Name
                        </label>
                        <motion.input
                          type="text"
                          id="institute"
                          value={formState.institute}
                          onChange={handleInputChange}
                          className={getInputStyle("institute")}
                          placeholder="e.g. Institute of Engineering and Management"
                          {...getMotionInputProps(!!errors.institute)}
                        />
                        <AnimatePresence>
                          {errors.institute && (
                            <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="text-[10px] text-red-400 mt-1 font-sans font-medium">{errors.institute}</motion.p>
                          )}
                        </AnimatePresence>
                      </motion.div>

                      <motion.div className="space-y-2" variants={fieldVariants}>
                        <label htmlFor="email" className="block font-sans text-[10px] tracking-wider uppercase text-warm-tan/80 font-bold">
                          Email Address
                        </label>
                        <motion.input
                          type="email"
                          id="email"
                          value={formState.email}
                          onChange={handleInputChange}
                          className={getInputStyle("email")}
                          placeholder="john.doe@email.com"
                          {...getMotionInputProps(!!errors.email)}
                        />
                        <AnimatePresence>
                          {errors.email && (
                            <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="text-[10px] text-red-400 mt-1 font-sans font-medium">{errors.email}</motion.p>
                          )}
                        </AnimatePresence>
                      </motion.div>

                      <motion.div className="space-y-2" variants={fieldVariants}>
                        <label htmlFor="gender" className="block font-sans text-[10px] tracking-wider uppercase text-warm-tan/80 font-bold">
                          Gender
                        </label>
                        <motion.select
                          id="gender"
                          value={formState.gender}
                          onChange={handleInputChange}
                          className={getInputStyle("gender")}
                          {...getMotionInputProps(!!errors.gender)}
                        >
                          <option value="">Select Gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </motion.select>
                        <AnimatePresence>
                          {errors.gender && (
                            <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="text-[10px] text-red-400 mt-1 font-sans font-medium">{errors.gender}</motion.p>
                          )}
                        </AnimatePresence>
                      </motion.div>

                      <motion.div className="space-y-2" variants={fieldVariants}>
                        <label htmlFor="phone" className="block font-sans text-[10px] tracking-wider uppercase text-warm-tan/80 font-bold">
                          Contact Phone Number
                        </label>
                        <motion.input
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
                          {...getMotionInputProps(!!errors.phone)}
                        />
                        <AnimatePresence>
                          {errors.phone && (
                            <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="text-[10px] text-red-400 mt-1 font-sans font-medium">{errors.phone}</motion.p>
                          )}
                        </AnimatePresence>
                      </motion.div>

                      <motion.div className="space-y-2" variants={fieldVariants}>
                        <label htmlFor="whatsapp" className="block font-sans text-[10px] tracking-wider uppercase text-warm-tan/80 font-bold">
                          WhatsApp Number
                        </label>
                        <motion.input
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
                          {...getMotionInputProps(!!errors.whatsapp)}
                        />
                        <AnimatePresence>
                          {errors.whatsapp && (
                            <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="text-[10px] text-red-400 mt-1 font-sans font-medium">{errors.whatsapp}</motion.p>
                          )}
                        </AnimatePresence>
                      </motion.div>

                    </div>
                  </motion.div>

                  {/* Part 2: EB Preferences */}
                  <motion.div className="space-y-6" variants={sectionVariants}>
                    <motion.h4
                      className="font-serif text-sm tracking-widest uppercase text-warm-tan font-bold pb-2 border-b border-warm-tan/10"
                      style={{ y: springYSection }}
                    >
                      II. Board Preferences
                    </motion.h4>

                    {/* Preference 1 */}
                    <motion.div
                      className="p-4 bg-[#022B4B]/30 border border-warm-tan/10 space-y-4 relative"
                      whileHover={{ y: -2, borderColor: "rgba(203, 173, 127, 0.4)", boxShadow: "0 6px 20px rgba(0,0,0,0.15)" }}
                      transition={{ duration: 0.3 }}
                      variants={fieldVariants}
                    >
                      <h5 className="font-sans font-bold text-[10px] uppercase text-primary-blue tracking-widest">
                        First preference
                      </h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2 relative z-10">
                          <label htmlFor="committeePref1" className="block font-sans text-[10px] tracking-wider uppercase text-ink/75 font-bold">
                            Committee Preference 1
                          </label>
                          <motion.select
                            id="committeePref1"
                            value={formState.committeePref1}
                            onChange={handleInputChange}
                            className={getInputStyle("committeePref1")}
                            {...getMotionInputProps(!!errors.committeePref1)}
                          >
                            <option value="">Select Committee Choice 1</option>
                            {committees.map((c) => (
                              <option key={c.id} value={c.name} disabled={c.name === formState.committeePref2}>
                                {c.fullName} ({c.name})
                              </option>
                            ))}
                          </motion.select>
                          <AnimatePresence>
                            {errors.committeePref1 && (
                              <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="text-[10px] text-red-400 mt-1 font-sans font-medium">{errors.committeePref1}</motion.p>
                            )}
                          </AnimatePresence>
                        </div>

                        <div className="space-y-2 relative z-10">
                          <label htmlFor="position1" className="block font-sans text-[10px] tracking-wider uppercase text-ink/75 font-bold">
                            Preferred Position 1
                          </label>
                          <motion.select
                            id="position1"
                            value={formState.position1}
                            onChange={handleInputChange}
                            className={getInputStyle("position1")}
                            {...getMotionInputProps(!!errors.position1)}
                          >
                            <option value="">Select Position Choice 1</option>
                            {getPositionsForCommittee(formState.committeePref1).map((pos) => (
                              <option key={pos} value={pos}>
                                {pos}
                              </option>
                            ))}
                          </motion.select>
                          <AnimatePresence>
                            {errors.position1 && (
                              <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="text-[10px] text-red-400 mt-1 font-sans font-medium">{errors.position1}</motion.p>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                    </motion.div>

                    {/* Preference 2 */}
                    <motion.div
                      className="p-4 bg-[#022B4B]/30 border border-warm-tan/10 space-y-4 relative"
                      whileHover={{ y: -2, borderColor: "rgba(203, 173, 127, 0.4)", boxShadow: "0 6px 20px rgba(0,0,0,0.15)" }}
                      transition={{ duration: 0.3 }}
                      variants={fieldVariants}
                    >
                      <h5 className="font-sans font-bold text-[10px] uppercase text-primary-blue tracking-widest">
                        Second preference
                      </h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2 relative z-10">
                          <label htmlFor="committeePref2" className="block font-sans text-[10px] tracking-wider uppercase text-ink/75 font-bold">
                            Committee Preference 2
                          </label>
                          <motion.select
                            id="committeePref2"
                            value={formState.committeePref2}
                            onChange={handleInputChange}
                            className={getInputStyle("committeePref2")}
                            {...getMotionInputProps(!!errors.committeePref2)}
                          >
                            <option value="">Select Committee Choice 2</option>
                            {committees.map((c) => (
                              <option key={c.id} value={c.name} disabled={c.name === formState.committeePref1}>
                                {c.fullName} ({c.name})
                              </option>
                            ))}
                          </motion.select>
                          <AnimatePresence>
                            {errors.committeePref2 && (
                              <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="text-[10px] text-red-400 mt-1 font-sans font-medium">{errors.committeePref2}</motion.p>
                            )}
                          </AnimatePresence>
                        </div>

                        <div className="space-y-2 relative z-10">
                          <label htmlFor="position2" className="block font-sans text-[10px] tracking-wider uppercase text-ink/75 font-bold">
                            Preferred Position 2
                          </label>
                          <motion.select
                            id="position2"
                            value={formState.position2}
                            onChange={handleInputChange}
                            className={getInputStyle("position2")}
                            {...getMotionInputProps(!!errors.position2)}
                          >
                            <option value="">Select Position Choice 2</option>
                            {getPositionsForCommittee(formState.committeePref2).map((pos) => (
                              <option key={pos} value={pos}>
                                {pos}
                              </option>
                            ))}
                          </motion.select>
                          <AnimatePresence>
                            {errors.position2 && (
                              <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="text-[10px] text-red-400 mt-1 font-sans font-medium">{errors.position2}</motion.p>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>

                  {/* Part 3: Experience details */}
                  <motion.div className="space-y-6" variants={sectionVariants}>
                    <motion.h4
                      className="font-serif text-sm tracking-widest uppercase text-warm-tan font-bold pb-2 border-b border-warm-tan/10"
                      style={{ y: springYSection }}
                    >
                      III. Board Mandates & Experience
                    </motion.h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Total Experience */}
                      <motion.div className="space-y-2 col-span-2" variants={fieldVariants}>
                        <label htmlFor="totalExperience" className="block font-sans text-[10px] tracking-wider uppercase text-warm-tan/80 font-bold">
                          Total Number of MUN / EB Sessions
                        </label>
                        <motion.input
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
                          {...getMotionInputProps(!!errors.totalExperience)}
                        />
                        <AnimatePresence>
                          {errors.totalExperience && (
                            <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="text-[10px] text-red-400 mt-1 font-sans font-medium">{errors.totalExperience}</motion.p>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    </div>

                    {/* Previous Experience */}
                    <motion.div className="space-y-2" variants={fieldVariants}>
                      <label htmlFor="previousExperience" className="block font-sans text-[10px] tracking-wider uppercase text-warm-tan/80 font-bold">
                        Summary of Previous Executive Board / Delegate Experience (List specific MUNs, committees chaired, or awards)
                      </label>
                      <motion.textarea
                        id="previousExperience"
                        rows={6}
                        value={formState.previousExperience}
                        onChange={handleInputChange}
                        className={getInputStyle("previousExperience")}
                        placeholder="List details of committees you have previously chaired or delegate credentials..."
                        {...getMotionInputProps(!!errors.previousExperience)}
                      />
                      <AnimatePresence>
                        {errors.previousExperience && (
                          <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="text-[10px] text-red-400 mt-1 font-sans font-medium">{errors.previousExperience}</motion.p>
                        )}
                      </AnimatePresence>
                    </motion.div>

                    {/* Resume Upload */}
                    <motion.div className="space-y-2" variants={fieldVariants}>
                      <label htmlFor="resume" className="block font-sans text-[10px] tracking-wider uppercase text-warm-tan/80 font-bold">
                        Upload Resume (PDF, DOC, DOCX - Max 2MB)
                      </label>
                      <motion.input
                        type="file"
                        id="resume"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                        className={getInputStyle("resume") + " file:mr-4 file:py-1 file:px-3 file:border-0 file:text-xs file:font-semibold file:bg-warm-tan/20 file:text-warm-tan hover:file:bg-warm-tan/30 file:cursor-pointer file:font-sans"}
                        {...getMotionInputProps(!!errors.resume)}
                      />
                      <AnimatePresence>
                        {errors.resume && (
                          <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="text-[10px] text-red-400 mt-1 font-sans font-medium">{errors.resume}</motion.p>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </motion.div>

                  {/* Submissions */}
                  <motion.div className="space-y-4 pt-4 border-t border-warm-tan/10 relative" variants={sectionVariants}>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-1.5 text-[10px] text-ink/50 uppercase tracking-widest font-semibold">
                        <Info className="h-3.5 w-3.5 text-warm-tan/60" />
                        <span>Transmitted securely to the UEMCON board</span>
                      </div>

                      <motion.div
                        whileHover={{ y: -1, boxShadow: "0 0 15px rgba(203, 173, 127, 0.2)" }}
                        whileTap={{ scale: 0.98, boxShadow: "0 0 0px rgba(203, 173, 127, 0)" }}
                        className="relative group rounded-none"
                      >
                        {/* Light sweep effect container */}
                        <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-none">
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[sweep_1.5s_ease-in-out_infinite]"
                            style={{ skewX: "-20deg" }}
                          />
                        </div>

                        <Button
                          variant="primary"
                          type="submit"
                          disabled={status.type === "submitting"}
                          className="flex items-center gap-2 px-8 w-full sm:w-auto relative z-10"
                        >
                          {status.type === "submitting" ? "Transmitting..." : "Submit Portfolio"}
                          <Send className="h-3 w-3" />
                        </Button>
                      </motion.div>
                    </div>
                  </motion.div>
                </form>
              </motion.div>
            </div>

            {/* Status Banner */}
            <AnimatePresence>
              {status.type === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="mt-6 border border-green-500/30 bg-green-500/5 p-4 flex items-start gap-3 text-xs text-green-400"
                >
                  <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5" />
                  <span>{status.message}</span>
                </motion.div>
              )}

              {status.type === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="mt-6 border border-red-500/30 bg-red-500/5 p-4 flex items-start gap-3 text-xs text-red-400"
                >
                  <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                  <span>{status.message}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </Container>
      </Section>
      <style jsx global>{`
        @keyframes sweep {
          0% {
            transform: translateX(-150%) skewX(-20deg);
          }
          100% {
            transform: translateX(200%) skewX(-20deg);
          }
        }
      `}</style>
    </div>
  );
}
