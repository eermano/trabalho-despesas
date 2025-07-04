import React, { useState, useEffect } from 'react';
import { Timestamp } from 'firebase/firestore';

function TransactionForm({ addOrUpdateTransaction, editingTransaction, setEditingTransaction, onClose }) {
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [type, setType] = useState('revenue'); // 'revenue' or 'expense'

  useEffect(() => {
    if (editingTransaction) {
      setDescription(editingTransaction.description);
      setValue(editingTransaction.value);
      setCategory(editingTransaction.category);
      setDate(editingTransaction.date.toDate().toISOString().split('T')[0]);
      setType(editingTransaction.type);
    } else {
      setDescription('');
      setValue('');
      setCategory('');
      setDate('');
      setType('revenue');
    }
  }, [editingTransaction]);

  const handleSubmit = (e) => {
    e.preventDefault();
    addOrUpdateTransaction({
      description,
      value: parseFloat(value),
      category,
      date: Timestamp.fromDate(new Date(date)),
      type,
    });
    setDescription('');
    setValue('');
    setCategory('');
    setDate('');
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
          <input
            type="text"
            id="category"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="date" className="block text-gray-700 text-sm font-bold mb-2">Data:</label>
          <input
            type="date"
            id="date"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={date}
            onChange={(e) => setDate(e.target.value)}
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
          onClick={() => setEditingTransaction(null)}
          className="ml-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Cancelar Edição
        </button>
      )}
    </form>
  );
}

export default TransactionForm;
