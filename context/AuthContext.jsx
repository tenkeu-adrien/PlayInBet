'use client'
import { createContext, useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { jwtDecode } from 'jwt-decode'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = () => {
    const token = localStorage.getItem('token')
    if (token) {
      try {
        const decoded = jwtDecode(token)
        if (decoded.exp * 1000 > Date.now()) {
          setUser(decoded)
        } else {
          logout()
        }
      } catch (error) {
        logout()
      }
    }
    setLoading(false)
  }

  const login = async (email, password, rememberMe) => {
    // Simulate API call
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
    
    if (!response.ok) {
      throw new Error('Invalid credentials')
    }
    
    const data = await response.json()
    const token = data.token
    localStorage.setItem('token', token)
    const decoded = jwtDecode(token)
    setUser(decoded)
  }

  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
    router.push('/login')
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)