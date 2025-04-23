  /*
    -----------------------------------------------------------------------
      Purpose: Reusable component for displaying complaints
      Param: JSON array of complaints and their title (issue)
      Postcondition: Returns cards of complaints with username for each
    -----------------------------------------------------------------------
    */
const ComplaintList = ({ complaints, title }) => {
    return (
        <>
        <div className="complaints-section">
          <h3 style={{color: "white", textTransform: "capitalize"}}>
            {title}
          </h3>
          <div className="complaints-list">
            {complaints.length > 0 ? (
              complaints.map((complaint) => (
                <div key={complaint.id} className="complaint-card">
                  <div className="complaint-header">
                    <span className="username">{complaint.user?.username}</span>
                    <span className="date">
                      {new Date(complaint.date).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="vehicle-info">
                    {complaint.vehicle.year} {complaint.vehicle.make} {complaint.vehicle.model}
                  </div>
                  <h4 className="issue">{complaint.issue}</h4>
                  <p className="description">{complaint.description}</p>
                  <div className="complaint-footer">
                    <span className="cost">Repair Cost: ${complaint.cost}</span>
                  </div>
                </div>
              ))
            ) : (
              <p>No complaints found</p>
            )}
          </div>
        </div>
        </>
      );
}
 
export default ComplaintList;