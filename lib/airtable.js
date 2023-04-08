const Airtable = require("airtable");
const base = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY,
}).base(process.env.AIRTABLE_BASE_KEY);

export const table = base("Coffee-Stores");

export const getRecords = (records) => {
  return records.map((record) => {
    return {
      recordId: record.id,
      ...record.fields,
    };
  });
};

export const searchCoffeeStore = async (storeId) => {
  const findRecord = await table
    .select({
      filterByFormula: `storeId="${storeId}"`,
    })
    .firstPage();

    return getRecords(findRecord);
};
