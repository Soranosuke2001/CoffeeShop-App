const Airtable = require('airtable');
const base = new Airtable({
    apiKey: process.env.AIRTABLE_API_KEY
}).base(
    process.env.AIRTABLE_BASE_KEY
);

const table = base('Coffee-Stores');

console.log(table)

const createCoffeeStore = async (req, res) => {
    if (req.method === 'POST') {
        const findRecord = await table.select({
            filterByFormula: `storeid="0"`
        }).firstPage();
    
        if (findRecord.length !== 0) {
            res.json(findRecord);
        } else {
            res.json({ message: 'create a record' })
        }
    }
};

export default createCoffeeStore;