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
  return (
    <div className='notes'>
      <div className='notes-header'>
        <h2 className='notes-title'>&#9782; Notes</h2>
        <p className='notes-count'>{notes.length}</p>
      </div>
       <ul>
        {notes.map((note) => (
          <p key={note.id}>
            <ListItem note={note} />
          </p>
        ))}
      </ul>
        <AddButton/>
    </div>
  )
}

export default NoteListPage
