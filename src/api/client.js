let TOKEN = null;
let APIbase = "/api";

if (import.meta.env.VITE_USE_DIRECT_API === "true") {
    APIbase = import.meta.env.VITE_DIRECT_API_BASE_URL;
    TOKEN = import.meta.env.VITE_DIRECT_API_TOKEN;
}

async function request(path, options = {}) {
    
    if(TOKEN && options.method === "POST") {
        
        //todo, for real implementation, should include token in headers, not body 
        options.body = JSON.stringify({
            ...JSON.parse(options.body || "{}"),
            ...(TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {}),
        });
    }

    const response = await fetch(`${APIbase}${path}`, {
        ...options,
        headers: {
            ...options.headers,
            "Content-Type": "application/json",
            
        },
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "API request failed");
    }
    return response.json();
}

//test endpoint to verify API connectivity
export const testApi = () => request("");

//todo: fix best practice for including token in requests - in headers for real implementation

//endpoint for fetching all items from the API
export const items = () => request("/items?token=" + TOKEN);

//endpoint for adding an item from UI input
export const addItem = (add_item) =>
    request("/add_item", {
        method: "POST",
        body: JSON.stringify(add_item)
    });


//endpoint for deleting an item from UI input
export const deleteItem = (delete_item) => 
    request("/delete", {
        method: "POST",
        body: JSON.stringify(delete_item)
    });