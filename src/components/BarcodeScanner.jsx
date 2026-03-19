import { BarcodeScanner } from 'react-barcode-scanner'

function BarcodeScannerComponent() {
    function handleScan(data) {
        console.log("Scanned barcode:", data);
    }

    return (
        <BarcodeScanner
            onUpdate={(err, result) => {
                if (result) handleScan(result.text);
            }}
        />
    );
}

export default BarcodeScannerComponent;