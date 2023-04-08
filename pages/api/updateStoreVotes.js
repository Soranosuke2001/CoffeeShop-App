import { searchCoffeeStore, table } from "@/lib/airtable";

const updateStoreVote = async (req, res) => {
    if (req.method === 'PUT') {
        try {
            const { storeId } = req.body;

            if (storeId) {
                const records = await searchCoffeeStore(storeId);
                const { recordId } = records[0];

                if (records.length !== 0) {
                    const newVote = parseInt(records[0].voting) + 1;
                    console.log(newVote);

                    const updateRecord = await table.update([
                        {
                            id: recordId,
                            fields: {
                                voting: newVote
                            }
                        }
                    ]);

                    if (updateRecord) {
                        res.json({ updateRecord })
                    } else {
                        res.status(500);
                        res.json({ message: 'There was an error updating the vote count' })
                    }
                } else {
                    res.json({ message: `Coffee storeId: ${storeId}, could not be found` });
                };
            } else {
                res.status(422);
                res.json({ message: 'storeId is required' });
            }
        } catch (error) {   
            res.status(500);
            res.json({ message: 'Error changing upvote count', error });
        }
    } else {
        res.status(400);
        res.json({ message: 'Invalid Request' });
    };
};

export default updateStoreVote;