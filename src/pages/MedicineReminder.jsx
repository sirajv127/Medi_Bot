import { useState } from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';

function MedicineReminder() {
  const [medicines, setMedicines] = useState([]);
  const [newMedicine, setNewMedicine] = useState({
    name: '',
    date: '',
    time: '',
    status: 'pending'
  });

  const handleAddMedicine = () => {
    if (newMedicine.name && newMedicine.date && newMedicine.time) {
      setMedicines([...medicines, { ...newMedicine, id: Date.now() }]);
      setNewMedicine({ name: '', date: '', time: '', status: 'pending' });
    }
  };

  const handleMarkAsTaken = (id) => {
    setMedicines(medicines.map(medicine => 
      medicine.id === id ? { ...medicine, status: 'taken' } : medicine
    ));
  };

  const handleDelete = (id) => {
    setMedicines(medicines.filter(medicine => medicine.id !== id));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Medicine Reminder</h1>

        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="Medicine Name"
              value={newMedicine.name}
              onChange={(e) => setNewMedicine({ ...newMedicine, name: e.target.value })}
              className="w-full p-2 border rounded-md"
            />
            <input
              type="date"
              value={newMedicine.date}
              onChange={(e) => setNewMedicine({ ...newMedicine, date: e.target.value })}
              className="w-full p-2 border rounded-md"
            />
            <input
              type="time"
              value={newMedicine.time}
              onChange={(e) => setNewMedicine({ ...newMedicine, time: e.target.value })}
              className="w-full p-2 border rounded-md"
            />
            <button
              onClick={handleAddMedicine}
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
            >
              Add Medicine
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Medicine Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {medicines.map((medicine) => (
                <tr key={medicine.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{medicine.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {format(new Date(medicine.date), 'MMM dd, yyyy')}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{medicine.time}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      medicine.status === 'taken' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {medicine.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {medicine.status === 'pending' && (
                      <button
                        onClick={() => handleMarkAsTaken(medicine.id)}
                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                      >
                        Mark as Taken
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(medicine.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}

export default MedicineReminder;