
function ItemCard({ id, name, weight, onDelete }) {
    return (
        <div className="item-card">
            <button className="btn-delete" aria-label="Delete" onClick={() => onDelete(id)}>x</button>
            <h3>{name}</h3>
            <p>Weight: {weight}g</p>
        </div>
    );
}

export default ItemCard;