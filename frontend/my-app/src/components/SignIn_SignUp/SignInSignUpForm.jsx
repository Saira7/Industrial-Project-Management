import React, { useState } from 'react';
import {
  MDBContainer,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBBtn,
  MDBInput,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from 'mdb-react-ui-kit';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { APII_URL } from '../../API_URL_ROUTE/config';
import { storeToken } from '../../utils/tokenManager';
import { useAuth } from '../Routes/AuthProvider';
import OAuth from '../OAuth/OAuth';

function SignInSignUpForm() {
  const { login } = useAuth();
  const [isSignInActive, setIsSignInActive] = useState(true);
  const [signInData, setSignInData] = useState({ email: '', password: '' });
  const [signUpData, setSignUpData] = useState({ username: '', email: '', password: '', role: 'Student' });
  const [errors, setErrors] = useState({});
  const [modalMessage, setModalMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleTabSwitch = (isSignIn) => {
    setIsSignInActive(isSignIn);
    setErrors({});
    setModalMessage('');
  };

  const handleSignInChange = (e) => {
    const { name, value } = e.target;
    setSignInData({ ...signInData, [name]: value });
  };

  const handleSignUpChange = (e) => {
    const { name, value } = e.target;
    setSignUpData({ ...signUpData, [name]: value });
  };

  const validateSignUp = () => {
    const newErrors = {};
    if (!signUpData.username) newErrors.username = 'Username is required';
    if (!signUpData.email) newErrors.email = 'Email is required';
    if (!signUpData.password) newErrors.password = 'Password is required';
    if (!signUpData.role) newErrors.role = 'Role is required';
    return newErrors;
  };

  const handleSignInSubmit = async (e) => {
    e.preventDefault();
    try {
      const signInResponse = await axios.post(`${APII_URL}/auth/login`, signInData);
      const { token } = signInResponse.data;
      storeToken(token);

      const userDataResponse = await axios.get(
        `${APII_URL}/user/me`, 
        { 
          headers: { 
            'Authorization': `Bearer ${token}` 
          } 
        }
      );

      const userRole = userDataResponse.data.role.toLowerCase();
      login(token);

      switch (userRole) {
        case 'student':
          navigate("/StudentUI");
          break;
        case 'fyp_committee':
          navigate("/MentorUI");
          break;
        case 'ses_society':
          navigate("/MentorUI");
          break;
        case 'company':
          navigate("/CompanyUI");
          break;
        default:
          alert("Error! Please login again.");
      }
    } catch (error) {
      console.error('Sign In Error:', error);
      setModalMessage('Sign-in failed. Please try again.');
      setIsModalOpen(true);
    }
  };

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateSignUp();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await axios.post(`${APII_URL}/auth/register`, signUpData);
      console.log('Sign Up Response:', response.data);
      setModalMessage('Registration successful! Please sign in.');
      setSignUpData({ username: '', email: '', password: '', role: 'Student' });
      setErrors({});
      handleTabSwitch(true); // Switch to Sign In tab
      setIsModalOpen(true);
    } catch (error) {
      console.error('Sign Up Error:', error);
      setModalMessage('Registration failed. Please try again.');
      setIsModalOpen(true);
    }
  };

  return (
    <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
      <MDBTabs pills justify className='mb-3 d-flex flex-row justify-content-between'>
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleTabSwitch(true)} active={isSignInActive}>
            Login
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleTabSwitch(false)} active={!isSignInActive}>
            Register
          </MDBTabsLink>
        </MDBTabsItem>
      </MDBTabs>

      <MDBTabsContent>
        <MDBTabsPane open={isSignInActive}>
          {/* Sign In Form */}
          <form onSubmit={handleSignInSubmit}>
            <MDBInput
              wrapperClass='mb-4'
              label='Email address'
              id='signInEmail'
              type='email'
              name='email'
              value={signInData.email}
              onChange={handleSignInChange}
              required
            />
            <MDBInput
              wrapperClass='mb-4'
              label='Password'
              id='signInPassword'
              type='password'
              name='password'
              value={signInData.password}
              onChange={handleSignInChange}
              required
            />
            <MDBBtn className="mb-4 w-100" type="submit">Sign in</MDBBtn>
          </form>
        </MDBTabsPane>
        {/* <OAuth></OAuth> */}

        <MDBTabsPane open={!isSignInActive}>
          {/* Sign Up Form */}
          <form onSubmit={handleSignUpSubmit}>
            <MDBInput
              wrapperClass='mb-4'
              label='Username'
              id='signUpUsername'
              type='text'
              name='username'
              value={signUpData.username}
              onChange={handleSignUpChange}
              required
            />
            {errors.username && <div className="text-danger mb-2">{errors.username}</div>}
            <MDBInput
              wrapperClass='mb-4'
              label='Email'
              id='signUpEmail'
              type='email'
              name='email'
              value={signUpData.email}
              onChange={handleSignUpChange}
              required
            />
            {errors.email && <div className="text-danger mb-2">{errors.email}</div>}
            <MDBInput
              wrapperClass='mb-4'
              label='Password'
              id='signUpPassword'
              type='password'
              name='password'
              value={signUpData.password}
              onChange={handleSignUpChange}
              required
            />
            {errors.password && <div className="text-danger mb-2">{errors.password}</div>}
            <label className="form-label">Role</label>
            <select
              className="form-select mb-4"
              name="role"
              value={signUpData.role}
              onChange={handleSignUpChange}
              required
            >
              <option value="Student">Student</option>
              <option value="FYP_Committee">FYP Committee</option>
              <option value="SES_Society">SES Society</option>
              <option value="Company">Company</option>
            </select>
            {errors.role && <div className="text-danger mb-2">{errors.role}</div>}
            <MDBBtn className="mb-4 w-100" type="submit">Sign up</MDBBtn>
          </form>
        </MDBTabsPane>
      </MDBTabsContent>
      {/* <OAuth></OAuth> */}

      <MDBModal show={isModalOpen} setShow={setIsModalOpen}>
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Message</MDBModalTitle>
            </MDBModalHeader>
            <MDBModalBody>{modalMessage}</MDBModalBody>
            <MDBModalFooter>
              <MDBBtn color="secondary" onClick={() => setIsModalOpen(false)}>
                Close
              </MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </MDBContainer>
  );
}

export default SignInSignUpForm;
