import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

const deleteLocationAPI = async (id: number) => {
  const response = await axios.delete(`/api/v1/locations/${id}`)
  return response.data
}

const useDeleteLocation = () => {
  return useMutation({
    mutationFn: deleteLocationAPI,
    onSuccess: () => {
      
      console.log('Location deleted')
    },
    onError: (error) => {
      console.error('Error deleting location:', error)
    },
  })
}

export default useDeleteLocation
