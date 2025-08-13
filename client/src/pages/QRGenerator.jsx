import React, { useState, useEffect } from 'react';
// The import below has been changed to a more stable, base QR code library.
import QRCode from 'https://esm.sh/qrcode';

// Main QR Code Generator Component
export default function QRGenerator() {
    // State to hold the text from the input field
    const [text, setText] = useState('');
    // State to hold the final value for QR code generation
    const [qrValue, setQrValue] = useState('');
    // State to hold the generated QR code image URL
    const [qrCodeUrl, setQrCodeUrl] = useState('');

    // This effect hook runs whenever the text to be encoded (qrValue) changes.
    // It uses the qrcode library to generate a data URL for the image.
    useEffect(() => {
        if (qrValue) {
            // Options for the QR code to control size and border
            const opts = {
                errorCorrectionLevel: 'H',
                width: 256,
                margin: 2,
            };
            QRCode.toDataURL(qrValue, opts)
                .then(url => {
                    setQrCodeUrl(url);
                })
                .catch(err => {
                    console.error("QR Code generation failed:", err);
                });
        } else {
            // If there's no text to encode, clear the image URL
            setQrCodeUrl('');
        }
    }, [qrValue]); // This effect depends on the qrValue state

    // Handles the "Generate QR Code" button click
    const handleGenerate = () => {
        if (!text) {
            console.log("Input is empty, not generating QR code.");
            return;
        }
        // Set the text to be encoded, which will trigger the useEffect hook
        setQrValue(text);
    };

    // Handles downloading the QR code as a PNG image
    const handleDownload = () => {
        if (!qrCodeUrl) {
            console.log("No QR code to download.");
            return;
        }
        // Create a temporary link element to trigger the browser download
        let downloadLink = document.createElement("a");
        downloadLink.href = qrCodeUrl;
        downloadLink.download = "qrcode.png";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    };
    
    // Clears the input field and the generated QR code
    const handleClear = () => {
        setText('');
        setQrValue('');
    };

    return (
        <div className="bg-[#4a2e1c] min-h-screen flex flex-col items-center justify-center p-4 font-sans">
            <div className="w-full max-w-4xl">
                <h1 className="text-3xl text-white text-center mb-4">QR Code Generator</h1>
                <p className="text-lg text-gray-300 text-center mb-8">Enter a URL or text to create a QR code.</p>

                <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-white/20">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        
                        {/* Input Section */}
                        <div className="flex flex-col justify-between">
                            <div>
                                <label htmlFor="qr-text" className="text-white font-semibold mb-2 block">
                                    Text or URL
                                </label>
                                <textarea
                                    id="qr-text"
                                    rows="6"
                                    value={text}
                                    onChange={(e) => setText(e.target.value)}
                                    className="w-full bg-[#2e1d12] p-3 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8a4a22] transition-all"
                                    placeholder="Enter text or URL to encode..."
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4 mt-4">
                                <button
                                    onClick={handleGenerate}
                                    className="bg-[#8a4a22] hover:bg-[#a56a42] text-white font-bold py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
                                >
                                    Generate QR Code
                                </button>
                                <button
                                    onClick={handleClear}
                                    className="bg-gray-500/50 hover:bg-gray-500/80 text-white font-bold py-3 px-4 rounded-lg transition-colors"
                                >
                                    Clear
                                </button>
                            </div>
                        </div>

                        {/* QR Code Output Section */}
                        <div className="flex flex-col items-center justify-center bg-[#2e1d12] p-6 rounded-lg">
                            <div className="bg-white p-4 rounded-lg shadow-inner">
                                {qrCodeUrl ? (
                                    <img src={qrCodeUrl} alt="Generated QR Code" />
                                ) : (
                                    <div className="w-64 h-64 flex items-center justify-center text-gray-400 text-center p-4">
                                        Your QR Code will appear here
                                    </div>
                                )}
                            </div>
                            {qrCodeUrl && (
                                <button
                                    onClick={handleDownload}
                                    className="w-full mt-4 bg-[#8a4a22] hover:bg-[#a56a42] text-white font-bold py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                    Download
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
