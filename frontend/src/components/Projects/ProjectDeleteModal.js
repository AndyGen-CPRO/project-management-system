const ProjectDelete = ({ onConfirm, onCancel }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">Confirm Deletion</h2>
            <p className="text-gray-700 text-center mb-6">
                Are you sure you want to delete this project? This action cannot be undone.
            </p>
            <div className="flex justify-between">
                <button
                    onClick={onCancel}
                    className="px-4 py-2 bg-gray-600 text-white font-semibold rounded-md shadow-md hover:bg-gray-700 transition duration-300"
                >
                    Cancel
                </button>
                <button
                    onClick={onConfirm}
                    className="px-4 py-2 bg-red-600 text-white font-semibold rounded-md shadow-md hover:bg-red-700 transition duration-300"
                >
                    Delete
                </button>
            </div>
        </div>
    </div>
);

export default ProjectDelete