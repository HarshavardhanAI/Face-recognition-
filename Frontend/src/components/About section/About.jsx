import React from 'react'

const About = () => {
  const frontend = {
    language: ['JavaScript'],
    framework: ['React', 'Vite'],
    cssFramework: ['Tailwind CSS'],
    libraries: ['React Router DOM', 'React Icons', 'React Hot Toast', 'React Spinners'],
  }

  const backend = {
    language: ['Python'],
    framework: ['Flask'],
    libraries: ['Flask CORS', 'OpenCV', 'TensorFlow', 'Keras', 'Facenet', 'Retina Face', 'SciPy', 'NumPy', 'Flask Limiter'],
    technology: ['Cloudinary', 'Pinecone', 'MongoDB'],
  }

  const CategoryBox = ({ title, items, color }) => (
    <div className={`bg-[#0d1117] rounded-lg p-4 sm:p-6 hover:shadow-lg transition-shadow duration-300 border-2 ${color}`}>
      <h3 className="text-lg sm:text-xl font-bold text-white uppercase tracking-wide mb-4 flex items-center">
        <span className="w-2 h-2 rounded-full mr-2"></span>
        {title}
      </h3>
      <ul className="space-y-3">
        {items.map((item, idx) => (
          <li key={idx} className="text-gray-200 text-base sm:text-lg flex items-start">
            <span className="text-gray-400 mr-3 mt-1">▸</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )

  return (
    <div className="min-h-screen bg-black py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-12 sm:mb-16">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">About</h1>
          <div className="w-12 h-1 bg-blue-500 rounded-full mb-6"></div>
          <p className="text-gray-300 text-base sm:text-lg leading-relaxed max-w-3xl">
            Smart Photo Organiser is an intelligent application that helps you organize and manage your photos using advanced AI.
            It uses face recognition and image analysis to automatically categorize and manage your photo collection efficiently.
          </p>
        </div>

        {/* Frontend Section */}
        <div className="mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">Frontend</h2>
          <p className="text-gray-400 mb-6 sm:mb-8 text-sm sm:text-base">User-facing interface and client-side technologies</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6">
            <CategoryBox title="Language" items={frontend.language} color="border-[#58a6ff]" />
            <CategoryBox title="Framework" items={frontend.framework} color="border-[#58a6ff]" />
            <CategoryBox title="CSS Framework" items={frontend.cssFramework} color="border-[#58a6ff]" />
            <CategoryBox title="Libraries" items={frontend.libraries} color="border-[#58a6ff]" />
          </div>
        </div>

        {/* Backend Section */}
        <div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">Backend</h2>
          <p className="text-gray-400 mb-6 sm:mb-8 text-sm sm:text-base">Server-side logic and API technologies</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6">
            <CategoryBox title="Language" items={backend.language} color="border-[#58a6ff]" />
            <CategoryBox title="Framework" items={backend.framework} color="border-[#58a6ff]" />
            <CategoryBox title="Libraries & AI/ML" items={backend.libraries} color="border-[#58a6ff]" />
            <CategoryBox title="Services & Database" items={backend.technology} color="border-[#58a6ff]" />
          </div>
        </div>

      </div>
    </div>
  )
}

export default About
