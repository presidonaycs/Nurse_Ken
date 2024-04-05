import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import { PatientData, stats } from "./mockdata/PatientData";
import ReferralTable from "../tables/referralTable";

function RefferedPatients() {
 

  return (
    <div className="w-100 m-t-80">
      <h3>Reffered Patients</h3>
      
      <div className="flex w-100 space-between">
        
        <div className="flex flex-v-center  w-50 m-t-20">
         
          <input type="text" className="" />
          <div className="dropdown-input w-25 ">
           
           
          </div>
        </div>
      </div>

      <div className="">
        <ReferralTable data={PatientData} />
      </div>
    </div>
  );
}

export default RefferedPatients;