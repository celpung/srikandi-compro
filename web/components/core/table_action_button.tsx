import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

interface tableActionButtonProps {
  id: number;
}

export default function TableActionButton({id}:tableActionButtonProps) {
  return (
    <div className="flex gap-2">
        <div
          className="bg-green-500 p-1 rounded text-center flex items-center justify-center text-white"
          onClick={() => alert(id)}
        >
          <span>
            <FontAwesomeIcon icon={faEdit} /> Edit
          </span>
        </div>
        <div
          className="bg-red-500 p-1 rounded text-center flex items-center justify-center text-white"
          onClick={() => alert(id)}
        >
          <span>
            <FontAwesomeIcon icon={faTrash} /> Hapus
          </span>
        </div>
      </div>
  )
}
