import { useState, useEffect } from "react";
import { items } from "../api/client";

function useItems() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [data, setData] = useState(null);

    const fetchItems = () => {
        setLoading(true);
        items()
        .then((res) => { setData(res); setError(""); })
        .catch((err) => { setError(err.message); setData(null); })
        .finally(() => setLoading(false));
    };

    useEffect(() => { fetchItems(); }, []);

    return { loading, error, data, refetch: fetchItems };
};

export default useItems;


