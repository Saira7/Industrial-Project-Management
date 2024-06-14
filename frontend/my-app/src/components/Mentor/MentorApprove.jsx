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
  MDBBtn,
  MDBRipple,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
} from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';

import { API_URL } from '../../API_URL_ROUTE/config';

export default function App() {
  const [openNavCentred, setOpenNavCentred] = useState(false);
  const [projects, setProjects] = useState([]);

  const [categorySelections, setCategorySelections] = useState({});
  const [statusSelections, setStatusSelections] = useState({});

  useEffect(() => {
    // Fetch projects from the server
    const fetchProjects = async () => {
      try {
        const response = await axios.get(API_URL+'/projects');
        setProjects(response.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

  const handleCategoryChange = (projectId, category) => {
    setCategorySelections((prevSelections) => ({
      ...prevSelections,
      [projectId]: category,
    }));
  };

  const handleStatusChange = (projectId, status) => {
    setStatusSelections((prevSelections) => ({
      ...prevSelections,
      [projectId]: status,
    }));
  };

  const handleSubmit = async (projectId) => {
    try {
      // Fetch the project with the given projectId
      const response = await axios.get(`/api/projects/${projectId}`);
      const projectToUpdate = response.data;

      // Update the project with the selected status and category
      const updatedProject = {
        ...projectToUpdate,
        status: statusSelections[projectId] || projectToUpdate.status,
        category: categorySelections[projectId] || projectToUpdate.category,
      };

      // Send a PUT request to update the project
      await axios.put(`/api/projects/${projectId}`, updatedProject);

      // Log success message
      console.log(`Project ${projectId} updated successfully.`);
    } catch (error) {
      console.error('Error updating project:', error);
    }
  };
  

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
                  <Link to="/MentorUI" className="nav-link" aria-current='page'>
    Home
  </Link>
</MDBNavbarItem>
<MDBNavbarItem>
  <Link to="/MentorUI/MentorApprove" className="nav-link">
    Approve
  </Link>
</MDBNavbarItem>
                </MDBNavbarNav>
              </MDBCollapse>
            </MDBContainer>
          </MDBNavbar>
        </div>

        {/* Project Cards */}
        <div className='d-flex flex-wrap justify-content-center'>
          {projects.map((project) => (
            <MDBCard key={project.id} style={{ width: '18rem', margin: '1rem' }}>
              <MDBRipple rippleColor='light' rippleTag='div' className='bg-image hover-overlay'>
                <MDBCardImage src={`https://picsum.photos/300/200?random=${project.id}`} fluid alt='Project Image' />
                <a>
                  <div className='mask' style={{ backgroundColor: 'rgba(251, 251, 251, 0.15)' }}></div>
                </a>
              </MDBRipple>
              <MDBCardBody>
                <MDBCardTitle>{project.title}</MDBCardTitle>
                <MDBCardText>{project.description}</MDBCardText>
                <p>Submitted by: {project.submittedBy}</p>

                <div className='d-flex justify-content-between align-items-center'>
                  <MDBDropdown>
                    <MDBDropdownToggle color='primary' size='sm'>
                      Easy
                    </MDBDropdownToggle>
                    <MDBDropdownMenu>
                      <MDBDropdownItem onClick={() => handleCategoryChange(project.id, 'Easy')}>
                        Easy
                      </MDBDropdownItem>
                      <MDBDropdownItem onClick={() => handleCategoryChange(project.id, 'Medium')}>
                        Medium
                      </MDBDropdownItem>
                      <MDBDropdownItem onClick={() => handleCategoryChange(project.id, 'Hard')}>
                        Hard
                      </MDBDropdownItem>
                    </MDBDropdownMenu>
                  </MDBDropdown>

                  <MDBDropdown>
                    <MDBDropdownToggle color='primary' size='sm'>
                      Pending
                    </MDBDropdownToggle>
                    <MDBDropdownMenu>
                      <MDBDropdownItem onClick={() => handleStatusChange(project.id, 'Approved')}>
                        Approved
                      </MDBDropdownItem>
                      <MDBDropdownItem onClick={() => handleStatusChange(project.id, 'Declined')}>
                        Declined
                      </MDBDropdownItem>
                    </MDBDropdownMenu>
                  </MDBDropdown>
                </div>

                <div className='text-center mt-3'>
                  <MDBBtn size='sm' onClick={() => handleSubmit(project.id)}>
                    Submit
                  </MDBBtn>
                </div>
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
