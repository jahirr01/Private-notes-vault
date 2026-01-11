import { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'
import Navbar from '../components/Navbar'
import CreateNote from '../components/CreateNote'
import NoteCard from '../components/NoteCard'

export default function Dashboard() {
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchNotes = async () => {
    setLoading(true)

    const { data, error } = await supabase
      .from('notes')
      .select('*')
      .order('created_at', { ascending: false })

    if (!error) setNotes(data || [])
    setLoading(false)
  }

  useEffect(() => {
    fetchNotes()
  }, [])

  return (
    <>
      <Navbar />

      <div className="container">
        {/* CREATE NOTE */}
        <div className="card">
          <h3>
            <span style={{ fontSize: '22px' }}>＋</span>
            Create New Note
          </h3>
          <CreateNote onAdd={fetchNotes} />
        </div>

        {/* NOTES LIST */}
        {loading && <p>Loading your notes...</p>}

        {!loading && notes.length === 0 && (
          <p style={{ marginTop: '20px', opacity: 0.7 }}>
            No notes yet. Start writing something.
          </p>
        )}

        {!loading && notes.length > 0 && (
          <div className="notes-grid">
            {notes.map(note => (
              <NoteCard
                key={note.id}
                note={note}
                onChange={fetchNotes}
              />
            ))}
          </div>
        )}
      </div>
    </>
  )
}
