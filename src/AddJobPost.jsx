import React, { useState } from 'react';
import { uploadImageToStorage, saveJobPostingToFirestore } from './utils/firebase';
import '../src/styles/AddJobPost.css';

const AddJobPost = () => {
  const [jobData, setJobData] = useState({
    jobType: '', 
    title: '',
    description: '',
    skills: '',
    projectLength: '',
    paymentMin: '',
    paymentMax: '',
    workingHours: '',
    experience: '', 
    image: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setJobData({ ...jobData, [name]: value });
  };

  const handleImageUpload = (e) => {
    const imageFile = e.target.files[0];
    setJobData({ ...jobData, image: imageFile });
  };

  const handleSubmit = async () => {
    if (!jobData.image) {

      alert('Please select an image.');
      return;
    }

    try {
      const imageURL = await uploadImageToStorage(jobData.image);

      const firestoreData = {
        title: jobData.title,
        description: jobData.description,
        skills: jobData.skills,
        imageURL: imageURL,
      };

      if (jobData.jobType === 'freelance') {
        firestoreData.projectLength = jobData.projectLength;
        firestoreData.paymentMin = jobData.paymentMin;
        firestoreData.paymentMax = jobData.paymentMax;
        firestoreData.workingHours = jobData.workingHours;
      } 
      else if (jobData.jobType === 'employment') {
        firestoreData.projectLength = jobData.projectLength;
        firestoreData.paymentMin = jobData.paymentMin;
        firestoreData.paymentMax = jobData.paymentMax;
        firestoreData.workingHours = jobData.workingHours;
        firestoreData.experience = jobData.experience;
      }

      await saveJobPostingToFirestore(firestoreData);

      setJobData({
        jobType: '',
        title: '',
        description: '',
        skills: '',
        projectLength: '',
        paymentMin: '',
        paymentMax: '',
        workingHours: '',
        experience: '',
        image: null,
      });
    } catch (error) {
      console.error('Error adding job post:', error);
    }
  };

  return (
    <div>
      <form className="job-form">
        <h2>New Job</h2>
        <div className="form-group">
          <label htmlFor="jobType">Choose Job Type:</label>
          <select className="form-control" id="jobType" name="jobType" value={jobData.jobType} onChange={handleInputChange}>
            <option value="">Select Job Type</option>
            <option value="freelance">Freelance</option>
            <option value="employment">Employment</option>
          </select>
        </div>

        <h2>Describe your Job</h2>
        <div className="form-group">
          <label htmlFor="title">Title/Position:</label>
          <input className="form-control" type="text" id="title" name="title" value={jobData.title} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label htmlFor="description">Job Description:</label>
          <textarea className="form-control" id="description" name="description" value={jobData.description} onChange={handleInputChange}></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="skills">Skills:</label>
          <input className="form-control" type="text" id="skills" name="skills" value={jobData.skills} onChange={handleInputChange} />
        </div>

        <h2>Project Conditions</h2>
        <div className="form-group">
          <label htmlFor="projectLength">Project Length:</label>
          <input className="form-control" type="text" id="projectLength" name="projectLength" value={jobData.projectLength} onChange={handleInputChange} />
        </div>

        <div className="form-group">
          <label htmlFor="paymentMin">Payment Min:</label>
          <input className="form-control" type="text" id="paymentMin" name="paymentMin" value={jobData.paymentMin} onChange={handleInputChange} />
        </div>

        <div className="form-group">
          <label htmlFor="paymentMax">Payment Max:</label>
          <input className="form-control" type="text" id="paymentMax" name="paymentMax" value={jobData.paymentMax} onChange={handleInputChange} />
        </div>

        <div className="form-group">
          <label htmlFor="workingHours">Working Hours:</label>
          <input className="form-control" type="text" id="workingHours" name="workingHours" value={jobData.workingHours} onChange={handleInputChange} />
        </div>

        {jobData.jobType === 'employment' && (
          <div className="form-group">
            <label htmlFor="experience">Experienced in (for at least):</label>
            <input className="form-control" type="text" id="experience" name="experience" value={jobData.experience} onChange={handleInputChange} />
          </div>
        )}

        <div className="form-group">
          <label htmlFor="image">Image:</label>
          <input className="form-control" type="file" id="image" name="image" accept="image/*" onChange={handleImageUpload} />
        </div>

        <button className="btn btn-primary" type="button" onClick={handleSubmit}>Post</button>
      </form>
    </div>
  );
};

export default AddJobPost;