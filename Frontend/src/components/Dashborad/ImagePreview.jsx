import React, { useState } from 'react'
import { MdOutlineFileUpload, MdDeleteOutline} from "react-icons/md";
import { GiFireworkRocket } from "react-icons/gi";

const ImagePreview = ({ handleAnalyse, setIsAnalysing }) => {
    const [image, setImage] = useState(null);
    const [imageFile, setImageFile] = useState(null)
    const handleFileChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        setImageFile(file);
        setImage( URL.createObjectURL(file));
        setIsAnalysing(false);
      }
    };
    const handleRemove = () => {
      setImage(null)
      setImageFile(null)   // ← clear both
    }
    
  return (
  <>
  {image ? (
          <div className='justify-start flex w-full h-[40vh]'>
            <div className='relative gap-3  w-full rounded-md border-2 border-[#8b949e] text-white flex flex-col items-center justify-center p-5 bg-[#161b22]'>
              <h1 className='text-2xl font-bold mb-4 '>Image Uploaded</h1>
              <div className='w-full h-full flex items-center justify-center overflow-hidden'>
                <img src={image} alt="Uploaded" className='max-h-[25vh] w-auto object-contain rounded-md shadow-lg shadow-black/50' />
              </div>
              {/* editing options */}
              <div className='flex w-full justify-center p-2 gap-4'>
                <button className='flex gap-2 bg-[#58a6ff] hover:bg-[#58a6ff]/80 px-4 py-2 rounded-md' onClick={() => handleAnalyse(imageFile)}>
                  <GiFireworkRocket className='h-6 w-6 text-white'  />
                  Analyse Image
                </button>
  
                <button className='flex gap-2 bg-[#58a6ff] hover:bg-[#58a6ff]/80 px-4 py-2 rounded-md' onClick={handleRemove}>
                  <MdDeleteOutline className='h-6 w-6 text-white'  />
                  Remove Image
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className='justify-start flex w-full'>
            <label className='cursor-pointer h-[30vh] w-full rounded-md border-dashed border-2 border-[#8b949e] text-white flex flex-col gap-5 justify-center items-center hover:bg-[#161b22] transition-colors'>
                <input 
                  type="file" 
                  accept="image/*"
                  multiple={false} 
                  className="hidden" 
                  onChange={handleFileChange}
                />
                <MdOutlineFileUpload className="h-16 w-16 text-[#58a6ff]" /> 
                <h1 className="text-2xl font-medium">Upload an image</h1>
                <p className='text-[#8b949e]'>Click or drag and drop to start</p>
            </label>
          </div>
        )}
        </>
  )
}

export default ImagePreview