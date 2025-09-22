import React, { useState } from 'react';
import './Main.css';
import { assets } from '../../assets/assets';
import { toPng } from 'html-to-image';
import download from 'downloadjs';

const Main = () => {
  const [name, setName] = useState('');
  const [image, setImage] = useState(null);

  const handleNameChange = (e) => setName(e.target.value);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dpImage = document.getElementById('dp-image');

    if (!dpImage) {
      console.error('Element with id "dp-image" not found.');
      return;
    }

    try {
      const dataUrl = await toPng(dpImage);
      download(dataUrl, 'conference-dp.png');
    } catch (err) {
      console.error('Error generating image:', err);
      alert('There was an issue generating the image. Please try again.');
    }
  };

  const isFormValid = name && image;

  return (
    <div className="main flex flex-col items-center justify-center">
      {/* Banner */}
      <div className="ikeji-banner w-full flex justify-center">
        <img
          src={assets.pastor_conf_banner}
          alt="Ikeji Banner"
          className="max-w-full h-auto"
        />
      </div>

      {/* DP Generator Card */}
      <div className="main-container card p-6 mt-6 w-full max-w-2xl">
        <div className="pb-4">
          <p className="text-center font-semibold">
            Generate your own Conference Display Picture
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col items-center">
  <div className="relative w-full" id="dp-image">
    {/* Background Template */}
    <img
      src={assets.pastor_conf_dp}
      alt="Conference Background"
      className="card-img w-full max-w-[800px] h-auto"
    />

    {/* User Uploaded Image */}
    {image && (
      <img
        src={image}
        alt="Selected"
        className="
          absolute 
          top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
          rounded-full object-cover
          border-4 border-white shadow-lg

          w-[180px] h-[180px]     /* default: small devices */
          sm:w-[200px] sm:h-[200px]  /* small tablets */
          md:w-[220px] md:h-[220px]  /* tablets */
          lg:w-[240px] lg:h-[240px]  /* laptops */
          xl:w-[280px] xl:h-[280px]  /* large desktops */
        "
      />
    )}

    {/* User Name */}
    {name && (
      <p
        className="absolute bottom-[3rem] left-1/2 -translate-x-1/2 
                   font-bold text-1xl md:text-2xl lg:text-3xl text-white drop-shadow"
      >
        {name}
      </p>
    )}
  </div>

  {/* Input Section */}
  <div className="py-6 flex flex-col gap-4 w-full">
    <p className="font-bold text-lg">Create your entry below</p>

    {/* Name Input */}
    <div className="flex flex-col gap-2">
      <label htmlFor="ikeji-name" className="text-left font-medium">
        Your Name:
      </label>
      <input
        type="text"
        id="ikeji-name"
        value={name}
        onChange={handleNameChange}
        className="outline-none border p-2 text-sm rounded-md w-full"
      />
    </div>

    {/* Image Upload */}
    <div className="flex flex-col gap-2">
      <label className="text-left font-medium">Upload Image:</label>
      <label
        htmlFor="ikeji-image"
        className="border p-2 text-sm rounded-md flex justify-center items-center cursor-pointer"
      >
        <div className="text-xl px-2 rounded-full border inline-block">+</div>
      </label>
      <input
        type="file"
        id="ikeji-image"
        accept="image/*"
        onChange={handleImageChange}
        className="hidden"
      />
    </div>

    {/* Download Button */}
    <button
      type="submit"
      className={`bg-[#0046CA] text-white rounded-3xl px-4 py-2 block mx-auto w-56 mt-4 transition-all ${
        !isFormValid ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
      }`}
      disabled={!isFormValid}
    >
      Download
    </button>
  </div>
</form>

      </div>
    </div>
  );
};

export default Main;
