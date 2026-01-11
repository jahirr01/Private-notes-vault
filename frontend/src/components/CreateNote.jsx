import { useState } from 'react'
import { supabase } from '../supabaseClient'

export default function CreateNote({ onAdd }) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [saving, setSaving] = useState(false)

  const saveNote = async () => {
    if (!title || !content) return

    setSaving(true)

    const { error } = await supabase.from('notes').insert({
      title,
      content
      // user_id is AUTO-FILLED by Supabase
    })

    if (error) {
      alert(error.message)
    } else {
      setTitle('')
      setContent('')
      onAdd()
    }

    setSaving(false)
  }

  return (
    <div className="card">
      <input
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Write your note..."
        value={content}
        onChange={e => setContent(e.target.value)}
      />

      <button onClick={saveNote} disabled={saving}>
        {saving ? 'Saving...' : 'Save Note'}
      </button>
    </div>
  )
}
