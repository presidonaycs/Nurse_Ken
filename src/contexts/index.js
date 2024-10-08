import React, { createContext, useState, useContext } from 'react';

const PatientContext = createContext();

export const usePatient = () => useContext(PatientContext);

export const PatientProvider = ({ children }) => {
  const [patientId, setPatientId] = useState('');
  const [patientName, setPatientName] = useState('');
  const [patientPage, setPatientPage] = useState('');
  const [patientInfo, setPatientInfo] = useState('');
  const [hmoId, setHmoId] = useState('');
  const [hmoDetails, setHmoDetails] = useState({});
  const [states, setStates] = useState(null);


  return (
    <PatientContext.Provider value={{states, setStates, patientId, setPatientId, patientName, setPatientName, patientPage, setPatientPage, hmoId, setHmoId, patientInfo, setPatientInfo, hmoDetails, setHmoDetails }}>
      {children}
    </PatientContext.Provider>
  );
};
