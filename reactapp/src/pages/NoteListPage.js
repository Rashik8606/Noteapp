import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ListItem from '../compoents/ListItem';

const NoteListPage = () => {
    const [notes, setNotes] = useState([]);

    useEffect (() => {
        axios.get('http://127.0.0.1:8000/api/notes/')
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
        {notes.map((note) => (
          <li key={note.id}>
            <ListItem note={note} />
          </li>
        ))}
      </ul>
   
    </div>
  )
}

export default NoteListPage
