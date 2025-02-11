import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const NotePage = () => {
  let { id } = useParams();
  let [note, setNote] = useState(null);
  let [error, setError] = useState(null);
  let [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    let getNote = async () => {
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

  let updateNote = async () => {
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


  

  return (
    <div className="note">
      <div>
        <Link to={"/"}>
          <h2> Back </h2>
        </Link>
      </div>

      {error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : note ? (
        <>
          <textarea
            value={note?.body || ''}
            onChange={(e) => setNote({ ...note, body: e.target.value })}
          ></textarea>
          <button onClick={updateNote} disabled={isSaving}>
            {isSaving ? "Saving..." : "Save"}
          </button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default NotePage;
