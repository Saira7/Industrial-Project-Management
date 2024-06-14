import React, { useState, useEffect } from 'react';
import {
  MDBFooter,
  MDBContainer,
 
  MDBNavbar,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarToggler,
  MDBCollapse,
  MDBCarousel,
  MDBCarouselItem,
  MDBCarouselCaption,
} from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';
import { Routes, Route, Outlet } from 'react-router-dom';
export default function App() {
  const [currentTime, setCurrentTime] = useState(getCurrentTime());

  function getCurrentTime() {
    const date = new Date();
    return (
      date.getHours().toString().padStart(2, '0') +
      ':' +
      date.getMinutes().toString().padStart(2, '0') +
      ':' +
      date.getSeconds().toString().padStart(2, '0')
    );
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(getCurrentTime());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const [openNavCentred, setOpenNavCentred] = useState(false);

  return (
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

      {/* Time Clock Overlay */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: '999',
          textAlign: 'center',
          fontFamily: 'Arial, sans-serif',
          fontSize: '10rem',
          color: 'white',
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
        }}
      >
        {currentTime}
      </div>

      {/* Carousel */}
      <MDBCarousel showIndicators showControls fade>
        <MDBCarouselItem itemId={1}>
          <img src='https://mdbootstrap.com/img/Photos/Slides/img%20(15).jpg' className='d-block w-100' alt='...' />
          <MDBCarouselCaption>
            <h5>First slide label</h5>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </MDBCarouselCaption>
        </MDBCarouselItem>
        <MDBCarouselItem itemId={2}>
          <img src='https://mdbootstrap.com/img/Photos/Slides/img%20(22).jpg' className='d-block w-100' alt='...' />
          <MDBCarouselCaption>
            <h5>Second slide label</h5>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </MDBCarouselCaption>
        </MDBCarouselItem>
        <MDBCarouselItem itemId={3}>
          <img src='https://mdbootstrap.com/img/Photos/Slides/img%20(23).jpg' className='d-block w-100' alt='...' />
          <MDBCarouselCaption>
            <h5>Third slide label</h5>
            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
          </MDBCarouselCaption>
        </MDBCarouselItem>
      </MDBCarousel>
      <Routes>
        <Route path="*" element={<CompanyRoutes />} />
      </Routes>

      {/* Footer */}
      <MDBFooter bgColor='light' className='text-center text-lg-left mt-auto'>
       
        <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
          &copy; {new Date().getFullYear()} Web Project
        </div>
      </MDBFooter>
    </div>
  );
}
function CompanyRoutes() {
  return (
    <div>
      <Outlet />
    </div>
  );
}
