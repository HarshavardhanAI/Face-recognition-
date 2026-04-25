import React, { useEffect, useState } from 'react'
import { getDatabase, deletePerson } from '../../api'
import Spinner from '../Utility/Spinner'
import toast from 'react-hot-toast';
import { MdDeleteOutline } from 'react-icons/md';

const Database = () => {
  const [persons, setPersons] = useState([])
  const [loading, setLoading] = useState(true)
  const [deletingName, setDeletingName] = useState(null)
  useEffect(() => {
    getDatabase()                              
      .then(data => {
        setPersons(Array.isArray(data?.data) ? data.data : [])
        setLoading(false)
      })
      .catch(() => {
        toast.error("Failed to load database.")
        setLoading(false)
      })
  }, [])
  const handleDelete = async (name) => {
    if (!window.confirm(`Delete ${name}?`)) return
    setDeletingName(name)
    try {
      const data = await deletePerson(name)          // ← just pass name
      if (data.status === 'success') {
        toast.success(`${name} deleted successfully`)
        setPersons(prev => prev.filter(p => p.name !== name))
      } else {
        toast.error("Failed to delete. Try again.")
      }
    } catch (err) {
      toast.error("Server error. Please try again.")
    } finally {
      setDeletingName(null)
    }
  }
  if (loading) {
    return (<div className='h-full w-full flex flex-col items-center justify-center gap-4 bg-[#0d1117]'>
    <Spinner />
    <p className='text-[#8b949e]'>Loading database...</p>
    </div>)
  }
  if (persons.length === 0) return (
    <div className='h-full w-full flex items-center justify-center bg-[#0d1117]'>
      <p className='text-[#8b949e] text-lg'>No persons in database yet.</p>
    </div>
  )


  return (
    <div className='h-full w-full flex flex-col items-center gap-10 px-10 py-10 bg-[#0d1117] overflow-y-auto'>
      <h1 className='text-3xl font-bold text-[#e6edf3]'>
        Database
        <span className='ml-3 text-sm font-normal text-[#8b949e]'>
          {persons.length} {persons.length === 1 ? 'person' : 'persons'}
        </span>
      </h1>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 w-full'>
        {persons.map((person, index) => (
          <div
            key={person._id || `${person.name}-${index}`}
            className='flex flex-col items-center bg-[#161b22] border border-[#30363d] rounded-lg p-4 gap-3'
          >
            <img
              src={person.image_url}
              alt={person.name}
              className='w-full h-60 rounded-md object-cover'
              style={{ imageOrientation: 'from-image' }}
            />
            <h2 className='text-xl font-semibold text-[#e6edf3] capitalize'>
              {person.name}
            </h2>
            <button
              onClick={() => handleDelete(person.name)}
              disabled={deletingName === person.name}
              className='w-full py-1.5 rounded-md text-sm text-red-400 border border-red-400/40 hover:bg-red-400/10 disabled:opacity-40 disabled:cursor-not-allowed transition-colors'
            >
              {deletingName === person.name ? "Deleting..." : "Delete"}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
    
}

export default Database
