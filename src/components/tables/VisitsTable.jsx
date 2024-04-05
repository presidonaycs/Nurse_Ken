function VisitsTable({ data }) {
    return (
      <div className="w-100 ">
        <div className="w-100 none-flex-item m-t-40">
          <table className="bordered-table">
            <thead className="border-top-none">
              <tr className="border-top-none">
                <th>Date</th>
                <th>Age</th>
                <th>Weight</th>
                <th>Temp</th>
                <th>Height</th>
                <th>Heart</th>
                <th>Resp</th>
                <th>Admin Nurse</th>
                <th>Assigned Doctor</th>
             </tr>
            </thead>
  
            <tbody className="white-bg view-det-pane">
              {data.map((row) => (
                <tr key={row.id}>
                  <td>{row.date}</td>
                  <td>{row.allergyType}</td>
                  <td>{row.details}</td>
                  <td>{row.prescribedMedication}</td>
                  <td>{row.date}</td>
                  <td>{row.allergyType}</td>
                  <td>{row.details}</td>
                  <td>{row.prescribedMedication}</td>
                  <td>{row.prescribedMedication}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
  
  export default VisitsTable;
  