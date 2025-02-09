import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const NotePage = () => {
  let { id } = useParams();
  let [note, setNote] = useState(null);
  let [error, setError] = useState(null);

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

  return (
    <div className='note'>
      <div>
        <Link to={"/"}>
          <h2> Back </h2>
        </Link>
      </div>
      
      {error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : note ? (
        <textarea defaultValue={note?.body}></textarea>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default NotePage;
