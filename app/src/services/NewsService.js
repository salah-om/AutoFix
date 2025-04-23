import http from "../http-common";

/*
----------------------------------------------------------------------------------
  Purpose: Fetch automotive-related news articles using the News API
  Return:  Array of articles related to "vehicles"
----------------------------------------------------------------------------------
*/
export const fetchVehicleNews = async () => {
    const response = await http.get("https://newsapi.org/v2/everything?q=vehicles&apiKey=780d2620d8de4c9fb8e11eeeae603969&pageSize=10");
    return response.data.articles;
};
