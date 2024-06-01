import React, { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import FinanceTable from "../tables/financeTable";
import TagInputs from "../layouts/TagInputs";

function PatientsFinance() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [filterSelected, setFilterSelected] = useState("");
  const [payload, setPayload] = useState("");

  useEffect(() => {
    if (filterSelected && payload) {
      getPaymentHistorySearch(payload);
    } else {
      getPaymentHistory();
    }
  }, [filterSelected, payload, currentPage]);

  const getPaymentHistory = async () => {
    try {
      const response = await axios.get(
        `https://edogoverp.com/healthfinanceapi/api/patientpayment/list/${currentPage}/30/patient-payment-list`
      );
      setPaymentHistory(response?.data?.resultList || []);
      setTotalPages(response?.data?.totalPages || 1);
    } catch (error) {
      console.error("Error fetching payment history:", error);
    }
  };

  const getPaymentHistorySearch = async (searchParam) => {
    try {
      const response = await axios.get(
        `https://edogoverp.com/healthfinanceapi/api/patientpayment/filter-list/${filterSelected}/${searchParam}/${currentPage}/30`
      );
      setPaymentHistory(response?.data?.resultList || []);
      setTotalPages(response?.data?.totalPages || 1);
    } catch (error) {
      console.error("Error fetching payment history:", error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "filter") {
      setFilterSelected(value);
    } else {
      setPayload(value);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const filterOptions = [
    { value: "", name: "Select Filter" },
    { value: "FirstName", name: "First Name" },
    { value: "LastName", name: "Last Name" },
    { value: "PatientId", name: "Patient Id" },
  ];

  const generatePageNumbers = () => {
    let pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages = [1, 2, 3, 4, totalPages];
      } else if (currentPage >= totalPages - 2) {
        pages = [1, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
      } else {
        pages = [1, currentPage - 1, currentPage, currentPage + 1, totalPages];
      }
    }
    return pages;
  };

  return (
    <div className="w-100 m-t-80">
      <h3>Patients Finance</h3>

      <div className="flex w-100 space-between">
        <div className="flex flex-v-center w-100 m-t-20">
          <div className="w-50">
            <div className="col-8">
              <TagInputs onChange={handleChange} name="firstName" label="Find Patient" />
            </div>
            <div className="col-4 m-t-10">
              <TagInputs
                onChange={handleChange}
                name="filter"
                type="select"
                options={filterOptions}
              />
            </div>
          </div>
        </div>
      </div>

      <div>
        <FinanceTable data={paymentHistory} />
      </div>

      <div className="pagination flex space-between float-right col-3 m-t-20">
        <div className="flex gap-8">
          <div className="bold-text">Page</div> <div>{currentPage}/{totalPages}</div>
        </div>
        <div className="flex gap-8">
          <button
            className={`pagination-btn ${currentPage === 1 ? 'disabled' : ''}`}
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            {"Previous"}
          </button>

          {generatePageNumbers().map((page, index) => (
            <button
              key={`page-${index}`}
              className={`pagination-btn ${currentPage === page ? 'bg-green text-white' : ''}`}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </button>
          ))}

          <button
            className={`pagination-btn ${currentPage === totalPages ? 'disabled' : ''}`}
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            {"Next"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default PatientsFinance;
