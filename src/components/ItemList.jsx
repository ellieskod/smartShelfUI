import useItems from "../hooks/useItems";
import ItemCard from "./ItemCard";
import useDeleteItem from "../hooks/useDeleteItem";
import { useEffect } from "react";

function ItemsList() {
    const { execute: deleteItem } = useDeleteItem();
    const { loading, error, data, refetch } = useItems();

    useEffect(() => {
        const interval = setInterval(() => refetch(), 3000);
        return () => clearInterval(interval);
    }, []);

    function handleDelete(id) {
    //delete functionality
        deleteItem(id)
        .then(() => refetch())
        .catch((err) => console.error("Delete failed:", err));
    }

    if (loading && !data) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!data) return null;

    return (
        <div className="item-list">
            <h2>On Shelf</h2>
            {Object.entries(data.items || {}).map(([id, item]) => (
                <ItemCard key={id} id={id} name={item.name} weight={item.weight} onDelete={handleDelete} />
            ))}
            <h2>Removed</h2>
            {Object.entries(data.removed || {}).map(([id, item]) => (
                <ItemCard key={id} id={id} name={item.name} weight={item.weight} onDelete={handleDelete} />
            ))}
        </div>
    );
}



export default ItemsList;