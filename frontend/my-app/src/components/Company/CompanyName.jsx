import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../../API_URL_ROUTE/config';

const CompanyName = ({ companyId }) => {
  const [companyName, setCompanyName] = useState('');

  useEffect(() => {
    const fetchCompanyName = async () => {
      try {
        const response = await axios.get(`${API_URL}/user/${companyId}`);
        setCompanyName(response.data.username);
      } catch (error) {
        console.error('Error fetching company details:', error);
      }
    };

    fetchCompanyName();
  }, [companyId]);

  return <>{companyName}</>;
};

export default CompanyName;
