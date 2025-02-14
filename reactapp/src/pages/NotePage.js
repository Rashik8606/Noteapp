import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

const NotePage = () => {
  let { id } = useParams();
  let navigate = useNavigate();
  let [note, setNote] = useState({ body: '' }); // Initialize note with an empty body
  let [error, setError] = useState(null);
  let [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (id === 'new') return; 
    const getNote = async () => {
      try {
        console.log(`Fetching note from: http://127.0.0.1:8000/api/note/${id}/`);
        let response = await fetch(`http://127.0.0.1:8000/api/note/${id}/`);
        if (!response.ok) {
          if (response.status === 404) {
            setError(`Note with ID ${id} not found.`);
          } else {
            setError(`Failed to fetch note: ${response.status}`);
          }
          return;
        }
        let data = await response.json();
        setNote(data);
      } catch (err) {
        console.error("Error fetching the note:", err);
        setError("An unexpected error occurred while fetching the note.");
      }
    };

    getNote();
  }, [id]);

  const updateNote = async () => {
    if (id === 'new') return;
    setIsSaving(true);
    try {
      let response = await fetch(`http://127.0.0.1:8000/api/note/${id}/update`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(note),
      });
      if (!response.ok) {
        console.error(`Failed to update note: ${response.status}`);
      } else {
        console.log("Note updated successfully!");
      }
    } catch (err) {
      console.error("Error updating the note:", err);
    } finally {
      setIsSaving(false);
    }
  };

  const deleteNote = async () => {
    try {
      let response = await fetch(`http://127.0.0.1:8000/api/note/${id}/delete`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        console.log("Note deleted successfully!");
        navigate('/'); 
      } else {
        console.error(`Failed to delete note: ${response.status}`);
      }
    } catch (err) {
      console.error("Error deleting the note:", err);
    }
  };
  const createNote = async () => {
    if (!note.body.trim()){
      alert('Cannot Save an empty note !')
      return;
    }
    try {
      let response = await fetch (`http://127.0.0.1:8000/api/note/create`,{
        method : 'POST',
        headers :{
          'Content-Type': 'application/json',
        },
        body:JSON.stringify(note),
      })
      if (response.ok){
        console.log('Note created Successfully')
        navigate('/')
      } else {
        console.error('Falied to create note !')
      }
    }catch (err){
      console.log('error creating the note :',err)
    }
  };
  const handleSaveAndExit = () => {
    if (id !== 'new'){
      updateNote()
    } else {
      createNote()
    }
    navigate('/')
  }

  return (
    <div className="note">
      <div className="note-header">
           <h3>
            <Link to={'/'} onClick={updateNote}>Back</Link>
           </h3>
           {id !== 'new' ? (
             <button onClick={deleteNote}>Delete</button>
           ) : (
            <button onClick={createNote}>Done</button>
           )
          }
          
      </div>
      <textarea
            value={note.body}
            onChange={(e) => setNote({ ...note, body: e.target.value })}
          ></textarea>    
          
    </div>
  );
};

export default NotePage;
