const Airtable = require('airtable');
const base = new Airtable({
    apiKey: process.env.AIRTABLE_API_KEY
}).base(
    process.env.AIRTABLE_BASE_KEY
);

const table = base('Coffee-Stores');

const createCoffeeStore = async (req, res) => {
    if (req.method === 'POST') {
        try {
            const findRecord = await table.select({
                filterByFormula: `storeid="0"`
            }).firstPage();
        
            if (findRecord.length !== 0) {
                const CoffeeShop = findRecord.map((record) => {
                    return {
                        ...record.fields
                    };
                });
                res.json(CoffeeShop);
            } else {
                res.json({ message: 'create a record' });
            };
        } catch (error) {
            console.log('there was an error: ', error);
            res.status(500);
            res.json({ message: 'Something went wrong', error });
        };
    }
};

export default createCoffeeStore;