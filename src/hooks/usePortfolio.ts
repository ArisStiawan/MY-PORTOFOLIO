'use client'

import { useEffect, useState } from 'react'
import {
  fetchCertificates,
  fetchProjects,
  fetchTechStacks,
} from '@/lib/portfolioService'
import {
  ProjectItem,
  CertificateItem,
  TechStackItem,
} from '@/data/portfolioData'

export default function usePortfolio() {
  const [projects, setProjects] = useState<ProjectItem[]>([])
  const [certificates, setCertificates] = useState<CertificateItem[]>([])
  const [techStacks, setTechStacks] = useState<TechStackItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    const loadPortfolio = async () => {
      try {
        const cachedProjects = sessionStorage.getItem('portfolioProjects')
        const cachedCertificates = sessionStorage.getItem('portfolioCertificates')
        const cachedTechStacks = sessionStorage.getItem('portfolioTechStacks')

        if (cachedProjects && isMounted) {
          setProjects(JSON.parse(cachedProjects))
        }
        if (cachedCertificates && isMounted) {
          setCertificates(JSON.parse(cachedCertificates))
        }
        if (cachedTechStacks && isMounted) {
          setTechStacks(JSON.parse(cachedTechStacks))
        }
      } catch {
        // ignore cache parse errors
      }

      try {
        const [projectsData, certificatesData, techStacksData] =
          await Promise.all([
            fetchProjects(),
            fetchCertificates(),
            fetchTechStacks(),
          ])

        if (isMounted) {
          setProjects((projectsData || []) as ProjectItem[])
          setCertificates((certificatesData || []) as CertificateItem[])
          setTechStacks((techStacksData || []) as TechStackItem[])
          setLoading(false)
        }

        sessionStorage.setItem(
          'portfolioProjects',
          JSON.stringify(projectsData || [])
        )
        sessionStorage.setItem(
          'portfolioCertificates',
          JSON.stringify(certificatesData || [])
        )
        sessionStorage.setItem(
          'portfolioTechStacks',
          JSON.stringify(techStacksData || [])
        )
      } catch {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    loadPortfolio()

    return () => {
      isMounted = false
    }
  }, [])

  return {
    projects,
    certificates,
    techStacks,
    loading,
  }
}