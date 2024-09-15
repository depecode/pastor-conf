import React, { useState } from 'react';
import './Main.css';
import { assets } from '../../assets/assets';
import { toPng } from 'html-to-image';
import download from 'downloadjs';

const Main = () => {
    const [name, setName] = useState('');
    const [image, setImage] = useState(null);

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setImage(imageUrl);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const dpImage = document.getElementById('dp-image');

        if (dpImage) {
            const imgElement = dpImage.querySelector('img');

            if (imgElement) {
                imgElement.onload = () => {
                    toPng(dpImage)
                        .then((dataUrl) => {
                            download(dataUrl, 'conference-dp.png');
                        })
                        .catch((err) => {
                            console.error('Error generating image:', err);
                            alert('There was an issue generating the image. Please try again.');
                        });
                };

                if (imgElement.complete) {
                    imgElement.onload();
                }
            } else {
                console.error('No image element found inside dp-image div.');
            }
        } else {
            console.error('Element with id "dp-image" not found.');
        }
    };

    const isFormValid = name && image;

    return (
        <div className='main'>
            <div className='ikeji-banner'>
                <img src={assets.pastor_conf_banner} alt="Ikeji Banner" />
            </div>
            <div className='main-container card p-6'>
                <div className='pb-4'>
                    <p className='text-center'>Generate your own Conference Display Picture</p>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className='relative' id='dp-image'>
                        <img src={assets.pastor_conf_dp} alt="Conference Background" className='card-img' />
                        {image && (
                            <img
                                src={image}
                                alt="Selected"
                                className='h-100 w-100 rounded-full ml-3.5 object-cover absolute top-1/2 -translate-y-4/5 left-1/2 -translate-x-1/2'
                            />
                        )}
                        {name && (
                            <p className='absolute bottom-[19rem] ml-4 left-1/2 -translate-x-1/2 font-bold text-2xl'>{name}</p>
                        )}
                    </div>
                    <div className='py-4 flex flex-col gap-4'>
                        <p className='font-bold'>Create your entry below</p>
                        <div className='flex flex-col gap-2'>
                            <label htmlFor="ikeji-name">Your Name:</label>
                            <input
                                type="text"
                                name="ikeji-name"
                                id='ikeji-name'
                                value={name}
                                onChange={handleNameChange}
                                className='outline-none border p-2 text-sm rounded-md'
                            />
                        </div>

                        <div className='flex flex-col gap-2'>
                            <label>Upload Image here:</label>
                            <label htmlFor="ikeji-image" className='border p-2 text-sm rounded-md flex justify-center items-center cursor-pointer'>
                                <div className='text-xl px-2 rounded-full border inline-block'>+</div>
                            </label>
                            <input
                                type="file"
                                name="ikeji-image"
                                id='ikeji-image'
                                accept="image/*"
                                onChange={handleImageChange}
                                className='hidden'
                            />
                        </div>

                        <button
                            type='submit'
                            className={`bg-[#0046CA] text-white rounded-3xl px-4 py-2 block mx-auto w-56 mt-4 ${!isFormValid ? 'opacity-50 cursor-not-allowed' : ''}`}
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
