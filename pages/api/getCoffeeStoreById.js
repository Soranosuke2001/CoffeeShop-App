import { getRecords, table, searchCoffeeStore } from "@/lib/airtable";

const getCoffeeStoreById = async (req, res) => {
  const { storeId } = req.query;

  try {
    if (storeId) {
      const coffeeShop = await searchCoffeeStore(storeId);

      if (coffeeShop.length !== 0) {
        res.json(coffeeShop);
      } else {
        res.status(400);
        res.json({ message: `storeId: ${storeId}, could not be found` });
      }
    } else {
      res.status(422);
      res.json({ message: "storeId is required" });
    }
  } catch (error) {
    res.status(500);
    res.json({ message: "Something went wrong", error });
  }
};

export default getCoffeeStoreById;
