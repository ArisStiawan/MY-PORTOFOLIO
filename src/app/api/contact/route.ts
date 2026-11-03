import { NextResponse } from 'next/server'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json()

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { success: false, error: 'Mohon isi nama, email, dan pesan Anda.' },
        { status: 400 }
      )
    }

    let emailDelivered = false

    // 1. Kirim via Web3Forms jika WEB3FORMS_ACCESS_KEY tersedia
    const web3formsKey = process.env.WEB3FORMS_ACCESS_KEY
    if (web3formsKey) {
      try {
        const res = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            access_key: web3formsKey,
            name: name.trim(),
            email: email.trim(),
            message: message.trim(),
            from_name: 'Portfolio Contact Form',
            subject: `Pesan Baru Portofolio dari ${name.trim()}`,
          }),
        })

        const resData = await res.json()
        if (resData.success) {
          emailDelivered = true
        }
      } catch (err) {
        console.warn('Web3Forms delivery notice:', err)
      }
    }

    // 2. Simpan pesan ke Supabase database jika sudah terkoneksi
    if (isSupabaseConfigured) {
      try {
        const { error: dbError } = await supabase
          .from('contact_messages')
          .insert([
            {
              name: name.trim(),
              email: email.trim(),
              message: message.trim(),
            },
          ])

        if (dbError) {
          console.warn('Supabase contact_messages note:', dbError.message)
        }
      } catch (dbErr) {
        console.warn('Supabase save error:', dbErr)
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Pesan berhasil diterima.',
      emailDelivered,
    })
  } catch (error) {
    console.error('Contact API error:', error)
    return NextResponse.json(
      { success: false, error: 'Terjadi kendala pada server saat memproses pesan.' },
      { status: 500 }
    )
  }
}

