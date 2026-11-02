'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  ArrowUpRight,
} from 'lucide-react'
import { useRouter } from 'next/navigation'

type Props = {
  title: string
  description: string
  index: number
  id?: string | number
  image?: string
  live_url?: string | null
  technologies?: string | string[]
}

export default function PortfolioCard({
  title,
  description,
  index,
  id,
  image,
  live_url,
  technologies,
}: Props) {
  const router = useRouter()

  const techList = Array.isArray(technologies)
    ? technologies
    : typeof technologies === 'string'
    ? technologies
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean)
    : []

  return (
    <motion.div
      initial={{
        opacity: 0,
        x: index % 2 === 0 ? -50 : 50,
        y: 20,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
      }}
      transition={{
        duration: 0.75,
        delay: index * 0.06,
      }}
      whileHover={{ y: -4 }}
      className="group relative rounded-[26px] border border-white/10 bg-white/5 p-4 backdrop-blur-xl flex flex-col min-h-[270px]"
    >
      <div
        onClick={() => id && router.push(`/portfolio/${id}`)}
        className={id ? 'cursor-pointer' : ''}
      >
        <div className="w-full h-36 rounded-2xl overflow-hidden border border-white/10 bg-white/[0.03] mb-3 relative">
          {image ? (
            <Image
              src={image}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover group-hover:scale-105 transition duration-500"
            />
          ) : (
            <div className="w-full h-full bg-white/[0.03]" />
          )}
        </div>

        <h3 className="text-[17px] font-semibold mb-2 leading-tight hover:text-white transition-colors">
          {title}
        </h3>
      </div>

      <p className="text-[13px] text-white/60 leading-relaxed line-clamp-2 min-h-[38px]">
        {description}
      </p>

      {techList.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-3 mb-1">
          {techList.slice(0, 3).map((item, idx) => (
            <span
              key={idx}
              className="text-[10px] px-2.5 py-0.5 rounded-full bg-white/[0.06] text-white/65 border border-white/5"
            >
              {item}
            </span>
          ))}
          {techList.length > 3 && (
            <span className="text-[10px] px-1.5 py-0.5 rounded-full text-white/40">
              +{techList.length - 3}
            </span>
          )}
        </div>
      )}

      <div className="mt-auto pt-4 flex items-center justify-between">
        {live_url ? (
          <a
            href={live_url}
            target="_blank"
            className="flex items-center gap-2 text-[13px] text-white/70 hover:text-white transition-all"
          >
            Live Demo
            <ArrowUpRight size={14} />
          </a>
        ) : (
          <div className="text-[13px] text-white/35">
            No Link
          </div>
        )}

        {id && (
          <button
            onClick={() =>
              router.push(`/portfolio/${id}`)
            }
            className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 transition-all flex items-center gap-2 text-[13px]"
          >
            Details
            <ArrowRight size={13} />
          </button>
        )}
      </div>
    </motion.div>
  )
}