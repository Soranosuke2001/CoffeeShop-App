export const fetchCoffeeStores = async () => {
    const options = {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: process.env.FOURSQUARE_API_KEY,
        },
      };
    
      const response = await fetch(
        "https://api.foursquare.com/v3/places/search?query=coffee&ll=43.653833032607096%2C-79.37896808855945&limit=6",
        options
      );
    
      const data = await response.json();
      return data.results;
};
