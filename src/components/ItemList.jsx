import useItems from "../hooks/useItems";
import ItemCard from "./ItemCard";

function ItemList({  }) {
    const { loading, error, data } = useItems();

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="item-list">
            <h2>On shelf</h2>
            {Object.entries(data.items).map(([id, item]) => (
                <ItemCard key={id} id={id} name={item.name} weight={item.weight} />
            ))}
            <h2>Removed</h2>
            {Object.entries(data.removed).map(([id, item]) => (
                <ItemCard key={id} id={id} name={item.name} weight={item.weight} />
            ))}
        </div>
    );
}

export default ItemList;