import { useState } from 'react';

export default function JSONFormatter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const formatJSON = () => {
    try {
      const obj = JSON.parse(input);
      setOutput(JSON.stringify(obj, null, 2));
    } catch (e) {
      setOutput('Invalid JSON');
    }
  };

  return (
    <div className="bg-white shadow-md rounded-2xl p-4">
      <h2 className="text-xl font-semibold mb-2">JSON Formatter</h2>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        rows="6"
        className="w-full p-2 border rounded mb-2"
        placeholder="Paste minified JSON here"
      />
      <button
        onClick={formatJSON}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Format
      </button>
      <pre className="bg-gray-100 mt-2 p-2 rounded text-sm overflow-x-auto">
        {output}
      </pre>
    </div>
  );
}
