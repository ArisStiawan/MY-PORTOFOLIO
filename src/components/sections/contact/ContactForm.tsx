'use client'

import React, { useState } from 'react'
import { motion, Variants } from 'framer-motion'
import Swal from 'sweetalert2'
import {
  Send,
  User,
  Mail,
  MessageSquare,
  ArrowUpRight,
} from 'lucide-react'
import {
  InstagramIcon,
  GithubIcon,
  LinkedinIcon,
  TiktokIcon,
} from '@/components/ui/BrandIcons'

const smoothEase: [number, number, number, number] = [
  0.22,
  1,
  0.36,
  1,
]

const fieldVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 26,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: smoothEase,
    },
  },
}

const socialLinks = [
  {
    title: 'LinkedIn',
    user: '@linkedin',
    icon: LinkedinIcon,
    link: 'https://www.linkedin.com/in/aris-stiawan-5b260833a',
  },
  {
    title: 'Github',
    user: '@github',
    icon: GithubIcon,
    link: 'https://github.com/ArisStiawan',
  },
  {
    title: 'Instagram',
    user: '@instagram',
    icon: InstagramIcon,
    link: 'https://www.instagram.com/arisable_?exln=YnMwNmUyZ2J2bG9m&utm_source=qr',
  },
]

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      Swal.fire({
        icon: 'warning',
        title: 'Form Belum Lengkap',
        text: 'Mohon isi nama, email, dan pesan Anda sebelum mengirim.',
        background: '#121218',
        color: '#fff',
        confirmButtonColor: '#00f0ff',
      })
      return
    }

    setIsSubmitting(true)

    const subject = encodeURIComponent(`Portfolio Message from ${formData.name}`)
    const body = encodeURIComponent(`Nama: ${formData.name}\nEmail: ${formData.email}\n\nPesan:\n${formData.message}`)
    window.location.href = `mailto:arisstiawan.dev@gmail.com?subject=${subject}&body=${body}`

    Swal.fire({
      icon: 'success',
      title: 'Pesan Disiapkan!',
      text: 'Aplikasi email Anda telah dibuka. Silakan klik kirim di aplikasi email Anda.',
      background: '#121218',
      color: '#fff',
      confirmButtonColor: '#00f0ff',
    })

    setFormData({ name: '', email: '', message: '' })
    setIsSubmitting(false)
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: smoothEase }}
      viewport={{ once: false, amount: 0.2 }}
      className="rounded-[28px] border border-white/10 bg-white/[0.04] backdrop-blur-xl p-5 md:p-8 flex flex-col h-full"
    >
      {/* HEADER */}
      <motion.div
        variants={fieldVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false }}
        transition={{ delay: 0.05 }}
      >
        <h2 className="text-2xl md:text-3xl font-bold mb-3">
          Hubungi Saya
        </h2>

        <p className="text-sm text-white/50 mb-7">
          Feel free to reach out if you want to collaborate,
          discuss ideas, or simply say hello.
        </p>
      </motion.div>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* NAME */}
        <motion.div
          variants={fieldVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false }}
          transition={{ delay: 0.1 }}
        >
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />

            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Your Name"
              className="w-full rounded-2xl border border-white/15 bg-black/20 pl-12 pr-4 py-4 outline-none transition duration-200 focus:border-white focus:ring-1 focus:ring-white/40"
            />
          </div>
        </motion.div>

        {/* EMAIL */}
        <motion.div
          variants={fieldVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false }}
          transition={{ delay: 0.16 }}
        >
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />

            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              placeholder="Your Email"
              className="w-full rounded-2xl border border-white/15 bg-black/20 pl-12 pr-4 py-4 outline-none transition duration-200 focus:border-white focus:ring-1 focus:ring-white/40"
            />
          </div>
        </motion.div>

        {/* MESSAGE */}
        <motion.div
          variants={fieldVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false }}
          transition={{ delay: 0.22 }}
        >
          <div className="relative">
            <MessageSquare className="absolute left-4 top-5 text-white/40" />

            <textarea
              rows={5}
              required
              value={formData.message}
              onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
              placeholder="Your Message"
              className="w-full rounded-2xl border border-white/15 bg-black/20 pl-12 pr-4 py-4 outline-none resize-none transition duration-200 focus:border-white focus:ring-1 focus:ring-white/40"
            />
          </div>
        </motion.div>

        {/* BUTTON */}
        <motion.button
          type="submit"
          disabled={isSubmitting}
          variants={fieldVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false }}
          transition={{ delay: 0.28 }}
          whileHover={{
            scale: 1.02,
            transition: { duration: 0.12 },
          }}
          whileTap={{ scale: 0.97 }}
          className="w-full rounded-2xl py-4 bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center gap-2 cursor-pointer transition font-medium disabled:opacity-50"
        >
          <Send size={16} />
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </motion.button>
      </form>

      {/* SOCIAL */}
      <div className="border-t border-white/10 pt-5 mt-6">
        <motion.p
          variants={fieldVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false }}
          transition={{ delay: 0.34 }}
          className="text-sm text-white/55 mb-4"
        >
          Connect With Me
        </motion.p>

        {/* SOCIAL CARDS (LINKEDIN, GITHUB, TIKTOK, INSTAGRAM) */}
        <div className="space-y-3">
          {socialLinks.map((item, i) => {
            const Icon = item.icon

            return (
              <motion.a
                key={item.title}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                variants={fieldVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: false }}
                transition={{
                  delay: 0.36 + i * 0.05,
                }}
                whileHover={{
                  scale: 1.02,
                  transition: { duration: 0.12 },
                }}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-black/20 p-4 flex items-center justify-between"
              >
                {/* SHEEN EFFECT */}
                <div className="absolute inset-0 bg-white/[0.04] translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-700 ease-out" />

                <div className="relative z-10 flex items-center gap-3">
                  <Icon size={18} />

                  <div>
                    <p className="text-sm font-medium">{item.title}</p>
                    <p className="text-xs text-white/35">{item.user}</p>
                  </div>
                </div>

                <div className="relative z-10 opacity-0 group-hover:opacity-100 transition">
                  <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center">
                    <ArrowUpRight size={14} />
                  </div>
                </div>
              </motion.a>
            )
          })}
        </div>
      </div>
    </motion.div>
  )
}
