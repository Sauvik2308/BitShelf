import React, { useState, useEffect, useCallback } from 'react';

// Helper function to convert HEX to RGB
const hexToRgb = (hex) => {
    let shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
};

// Helper function to convert RGB to HEX
const rgbToHex = (r, g, b) => {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
};

// Helper function to convert RGB to HSL
const rgbToHsl = (r, g, b) => {
    r /= 255; g /= 255; b /= 255;
    let max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
        h = s = 0; // achromatic
    } else {
        let d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    return {
        h: Math.round(h * 360),
        s: Math.round(s * 100),
        l: Math.round(l * 100)
    };
};

// Helper function to convert HSL to RGB
const hslToRgb = (h, s, l) => {
    h /= 360; s /= 100; l /= 100;
    let r, g, b;

    if (s === 0) {
        r = g = b = l; // achromatic
    } else {
        const hue2rgb = (p, q, t) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        };
        let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        let p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }

    return {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255)
    };
};


// Main Color Picker Component
export default function ColorPicker() {
    const [color, setColor] = useState('#A52A2A');
    const [hex, setHex] = useState('#A52A2A');
    const [rgb, setRgb] = useState({ r: 165, g: 42, b: 42 });
    const [hsl, setHsl] = useState({ h: 0, s: 59, l: 41 });

    // This effect updates the main color state when other formats change.
    useEffect(() => {
        const newHex = rgbToHex(rgb.r, rgb.g, rgb.b);
        setColor(newHex);
        setHex(newHex);
    }, [rgb]);

    // This function handles changes from the color picker input.
    const handleColorChange = (e) => {
        const newHex = e.target.value.toUpperCase();
        setColor(newHex);
        setHex(newHex);
        const newRgb = hexToRgb(newHex);
        if (newRgb) {
            setRgb(newRgb);
            setHsl(rgbToHsl(newRgb.r, newRgb.g, newRgb.b));
        }
    };

    // This function handles changes from the HEX input field.
    const handleHexChange = (e) => {
        const newHex = e.target.value.toUpperCase();
        setHex(newHex);
        if (/^#[0-9A-F]{6}$/i.test(newHex) || /^#[0-9A-F]{3}$/i.test(newHex)) {
            setColor(newHex);
            const newRgb = hexToRgb(newHex);
            if (newRgb) {
                setRgb(newRgb);
                setHsl(rgbToHsl(newRgb.r, newRgb.g, newRgb.b));
            }
        }
    };
    
    // This function handles changes from the RGB input fields.
    const handleRgbChange = (e) => {
        const { name, value } = e.target;
        const newRgb = { ...rgb, [name]: parseInt(value) || 0 };
        setRgb(newRgb);
        const newHex = rgbToHex(newRgb.r, newRgb.g, newRgb.b);
        setColor(newHex);
        setHex(newHex);
        setHsl(rgbToHsl(newRgb.r, newRgb.g, newRgb.b));
    };

    // This function handles changes from the HSL input fields.
    const handleHslChange = (e) => {
        const { name, value } = e.target;
        const newHsl = { ...hsl, [name]: parseInt(value) || 0 };
        setHsl(newHsl);
        const newRgb = hslToRgb(newHsl.h, newHsl.s, newHsl.l);
        setRgb(newRgb);
        const newHex = rgbToHex(newRgb.r, newRgb.g, newRgb.b);
        setColor(newHex);
        setHex(newHex);
    };

    // Function to copy text to clipboard
    const copyToClipboard = (text) => {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        try {
            document.execCommand('copy');
            // You can add a notification here e.g., "Copied!"
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
        document.body.removeChild(textArea);
    };


    return (
        <div className="bg-[hsla(23,83%,28%,0)] min-h-screen flex flex-col items-center justify-center p-4 font-sans">
        {/* <div className="bg-[#5D2F0A] min-h-screen flex flex-col items-center justify-center p-4 font-sans"> */}
            <div className="w-full max-w-4xl">
                <h1 className="text-3xl text-white text-center mb-4">Color Picker & Converter</h1>
                <p className="text-lg text-gray-300 text-center mb-8">Select a color to see its HEX, RGB, and HSL values.</p>

                <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-white/20">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        
                        {/* Color Picker and Preview */}
                        <div className="flex flex-col items-center justify-center space-y-6">
                           <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full border-4 border-white/30 shadow-2xl" style={{ backgroundColor: color }}>
                                <input 
                                    type="color" 
                                    value={color}
                                    onChange={handleColorChange}
                                    className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                                />
                           </div>
                           <p className="text-white/80 text-sm">Click circle to pick a color</p>
                        </div>

                        {/* Color Value Inputs */}
                        <div className="space-y-6">
                            {/* HEX Input */}
                            <div className="space-y-2">
                                <label className="text-white font-semibold">HEX</label>
                                <div className="flex items-center bg-[#2e1d12] rounded-lg">
                                    <input 
                                        type="text"
                                        value={hex}
                                        onChange={handleHexChange}
                                        className="w-full bg-transparent p-3 text-white focus:outline-none"
                                    />
                                    <button onClick={() => copyToClipboard(hex)} className="p-3 text-white/70 hover:text-white transition-colors">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" /><path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2H6zM8 7a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1zm-1 4a1 1 0 100 2h4a1 1 0 100-2H7z" /></svg>
                                    </button>
                                </div>
                            </div>
                            
                            {/* RGB Inputs */}
                            <div className="space-y-2">
                                <label className="text-white font-semibold">RGB</label>
                                <div className="grid grid-cols-3 gap-2">
                                    <input type="number" name="r" value={rgb.r} onChange={handleRgbChange} className="w-full bg-[#2e1d12] p-3 text-white rounded-lg focus:outline-none text-center" min="0" max="255" />
                                    <input type="number" name="g" value={rgb.g} onChange={handleRgbChange} className="w-full bg-[#2e1d12] p-3 text-white rounded-lg focus:outline-none text-center" min="0" max="255" />
                                    <input type="number" name="b" value={rgb.b} onChange={handleRgbChange} className="w-full bg-[#2e1d12] p-3 text-white rounded-lg focus:outline-none text-center" min="0" max="255" />
                                </div>
                                <button onClick={() => copyToClipboard(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`)} className="w-full mt-2 bg-[#7d3a11] hover:bg-[#a56a42] text-white font-bold py-2 px-4 rounded-lg transition-colors flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor"><path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" /><path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2H6zM8 7a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1zm-1 4a1 1 0 100 2h4a1 1 0 100-2H7z" /></svg>
                                    Copy RGB
                                </button>
                            </div>

                            {/* HSL Inputs */}
                            <div className="space-y-2">
                                <label className="text-white font-semibold">HSL</label>
                                <div className="grid grid-cols-3 gap-2">
                                    <input type="number" name="h" value={hsl.h} onChange={handleHslChange} className="w-full bg-[#2e1d12] p-3 text-white rounded-lg focus:outline-none text-center" min="0" max="360" />
                                    <input type="number" name="s" value={hsl.s} onChange={handleHslChange} className="w-full bg-[#2e1d12] p-3 text-white rounded-lg focus:outline-none text-center" min="0" max="100" />
                                    <input type="number" name="l" value={hsl.l} onChange={handleHslChange} className="w-full bg-[#2e1d12] p-3 text-white rounded-lg focus:outline-none text-center" min="0" max="100" />
                                </div>
                                <button onClick={() => copyToClipboard(`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`)} className="w-full mt-2 bg-[#7d3a11] hover:bg-[#a56a42] text-white font-bold py-2 px-4 rounded-lg transition-colors flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor"><path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" /><path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2H6zM8 7a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1zm-1 4a1 1 0 100 2h4a1 1 0 100-2H7z" /></svg>
                                    Copy HSL
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
