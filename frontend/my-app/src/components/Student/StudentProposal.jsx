import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MDBNavbar, MDBContainer, MDBNavbarToggler, MDBCollapse, MDBNavbarNav, MDBNavbarItem, MDBNavbarLink, MDBIcon, MDBFooter } from 'mdb-react-ui-kit';
import { API_URL } from '../../API_URL_ROUTE/config';
import ProjectCard from '../Cards/ProjectCard'; 
import { Link } from 'react-router-dom';

export default function App() {
  const [openNavCentred, setOpenNavCentred] = useState(false);
  const [easyProjects, setEasyProjects] = useState([]);
  const [mediumProjects, setMediumProjects] = useState([]);
  const [hardProjects, setHardProjects] = useState([]);

  useEffect(() => {
    const fetchApprovedProjects = async () => {
      try {
        const response = await axios.get(`${API_URL}/projects?status=Approved`);
        const approvedProjects = response.data;

        const easy = [];
        const medium = [];
        const hard = [];

        approvedProjects.forEach((project) => {
          if (project.category === 'Easy') easy.push(project);
          else if (project.category === 'Medium') medium.push(project);
          else if (project.category === 'Hard') hard.push(project);
        });

        setEasyProjects(easy);
        setMediumProjects(medium);
        setHardProjects(hard);
      } catch (error) {
        console.error('Error fetching approved projects:', error);
      }
    };

    fetchApprovedProjects();
  }, []);

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
                  <Link to="/StudentUI" className="nav-link" aria-current='page'>
    Home
  </Link>
</MDBNavbarItem>
<MDBNavbarItem>
  <Link to="/StudentUI/StudentProposal" className="nav-link">
    Projects
  </Link>
</MDBNavbarItem>
                </MDBNavbarNav>
              </MDBCollapse>
            </MDBContainer>
          </MDBNavbar>
        </div>

        {/* Render Easy Projects */}
        <h2>Easy</h2>
        <div className='d-flex flex-wrap justify-content-center'>
          {easyProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* Render Medium Projects */}
        <h2>Medium</h2>
        <div className='d-flex flex-wrap justify-content-center'>
          {mediumProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* Render Hard Projects */}
        <h2>Hard</h2>
        <div className='d-flex flex-wrap justify-content-center'>
          {hardProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
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
