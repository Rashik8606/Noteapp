import React from 'react'
import { Link } from 'react-router-dom'
import { ReactComponent as AddIcon } from '../asset/add.svg';

function AddButton() {
  return (
    <Link to={'/note/new'} className='floating-button'>
        <AddIcon/>
    </Link>
  )
}

export default AddButton