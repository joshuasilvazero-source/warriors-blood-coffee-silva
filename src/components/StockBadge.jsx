export default function StockBadge({ stock, loading }) {
    if (loading) return <span className="text-xs text-gray-500 tracking-wider">...</span>;
    if (stock == null) return null;
    if (stock <= 0) {
        return (
            <span className="text-xs font-bold uppercase tracking-widest text-red-500">
                Out-of-Stock
            </span>
        );
    }
    return (
        <span className="text-xs font-bold uppercase tracking-widest text-green-400">
            In-Stock ({stock})
        </span>
    );
}
