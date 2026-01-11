import { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [isSignUp, setIsSignUp] = useState(false)
  const [error, setError] = useState('')

  // Redirect if already logged in
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        navigate('/dashboard')
      }
    })
  }, [])

  const handleEmailAuth = async () => {
    setError('')
    setLoading(true)

    let response

    if (isSignUp) {
      response = await supabase.auth.signUp({
        email,
        password
      })
    } else {
      response = await supabase.auth.signInWithPassword({
        email,
        password
      })
    }

    if (response.error) {
      setError(response.error.message)
    } else {
      navigate('/dashboard')
    }

    setLoading(false)
  }

  const loginWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin
      }
    })
  }

  return (
    <div className="center">
      <div
        className="card"
        style={{
          maxWidth: '420px',
          width: '100%',
          padding: '32px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}
      >
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '6px' }}>
          <h2 style={{ color: '#38bdf8' }}>Notes Vault</h2>
          <p style={{ opacity: 0.75, marginTop: '6px' }}>
            {isSignUp
              ? 'Create your private account'
              : 'Sign in to your private notes'}
          </p>
        </div>

        {/* Error */}
        {error && (
          <p style={{ color: '#f87171', fontSize: '13px' }}>
            {error}
          </p>
        )}

        {/* Email */}
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        {/* Primary button */}
        <button onClick={handleEmailAuth} disabled={loading}>
          {loading
            ? 'Please wait...'
            : isSignUp
            ? 'Create Account'
            : 'Login'}
        </button>

        {/* Switch auth mode */}
        <p
          style={{
            fontSize: '13px',
            textAlign: 'center',
            opacity: 0.8
          }}
        >
          {isSignUp ? 'Already have an account?' : 'New here?'}{' '}
          <span
            style={{
              color: '#38bdf8',
              cursor: 'pointer'
            }}
            onClick={() => setIsSignUp(!isSignUp)}
          >
            {isSignUp ? 'Login' : 'Create account'}
          </span>
        </p>

        {/* Divider */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            margin: '10px 0'
          }}
        >
          <div style={{ flex: 1, height: '1px', background: '#1e293b' }} />
          <span style={{ fontSize: '12px', opacity: 0.6 }}>OR</span>
          <div style={{ flex: 1, height: '1px', background: '#1e293b' }} />
        </div>

        {/* Google OAuth (Optional) */}
        <button className="secondary" onClick={loginWithGoogle}>
          Continue with Google
        </button>
      </div>
    </div>
  )
}
