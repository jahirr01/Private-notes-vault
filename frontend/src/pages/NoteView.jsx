import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'
import Navbar from '../components/Navbar'

export default function NoteView() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [note, setNote] = useState(null)
  const [editing, setEditing] = useState(false)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(true)

  const fetchNote = async () => {
    const { data, error } = await supabase
      .from('notes')
      .select('*')
      .eq('id', id)
      .single()

    if (!error) {
      setNote(data)
      setTitle(data.title)
      setContent(data.content)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchNote()
  }, [])

  const updateNote = async () => {
    await supabase
      .from('notes')
      .update({ title, content })
      .eq('id', id)

    setEditing(false)
    fetchNote()
  }

  const deleteNote = async () => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this note?'
    )

    if (!confirmDelete) return

    await supabase.from('notes').delete().eq('id', id)
    navigate('/dashboard')
  }

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="container">
          <p>Loading note...</p>
        </div>
      </>
    )
  }

  return (
    <>
      <Navbar />

      <div className="container">
        <div className="note-view">
          {!editing ? (
            <>
              <h2>{note.title}</h2>
              <p>{note.content}</p>

              <div style={{ marginTop: '24px', display: 'flex', gap: '10px' }}>
                <button className="secondary" onClick={() => setEditing(true)}>
                  Edit
                </button>
                <button className="danger" onClick={deleteNote}>
                  Delete
                </button>
              </div>
            </>
          ) : (
            <>
              <input
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="Title"
              />

              <textarea
                value={content}
                onChange={e => setContent(e.target.value)}
                placeholder="Write your note..."
              />

              <div style={{ marginTop: '18px', display: 'flex', gap: '10px' }}>
                <button onClick={updateNote}>Save</button>
                <button
                  className="secondary"
                  onClick={() => setEditing(false)}
                >
                  Cancel
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}
