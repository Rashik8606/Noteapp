import React from 'react'
import { Link } from 'react-router-dom'


const ListItem = ({note}) => {
  console.log(note);
  return (
    <Link to={`/note/${note.id}`}>
        <h3>{note.body}</h3>
    </Link>
  )
}

export default ListItem
