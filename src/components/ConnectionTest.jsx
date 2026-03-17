import { useState, useEffect } from "react";
import { testApi } from "../api/client";

function ConnectionTest() {

    //testing connection to the API, returning response and handling loading and error states
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [data, setData] = useState(null);
    useEffect(() => {
        setLoading(true);
        testApi()
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

    return (
        <div>
            <h2>Connection Test</h2>
            {loading && <p>Testing connection...</p>}
            {error && <p className="error">Error: {error}</p>}
            {data && <p>API Response: {JSON.stringify(data)}</p>}
        </div>
    );
};

export default ConnectionTest;
