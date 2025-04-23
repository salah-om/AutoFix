import http from "../http-common";
import { getTokenBearer } from "../utility/Utility";

/*
-----------------------------------------------------------------------
  Purpose: Fetches a single user by ID
  Parameters:
    - userId: string - The ID of the user to retrieve
  Returns: User object
-----------------------------------------------------------------------
*/
export const getUserById = async (userId) => {
    try {
        const response = await http.get(`/users/${userId}`);
        return response.data;
    } catch (error) {
        console.error(`Error in getUserById for ID ${userId}:`, error.response?.data || error.message);
    }
};

/*
-----------------------------------------------------------------------
  Purpose: Updates a user's information
  Parameters:
    - userId: string - The ID of the user to update
    - userData: object - The updated user data
  Returns: Updated user object
-----------------------------------------------------------------------
*/
export const updateUser = async (userId, userData) => {
    try {
        const response = await http.patch(`/users/${userId}`, userData, {
            headers: {
                Authorization: getTokenBearer(),
            }
        });
        return response.data;
    } catch (error) {
        console.error(`Error in updateUser for ID ${userId}:`, error.response?.data || error.message);
    }
};

/*
-----------------------------------------------------------------------
  Purpose: Fetches all users from the system
  Returns: Array of user objects
-----------------------------------------------------------------------
*/
export const getAllUsers = async () => {
    try {
        const response = await http.get("/users", {
            headers: {
                Authorization: getTokenBearer(),
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error in getAllUsers:", error.response?.data || error.message);
    }
};


/*
-----------------------------------------------------------------------
  Purpose: Authenticates a user (login)
  Parameters:
    - email: string
    - password: string
  Returns: Original axios response with token and user data
  Note: Maintains original response structure that Login component expects
-----------------------------------------------------------------------
*/
export const authenticate = async (email, password) => {
    try {
        const response = await http.post("/auth/login", { email, password });
        return response; 
    } catch (error) {
        if (error.response) {
            throw {
                response: {
                    data: {
                        message: error.response.data?.message || "Login failed"
                    }
                }
            };
        } else {
            throw {
                response: {
                    data: {
                        message: "Network error. Please try again."
                    }
                }
            };
        }
    }
};

/*
-----------------------------------------------------------------------
  Purpose: Registers a new user
  Parameters:
    - username: string
    - email: string
    - password: string
  Returns: Original axios response
-----------------------------------------------------------------------
*/
export const signUp = async (username, email, password) => {
    try {
        const response = await http.post("/auth/signup", { username, email, password });
        return response;
    } catch (error) {
        if (error.response) {
            throw {
                response: {
                    data: {
                        message: error.response.data?.message || "Registration failed"
                    }
                }
            };
        } else {
            throw {
                response: {
                    data: {
                        message: "Network error. Please try again."
                    }
                }
            };
        }
    }
};

/*
-----------------------------------------------------------------------
  Purpose: Deletes a specific user by ID
  Parameters: 
    - id: string - The user ID to delete
  Returns: Nothing on success
-----------------------------------------------------------------------
*/
export const deleteUser = async (id) => {
    try {
        await http.delete(`/users/${id}`, {
            headers: {
                Authorization: getTokenBearer(),
            }
        });
    } catch (error) {
        console.error(`Error in deleteUser for ID ${id}:`, error.response?.data || error.message);
    }
};