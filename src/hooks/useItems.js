import { useState, useEffect } from "react";
import { items } from "../api/client";

function useItems() {

    //fetching items from the API
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [data, setData] = useState(null);

    useEffect(() => {
        setLoading(true);
        items()
        .then((res) => {
            setData(res);
            setError("");
        }
        )
        .catch((err) => {
            setError(err.message);
            setData(null);
        })
        .finally(() => {
            setLoading(false);
        });
    }, []);

    return { loading, error, data };
};

export default useItems;


