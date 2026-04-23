'use client';

import ImageIcon from '@/assets/images/icon-upload-image.svg';
import { useUser } from '@/context/AuthContext';
import { getSupabaseBrowserClient } from '@/lib/supabase/browser-client';
import { updateUserProfile } from '@/lib/utils/imageUpload';
import { UserType } from '@/types/user';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import LoadingSpinner from '../LoadingSpinner';

const MAX_SIZE = 2 * 1024 * 1024;
const MAX_DIMENSION = 1024;

function Profile() {
  const { user, refreshUser } = useUser();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const supabase = getSupabaseBrowserClient();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const file = e.target.files[0];

    if (file.size > MAX_SIZE) {
      toast.error('File too large.');
      return;
    }

    if (!['image/png', 'image/jpeg', 'image/webp'].includes(file.type)) {
      toast.error('Invalid file type.');
      return;
    }

    const img = new Image();
    const objectUrl = URL.createObjectURL(file);

    img.onload = () => {
      const { width, height } = img;

      if (width > MAX_DIMENSION || height > MAX_DIMENSION) {
        toast.error('Image must be 1024x1024 or smaller.');
        URL.revokeObjectURL(objectUrl);
        return;
      }

      setImage(objectUrl);
      setSelectedFile(file);
    };

    img.onerror = () => {
      toast.error('Failed to load image.');
      URL.revokeObjectURL(objectUrl);
    };

    img.src = objectUrl;
  };

  const handleSave = async () => {
    if (!user) return;
    setError(false);

    if (!username || !email) {
      setError(true);
      return;
    }

    const updatedUser: UserType = {
      id: user.id,
      email,
      user_metadata: {
        first_name: firstName,
        last_name: lastName,
        username,
      },
    };

    setLoading(true);

    try {
      await updateUserProfile(user, supabase, updatedUser, selectedFile);
      await refreshUser();
      toast.success('Profile updated!');
    } catch (error) {
      console.log(error);
      toast.error('Profile update failed.');
      setError(true);
    } finally {
      setLoading(false);
      setError(false);
    }
  };

  useEffect(() => {
    if (!user) return;

    if (user.user_metadata?.first_name)
      setFirstName(user.user_metadata?.first_name);
    if (user.user_metadata?.last_name)
      setLastName(user.user_metadata.last_name);
    if (user.user_metadata?.username) setUsername(user.user_metadata.username);
    if (user.email) setEmail(user.email);
    if (user.user_metadata?.avatar_url) setImage(user.user_metadata.avatar_url);
  }, [user]);

  return (
    <div className="w-full max-w-202 mx-auto md:max-h-222 lg:mx-0 bg-white pt-6 pb-0 md:pt-10 rounded-xl">
      <input
        id="image-input"
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="hidden"
      />

      <div className="w-full px-6 md:px-10">
        <h1 className="text-preset-2 md:text-preset-1 text-grey-900 text-left">
          Profile Details
        </h1>
        <p className="text-preset-3 text-grey-500 mt-2">
          Add your details to create a personal touch to your profile.
        </p>

        <div className="w-full rounded-xl bg-grey-50 p-6 mt-10 md:flex md:flex-row md:items-center md:justify-between">
          <p className="text-preset-3 text-grey-500 md:text-left">
            Profile picture
          </p>
          <div className="md:flex md:flex-row md:items-center">
            <div className="relative flex flex-col justify-center items-center w-37.5 h-37.5 bg-grey-100 rounded-xl mt-4 md:mt-0 md:ml-4">
              <ImageIcon
                className={`w-10 h-10 text-purple-600 ${image && 'hidden'}`}
              />
              <p
                className={`text-preset-3-semi text-purple-600 mt-2 ${
                  image && 'hidden'
                }`}
              >
                + Upload Image
              </p>

              {image && (
                <img
                  src={image}
                  alt="Profile picture"
                  className="absolute top-0 left-0 bg-transparent w-37.5 h-37.5 z-5 rounded-lg object-cover"
                />
              )}

              <button
                onClick={() => {
                  const imageInput = document?.getElementById('image-input');
                  if (!imageInput) return;
                  imageInput.click();
                }}
                className={`absolute top-0 left-0 opacity-0 ${
                  image && 'hover:opacity-100'
                } flex flex-col justify-center items-center w-37.5 h-37.5 z-10 rounded-lg cursor-pointer`}
                style={{
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                }}
              >
                <ImageIcon
                  className={`w-10 h-10 text-white ${!image && 'hidden'}`}
                />
                <p
                  className={`text-preset-3-semi text-white mt-2 ${
                    !image && 'hidden'
                  }`}
                >
                  Change Image
                </p>
              </button>
            </div>
            <p className="text-preset-4 text-grey-500 mt-6 md:mt-0 md:ml-6 md:max-w-30 lg:max-w-51.75 text-wrap">
              Image must be below 1024x1024px. Use PNG or JPG format.
            </p>
          </div>
        </div>

        <div className="w-full rounded-xl bg-grey-50 p-6 mt-10">
          <div className="md:flex md:flex-row md:justify-between md:items-center w-full">
            <label
              htmlFor="first-name"
              className="text-preset-4 md:text-preset-3 text-grey-900"
            >
              First name*
            </label>
            <input
              name="first-name"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="e.g. John"
              className="w-full md:max-w-84.25 xl:max-w-106 p-4 rounded-lg border border-grey-200 bg-white text-preset-3 text-grey-900 mt-2 outline-none"
            />
          </div>

          <div className="md:flex md:flex-row md:justify-between md:items-center w-full mt-2 md:mt-4">
            <label
              htmlFor="last-name"
              className="text-preset-4 md:text-preset-3 text-grey-900"
            >
              Last name*
            </label>
            <input
              name="last-name"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="e.g. Appleseed"
              className="w-full md:max-w-84.25 xl:max-w-106 p-4 rounded-lg border border-grey-200 bg-white text-preset-3 text-grey-900 mt-2 outline-none"
            />
          </div>

          <div className="md:flex md:flex-row md:justify-between md:items-center w-full mt-2 md:mt-4">
            <label
              htmlFor="username"
              className="text-preset-4 md:text-preset-3 text-grey-900"
            >
              Username*
            </label>
            <input
              name="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="e.g. jappleseed123"
              className={`w-full md:max-w-84.25 xl:max-w-106 p-4 rounded-lg border border-grey-200 bg-white text-preset-3 text-grey-900 mt-2 outline-none ${
                error && !username && 'border-red-500'
              }`}
            />
          </div>

          <div className="md:flex md:flex-row md:justify-between md:items-center w-full mt-2 md:mt-4">
            <label
              htmlFor="last-name"
              className="text-preset-4 md:text-preset-3 text-grey-900"
            >
              Email*
            </label>
            <input
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. email@example.com"
              className={`w-full md:max-w-84.25 xl:max-w-106 p-4 rounded-lg border border-grey-200 bg-white text-preset-3 text-grey-900 mt-2 outline-none ${
                error && !email && 'border-red-500'
              }`}
            />
          </div>
        </div>
      </div>

      <div className="h-px w-full bg-grey-200 mt-10"></div>

      <div className="flex w-full py-6 px-10">
        <button
          className={`cursor-pointer text-preset-3-semi text-white py-4 px-6 rounded-lg w-full md:w-max md:ml-auto hover:opacity-90 ${
            loading ? 'bg-purple-300' : 'bg-purple-600'
          }`}
          disabled={loading}
          onClick={handleSave}
        >
          {loading ? <LoadingSpinner /> : 'Save'}
        </button>
      </div>
    </div>
  );
}

export default Profile;
