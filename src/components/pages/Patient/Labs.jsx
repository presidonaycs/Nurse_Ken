import React, { useEffect, useState } from "react";
import LabsTable from "../../tables/LabsTable";
import { allergyData } from "../mockdata/PatientData";
import { get } from "../../../utility/fetch";
import { usePatient } from "../../../contexts";
function Labs() {
  const { patientId, patientName, hmoId, patientInfo } = usePatient();

  const [labReports, setLabReports] = useState([])


  useEffect(() => {
    getLabReports()
  }, [])

  const getLabReports = async () => {
    try {
      let res = await get(`/patients/${patientId}/lab_reports`);
      setLabReports(res?.data);
    } catch (error) {
      console.error('Error fetching lab reports:', error);
      // Handle the error here, such as displaying an error message to the user
    }
  }

  return (
    <div>
      <div className="w-100">
        <LabsTable data={labReports} />
      </div>
    </div>
  );
}

export default Labs;
