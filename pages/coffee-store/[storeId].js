import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const CoffeeStore = () => {
    const router = useRouter();

    const { storeId } = router.query;
    
    return (
        <React.Fragment>
            <Link href='/'>Back to home</Link>
            <h1>{storeId}</h1>
        </React.Fragment>
    );
};

export default CoffeeStore;