import http from "../http-common";

/*
-----------------------------------------------------------------------
  Purpose: Retrieves all available vehicle makes
  Returns: Array of make objects
-----------------------------------------------------------------------
*/
export const getMakes = async () => {
    try {
        const response = await http.get('/vehicles/makes');
        return response.data;
    } catch (error) {
        console.error("Error in getMakes:", error.response?.data || error.message);
    }
};

/*
-----------------------------------------------------------------------
  Purpose: Retrieves models for a specific make
  Parameters:
    - make: string - The vehicle make to get models for
  Returns: Array of model objects
-----------------------------------------------------------------------
*/
export const getModels = async (make) => {
    try {
        const response = await http.get(`/vehicles/models/${make}`);
        return response.data;
    } catch (error) {
        console.error(`Error in getModels for ${make}:`, error.response?.data || error.message);
    }
};

/*
-----------------------------------------------------------------------
  Purpose: Retrieves production years for a specific make and model
  Parameters:
    - make: string - Vehicle make
    - model: string - Vehicle model
  Returns: Array of year numbers
-----------------------------------------------------------------------
*/
export const getYears = async (make, model) => {
    try {
        const response = await http.get(`/vehicles/years/${make}/${model}`);
        return response.data;
    } catch (error) {
        console.error(`Error in getYears for ${make} ${model}:`, error.response?.data || error.message);
    }
};

/*
-----------------------------------------------------------------------
  Purpose: Finds a specific vehicle by make, model and year
  Parameters:
    - make: string - Vehicle make
    - model: string - Vehicle model
    - year: number - Production year
  Returns: Matching vehicle object or undefined
-----------------------------------------------------------------------
*/
export const findVehicle = async (make, model, year) => {
    try {
        const response = await http.get(
            `/vehicles?make=${make}&model=${model}&year=${year}`
        );
        return response.data?.[0];
    } catch (error) {
        console.error(`Error in findVehicle for ${make} ${model} ${year}:`, error.response?.data || error.message);
    }
};

/*
-----------------------------------------------------------------------
  Purpose: Fetches all vehicles from the database
  Returns: Array of vehicle objects
-----------------------------------------------------------------------
*/
export const getAllVehicles = async () => {
  try {
      const response = await http.get("/vehicles");
      return response.data;
  } catch (error) {
      console.error("Error in getAllVehicles:", error.response?.data || error.message);
  }
};

/*
-----------------------------------------------------------------------
  Purpose: Retrieves a vehicle by its ID
  Parameters:
    - vehicleId: string - The vehicle's unique identifier
  Returns: Complete vehicle object
-----------------------------------------------------------------------
*/
export const getVehicleById = async (vehicleId) => {
    try {
        const response = await http.get(`/vehicles/${vehicleId}`);
        return response.data;
    } catch (error) {
        console.error(`Error in getVehicleById for ID ${vehicleId}:`, error.response?.data || error.message);
    }
};

/*
-----------------------------------------------------------------------
  Purpose: Creates a new vehicle entry
  Parameters:
    - formData: FormData - Vehicle data including potential image file
  Returns: Created vehicle object
-----------------------------------------------------------------------
*/
export const createVehicleEntry = async (formData) => {  // Renamed from createVehicle
    try {
        const response = await http.post("/vehicles", formData, {
            headers: { "Content-Type": "multipart/form-data" }
        });
        return response.data;
    } catch (error) {
        console.error("Error in createVehicleEntry:", error.response?.data || error.message);
    }
};

/*
-----------------------------------------------------------------------
  Purpose: Updates an existing vehicle
  Parameters:
    - vehicleId: string - ID of vehicle to update
    - formData: FormData - Updated vehicle data including potential new image
  Returns: Updated vehicle object
-----------------------------------------------------------------------
*/
export const modifyVehicle = async (vehicleId, formData) => {  // Renamed from updateVehicle
    try {
        const response = await http.patch(`/vehicles/${vehicleId}`, formData, {
            headers: { "Content-Type": "multipart/form-data" }
        });
        return response.data;
    } catch (error) {
        console.error(`Error in modifyVehicle for ID ${vehicleId}:`, error.response?.data || error.message);
    }
};

/*
-----------------------------------------------------------------------
  Purpose: Deletes a specific vehicle by ID
  Parameters: 
    - id: string - The vehicle ID to delete
  Returns: Nothing on success
-----------------------------------------------------------------------
*/
export const deleteVehicle = async (id) => {
  try {
      await http.delete(`/vehicles/${id}`);
  } catch (error) {
      console.error(`Error in deleteVehicle for ID ${id}:`, error.response?.data || error.message);
  }
};