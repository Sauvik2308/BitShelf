import React, { useState } from 'react';

const JsonFormatter = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const formatJson = () => {
    try {
      if (!input.trim()) {
        setError('Please enter JSON data to format');
        setOutput('');
        return;
      }

      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, 2);
      setOutput(formatted);
      setError('');
    } catch (err) {
      setError(`Invalid JSON: ${err.message}`);
      setOutput('');
    }
  };

  const minifyJson = () => {
    try {
      if (!input.trim()) {
        setError('Please enter JSON data to minify');
        setOutput('');
        return;
      }

      const parsed = JSON.parse(input);
      const minified = JSON.stringify(parsed);
      setOutput(minified);
      setError('');
    } catch (err) {
      setError(`Invalid JSON: ${err.message}`);
      setOutput('');
    }
  };

  const validateJson = () => {
    try {
      if (!input.trim()) {
        setError('Please enter JSON data to validate');
        return;
      }

      JSON.parse(input);
      setError('');
      alert('✅ Valid JSON!');
    } catch (err) {
      setError(`Invalid JSON: ${err.message}`);
    }
  };

  const clearAll = () => {
    setInput('');
    setOutput('');
    setError('');
  };

  const copyOutput = () => {
    if (output) {
      navigator.clipboard.writeText(output);
      alert('Copied to clipboard!');
    }
  };

  return (
    <div className="container">
      <div className="text-center mb-3">
        <h1 className="page-title">JSON Formatter</h1>
        <p className="page-subtitle">
          Format, validate, and beautify your JSON data with ease
        </p>
      </div>

      <div className="card">
        <div className="grid grid-2">
          <div className="form-group">
            <label className="form-label">Input JSON:</label>
            <textarea
              className="form-textarea"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste your JSON data here..."
              style={{ minHeight: '300px' }}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Formatted Output:</label>
            <textarea
              className="form-textarea"
              value={output}
              readOnly
              placeholder="Formatted JSON will appear here..."
              style={{ minHeight: '300px', backgroundColor: '#f8f9fa' }}
            />
          </div>
        </div>

        {error && (
          <div style={{
            background: '#fee',
            color: '#c33',
            padding: '1rem',
            borderRadius: '8px',
            marginBottom: '1rem',
            border: '1px solid #fcc'
          }}>
            <strong>Error:</strong> {error}
          </div>
        )}

        <div className="text-center" style={{ marginTop: '2rem' }}>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn" onClick={formatJson}>
              Format JSON
            </button>
            <button className="btn btn-secondary" onClick={minifyJson}>
              Minify JSON
            </button>
            <button className="btn btn-secondary" onClick={validateJson}>
              Validate JSON
            </button>
            <button className="btn btn-secondary" onClick={copyOutput}>
              Copy Output
            </button>
            <button
              className="btn"
              onClick={clearAll}
              style={{ background: '#dc3545' }}
            >
              Clear All
            </button>
          </div>
        </div>

        <div style={{ marginTop: '2rem', padding: '1rem', background: '#f8f9fa', borderRadius: '8px' }}>
          <h4 style={{ color: 'var(--primary-brown)', marginBottom: '1rem' }}>How to use:</h4>
          <ul style={{ color: 'var(--text-light)', paddingLeft: '1.5rem' }}>
            <li>Paste your JSON data in the input field</li>
            <li>Click "Format JSON" to beautify with proper indentation</li>
            <li>Use "Minify JSON" to remove whitespace and create compact JSON</li>
            <li>Click "Validate JSON" to check if your JSON is valid</li>
            <li>Copy the formatted output to your clipboard</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default JsonFormatter;