import { useState } from "react";
import useItems from "./hooks/useItems";
import useAddItem from "./hooks/useAddItem";
import useDeleteItem from "./hooks/useDeleteItem";
import ConnectionTest from "./components/ConnectionTest";
import ItemsList from "./components/ItemList";
import AddItemForm from "./components/AddItemForm";


//main component
function App() {


  //render UI with mode indicator and result display
  return (
    <main className="app">
      <h1>smartShelfUI</h1>
      <AddItemForm onAdd={() => refetch()} />
      <ItemsList />
    </main>
  );
}

export default App;
