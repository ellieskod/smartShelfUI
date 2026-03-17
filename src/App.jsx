import { useState } from "react";
import useItems from "./hooks/useItems";
import useAddItem from "./hooks/useAddItem";
import useDeleteItem from "./hooks/useDeleteItem";
import ConnectionTest from "./components/ConnectionTest";

//main component
function App() {


  //render UI with mode indicator and result display
  return (
    <main className="app">
      <h1>smartShelfUI</h1>
      <ConnectionTest />
        <h2>Items</h2>
    </main>
  );
}

export default App;
