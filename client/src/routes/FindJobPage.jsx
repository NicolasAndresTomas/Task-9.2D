import React, { useState, useEffect } from 'react';
import { db } from '../utils/firebase';
import { deleteDoc, doc, getDocs, collection, query, where } from 'firebase/firestore';
import JobCard from '../JobCard';
import '../styles/FindJobPage.css';
import FooterTopComponent from '../footerTopComponent';
import FooterBottomComponent from '../footerBottomComponent';

const FindJobPage = () => {
  const [jobs, setJobs] = useState([]);
  const [filters, setFilters] = useState({ jobTitle: '' }); 
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      let jobQuery = collection(db, 'jobs');

      if (filters.jobTitle !== '') {
        jobQuery = query(jobQuery, where('title', '==', filters.jobTitle));
      }

      const querySnapshot = await getDocs(jobQuery);
      const jobList = [];
      querySnapshot.forEach((doc) => {
        jobList.push({ id: doc.id, ...doc.data() });
      });
      setJobs(jobList);
    };

    fetchJobs();
  }, [filters]);

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };
  
  const handleDeleteJob = async (jobId) => {
    try {
      const jobRef = doc(db, 'jobs', jobId);
      await deleteDoc(jobRef);

      setJobs((prevJobs) => prevJobs.filter((job) => job.id !== jobId));
    } catch (error) {
      console.error('Error deleting job:', error);
    }
  };

  return (
    <div>
      <div className="find-job-page">
        <h1>Find Jobs</h1>
        <div className="filter-section">
          <input className="form-control" type="text" name="jobTitle" value={filters.jobTitle} onChange={handleFilterChange} placeholder="Filter by Job Title"/>
        </div>
        <div className="job-card-container">
          {jobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              onExpand={() => setSelectedJob(job)}
              onDelete={handleDeleteJob} 
            />
          ))}
        </div>
        
        <h1>Details</h1>
        {selectedJob && (
          <div className="selected-job">
            <h2>{selectedJob.title}</h2>
            <p>{selectedJob.description}</p>
            <p>Skills: {selectedJob.skills}</p>
          </div>
        )}
      </div>
      <FooterTopComponent />
      <FooterBottomComponent />
    </div>
  );
};

export default FindJobPage;