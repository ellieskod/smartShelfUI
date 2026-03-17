import { useState } from "react";
import { deleteItem } from "../api/client";

function useDeleteItem() {

    //deleting an item from the API with given id
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [data, setData] = useState(null);

    const execute = async (id) => {
        setLoading(true);
        try {
            const res = await deleteItem(id);
            setData(res);
            setError("");
        }
        catch (err) {
            setError(err.message);
            setData(null);
        }
        finally {
            setLoading(false);
        }
    };

    return { execute, loading, error };
};

export default useDeleteItem;

