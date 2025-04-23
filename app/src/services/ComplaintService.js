import http from "../http-common";

/*
-----------------------------------------------------------------------
  Purpose: Fetches all complaints from the database
  Returns: Array of complaint objects
-----------------------------------------------------------------------
*/
export const getAllComplaints = async () => {
    try {
        const response = await http.get("/complaints");
        return response.data;
    } catch (error) {
        console.error("Error in getAllComplaints:", error.response?.data || error.message);
    }
};

/*
-----------------------------------------------------------------------
  Purpose: Deletes a specific complaint by ID
  Parameters: 
    - id: string - The complaint ID to delete
  Returns: Nothing on success
-----------------------------------------------------------------------
*/
export const deleteComplaint = async (id) => {
    try {
        await http.delete(`/complaints/${id}`);
    } catch (error) {
        console.error(`Error in deleteComplaint for ID ${id}:`, error.response?.data || error.message);
    }
};

/*
-----------------------------------------------------------------------
  Purpose: Retrieves the model year with most complaints for a vehicle
  Parameters:
    - make: Vehicle manufacturer (string)
    - model: Vehicle model (string)
  Returns: Object containing worst year data
-----------------------------------------------------------------------
*/
export const getWorstYear = async (make, model) => {
    try {
        const response = await http.get(`/complaints/${make}/${model}/worst-year`);
        return response.data;
    } catch (error) {
        console.error("Error in getWorstYear:", error);
    }
};

/*
-------------------------------------------------------------------------------
  Purpose: Fetch top 3 best car models based on complaint data
  Return:  Array of best cars with make, model, and year
-------------------------------------------------------------------------------
*/
export const topBestCars = async () => {
    const response = await http.get("/complaints/top-best");
    return response.data;
};

/*
-------------------------------------------------------------------------------
  Purpose: Fetch top 3 worst car models based on complaint data
  Return:  Array of worst cars with make, model, and year
-------------------------------------------------------------------------------
*/
export const topWorstCars = async () => {
    const response = await http.get("/complaints/top-worst");
    return response.data;
};

/*
-----------------------------------------------------------------------
  Purpose: Gets complaint statistics grouped by year for a vehicle
  Parameters:
    - make: Vehicle manufacturer (string)
    - model: Vehicle model (string)
  Returns: Array of year-based complaint statistics
-----------------------------------------------------------------------
*/
export const getComplaintsByYear = async (make, model) => {
    try {
        const response = await http.get(`/complaints/${make}/${model}/complaints-by-year`);
        return response.data;
    } catch (error) {
        console.error("Error in getComplaintsByYear:", error);
    }
};

/*
-----------------------------------------------------------------------
  Purpose: Retrieves most common problems for a vehicle
  Parameters:
    - make: Vehicle manufacturer (string)
    - model: Vehicle model (string)
  Returns: Array of problem statistics
-----------------------------------------------------------------------
*/
export const getWorstProblems = async (make, model) => {
    try {
        const response = await http.get(`/complaints/${make}/${model}/worst-problems`);
        return response.data;
    } catch (error) {
        console.error("Error in getWorstProblems:", error);
    }
};

/*
-----------------------------------------------------------------------
  Purpose: Gets all complaints for specific vehicle make/model
  Parameters:
    - make: Vehicle manufacturer (string)
    - model: Vehicle model (string)
  Returns: Array of complaint objects
-----------------------------------------------------------------------
*/
export const getAllComplaintsForVehicle = async (make, model) => {
    try {
        const response = await http.get(`/complaints/${make}/${model}`);
        return response.data;
    } catch (error) {
        console.error("Error in getAllComplaintsForVehicle:", error);
    }
};

/*
-----------------------------------------------------------------------
  Purpose: Submits a new complaint to the system
  Parameters:
    - complaintData: Object containing complaint details
    - token: Authentication token
  Returns: Created complaint object
-----------------------------------------------------------------------
*/
export const submitComplaint = async (complaintData, token) => {
    try {
        const response = await http.post('/complaints', complaintData, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error in submitComplaint:", error);
    }
};

/*
-----------------------------------------------------------------------
  Purpose: Fetches all complaints for the current user
  Returns: Array of complaint objects
-----------------------------------------------------------------------
*/
export const fetchUserComplaints = async () => {
    try {
        const response = await http.get('/complaints/user', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error in fetchUserComplaints:", error);
    }
};

/*
-----------------------------------------------------------------------
  Purpose: Updates a specific complaint
  Parameters:
    - complaintId: ID of complaint to update
    - complaintData: Object with updated fields
  Returns: Updated complaint object
-----------------------------------------------------------------------
*/
export const updateComplaint = async (complaintId, complaintData) => {
    try {
        const response = await http.patch(`/complaints/${complaintId}`, complaintData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error in updateComplaint:", error);
    }
};

/*
-----------------------------------------------------------------------
  Purpose: Searches complaints by query string
  Parameters: - query: string - The search term
  Returns: Array of matching complaint objects
-----------------------------------------------------------------------
*/
export const searchComplaints = async (query) => {
    try {
        const response = await http.get(`/complaints/search?query=${query}`);
        return response.data;
    } catch (error) {
        console.error("Error in searchComplaints:", error.response?.data || error.message);
    }
};