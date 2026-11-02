"use client";

import Image from "next/image";
import { useEffect, useState, useSyncExternalStore } from "react";
import { motion, Variants } from "framer-motion";
import { Code, Award, Globe, FileText, ArrowUpRight } from "lucide-react";
import { fetchProjects, fetchCertificates } from "@/lib/portfolioService";
import { dummyProjects, dummyCertificates } from "@/data/portfolioData";

function useIsMobile() {
  return useSyncExternalStore(
    (callback) => {
      window.addEventListener("resize", callback);
      return () => window.removeEventListener("resize", callback);
    },
    () => window.innerWidth < 768,
    () => false
  );
}

/* ================== ANIMATION ================== */

const container: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.16,
    },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 35, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 1,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const slideLeft: Variants = {
  hidden: { opacity: 0, x: 70, rotate: 2 },
  show: {
    opacity: 1,
    x: 0,
    rotate: 0,
    transition: {
      duration: 1.2,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const pop: Variants = {
  hidden: { opacity: 0, scale: 0.92, y: 25 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.85,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

/* ================== COMPONENT ================== */

export default function About() {
  const isMobile = useIsMobile();

  const [projectCount, setProjectCount] = useState(dummyProjects.length);
  const [certificateCount, setCertificateCount] = useState(
    dummyCertificates.length
  );

  useEffect(() => {
    let isMounted = true;
    const loadStats = async () => {
      try {
        const [proj, cert] = await Promise.all([
          fetchProjects(),
          fetchCertificates(),
        ]);

        if (isMounted) {
          const pCount =
            proj && proj.length > 0 ? proj.length : dummyProjects.length;
          const cCount =
            cert && cert.length > 0 ? cert.length : dummyCertificates.length;
          setProjectCount(pCount);
          setCertificateCount(cCount);
        }
      } catch {
        if (isMounted) {
          setProjectCount(dummyProjects.length);
          setCertificateCount(dummyCertificates.length);
        }
      }
    };

    loadStats();

    return () => {
      isMounted = false;
    };
  }, []);

  const scrollToPortfolio = () => {
    const el = document.getElementById("portfolio");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const stats = [
    {
      icon: <Code size={16} />,
      value: String(projectCount),
      title: "PROJECTS",
    },
    {
      icon: <Award size={16} />,
      value: String(certificateCount),
      title: "CERTIFICATES",
    },
    {
      icon: <Globe size={16} />,
      value: String(projectCount + certificateCount),
      title: "COMPLETED WORKS",
    },
  ];

  return (
    <section
      id="about"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "flex-start",
        padding: isMobile ? "60px 24px 30px" : "80px 60px 30px 120px",
      }}
    >
      <div style={{ width: "100%" }}>
        <div
          style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "32px",
          }}
        >
          {/* LEFT */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, margin: "-80px" }}
            style={{
              maxWidth: "600px",
              width: "100%",
            }}
          >
            <motion.div variants={fadeUp} style={{ marginBottom: 16 }}>
              <span
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 12,
                  color: "var(--text-muted)",
                  letterSpacing: "0.2em",
                }}
              >
                ABOUT ME
              </span>
            </motion.div>

            <motion.div variants={fadeUp}>
              <div
                style={{
                  fontSize: isMobile ? 32 : "clamp(32px,5vw,46px)",
                  fontWeight: 800,
                  lineHeight: 1.03,
                  color: "var(--text-primary)",
                }}
              >
                <div>Aris</div>
                <div>Stiawan</div>
              </div>
            </motion.div>

            <motion.p
              variants={{
                hidden: { opacity: 0, y: 40 },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 1.1,
                    delay: 0.2,
                  },
                },
              }}
              style={{
                marginTop: 18,
                fontSize: 14,
                color: "var(--text-secondary)",
                lineHeight: 1.75,
                maxWidth: isMobile ? "100%" : "490px",
              }}
            >
              Halo! Saya adalah fresh graduate dari Universitas Sebelas Maret
              (UNS) yang memiliki minat besar di bidang DevOps, cloud computing,
              dan otomatisasi infrastruktur. Saya sangat antusias dalam merancang
              arsitektur sistem yang scalable, membangun pipeline CI/CD yang
              efisien, dan memastikan keandalan deployment perangkat lunak. Saya
              adalah pembelajar yang cepat, adaptif terhadap teknologi baru, dan
              siap berkolaborasi untuk membangun infrastruktur digital yang
              tangguh.
            </motion.p>

            {/* QUOTE */}
            <motion.div
              variants={{
                hidden: { opacity: 0, scale: 0.94 },
                show: {
                  opacity: 1,
                  scale: 1,
                  transition: {
                    duration: 0.9,
                    delay: 0.3,
                  },
                },
              }}
              style={{
                marginTop: 18,
                padding: "12px 25px",
                borderRadius: 10,
                border: "1px solid var(--border)",
                background: "var(--bg-card)",
                fontSize: 12,
                fontStyle: "italic",
                display: "inline-block",
                width: "fit-content",
              }}
            >
              “Di balik aplikasi yang hebat, ada infrastruktur yang kuat.”
            </motion.div>

            {/* BUTTONS */}
            <motion.div
              variants={fadeUp}
              style={{
                display: "flex",
                gap: 10,
                marginTop: 18,
                flexWrap: "wrap",
              }}
            >
              {/* DOWNLOAD CV */}
              <a
                href="https://drive.google.com/file/d/1fbV3ZqaHLZYsuGyYIv3Hr1BkJ5iYOs1c/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none" }}
              >
                <button
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    padding: "10px 18px",
                    borderRadius: 8,
                    border: "1px solid white",
                    background: "white",
                    color: "black",
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: "pointer",
                    transition: "transform 0.25s ease, opacity 0.25s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform =
                      "translateY(-2px) scale(1.03)";
                    e.currentTarget.style.opacity = "0.92";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0) scale(1)";
                    e.currentTarget.style.opacity = "1";
                  }}
                >
                  <FileText size={14} />
                  Download CV
                </button>
              </a>

              {/* VIEW PROJECTS */}
              <button
                onClick={scrollToPortfolio}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "10px 18px",
                  borderRadius: 8,
                  border: "1px solid white",
                  background: "transparent",
                  color: "white",
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "transform 0.25s ease, opacity 0.25s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform =
                    "translateY(-2px) scale(1.03)";
                  e.currentTarget.style.opacity = "0.85";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0) scale(1)";
                  e.currentTarget.style.opacity = "1";
                }}
              >
                <ArrowUpRight size={14} />
                View Projects
              </button>
            </motion.div>
          </motion.div>

          {/* IMAGE */}
          {!isMobile && (
            <motion.div
              variants={slideLeft}
              initial="hidden"
              whileInView="show"
              viewport={{ once: false }}
              style={{
                width: "48%",
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <div
                style={{
                  padding: 12,
                  borderRadius: "50%",
                  border: "1px solid var(--border)",
                }}
              >
                <Image
                  src="/assets/profile.png"
                  alt="Profile"
                  width={240}
                  height={240}
                  className="rounded-full object-cover block"
                  priority
                />
              </div>
            </motion.div>
          )}
        </div>

        {/* CARDS */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false }}
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
            gap: 18,
            marginTop: 36,
          }}
        >
          {stats.map((item, i) => (
            <motion.div
              key={i}
              variants={pop}
              whileHover={{ scale: 1.03 }}
              onClick={scrollToPortfolio}
              style={{
                position: "relative",
                padding: 18,
                borderRadius: 16,
                border: "1px solid var(--border)",
                background: "var(--bg-card)",
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: "50%",
                  border: "1px solid var(--border)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 10,
                }}
              >
                {item.icon}
              </div>

              <div
                style={{
                  position: "absolute",
                  top: 16,
                  right: 16,
                  fontSize: 18,
                  fontWeight: 700,
                }}
              >
                {item.value}
              </div>

              <div
                style={{
                  fontSize: 11,
                  letterSpacing: "0.08em",
                }}
              >
                {item.title}
              </div>

              <div
                style={{
                  position: "absolute",
                  bottom: 14,
                  right: 14,
                }}
              >
                <ArrowUpRight size={15} />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
