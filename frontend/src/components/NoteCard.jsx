import { Link } from 'react-router-dom'
import { supabase } from '../supabaseClient'

export default function NoteCard({ note, onChange }) {
  const deleteNote = async () => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this note?'
    )

    if (!confirmDelete) return

    await supabase
      .from('notes')
      .delete()
      .eq('id', note.id)

    onChange()
  }

  return (
    <div className="note">
      <div>
        <h4>{note.title}</h4>
        <p>
          {note.content.length > 90
            ? note.content.slice(0, 90) + '...'
            : note.content}
        </p>
      </div>

      <div className="note-actions">
        <Link to={`/note/${note.id}`}>
          <button className="secondary">View</button>
        </Link>

        <button className="danger" onClick={deleteNote}>
          Delete
        </button>
      </div>
    </div>
  )
}
