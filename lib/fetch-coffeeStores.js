import { createApi } from "unsplash-js";

const unsplash = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY,
});

const fsqAPIURL = (latLong, query, limit) => {
  return `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latLong}&limit=${limit}`;
};

const fetchStoreImages = async () => {
  const images = await unsplash.search.getPhotos({
    query: "coffee shops",
    perPage: 30,
  });

  console.log(images);

  const imageList = images.response.results.map(
    (result) => result.urls["small"]
  );
  return imageList;
};

export const fetchCoffeeStores = async (
  latLong = "43.65267326999575,-79.39545615725015",
  limit = 6
) => {
  const imageList = await fetchStoreImages();

  const options = {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY,
    },
  };

  const response = await fetch(fsqAPIURL(latLong, "coffee", limit), options);

  const data = await response.json();
  return data.results.map((result, index) => {
    const location = result.location;

    return {
      id: result.fsq_id,
      name: result.name,
      formatted_address: location.formatted_address,
      locality: location.locality,
      region: location.region,
      imageURL: imageList[index],
    };
  });
};
