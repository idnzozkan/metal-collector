import axios from './axios.config'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const moveByDirection = async direction => {
  try {
    await axios.get(`/robot/move/${direction}`)
  } catch (error) {
    if (error.response) {
      toast.error(error.response.data, {
        position: 'bottom-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'colored'
      })
    }

    console.log(error.response?.data || error)
  }
}

export const moveToTarget = async target => {
  try {
    await axios.post(`/robot/move/position`, target)
  } catch (error) {
    if (error.response) {
      toast.error(error.response.data, {
        position: 'bottom-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'colored'
      })
    }

    console.log(error.response?.data || error)
  }
}

export const scan = async () => {
  try {
    const res = await axios.get(`/robot/scan`)
    if (res.data) {
      if (res.data.length > 1) {
        toast.info(`${res.data.length} metals detected!`, {
          position: 'bottom-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: 'colored'
        })
      } else if (res.data.length === 1) {
        toast.info(`${res.data.length} metal detected!`, {
          position: 'bottom-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: 'colored'
        })
      } else {
        toast('No metal detected :(', {
          position: 'bottom-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: 'colored'
        })
      }
    }

    return res.data
  } catch (error) {
    console.log(error.response?.data || error)
  }
}

export const setToZero = async () => {
  try {
    await axios.post(`/robot/position`, { x: 0, y: 0 })
  } catch (error) {
    console.log(error.response?.data || error)
  }
}
