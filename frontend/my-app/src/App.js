import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import SignInSignUpForm from './components/SignIn_SignUp/SignInSignUpForm';
import MentorUI from './components/Mentor/MentorUI';
import MentorApprove from './components/Mentor/MentorApprove';
import CompanyApprove from './components/Company/ComapnyApprove';
import StudentUI from './components/Student/StudentUI';
import CompanyUI from './components/Company/CompanyUI';
import StudentProposal from './components/Student/StudentProposal';
import AuthProvider, { useAuth } from './components/Routes/AuthProvider';

// Custom Protected Route Component
const ProtectedRoute = ({ element, redirectTo }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? element : <Navigate to={redirectTo} />;
};

const StudentRoutes = () => (
  <Routes>
    <Route path="/" element={<StudentUI />} />
    <Route path="/StudentProposal" element={<StudentProposal />} />
  </Routes>
);

const MentorRoutes = () => (
  <Routes>
    <Route path="/" element={<MentorUI />} />
    <Route path="/MentorApprove" element={<MentorApprove />} />
  </Routes>
);

const CompanyRoutes = () => (
  <Routes>
    <Route path="/" element={<CompanyUI />} />
    <Route path="/CompanyApprove" element={<CompanyApprove />} />
  </Routes>
);

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Routes>
            <Route exact path="/" element={<SignInSignUpForm />} />
            
            <Route path="/StudentUI/*" element={<ProtectedRoute element={<StudentRoutes />} redirectTo="/" />} />
            <Route path="/MentorUI/*" element={<ProtectedRoute element={<MentorRoutes />} redirectTo="/" />} />
            <Route path="/CompanyUI/*" element={<ProtectedRoute element={<CompanyRoutes />} redirectTo="/" />} />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
  