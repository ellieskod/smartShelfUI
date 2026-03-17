import { useState } from "react";
import { addItem } from "../api/client";

function useAddItem() {

    //adding an item to the API with enetered name, returning id, and handling loading and error states
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [data, setData] = useState(null);

    const execute = async (name) => {
        setLoading(true);
        try {
            const res = await addItem(name);
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

export default useAddItem;