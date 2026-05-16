import React, { useState, useEffect } from 'react';
import Section from './components/Section';
import BouncingWatermark from './components/BouncingWatermark';

// Dynamically get all images from the public/images directory
const imageFiles = import.meta.glob('/public/images/*.{jpg,jpeg,png,JPG,JPEG,PNG}');
// Convert the paths from '/public/images/IMG.jpg' to '/images/IMG.jpg' for correct public URL access
const allImages = Object.keys(imageFiles).map(path => path.replace('/public', ''));

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

  return (
    <div className="app-container">
      <BouncingWatermark />
      {sectionsWithImages.map((section) => (
        <Section
          key={section.id}
          title={section.title}
          content={section.content}
          images={section.images}
        />
      ))}
    </div>
  );
}

export default App;
