import React, { useState } from "react";
import useItems from "../hooks/useItems";
import useAddItem from "../hooks/useAddItem";
import AddItemForm from "../components/AddItemForm";
import OnShelfItems from "../components/OnShelfItems";
import RemovedItems from "../components/RemovedItems";
import { BarcodeScanner } from "react-barcode-scanner";
import "react-barcode-scanner/polyfill";

function ShelfPage() {
  const { refetch } = useItems();
  const { execute: addItem } = useAddItem();
  const [scanning, setScanning] = useState(false);
  const [scanStatus, setScanStatus] = useState(null); //feedback message
  
  const handleScan = async (barcodes) => {
    if (!barcodes || barcodes.length === 0) return;

    const barcode = barcodes[0].rawValue; // <-- rawValue, not .text
    setScanning(false);
    setScanStatus("Looking up product...");

    try {
      const res = await fetch(
        `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`
      );
      const data = await res.json();

      const productName =
        data.status === 1
          ? `${data.product.brands || "Unknown"} ${data.product.product_name_sv || data.product.product_name_en || data.product.product_name || "Product"}`
          : barcode;

      //add item to shelf and refresh list
      await addItem(productName);      
      refetch();
      
      //show success message with product name
      setScanStatus(`"${productName}" added to shelf`);

      //continue scanning for next item
      setScanning(true);
    } catch (err) {
      setScanStatus("Failed to add scanned item. Please try again or add manually");
    }
  };
  return (
    <main className="app">
      <div className="header">
        <h1>Smart Shelf UI</h1>
        <div className="header-controls">
          <AddItemForm onAdd={() => refetch()} />
          <button className="btn" onClick={() => setScanning((prev) => !prev)}>
            {scanning ? "Cancel Scan" : "Scan Barcode"}
          </button>
        </div>
      </div>
      {scanStatus && <p className="scan-status">{scanStatus}</p>}
      {scanning && (
        <div className="scanner-container">
          <BarcodeScanner
            onCapture={handleScan}
            options={{
              formats: ["ean_13", "ean_8", "upc_a", "upc_e", "code_128", "code_39", "qr_code"],
              
              //delay between scans to prevent duplicates
              delay: 300,
            }}
          />
        </div>
      )}
      <div className="item-card-container">
        <h2>Items on Shelf</h2>
        <OnShelfItems />
        <h2>Items not on Shelf</h2>
        <RemovedItems />
      </div>
    </main>
  );
}

export default ShelfPage;