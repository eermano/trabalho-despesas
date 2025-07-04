import React from 'react';

function Summary({ totalRevenue, totalExpense, balance }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="bg-green-100 p-4 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-green-800">Total Receitas</h3>
        <p className="text-2xl font-bold text-green-600">R$ {totalRevenue.toFixed(2)}</p>
      </div>
      <div className="bg-red-100 p-4 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-red-800">Total Despesas</h3>
        <p className="text-2xl font-bold text-red-600">R$ {totalExpense.toFixed(2)}</p>
      </div>
      <div className="bg-blue-100 p-4 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-blue-800">Saldo Total</h3>
        <p className="text-2xl font-bold text-blue-600">R$ {balance.toFixed(2)}</p>
      </div>
    </div>
  );
}

export default Summary;
