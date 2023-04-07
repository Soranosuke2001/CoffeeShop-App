const Airtable = require("airtable");
const base = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY,
}).base(process.env.AIRTABLE_BASE_KEY);

const table = base("Coffee-Stores");

const createCoffeeStore = async (req, res) => {
  if (req.method === "POST") {
    const {
      storeId,
      name,
      formatted_address,
      region,
      locality,
      voting,
      imageURL,
    } = req.body;
    try {
        if (storeId) {

            const findRecord = await table
              .select({
                filterByFormula: `storeId=${storeId}`,
              })
              .firstPage();
      
            if (findRecord.length !== 0) {
              const CoffeeShop = findRecord.map((record) => {
                return {
                  ...record.fields,
                };
              });
              res.json(CoffeeShop);
            } else {
              if (name) {
                const newRecord = await table.create([
                  {
                    fields: {
                      storeId,
                      name,
                      formatted_address,
                      region,
                      locality,
                      voting,
                      imageURL,
                    },
                  },
                ]);
                const newShop = newRecord.map((record) => {
                  return {
                    ...record.fields,
                  };
                });
                res.status(200);
                res.json({ record: newShop });
              } else {
                res.status(422);
                res.json({ message: "The name is required" });
              }
            }
        } else {
            res.status(422);
            res.json({ message: "The storeId is required" });
        }
    } catch (error) {
      console.log("There was an error creating or finding a store: ", error);
      res.status(500);
      res.json({ message: "Something went wrong", error });
    }
  }
};

export default createCoffeeStore;
