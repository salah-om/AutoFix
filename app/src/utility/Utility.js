/*
-----------------------------------------------------------------------
  Purpose: Retrieves stored authentication token from localStorage
  Returns: string - access token or empty string if none exists
-----------------------------------------------------------------------
*/
export const getToken = () => localStorage.getItem("access_token") || "";

/*
-----------------------------------------------------------------------
  Purpose: Stores or removes authentication token in localStorage
  Param: token (string) - access token to be stored or removed
  Returns: Updates localStorage with token value or removes token
-----------------------------------------------------------------------
*/
export const setToken = (token) => {
    if (token) {
        localStorage.setItem("access_token", token);
    } else {
        localStorage.removeItem("access_token");
    }
};

/*
-----------------------------------------------------------------------
  Purpose: Removes authentication token from localStorage
  Returns: Clears access token stored in localStorage
-----------------------------------------------------------------------
*/
export const removeToken = () => {
    localStorage.removeItem("access_token");
};

/*
-----------------------------------------------------------------------
  Purpose: Formats the stored authentication token as a Bearer token
  Returns: String - formatted Bearer token or empty string if no token exists
-----------------------------------------------------------------------
*/
export const getTokenBearer = () => {
    const token = getToken();
    return token ? `Bearer ${token}` : "";
};

/*
-----------------------------------------------------------------------
  Purpose: Retrieves stored user role from localStorage
  Returns: string - user role or empty string if none exists
-----------------------------------------------------------------------
*/
export const getRole = () => localStorage.getItem("userRole") || "";

/*
-----------------------------------------------------------------------
  Purpose: Stores or removes user role in localStorage
  Param: role (string) - role to be stored or removed
  Returns: Updates localStorage with role value or removes role if null
-----------------------------------------------------------------------
*/
export const setRole = (role) => {
    if(role){
        localStorage.setItem("userRole", role);
    } else {
        localStorage.removeItem("userRole");
    }
}