import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ListItem from '../compoents/ListItem';
import AddButton from './AddButton';

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
     const getSummary = (body)=> {
      return body.length > 20 ? `${body.slice(0, 50)}...` : body;
     }
     

  return (
    <div className='notes'>
      <div className='notes-header'>
        <h2 className='notes-title'>&#9782; Notes</h2>
        <p className='notes-count'>{notes.length}</p>
      </div>
       <ul>
        {notes.map((note) => (
          <p key={note.id}>
            <ListItem note={{ ...note, body: getSummary(note.body) }} />
          </p>
        ))}
      </ul>
        <AddButton />
        <h1>Git</h1>
    </div>
  )
}

export default NoteListPage
