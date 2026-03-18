import { useState } from "react";
import useItems from "./hooks/useItems";
import useAddItem from "./hooks/useAddItem";
import useDeleteItem from "./hooks/useDeleteItem";
import ConnectionTest from "./components/ConnectionTest";
import RemovedItems from "./components/RemovedItems";
import AddItemForm from "./components/AddItemForm";
import OnShelfItems from "./components/OnShelfItems";

//main component
function App() {


  //render UI with mode indicator and result display
  return (
    <main className="app">
      <h1>Smart Shelf UI</h1>
        <AddItemForm onAdd={() => refetch()} />
        <div className="item-card-container">
           <h2>On Shelf</h2>
           <OnShelfItems />
           <h2>Removed</h2>
           <RemovedItems />
        </div>
    </main>
  );
}

export default App;
