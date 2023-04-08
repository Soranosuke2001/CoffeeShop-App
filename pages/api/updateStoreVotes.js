import { searchCoffeeStore } from "@/lib/airtable";

const updateStoreVote = async (req, res) => {
    if (req.method === 'PUT') {
        try {
            const { storeId } = req.body;

            if (storeId) {
                const records = await searchCoffeeStore(storeId);
    
                if (records.length !== 0) {
                    res.json(records);
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