import React, { useState, useEffect } from 'react';
import { Timestamp } from 'firebase/firestore';

// You might want to define your categories in a separate file or as a constant
const CATEGORIES = [
  'Alimentação',
  'Transporte',
  'Moradia',
  'Salário',
  'Investimentos',
  'Lazer',
  'Saúde',
  'Educação',
  'Outros',
];

function TransactionForm({ addOrUpdateTransaction, editingTransaction, setEditingTransaction, onClose }) {
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]); // Set initial category to the first one
  const [dateTime, setDateTime] = useState(''); // Combined date and time state
  const [type, setType] = useState('revenue'); // 'revenue' or 'expense'

  useEffect(() => {
    if (editingTransaction) {
      setDescription(editingTransaction.description);
      setValue(editingTransaction.value);
      setCategory(editingTransaction.category);
      // Convert Firebase Timestamp to a local datetime string for input
      const dateObj = editingTransaction.date.toDate();
      const year = dateObj.getFullYear();
      const month = String(dateObj.getMonth() + 1).padStart(2, '0');
      const day = String(dateObj.getDate()).padStart(2, '0');
      const hours = String(dateObj.getHours()).padStart(2, '0');
      const minutes = String(dateObj.getMinutes()).padStart(2, '0');
      setDateTime(`${year}-${month}-${day}T${hours}:${minutes}`);
      setType(editingTransaction.type);
    } else {
      setDescription('');
      setValue('');
      setCategory(CATEGORIES[0]); // Reset to first category
      setDateTime('');
      setType('revenue');
    }
  }, [editingTransaction]);

  const handleSubmit = (e) => {
    e.preventDefault();
    addOrUpdateTransaction({
      description,
      value: parseFloat(value),
      category,
      date: Timestamp.fromDate(new Date(dateTime)), // Convert combined date-time string to Date object then to Timestamp
      type,
    });
    setDescription('');
    setValue('');
    setCategory(CATEGORIES[0]); // Reset to first category
    setDateTime('');
    setType('revenue');
    setEditingTransaction(null);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">{editingTransaction ? 'Editar Transação' : 'Adicionar Nova Transação'}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">Descrição:</label>
          <input
            type="text"
            id="description"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="value" className="block text-gray-700 text-sm font-bold mb-2">Valor:</label>
          <input
            type="number"
            id="value"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            step="0.01"
            required
          />
        </div>
        <div>
          <label htmlFor="category" className="block text-gray-700 text-sm font-bold mb-2">Categoria:</label>
          <select
            id="category"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="dateTime" className="block text-gray-700 text-sm font-bold mb-2">Data e Hora:</label>
          <input
            type="datetime-local" // Changed to datetime-local
            id="dateTime"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={dateTime}
            onChange={(e) => setDateTime(e.target.value)}
            required
          />
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Tipo:</label>
        <div className="mt-2">
          <label className="inline-flex items-center mr-4">
            <input
              type="radio"
              className="form-radio text-indigo-600"
              name="type"
              value="revenue"
              checked={type === 'revenue'}
              onChange={(e) => setType(e.target.value)}
            />
            <span className="ml-2 text-gray-700">Receita</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              className="form-radio text-pink-600"
              name="type"
              value="expense"
              checked={type === 'expense'}
              onChange={(e) => setType(e.target.value)}
            />
            <span className="ml-2 text-gray-700">Despesa</span>
          </label>
        </div>
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        {editingTransaction ? 'Atualizar Transação' : 'Adicionar Transação'}
      </button>
      {editingTransaction && (
        <button
          type="button"
          onClick={() => {
            setEditingTransaction(null);
            onClose(); // Close modal when canceling edit
          }}
          className="ml-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Cancelar Edição
        </button>
      )}
    </form>
  );
}

export default TransactionForm;