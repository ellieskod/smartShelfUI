import { useState } from "react";
import { addItem } from "../api/client";

function useAddItem() {

    //adding an item to the API with enetered name, returning id, and handling loading and error states
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [data, setData] = useState(null);

    const execute = async (input) => {
        setLoading(true);
        try {
            //handle both string input (from barcode) and object input (from form)
            const nameValue = typeof input === "string" ? input : input.name;
            const res = await addItem({ name: nameValue });
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