import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setIsLoggedIn(true)
    }
  }, [])

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    localStorage.removeItem('token')
    setIsLoggedIn(false)
    router.push('/login')
  }

  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      {isLoggedIn ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <div>
          <button onClick={() => router.push('/login')}>Login</button>
          <button onClick={() => router.push('/signup')}>Sign Up</button>
        </div>
      )}
    </div>
  )
}