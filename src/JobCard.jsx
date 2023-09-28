import React from 'react';
import './styles/FindJobPage.css';

const JobCard = ({ job, onExpand, onDelete }) => {
    const handleDeleteClick = () => {
      onDelete(job.id); 
    };
  
    return (
      <div className="job-card">
        <h3>{job.title}</h3>
        <p>{job.description}</p>
        <p>Skills: {job.skills}</p>
        <img src={job.imageURL} alt={job.title} />
        <button onClick={onExpand}>Expand</button>
        <button onClick={handleDeleteClick}>Delete</button>
      </div>
    );
  };

export default JobCard;