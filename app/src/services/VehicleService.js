import http from "../http-common";

export const getMakes = async () => {
    const response = await http.get('/vehicles/makes');
    return response.data;
  };
  
export const getModels = async (make) => {
    const response = await http.get(`/vehicles/models/${make}`);
    return response.data;
  };
  
export const getYears = async (make, model) => {
    try {
      const response = await http.get(`/vehicles/years/${make}/${model}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching vehicle years", error);
      throw error;
    }
  };

export const findVehicle = async (make, model, year) => {
    const response = await http.get(
      `/vehicles?make=${make}&model=${model}&year=${year}`
    );
    return response.data?.[0];
  };