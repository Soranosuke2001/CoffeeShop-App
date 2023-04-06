import { useRouter } from "next/router";

const CoffeeStore = () => {
    const router = useRouter();

    const { storeId } = router.query;
    return (
        <h1>{storeId}</h1>
    );
};

export default CoffeeStore;