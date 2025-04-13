import http from '../http-common';

export const getVehicleYears = async (make, model) => {
  try {
    const response = await http.get(`/vehicles/years/${make}/${model}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching vehicle years", error);
    throw error;
  }
};

export const getWorstYear = async (make, model) => {
  try {
    const response = await http.get(`/complaints/${make}/${model}/worst-year`);
    return response.data;
  } catch (error) {
    console.error("Error fetching worst year", error);
    throw error;
  }
};

export const getComplaintsByYear = async (make, model) => {
  try {
    const response = await http.get(`/complaints/${make}/${model}/complaints-by-year`);
    return response.data;
  } catch (error) {
    console.error("Error fetching complaints by year", error);
    throw error;
  }
};

export const getWorstProblems = async (make, model) => {
  try {
    const response = await http.get(`/complaints/${make}/${model}/worst-problems`);
    return response.data;
  } catch (error) {
    console.error("Error fetching worst problems", error);
    throw error;
  }
};

export const getAllComplaints = async (make, model) => {
  try {
    const response = await http.get(`/complaints/${make}/${model}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching all complaints", error);
    throw error;
  }
};