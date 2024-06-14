import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  MDBNavbar,
  MDBContainer,
  MDBNavbarToggler,
  MDBCollapse,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBIcon,
  MDBFooter,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBRipple,
} from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';

import CompanyName from './CompanyName'; // Import the CompanyName component
import { useAuth } from '../Routes/AuthProvider'; 
import { API_URL } from '../../API_URL_ROUTE/config';

export default function App() {
  const { authToken, user } = useAuth(); // Get the authentication token and user data from the AuthContext
  const [openNavCentred, setOpenNavCentred] = useState(false);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // Fetch projects from the server
    const fetchProjects = async () => {
      try {
        const response = await axios.get(`${API_URL}/projects?submittedBy=${user.id}`, {
          headers: {
            Authorization: `Bearer ${authToken}`, // Send the authentication token in the request headers
          },
        });
        const projectsData = response.data;

        // Fetch proposals for each project
        const projectsWithProposals = await Promise.all(projectsData.map(async (project) => {
          const proposalsResponse = await axios.get(`${API_URL}/proposals?projectId=${project.id}`, {
            headers: {
              Authorization: `Bearer ${authToken}`, // Send the authentication token in the request headers
            },
          });
          const proposals = proposalsResponse.data;
          return { ...project, proposals };
        }));

        setProjects(projectsWithProposals);
      } catch (error) {
        console.error('Error fetching projects and proposals:', error);
      }
    };

    fetchProjects();
  }, [authToken, user]); // Add authToken and user to the dependency array

  return (
    <>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <div className='content-wrap'>
          <MDBNavbar expand='lg' light bgColor='light'>
            <MDBContainer fluid>
              <MDBNavbarToggler
                type='button'
                data-target='#navbarCenteredExample'
                aria-controls='navbarCenteredExample'
                aria-expanded='false'
                aria-label='Toggle navigation'
                onClick={() => setOpenNavCentred(!openNavCentred)}
              >
                <MDBIcon icon='bars' fas />
              </MDBNavbarToggler>

              <MDBCollapse navbar open={openNavCentred} center id='navbarCenteredExample'>
                <MDBNavbarNav fullWidth={false} className='mb-2 mb-lg-0'>
                <MDBNavbarItem>
                  <Link to="/CompanyUI" className="nav-link" aria-current='page'>
    Home
  </Link>
</MDBNavbarItem>
<MDBNavbarItem>
  <Link to="/CompanyUI/CompanyApprove" className="nav-link">
    Projects
  </Link>
</MDBNavbarItem>
                </MDBNavbarNav>
              </MDBCollapse>
            </MDBContainer>
          </MDBNavbar>
        </div>

        {/* Project Cards */}
        <div className='d-flex flex-wrap justify-content-center'>
          {/* Display projects */}
          {projects.map((project) => (
            <MDBCard key={project.id} style={{ width: '18rem', margin: '1rem' }}>
              <MDBCardBody>
              <MDBRipple rippleColor='light' rippleTag='div' className='bg-image hover-overlay'>
        <MDBCardImage src={`https://picsum.photos/300/200?random=${project.id}`} fluid alt='Project Image' />
        <a>
          <div className='mask' style={{ backgroundColor: 'rgba(251, 251, 251, 0.15)' }}></div>
        </a>
      </MDBRipple>
                <MDBCardTitle>{project.title}</MDBCardTitle>
                <MDBCardText>{project.description}</MDBCardText>
                <p>Submitted by: <CompanyName companyId={project.submittedBy} /></p> {/* Use CompanyName component */}

                {/* Display proposals */}
                {project.proposals && project.proposals.map((proposal) => (
                  <div key={proposal.id}>
                    <h6>Proposal: </h6>
                    <p>Description: {proposal.description}</p>
                  </div>
                ))}
              </MDBCardBody>
            </MDBCard>
          ))}
        </div>

        {/* Footer */}
        <div className='mt-auto'>
          <MDBFooter bgColor='light' className='text-center text-lg-left'>
            <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
              &copy; {new Date().getFullYear()} Web Project
            </div>
          </MDBFooter>
        </div>
      </div>
    </>
  );
}
