import React, { useState } from 'react'
import { MdOutlineFileUpload, MdDeleteOutline} from "react-icons/md";
import { GiFireworkRocket } from "react-icons/gi";
import Analysing from './Analysing';
import ImagePreview from './ImagePreview';
import Results from './Results';
import { analyseImage } from '../../api';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const [isAnalysing, setIsAnalysing] = useState(false);
  const[viewResults, setViewResults] = useState(false);
  let [result,setResult] = useState(null);


  const handleAnalyse = async(image) => {
    setIsAnalysing(true);
    try{
      const data = await analyseImage(image);
      setResult(data);
      setViewResults(true);
    } catch (error) {
      toast.error('server error,Please try again.');
    } finally {
      setIsAnalysing(false);
    }
  };

  return (
    <div className='flex flex-col min-h-screen items-center px-10 gap-10 bg-[#0d1117] overflow-y-auto pb-10'>
      <div className='flex justify-start w-full '>
        <h1 className= ' text-3xl font-bold mt-20 text-[#e6edf3]'>Face Recognition Dashboard</h1>
      </div>
      <div className='justify-start w-full'>
        <p className='text-[#c9d1d9] text-lg'>Welcome to the Face Recognition Dashboard! This application allows you to manage and analyze facial recognition data efficiently. You can add new images, view your database of recognized faces, and learn more about how our face recognition technology works.</p>

      </div>

      {/* Upload Section */}
      {viewResults ? <Results data={result} /> : (  
        isAnalysing ? (<Analysing />): <ImagePreview handleAnalyse={handleAnalyse} setIsAnalysing={setIsAnalysing} />)
      }
    </div>
  )
}

export default Dashboard
