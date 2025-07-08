import React from 'react';

function TransactionList({ transactions, handleEdit, deleteTransaction }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Transações</h2>
      <div className="overflow-x-auto">
        <div className="space-y-4 max-w-lg mx-auto">
          {transactions.map((transaction) => (
            <div key={transaction.id} className="bg-gray-50 p-4 rounded-lg shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center">
              <div className="flex-1 mb-2 sm:mb-0">
                <p className="text-lg font-semibold text-gray-800">{transaction.description}</p>
                <span className="inline-block bg-blue-200 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">{transaction.category}</span>
                {/* Updated to show both date and time */}
                <p className="text-sm text-gray-500">
                  {new Date(transaction.date.seconds * 1000).toLocaleDateString()} &nbsp;
                  {new Date(transaction.date.seconds * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
                <p className={`text-xl font-bold ${transaction.type === 'revenue' ? 'text-green-600' : 'text-red-600'}`}>
                  R$ {typeof transaction.value === 'number' ? transaction.value.toFixed(2) : '0.00'}
                </p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(transaction)}
                  className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-3 rounded text-xs"
                >
                  Editar
                </button>
                <button
                  onClick={() => deleteTransaction(transaction.id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded text-xs"
                >
                  Excluir
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TransactionList;