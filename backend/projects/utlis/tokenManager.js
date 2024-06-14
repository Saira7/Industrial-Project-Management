export const storeToken = (token) => {
    localStorage.setItem('jwtToken', token); // Store JWT token
  };
  
  export const getToken = () => {
    return localStorage.getItem('jwtToken'); // Get stored JWT token
  };
  
  export const removeToken = () => {
    localStorage.removeItem('jwtToken'); // Remove stored JWT token
  };
  