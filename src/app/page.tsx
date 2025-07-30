import { redirect } from 'next/navigation'

export default function Home() {
  // Эта страница не должна отображаться, так как middleware перенаправляет на /ru или /en
  // Но на всякий случай добавляем fallback
  redirect('/ru')
}
