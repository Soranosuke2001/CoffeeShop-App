import { getRecords, table } from "@/lib/airtable";

const getCoffeeStoreById = async (req, res) => {
    const { storeId } = req.query;

    try {
        if (storeId) {
            const findRecord = await table
            .select({
              filterByFormula: `storeId="${storeId}"`,
            })
            .firstPage();
  
          if (findRecord.length !== 0) {
            const coffeeShop = getRecords(findRecord);
            res.json(coffeeShop);
          
            res.json({ message: `${storeId} was created` });
          } else {
            res.status(400);
            res.json({ message: `storeId: ${storeId}, could not be found` })
          }
        } else {
            res.status(422);
            res.json({ message: 'storeId is required' });
        };

    } catch (error) {
        res.status(500);
        res.json({ message: 'Something went wrong', error });
    };
};

export default getCoffeeStoreById;