import { fetchCoffeeStores } from "@/lib/fetch-coffeeStores";

const getCoffeeStoresByLocation = async (req, res) => {
    const { latLong, limit } = req.query;

    try {
        const response = await fetchCoffeeStores(latLong, limit);

        res.status(200);
        res.json(response);
    } catch (error) {
        console.log('There was an error');
        res.status(500);
        res.json({ message: 'Error: ', error })
    };
};

export default getCoffeeStoresByLocation;