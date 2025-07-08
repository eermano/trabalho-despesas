import React, { useState, useEffect } from "react";
import { db } from "./firebaseConfig";
import {
	collection,
	getDocs,
	addDoc,
	updateDoc,
	deleteDoc,
	doc,
} from "firebase/firestore";
import TransactionForm from "./components/TransactionForm";
import Modal from "./components/Modal";
import TransactionList from "./components/TransactionList";
import Summary from "./components/Summary";

function App() {
	const [transactions, setTransactions] = useState([]);
	const [editingTransaction, setEditingTransaction] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedCategory, setSelectedCategory] = useState("all");
	const [selectedType, setSelectedType] = useState("all");

	useEffect(() => {
		const fetchTransactions = async () => {
			const querySnapshot = await getDocs(collection(db, "transactions"));
			const transactionsList = querySnapshot.docs.map((doc) => ({
				id: doc.id,
				...doc.data(),
			}));
			setTransactions(transactionsList);
		};
		fetchTransactions();
	}, []);

	const addOrUpdateTransaction = async (transaction) => {
		if (editingTransaction) {
			const transactionRef = doc(db, "transactions", editingTransaction.id);
			await updateDoc(transactionRef, transaction);
			setEditingTransaction(null);
		} else {
			await addDoc(collection(db, "transactions"), transaction);
		}
		const querySnapshot = await getDocs(collection(db, "transactions"));
		const transactionsList = querySnapshot.docs.map((doc) => ({
			id: doc.id,
			...doc.data(),
		}));
		setTransactions(transactionsList);
	};

	const deleteTransaction = async (id) => {
		await deleteDoc(doc(db, "transactions", id));
		    setTransactions((prevTransactions) =>
			prevTransactions.filter((transaction) => transaction.id !== id),
		);
	};

	const handlerLimpar = ()=>{
	setSelectedCategory("all")
	setSelectedType("all")
	}

	const handleEdit = (transaction) => {
		setEditingTransaction(transaction);
		setIsModalOpen(true);
	};

	const handleAddClick = () => {
		setEditingTransaction(null);
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
		setEditingTransaction(null);
	};

	const totalRevenue = transactions
		.filter((t) => t.type === "revenue")
		.reduce((acc, t) => acc + parseFloat(t.value), 0);

	const totalExpense = transactions
		.filter((t) => t.type === "expense")
		.reduce((acc, t) => acc + parseFloat(t.value), 0);

	const balance = totalRevenue - totalExpense;

	const filteredTransactions = transactions.filter((t) => {
		const matchesCategory =
			selectedCategory === "all" || t.category === selectedCategory;
		const matchesType = selectedType === "all" || t.type === selectedType;
		return matchesCategory && matchesType;
	});

	return (
		<div className="w-screen">
			<div className="container mx-auto p-4">
				<h1 className="text-3xl font-bold mb-4">Gestão Financeira</h1>
				<Summary
					totalRevenue={totalRevenue}
					totalExpense={totalExpense}
					balance={balance}
				/>
				<div className="mb-4">
					<label
						htmlFor="categoryFilter"
						className="block text-gray-700 text-sm font-bold mb-2"
					>
						Filtrar por Categoria:
					</label>
					<select
						id="categoryFilter"
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						value={selectedCategory}
						onChange={(e) => setSelectedCategory(e.target.value)}
					>
						<option value="all">Todas as Categorias</option>
						{[...new Set(transactions.map((t) => t.category))].map(
							(category) => (
								<option key={category} value={category}>
									{category}
								</option>
							),
						)}
					</select>
				</div>
				<div className="mb-4">
					<label
						htmlFor="typeFilter"
						className="block text-gray-700 text-sm font-bold mb-2"
					>
						Filtrar por Tipo:
					</label>
					<select
						id="typeFilter"
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						value={selectedType}
						onChange={(e) => setSelectedType(e.target.value)}
					>
						<option value="all">Todos os Tipos</option>
						<option value="revenue">Receita</option>
						<option value="expense">Despesa</option>
					</select>
				</div>
				<div>
					<button
					onClick={handleAddClick}
					className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-4"
				>
					Adicionar Nova Transação
				</button>
				<button
					onClick={handlerLimpar}
					className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-4"
				>
					Limpar
				</button>
				</div>
				<Modal
					isOpen={isModalOpen}
					onClose={closeModal}
					title={
						editingTransaction ? "Editar Transação" : "Adicionar Nova Transação"
					}
				>
					<TransactionForm
						addOrUpdateTransaction={addOrUpdateTransaction}
						editingTransaction={editingTransaction}
						setEditingTransaction={setEditingTransaction}
						onClose={closeModal}
					/>
				</Modal>
				<TransactionList
					transactions={filteredTransactions}
					handleEdit={handleEdit}
					deleteTransaction={deleteTransaction}
				/>
			</div>
		</div>
	);
}

export default App;

