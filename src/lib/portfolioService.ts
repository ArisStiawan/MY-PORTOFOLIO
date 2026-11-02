import { supabase } from '@/lib/supabase'
import {
  dummyProjects,
  dummyCertificates,
  dummyTechStacks,
} from '@/data/portfolioData'

export const fetchProjects = async () => {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', {
        ascending: true,
      })

    if (!error && data && data.length > 0) {
      return data
    }
  } catch {
    // fallback
  }

  return dummyProjects
}

export const fetchCertificates = async () => {
  try {
    const { data, error } = await supabase
      .from('certificates')
      .select('*')
      .order('created_at', {
        ascending: true,
      })

    if (!error && data && data.length > 0) {
      return data
    }
  } catch {
    // fallback
  }

  return dummyCertificates
}

export const fetchTechStacks = async () => {
  try {
    const { data, error } = await supabase
      .from('tech_stack')
      .select('*')
      .order('created_at', {
        ascending: true,
      })

    if (!error && data && data.length > 0) {
      return data
    }
  } catch {
    // fallback
  }

  return dummyTechStacks
}