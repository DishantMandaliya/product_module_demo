import type { Product } from '../../types';

interface DeleteConfirmModalProps {
    product: Product | null;
    onConfirm: () => void;
    onCancel: () => void;
}

const DeleteConfirmModal = ({ product, onConfirm, onCancel }: DeleteConfirmModalProps) => {
  debugger
  console.log('DeleteConfirmModal rendered with product:', product);
    if (!product) return null;

    const productName = product.product_name || product.productName || 'this product';

    const handleConfirm = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        onConfirm();
    };

    const handleCancel = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        onCancel();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
                <p className="text-gray-600 mb-6">
                    Are you sure you want to delete "{productName}"? This action cannot be undone.
                </p>
                <div className="flex justify-end space-x-3">
                    <button
                        onClick={handleCancel}
                        className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleConfirm}
                        className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfirmModal;