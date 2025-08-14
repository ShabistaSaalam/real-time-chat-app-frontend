import React, { useContext } from 'react'
import { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import assets from '../assets/assets'
import { AuthContext } from '../../context/AuthContext'
const ProfilePage = () => {
  const {authUser,updateProfile }=useContext(AuthContext)
  const [selectedImage, setSelectedImage] = useState(null)
  const [name, setName] = useState(authUser.fullname)
  const [bio, setBio] = useState(authUser.bio)
  const navigate = useNavigate();
  const handleSubmit=async(e)=>{
    e.preventDefault()
    if(!selectedImage){
      await updateProfile({fullname:name,bio})
      navigate('/')
      return;
    }
    const reader=new FileReader()
    reader.readAsDataURL(selectedImage)
    reader.onload=async ()=>{
      const base64Image=reader.result
      await updateProfile({profilePic:base64Image,fullname:name,bio})
      navigate('/')
    }
  }
  return (
    <div className='min-h-screen bg-cover bg-no-repeat flex items-center justify-center'>
      <div className='w-5/6 max-w-2xl backdrop-blur-2xl text-gray-300 border-2 border-gray-600 flex items-center justify-between max-sm:flex-col-reverse rounded-lg'>
        <form onSubmit={handleSubmit} className='flex flex-col gap-5 p-10 flex-1'>
          <h3 className='text-lg'>Profile details</h3>
          <label htmlFor='avatar' className='flex items-center gap-3 cursor-pointer'>
            <input onChange={(event) => setSelectedImage(event.target.files[0])} type='file' id='avatar' accept='.png, .jpg, .jpeg' hidden />
            <img src={selectedImage ? URL.createObjectURL(selectedImage) : assets.avatar_icon} alt='' className={`w-12 h-12 ${selectedImage && 'rounded-full'}`} />
            Upload Profile Image
          </label>
          <input onChange={(e) => setName(e.target.value)} value={name} type='text' className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500' placeholder='Full name' required />
          <textarea onChange={(e) => setBio(e.target.value)} value={bio} rows={4} className='p-2 border min-w-[280px] border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500' placeholder='Write Profile Bio' required></textarea>
          <button type='submit' className=' transform  bg-gradient-to-r from-purple-400 to-violet-600 text-white border-none text-sm font-light py-2  rounded-full cursor-pointer'>
            Save
          </button>
        </form>
        <img src={ authUser?.profilePic ||assets.logo_icon} alt='' className={`max-w-44 aspect-square rounded-full mx-10 max-sm:mt-10 ${selectedImage && 'rounded-full'}`}/>
      </div>
    </div>
  )
}

export default ProfilePage