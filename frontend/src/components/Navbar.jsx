import { supabase } from '../supabaseClient'

export default function Navbar() {
  const logout = async () => {
    await supabase.auth.signOut()
    window.location.href = '/'
  }

  return (
    <nav className="nav">
      <h3>Notes Vault</h3>
      <button onClick={logout}>Logout</button>
    </nav>
  )
}
