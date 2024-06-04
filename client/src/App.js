import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Import your CSS file
import Navbar from './navbar';

const App = () => {
  const [inputText, setInputText] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    document.title = "HaashPhotoGen"
  }, [])

  const handleSubmit = async (e) => {
    setError(null);
    e.preventDefault();
    try {
      const res = await axios.post('https://photo-generator-haash-photo-gen.vercel.app/chatbot', { text: inputText });
      setImageUrl(res.data);
    } catch (err) {
      setError('Network Error: Could not reach the server.');
      console.error(err);
    }
  };

  return (
    <div>
      <Navbar />

      <div className="container">
        <form className="form" onSubmit={handleSubmit}>
          <input 
            className="input"
            type="text" 
            value={inputText} 
            onChange={(e) => setInputText(e.target.value)} 
            placeholder="type to generate a photo..."
          />
          <button className="button" type="submit">Submit</button>
        </form>

        {imageUrl && <img className="image" src={imageUrl} alt="Image" />}
        {error && <p className="error">{error}</p>}
        
      </div>
    </div>
  );
};

export default App;
