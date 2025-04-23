import http from "../http-common";

/*
-----------------------------------------------------------------------
  Purpose: Fetches all fixes from the database
  Returns: Array of fix objects
-----------------------------------------------------------------------
*/
export const getAllFixes = async () => {
    try {
        const response = await http.get("/fixes");
        return response.data;
    } catch (error) {
        console.error("Error in getAllFixes:", error.response?.data || error.message);
    }
};

/*
-----------------------------------------------------------------------
  Purpose: Deletes a specific fix by ID
  Parameters: 
    - id: string - The fix ID to delete
  Returns: None
-----------------------------------------------------------------------
*/
export const deleteFix = async (id) => {
    try {
        await http.delete(`/fixes/${id}`);
    } catch (error) {
        console.error(`Error in deleteFix for ID ${id}:`, error.response?.data || error.message);
    }
};

/*
-----------------------------------------------------------------------
  Purpose: Fetches a specific fix by ID
  Parameters: 
    - id: string - The fix ID to delete
  Returns: Fix JSON object
-----------------------------------------------------------------------
*/
export const getFixById = async (fixId) => {
    try {
        const response = await http.get(`/fixes/${fixId}`);
        return response.data;
    }catch(e) {
        console.error("Error fetching fix by id", error);
    }
};

/*
-----------------------------------------------------------------------
  Purpose: Creates a fix
  Parameters: 
    - fixData: JSON data of the fix to be made
  Returns: Fix JSON object
-----------------------------------------------------------------------
*/
export const createFix = async (fixData) => {
    try {
        const response = await http.post('/fixes', fixData);
        return response.data;
    }catch(e) {
        console.error("Error creating fix", error);
    }
};

/*
-----------------------------------------------------------------------
  Purpose: Updates a specific fix by ID
  Parameters: 
    - id: string - The fix ID to delete
    - fixData: JSON - Data fields to be updated
  Returns: Fix JSON object
-----------------------------------------------------------------------
*/
export const updateFix = async (fixId, fixData) => {
    try {
        const response = await http.patch(`/fixes/${fixId}`, fixData);
        return response.data;
    }catch(e) {
        console.error("Error updating fix", error);
    }
};