"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { dummyProjects } from "@/data/portfolioData";
import Swal from "sweetalert2";

import {
  Code2,

  ArrowLeft,
  ExternalLink,
  Sparkles,
  GitBranch,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";

interface ProjectDetailItem {
  id: string | number;
  title: string;
  description: string;
  live_url?: string | null;
  github_url?: string | null;
  technologies: string[] | string;
  key_features?: string[] | string | null;
  image_url: string;
  image_urls?: string[] | null;
  created_at?: string;
}

export default function ProjectDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  const [project, setProject] = useState<ProjectDetailItem | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState<Partial<ProjectDetailItem>>({});
  const [currentImage, setCurrentImage] = useState(0);
  const [previewOpen, setPreviewOpen] = useState(false);

  const fetchProject = useCallback(async () => {
    if (!id) return;

    if (!isSupabaseConfigured) {
      const fallback =
        dummyProjects.find((p) => String(p.id) === String(id)) ||
        dummyProjects[0];
      if (fallback) {
        setProject(fallback as unknown as ProjectDetailItem);
        setForm(fallback as unknown as ProjectDetailItem);
      }
      return;
    }

    try {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("id", id)
        .single();

      if (!error && data) {
        setProject(data as ProjectDetailItem);
        setForm(data as ProjectDetailItem);
      } else {
        const fallback =
          dummyProjects.find((p) => String(p.id) === String(id)) ||
          dummyProjects[0];
        if (fallback) {
          setProject(fallback as unknown as ProjectDetailItem);
          setForm(fallback as unknown as ProjectDetailItem);
        }
      }
    } catch {
      const fallback =
        dummyProjects.find((p) => String(p.id) === String(id)) ||
        dummyProjects[0];
      if (fallback) {
        setProject(fallback as unknown as ProjectDetailItem);
        setForm(fallback as unknown as ProjectDetailItem);
      }
    }
  }, [id]);

  useEffect(() => {
    fetchProject();
  }, [fetchProject]);

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: "Hapus project?",
      text: "Project yang dihapus tidak bisa dikembalikan.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, Hapus",
      cancelButtonText: "Batal",
      background: "#101010",
      color: "#fff",
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#27272a",
      reverseButtons: true,
    });

    if (!result.isConfirmed) return;

    const { error } = await supabase.from("projects").delete().eq("id", id);

    if (!error) {
      await Swal.fire({
        title: "Berhasil!",
        text: "Project berhasil dihapus.",
        icon: "success",
        timer: 1800,
        showConfirmButton: false,
        background: "#101010",
        color: "#fff",
      });

      router.push("/admin/projects");
    } else {
      Swal.fire({
        title: "Gagal",
        text: "Project gagal dihapus.",
        icon: "error",
        background: "#101010",
        color: "#fff",
      });
    }
  };

  const handleUpdate = async () => {
    const formattedTech = Array.isArray(form.technologies)
      ? form.technologies
      : typeof form.technologies === "string"
      ? form.technologies
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean)
      : [];

    const formattedFeatures = Array.isArray(form.key_features)
      ? form.key_features
      : typeof form.key_features === "string"
      ? form.key_features
          .split(",")
          .map((f) => f.trim())
          .filter(Boolean)
      : [];

    const payload = {
      ...form,
      technologies: formattedTech,
      key_features: formattedFeatures,
    };

    const { error } = await supabase
      .from("projects")
      .update(payload)
      .eq("id", id);

    if (!error) {
      setProject(payload as ProjectDetailItem);
      setForm(payload);
      setEditMode(false);

      Swal.fire({
        title: "Berhasil",
        text: "Project berhasil diperbarui.",
        icon: "success",
        timer: 1800,
        showConfirmButton: false,
        background: "#101010",
        color: "#fff",
      });
    } else {
      Swal.fire({
        title: "Gagal",
        text: "Update project gagal.",
        icon: "error",
        background: "#101010",
        color: "#fff",
      });
    }
  };

  if (!project)
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-white">
        Loading...
      </div>
    );

  const tech: string[] = Array.isArray(form.technologies)
    ? form.technologies
    : typeof form.technologies === "string"
    ? form.technologies
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean)
    : [];

  const features: string[] = Array.isArray(form.key_features)
    ? form.key_features
    : typeof form.key_features === "string"
    ? form.key_features
        .split(",")
        .map((f) => f.trim())
        .filter(Boolean)
    : [];

  const galleryImages: string[] =
    project.image_urls && Array.isArray(project.image_urls) && project.image_urls.length > 0
      ? project.image_urls
      : project.image_url
      ? [project.image_url]
      : [];

  const nextImage = () => {
    if (currentImage < galleryImages.length - 1) {
      setCurrentImage((prev) => prev + 1);
    }
  };

  const prevImage = () => {
    if (currentImage > 0) {
      setCurrentImage((prev) => prev - 1);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white px-4 sm:px-6 md:px-8 lg:px-12 py-5 md:py-8">
      {/* LIGHTBOX */}
      <AnimatePresence>
        {previewOpen && galleryImages[currentImage] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999] bg-black/95 backdrop-blur-md flex items-center justify-center px-4"
          >
            <button
              onClick={() => setPreviewOpen(false)}
              className="absolute top-4 right-4 md:top-6 md:right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center"
            >
              <X size={18} />
            </button>

            {currentImage > 0 && (
              <button
                onClick={prevImage}
                className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center"
              >
                <ChevronLeft size={18} />
              </button>
            )}

            <motion.img
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              src={galleryImages[currentImage]}
              alt={project.title}
              className="max-w-[90vw] max-h-[85vh] rounded-3xl object-contain"
            />

            {currentImage < galleryImages.length - 1 && (
              <button
                onClick={nextImage}
                className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center"
              >
                <ChevronRight size={18} />
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* HEADER */}
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={() => router.push("/admin/projects")}
          className="flex items-center gap-2 text-sm text-white/50 hover:text-white transition"
        >
          <ArrowLeft size={15} />
          Back to Projects
        </button>

        <div className="flex gap-2">
          {editMode ? (
            <>
              <button
                onClick={handleUpdate}
                className="px-4 py-2 rounded-xl bg-white text-black text-sm font-medium hover:opacity-90 transition"
              >
                Save
              </button>
              <button
                onClick={() => setEditMode(false)}
                className="px-4 py-2 rounded-xl border border-white/10 text-sm hover:bg-white/5 transition"
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setEditMode(true)}
                className="px-4 py-2 rounded-xl border border-white/10 text-sm hover:bg-white/5 transition"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 rounded-xl bg-red-500/20 text-red-400 border border-red-500/30 text-sm hover:bg-red-500/30 transition"
              >
                Delete
              </button>
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* LEFT COLUMN */}
        <div>
          {/* TITLE */}
          {editMode ? (
            <input
              value={form.title || ""}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="Project Title"
              className="text-2xl sm:text-3xl font-bold bg-[#111] border border-white/10 rounded-2xl px-4 py-2 w-full outline-none mb-4"
            />
          ) : (
            <h1 className="text-2xl sm:text-4xl font-bold mb-4">{project.title}</h1>
          )}

          {/* DESCRIPTION */}
          {editMode ? (
            <textarea
              value={form.description || ""}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Project Description"
              rows={4}
              className="w-full bg-[#111] border border-white/10 rounded-2xl p-4 outline-none text-sm text-white/80 leading-relaxed mb-6"
            />
          ) : (
            <p className="text-white/70 leading-relaxed text-sm sm:text-base mb-6">
              {project.description}
            </p>
          )}

          {/* LINKS */}
          <div className="flex flex-wrap gap-3 mb-8">
            {editMode ? (
              <input
                value={form.live_url || ""}
                onChange={(e) => setForm({ ...form, live_url: e.target.value })}
                placeholder="Live Demo URL"
                className="bg-[#111] border border-white/10 rounded-xl px-4 py-2.5 outline-none text-sm flex-1 min-w-[200px]"
              />
            ) : project.live_url ? (
              <a
                href={project.live_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 text-sm transition"
              >
                <ExternalLink size={14} />
                Live Demo
              </a>
            ) : null}

            {editMode ? (
              <input
                value={form.github_url || ""}
                onChange={(e) => setForm({ ...form, github_url: e.target.value })}
                placeholder="GitHub Repo URL"
                className="bg-[#111] border border-white/10 rounded-xl px-4 py-2.5 outline-none text-sm flex-1 min-w-[200px]"
              />
            ) : project.github_url ? (
              <a
                href={project.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 text-sm transition"
              >
                <GitBranch size={14} />
                GitHub
              </a>
            ) : null}
          </div>

          {/* TECH STACK */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-3">
              <Code2 size={16} className="text-white/60" />
              <h2 className="text-sm font-semibold uppercase tracking-wider text-white/80">
                Technologies Used
              </h2>
            </div>

            {editMode ? (
              <input
                value={
                  Array.isArray(form.technologies)
                    ? form.technologies.join(", ")
                    : form.technologies || ""
                }
                onChange={(e) =>
                  setForm({ ...form, technologies: e.target.value })
                }
                placeholder="Next.js, TypeScript, Tailwind CSS (comma separated)"
                className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-3 outline-none text-sm"
              />
            ) : (
              <div className="flex flex-wrap gap-2">
                {tech.map((t, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-white/80"
                  >
                    {t}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div>
          {/* IMAGE CAROUSEL / PREVIEW */}
          {galleryImages.length > 0 && (
            <div className="mb-8">
              <div
                onClick={() => setPreviewOpen(true)}
                className="relative aspect-video rounded-3xl overflow-hidden border border-white/10 bg-white/[0.02] cursor-pointer group"
              >
                <img
                  src={galleryImages[currentImage]}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {galleryImages.length > 1 && (
                  <div className="absolute inset-x-3 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none">
                    {currentImage > 0 && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          prevImage();
                        }}
                        className="w-9 h-9 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center pointer-events-auto hover:bg-black/80 transition"
                      >
                        <ChevronLeft size={16} />
                      </button>
                    )}
                    {currentImage < galleryImages.length - 1 && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          nextImage();
                        }}
                        className="w-9 h-9 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center pointer-events-auto ml-auto hover:bg-black/80 transition"
                      >
                        <ChevronRight size={16} />
                      </button>
                    )}
                  </div>
                )}
              </div>

              {galleryImages.length > 1 && (
                <div className="flex justify-center gap-2 mt-4">
                  {galleryImages.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentImage(i)}
                      className={`h-2 rounded-full transition-all ${
                        currentImage === i ? "w-6 bg-white" : "w-2 bg-white/20"
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* KEY FEATURES */}
          <div className="p-6 rounded-3xl bg-[#111] border border-white/10">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles size={16} className="text-white/70" />
              <h2 className="text-sm font-semibold uppercase tracking-wider text-white/80">
                Key Features
              </h2>
            </div>

            {editMode ? (
              <textarea
                value={
                  Array.isArray(form.key_features)
                    ? form.key_features.join(", ")
                    : form.key_features || ""
                }
                onChange={(e) =>
                  setForm({ ...form, key_features: e.target.value })
                }
                placeholder="Fitur 1, Fitur 2, Fitur 3 (comma separated)"
                rows={5}
                className="w-full bg-[#181818] border border-white/10 rounded-xl p-3 outline-none text-xs leading-relaxed"
              />
            ) : features.length > 0 ? (
              <ul className="space-y-2.5 text-xs sm:text-sm text-white/70">
                {features.map((feat, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/40 mt-1.5 shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xs text-white/40 italic">Tidak ada rincian fitur tambahan.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
