import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRef } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { app } from '../firebase';

export default function Profile() {

const {currentUser} = useSelector((state) => state.user);
const fileRef = useRef(null);
const [file, setFile] = useState(undefined);
const [filePercentage, setFilePercentage] = useState(0);
const [fileUploadError, setFileUploadError] = useState(false);
const [formData, setFormData] = useState({});




//why are we using firebase storage for the profile image upload?
//Firebase storage is a cloud-based storage solution that allows us to store and retrieve files such as images, videos, and documents.
//It is a scalable and secure way to store user-generated content.
//It is a good choice for storing profile images because it is easy to use and has a good performance.

//When a user uploads a new profile picture, the app will upload that image directly to firebase storage.
//after the upload is complete. firebase storage will return a url to the image
//the application then puts this url and saves it as a string in the avatar field of the users document in the MongoDB database
//When the profile.jsx page is loaded, the app will fetch the currentUser object from the redux store. The currentUser.avatar field will contain the url to the image stored in firebase

//firebase storage rules:

// allow read;
//       allow write: if request.resource.size <2 * 1024 * 1024 &&
//       request.resource.contentType.matches('images/.*')

useEffect(()=>{
  if(file){
    uploadFile(file);
  }
},[file]);

const uploadFile = async (file)=>{
    const storage = getStorage(app); // this is our connection to firebase storage    
    const filename = new Date().getTime() + file.name; // this is the name of the file in firebase storage, makes sure every file has a unique name
    const storageRef = ref(storage, filename); // this is the reference (pointer) to the file, the exact place in the cloud in firebase storage where the file will go
    const uploadTask = uploadBytesResumable(storageRef, file); // this is the upload task, represents the upload process, think of it as a job
    uploadTask.on('state_changed', (snapshot)=>{ // this is the event listener for the upload task, it will be called whenever the state of the upload task changes
      //.on is a method that allows us to listen to the state of the upload task, you give it three functions
      //1. Progress function (runs as the file uploads)
      //2. Error function (runs if there is an error)
      //3. Completion function (runs when the upload is complete)

      //snapshot is an object that tells you the current state of the upload task.
      //it has the following properties:
      //bytesTransferred: the number of bytes that have been uploaded
      //totalBytes: the total number of bytes that need to be uploaded
      //state: the current state of the upload task
      //progress: the progress of the upload task, it is a percentage

      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100; // this is the progress of the upload task, it is a percentage
      setFilePercentage(Math.round(progress)); // this is the progress of the upload task, it is a percentage
      //the progress function is called as the file uploads, it will be called multiple times as the file uploads
      //the progress function will be called with a snapshot object, which contains the following properties:
      //bytesTransferred: the number of bytes that have been uploaded
      //totalBytes: the total number of bytes that need to be uploaded
      //state: the current state of the upload task
    }, (error)=>{ 
      setFileUploadError(true);
    }, ()=>{
      getDownloadURL(storageRef).then((downloadURL)=>{
        setFormData({...formData, avatar: downloadURL}); // this is the download URL of the file, it is the url of the file in firebase storage
        //we are setting the formData state to the new formData object, which contains the new avatar url
        //we are using the spread operator to copy the existing formData object and then adding the new avatar url to it
        //this is a good way to update the state of the formData object, because it is a new object and not a reference to the old object
      });
    });
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <input type="file" onChange={(e)=>setFile(e.target.files[0])} ref={fileRef} hidden accept='image/*'/>
        <div className="flex flex-col items-center">
          <img
            className="h-28 w-28 rounded-full object-cover border-4 border-indigo-600 shadow-md"
            src={formData.avatar || currentUser.avatar}
            alt="Profile"
            onClick={()=>fileRef.current.click()}
          />
          {fileUploadError ? <p className='text-red-500'>Error uploading file</p> : filePercentage > 0 && filePercentage < 100 ? <p>{`Uploading ${filePercentage}%`}</p> : filePercentage === 100 ? <p className='text-green-500'>Upload Complete</p> : null}
          <h2 className="mt-4 text-3xl font-extrabold text-gray-900">Profile Settings</h2>
          <p className="mt-2 text-sm text-gray-600">
            Manage your account information
          </p>
        </div>

        {/* Card */}
        <div className="bg-white shadow-lg rounded-lg p-8 space-y-8">
          {/* Form */}
          <form className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                placeholder="yourusername"
                className="mt-2 block w-full px-4 py-3 text-base rounded-md border-gray-300 shadow-sm focus:border-indigo-600 focus:ring-indigo-600"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                className="mt-2 block w-full px-4 py-3 text-base rounded-md border-gray-300 shadow-sm focus:border-indigo-600 focus:ring-indigo-600"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                className="mt-2 block w-full px-4 py-3 text-base rounded-md border-gray-300 shadow-sm focus:border-indigo-600 focus:ring-indigo-600"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
              >
                Save Changes
              </button>
            </div>
          </form>

          {/* Divider */}
          <div className="border-t border-gray-200"></div>

          {/* Additional actions */}
          <div className="space-y-4">
            <button
              type="button"
              className="w-full inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none"
            >
              Delete Account
            </button>

            <button
              type="button"
              className="w-full inline-flex justify-center items-center px-6 py-3 border border-indigo-600 text-base font-medium rounded-md shadow-sm text-indigo-600 bg-white hover:bg-indigo-50 focus:outline-none"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
