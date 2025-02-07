import React, { useEffect, useState } from 'react'
import axios from 'axios'


const NoteListPage = () => {
    const [notes, setNotes] = useState([]);

    useEffect (() => {
        axios.get('http://127.0.0.1:8000/api/getnotes/')
        .then(Response => {
            setNotes(Response.data)
        })
        .catch(error =>{
            console.error("Error Fetch data", error)
        })
    }, [])
  return (
    <div>
      <ul>
        {notes.map(notes => (
            <li key={notes.id}>{notes.body}</li>
        ) )}
      </ul>
   
    </div>
  )
}

export default NoteListPage
