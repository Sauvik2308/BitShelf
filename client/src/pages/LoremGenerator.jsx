import React, { useState } from 'react';

const LoremGenerator = () => {
  const [output, setOutput] = useState('');
  const [count, setCount] = useState(5);
  const [type, setType] = useState('paragraphs');

  const loremWords = [
    'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
    'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore',
    'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud',
    'exercitation', 'ullamco', 'laboris', 'nisi', 'aliquip', 'ex', 'ea', 'commodo',
    'consequat', 'duis', 'aute', 'irure', 'in', 'reprehenderit', 'voluptate',
    'velit', 'esse', 'cillum', 'fugiat', 'nulla', 'pariatur', 'excepteur', 'sint',
    'occaecat', 'cupidatat', 'non', 'proident', 'sunt', 'culpa', 'qui', 'officia',
    'deserunt', 'mollit', 'anim', 'id', 'est', 'laborum', 'at', 'vero', 'eos',
    'accusamus', 'accusantium', 'doloremque', 'laudantium', 'totam', 'rem',
    'aperiam', 'eaque', 'ipsa', 'quae', 'ab', 'illo', 'inventore', 'veritatis',
    'architecto', 'beatae', 'vitae', 'dicta', 'explicabo', 'nemo', 'ipsam',
    'voluptatem', 'quia', 'voluptas', 'aspernatur', 'odit', 'aut', 'fugit'
  ];

  const generateWords = (num) => {
    const result = [];
    for (let i = 0; i < num; i++) {
      result.push(loremWords[Math.floor(Math.random() * loremWords.length)]);
    }
    return result.join(' ');
  };

  const generateSentences = (num) => {
    const sentences = [];
    for (let i = 0; i < num; i++) {
      const wordCount = Math.floor(Math.random() * 15) + 5; // 5-20 words per sentence
      const words = generateWords(wordCount);
      const sentence = words.charAt(0).toUpperCase() + words.slice(1) + '.';
      sentences.push(sentence);
    }
    return sentences.join(' ');
  };

  const generateParagraphs = (num) => {
    const paragraphs = [];
    for (let i = 0; i < num; i++) {
      const sentenceCount = Math.floor(Math.random() * 6) + 3; // 3-8 sentences per paragraph
      const paragraph = generateSentences(sentenceCount);
      paragraphs.push(paragraph);
    }
    return paragraphs.join('\n\n');
  };

  const generateLorem = () => {
    let result = '';
    
    switch (type) {
      case 'words':
        result = generateWords(count);
        break;
      case 'sentences':
        result = generateSentences(count);
        break;
      case 'paragraphs':
        result = generateParagraphs(count);
        break;
      default:
        result = generateParagraphs(count);
    }
    
    setOutput(result);
  };

  const copyOutput = () => {
    if (output) {
      navigator.clipboard.writeText(output);
      alert('Copied to clipboard!');
    }
  };

  const clearOutput = () => {
    setOutput('');
  };

  return (
    <div className="container">
      <div className="text-center mb-3">
        <h1 className="page-title">Lorem Ipsum Generator</h1>
        <p className="page-subtitle">
          Generate placeholder text for your designs and mockups
        </p>
      </div>

      <div className="card">
        <div className="grid grid-3 mb-3">
          <div className="form-group">
            <label className="form-label">Type:</label>
            <select
              className="form-input"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="words">Words</option>
              <option value="sentences">Sentences</option>
              <option value="paragraphs">Paragraphs</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Count:</label>
            <input
              type="number"
              className="form-input"
              value={count}
              onChange={(e) => setCount(Math.max(1, parseInt(e.target.value) || 1))}
              min="1"
              max="100"
            />
          </div>

          <div className="form-group" style={{ display: 'flex', alignItems: 'end' }}>
            <button className="btn" onClick={generateLorem} style={{ width: '100%' }}>
              Generate Lorem
            </button>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Generated Text:</label>
          <textarea
            className="form-textarea"
            value={output}
            readOnly
            placeholder="Generated lorem ipsum text will appear here..."
            style={{ minHeight: '300px', backgroundColor: '#f8f9fa' }}
          />
        </div>

        <div className="text-center" style={{ marginTop: '2rem' }}>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn btn-secondary" onClick={copyOutput}>
              Copy Text
            </button>
            <button
              className="btn"
              onClick={clearOutput}
              style={{ background: '#dc3545' }}
            >
              Clear
            </button>
          </div>
        </div>

        <div style={{ marginTop: '2rem', padding: '1rem', background: '#f8f9fa', borderRadius: '8px' }}>
          <h4 style={{ color: 'var(--primary-brown)', marginBottom: '1rem' }}>Quick Generate:</h4>
          <div className="grid grid-3" style={{ gap: '0.5rem' }}>
            <button
              className="btn btn-secondary"
              onClick={() => { setType('paragraphs'); setCount(3); generateParagraphs(3); setOutput(generateParagraphs(3)); }}
            >
              3 Paragraphs
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => { setType('sentences'); setCount(10); setOutput(generateSentences(10)); }}
            >
              10 Sentences
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => { setType('words'); setCount(50); setOutput(generateWords(50)); }}
            >
              50 Words
            </button>
          </div>
        </div>

        <div style={{ marginTop: '2rem', padding: '1rem', background: '#f8f9fa', borderRadius: '8px' }}>
          <h4 style={{ color: 'var(--primary-brown)', marginBottom: '1rem' }}>About Lorem Ipsum:</h4>
          <p style={{ color: 'var(--text-light)', lineHeight: '1.6' }}>
            Lorem Ipsum is placeholder text commonly used in the printing and typesetting industry. 
            It has been the industry's standard dummy text since the 1500s, when an unknown printer 
            took a galley of type and scrambled it to make a type specimen book. It allows designers 
            and developers to focus on visual elements without being distracted by meaningful content.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoremGenerator;