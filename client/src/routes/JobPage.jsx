//import libaries
import React from 'react';
import '../styles/Home.css';

//import components
import FooterTopComponent from '../footerTopComponent';
import FooterBottomComponent from '../footerBottomComponent';
import AddJobPost from '../AddJobPost';



function JobPage() {
    return (<div>
      <AddJobPost />
      <FooterTopComponent />
      <FooterBottomComponent />
    </div>
    );
}
export default JobPage;