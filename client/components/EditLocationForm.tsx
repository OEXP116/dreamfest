import { useState, ChangeEvent, FormEvent } from 'react'
import useEditLocation from '../hooks/use-edit-location.ts'
import useDeleteLocation from '../hooks/use-delete-location.ts'  

interface Props {
  id: number
  name: string
  description: string
}

export default function EditLocationForm({ id, name, description }: Props) {
  const [formState, setFormState] = useState({
    name,
    description,
  })

  const updateLocation = useEditLocation()
  const deleteLocation = useDeleteLocation()  

  const handleChange = (
    evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = evt.currentTarget
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    updateLocation.mutate({ id, ...formState })
  }

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this location?')) {
      deleteLocation.mutate(id)  
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="form"
      aria-busy={updateLocation.isPending}
    >
      <label htmlFor="name">Location name</label>
      <input
        type="text"
        id="name"
        name="name"
        placeholder="Location name"
        value={formState.name}
        onChange={handleChange}
      />
      <label htmlFor="description">Description</label>
      <textarea
        id="description"
        rows={4}
        name="description"
        placeholder="Location description"
        onChange={handleChange}
        value={formState.description}
      />
      <div></div>
      <button disabled={updateLocation.isPending}>Update location</button>{' '}
      <div></div>


      <button type="button" onClick={handleDelete} disabled={deleteLocation.isPending}>
        Delete location
      </button>

      {updateLocation.isError && (
        <h3>{String(updateLocation.failureReason)}</h3>
      )}
      {updateLocation.isSuccess && <h3>Location updated!</h3>}
      {deleteLocation.isError && <h3>{String(deleteLocation.failureReason)}</h3>}
      {deleteLocation.isSuccess && <h3>Location deleted!</h3>}
    </form>
  )
}
