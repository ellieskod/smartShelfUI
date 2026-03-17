
function ItemCard({ id, name, weight, onDelete }) {
    return (
        <div className="item-card">
            <h3>{name}</h3>
            <p>Weight: {weight}g</p>
            <button className="btn delete" onClick={() => onDelete(id)}>Delete</button>
        </div>
    );
}

export default ItemCard;