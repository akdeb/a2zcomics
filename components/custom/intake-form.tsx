"use client";

import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function ImageEditor() {
  const [prompt, setPrompt] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  
  // For card swipe animation
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 0, 200], [-15, 0, 15]);
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0]);

  // Generate preview URLs when files change
  useEffect(() => {
    // Revoke old URLs to prevent memory leaks
    previewUrls.forEach(url => URL.revokeObjectURL(url));
    
    // Create new preview URLs
    const newUrls = files.map(file => URL.createObjectURL(file));
    setPreviewUrls(newUrls);
    
    // Cleanup function to revoke URLs when component unmounts
    return () => {
      newUrls.forEach(url => URL.revokeObjectURL(url));
    };
  }, [files]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const formData = new FormData();
      formData.append('prompt', prompt);
      
      files.forEach(file => {
        formData.append('images', file);
      });
      
      const response = await fetch('/api/image-generation', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error('Failed to edit image');
      }
      
      const data = await response.json();
      setResult(data.imageUrl);
      
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle drag end
  const handleDragEnd = (_: any, info: any) => {
	if (info.offset.x > 100) {
	  console.log('Swiped right');
	  // You can add functionality here - like saving the image
	} else if (info.offset.x < -100) {
	  console.log('Swiped left');
	  // You can add functionality here - like discarding the image
	}
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2">Upload Images:</label>
          <input 
            type="file" 
            multiple
            accept="image/*"
            onChange={(e) => setFiles(Array.from(e.target.files || []))} 
            className="w-full"
            required
          />
        </div>
        
        {/* Display uploaded images */}
        {previewUrls.length > 0 && (
          <div className="mt-4">
            <h3 className="mb-2 text-lg font-medium">Uploaded Images:</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {previewUrls.map((url, index) => (
                <div key={index} className="relative h-40 border rounded overflow-hidden">
                  <Image
                    src={url}
                    alt={`Upload ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
        
        <div>
          <label className="block mb-2">Edit Prompt:</label>
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Create a lovely gift basket with these items"
            required
          />
        </div>
        
        <button 
          type="submit" 
          className="px-4 py-2 bg-blue-500 text-white rounded"
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Edit Images'}
        </button>
      </form>
      
      {/* Swipeable Result Card */}
      <AnimatePresence>
        {result && (
          <div className="mt-8 flex justify-center items-center p-4">
            <motion.div
              className="relative max-w-md w-full" 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {/* Swipe instructions */}
              <div className="text-center mb-2 text-sm text-gray-500">
                Swipe the card to see different angles
              </div>
              
              <motion.div
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={handleDragEnd}
                style={{ x, rotate, opacity }}
                whileTap={{ scale: 0.98 }}
                className="bg-white rounded-xl overflow-hidden shadow-2xl cursor-grab active:cursor-grabbing"
              >
                {/* Card content */}
                <div className="relative aspect-[3/4] w-full">
                  <Image 
                    src={result}
                    alt="Generated image" 
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                
                {/* Card info */}
                <div className="p-5 bg-white">
                  <h3 className="text-xl font-bold mb-2">
                    Your Creation
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-2">
                    {prompt}
                  </p>
                </div>
              </motion.div>
              
              {/* Help text */}
              <div className="text-center mt-4 text-sm text-gray-400">
                <span className="inline-block mr-4">
                  ← Swipe left to discard
                </span>
                <span className="inline-block">
                  Swipe right to save →
                </span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}