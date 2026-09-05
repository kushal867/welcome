function ProductCard({ product, canManage, onEdit, onDelete }) {
  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md">
      <div className="aspect-square w-full bg-slate-100">
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-slate-300">
            No image
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-1 p-4">
        {product.category && (
          <span className="w-fit rounded-full bg-indigo-50 px-2 py-0.5 text-xs font-medium text-indigo-600">
            {product.category.name}
          </span>
        )}
        <h3 className="font-medium text-slate-900">{product.name}</h3>
        <p className="mt-auto text-lg font-semibold text-slate-900">
          ${Number(product.price).toFixed(2)}
        </p>
      </div>

      {canManage && (
        <div className="flex gap-2 border-t border-slate-100 p-3">
          <button
            onClick={() => onEdit(product)}
            className="flex-1 rounded-md bg-slate-100 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-200"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(product)}
            className="flex-1 rounded-md bg-red-50 py-1.5 text-sm font-medium text-red-600 hover:bg-red-100"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}

export default ProductCard;
