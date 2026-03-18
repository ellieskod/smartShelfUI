import { useState } from "react";
import useAddItem from "../hooks/useAddItem";

function AddItemForm({ onAdd }) {
    const [name, setName] = useState("");
    const { execute, loading, error } = useAddItem();

    async function handleSubmit(event) {
        event.preventDefault();
        await execute({ name });
        setName("");
        onAdd();
    }

    return (
        <form className="add-item-form" onSubmit={handleSubmit}>
            <input type="text" className="input" value={name} onChange={(e) => setName(e.target.value)} placeholder="Item name" required />
            <button type="submit" className="btn" disabled={loading}>Add Item</button>
            {error && <p className="error">{error}</p>}
        </form>
    );
}

export default AddItemForm;