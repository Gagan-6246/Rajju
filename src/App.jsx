import React, { useState, useEffect } from 'react';
import Section from './components/Section';
import BouncingWatermark from './components/BouncingWatermark';

// Dynamically get all images from the public/images directory
const imageFiles = import.meta.glob('/public/images/*.{jpg,jpeg,png,JPG,JPEG,PNG}');
// Convert the paths to use the correct base URL for GitHub Pages
const basePath = import.meta.env.BASE_URL.replace(/\/$/, '');
const allImages = Object.keys(imageFiles).map(path => path.replace('/public', basePath));

// Helper function to shuffle an array
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const sectionsData = [
  {
    id: 1,
    title: "I'm Sorry My Kandhamma",
    content: [
      "I know I messed up, Naan beku antha yenu madilla kandha.",
      "You mean the world to me my bangaari, ninnug nov mado yochne nu irlilla ninge bejaar madteeni antha nu nanug arivirlilla kandha."
    ]
  },
  {
    id: 2,
    title: "My Promise Putti",
    content: [
      "I am truly sorry from the bottom of my heart putti.",
      "I promise inmele ahh tara agalla, ninna neat agi artha madkolteeni and ninge mattey e tara agdhero tara nodkolteeni."
    ]
  },
  {
    id: 3,
    title: "Forgive Me Princess?",
    content: [
      "Our love and the memories we share mean everything to me.",
      "Ninna nov madi bejaar madi nan kail irok agalla kaney papu, nanu perfect illa nanna kshamsu, naan ninna innu chennag nodkolteeni."
    ]
  }
];

function App() {
  const [sectionsWithImages, setSectionsWithImages] = useState([]);

  useEffect(() => {
    // When the app loads, create a unique shuffled list of images for each section
    const initializedSections = sectionsData.map(section => ({
      ...section,
      images: shuffleArray(allImages)
    }));
    setSectionsWithImages(initializedSections);
  }, []);

  // Find the specific final image
  const finalImage = allImages.find(img => img.includes('IMG_0464')) || `${basePath}/images/IMG_0464.JPG`;

  return (
    <div className="app-container">
      <BouncingWatermark />
      {sectionsWithImages.map((section) => (
        <Section 
          key={section.id}
          title={section.title}
          content={section.content}
          images={section.images}
          reverse={section.id === 2}
        />
      ))}
      
      {/* Final Static Section */}
      <div className="section-container">
        <div className="bg-slide" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
          <img src={finalImage} alt="I love you" className="bg-img" />
        </div>
        <div className="glass-card" style={{ zIndex: 10 }}>
          <h2 style={{ marginBottom: 0 }}>I Love You</h2>
        </div>
      </div>
    </div>
  );
}

export default App;
