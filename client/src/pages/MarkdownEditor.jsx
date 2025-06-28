import React, { useState, useEffect } from 'react';

const MarkdownEditor = () => {
  const [markdown, setMarkdown] = useState(`# Welcome to Markdown Editor

This is a **live preview** markdown editor. Start typing in the left panel and see the *rendered output* on the right.

## Features

- Live preview
- Syntax highlighting support
- Export functionality
- Common markdown elements

### Code Example

\`\`\`javascript
function hello() {
  console.log("Hello, World!");
}
\`\`\`

### Lists

- Item 1
- Item 2
  - Nested item
  - Another nested item

1. Numbered item
2. Another numbered item

### Links and Images

[Visit GitHub](https://github.com)

---

> This is a blockquote. You can use it to highlight important information.

### Table

| Header 1 | Header 2 | Header 3 |
|----------|----------|----------|
| Row 1    | Data     | More data|
| Row 2    | Data     | More data|

Happy writing! ✨`);

  const [preview, setPreview] = useState('');

  // Simple markdown to HTML converter
  const markdownToHtml = (text) => {
    let html = text;

    // Headers
    html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');

    // Code blocks
    html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre><code class="language-$1">$2</code></pre>');
    
    // Inline code
    html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

    // Bold and italic
    html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/\*([^*]+)\*/g, '<em>$1</em>');

    // Links
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');

    // Horizontal rule
    html = html.replace(/^---$/gm, '<hr>');

    // Blockquotes
    html = html.replace(/^> (.*)$/gm, '<blockquote>$1</blockquote>');

    // Lists
    html = html.replace(/^\* (.*)$/gm, '<li>$1</li>');
    html = html.replace(/^\d+\. (.*)$/gm, '<li>$1</li>');
    
    // Wrap consecutive <li> elements in <ul> or <ol>
    html = html.replace(/(<li>.*<\/li>)/gs, (match) => {
      if (text.includes('1. ') || text.includes('2. ')) {
        return '<ol>' + match + '</ol>';
      }
      return '<ul>' + match + '</ul>';
    });

    // Tables
    const tableRegex = /^\|(.+)\|\s*\n\|[-\s|]+\|\s*\n((?:\|.+\|\s*\n?)*)/gm;
    html = html.replace(tableRegex, (match, header, rows) => {
      const headerCells = header.split('|').map(cell => `<th>${cell.trim()}</th>`).join('');
      const rowsHtml = rows.trim().split('\n').map(row => {
        const cells = row.split('|').map(cell => `<td>${cell.trim()}</td>`).join('');
        return `<tr>${cells}</tr>`;
      }).join('');
      
      return `<table><thead><tr>${headerCells}</tr></thead><tbody>${rowsHtml}</tbody></table>`;
    });

    // Line breaks
    html = html.replace(/\n/g, '<br>');

    // Remove extra <br> tags around block elements
    html = html.replace(/<br><h([1-6])>/g, '<h$1>');
    html = html.replace(/<\/h([1-6])><br>/g, '</h$1>');
    html = html.replace(/<br><pre>/g, '<pre>');
    html = html.replace(/<\/pre><br>/g, '</pre>');
    html = html.replace(/<br><hr><br>/g, '<hr>');
    html = html.replace(/<br><blockquote>/g, '<blockquote>');
    html = html.replace(/<\/blockquote><br>/g, '</blockquote>');
    html = html.replace(/<br><ul>/g, '<ul>');
    html = html.replace(/<\/ul><br>/g, '</ul>');
    html = html.replace(/<br><ol>/g, '<ol>');
    html = html.replace(/<\/ol><br>/g, '</ol>');
    html = html.replace(/<br><table>/g, '<table>');
    html = html.replace(/<\/table><br>/g, '</table>');

    return html;
  };

  useEffect(() => {
    setPreview(markdownToHtml(markdown));
  }, [markdown]);

  const downloadMarkdown = () => {
    const element = document.createElement('a');
    const file = new Blob([markdown], { type: 'text/markdown' });
    element.href = URL.createObjectURL(file);
    element.download = 'document.md';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const downloadHtml = () => {
    const element = document.createElement('a');
    const file = new Blob([preview], { type: 'text/html' });
    element.href = URL.createObjectURL(file);
    element.download = 'document.html';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const copyMarkdown = () => {
    navigator.clipboard.writeText(markdown);
    alert('Markdown copied to clipboard!');
  };

  const copyHtml = () => {
    navigator.clipboard.writeText(preview);
    alert('HTML copied to clipboard!');
  };

  const clearEditor = () => {
    setMarkdown('');
  };

  return (
    <div className="container">
      <div className="text-center mb-3">
        <h1 className="page-title">Markdown Editor</h1>
        <p className="page-subtitle">
          Write and preview Markdown with live rendering
        </p>
      </div>

      <div className="card">
        <div className="text-center mb-2">
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '1rem' }}>
            <button className="btn btn-secondary" onClick={copyMarkdown}>
              Copy Markdown
            </button>
            <button className="btn btn-secondary" onClick={copyHtml}>
              Copy HTML
            </button>
            <button className="btn btn-secondary" onClick={downloadMarkdown}>
              Download .md
            </button>
            <button className="btn btn-secondary" onClick={downloadHtml}>
              Download .html
            </button>
            <button
              className="btn"
              onClick={clearEditor}
              style={{ background: '#dc3545' }}
            >
              Clear
            </button>
          </div>
        </div>

        <div className="grid grid-2">
          <div className="form-group">
            <label className="form-label">Markdown Input:</label>
            <textarea
              className="form-textarea"
              value={markdown}
              onChange={(e) => setMarkdown(e.target.value)}
              placeholder="Type your markdown here..."
              style={{ 
                minHeight: '500px',
                fontFamily: 'Monaco, Menlo, Ubuntu Mono, monospace',
                fontSize: '14px'
              }}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Live Preview:</label>
            <div
              style={{
                minHeight: '500px',
                padding: '1rem',
                border: '2px solid rgba(139, 69, 19, 0.2)',
                borderRadius: '8px',
                backgroundColor: '#fff',
                color: 'var(--text-dark)',
                overflow: 'auto'
              }}
              dangerouslySetInnerHTML={{ __html: preview }}
            />
          </div>
        </div>

        <div style={{ marginTop: '2rem', padding: '1rem', background: '#f8f9fa', borderRadius: '8px' }}>
          <h4 style={{ color: 'var(--primary-brown)', marginBottom: '1rem' }}>Markdown Cheat Sheet:</h4>
          <div className="grid grid-2" style={{ textAlign: 'left', fontSize: '0.9rem' }}>
            <div>
              <h5 style={{ color: 'var(--primary-brown)', marginBottom: '0.5rem' }}>Text Formatting</h5>
              <ul style={{ color: 'var(--text-light)', paddingLeft: '1.5rem' }}>
                <li><code>**bold**</code> → <strong>bold</strong></li>
                <li><code>*italic*</code> → <em>italic</em></li>
                <li><code>`code`</code> → <code>code</code></li>
                <li><code># Heading 1</code></li>
                <li><code>## Heading 2</code></li>
                <li><code>### Heading 3</code></li>
              </ul>
            </div>
            <div>
              <h5 style={{ color: 'var(--primary-brown)', marginBottom: '0.5rem' }}>Other Elements</h5>
              <ul style={{ color: 'var(--text-light)', paddingLeft: '1.5rem' }}>
                <li><code>[link](url)</code> → Link</li>
                <li><code>* List item</code> → Bullet list</li>
                <li><code>1. List item</code> → Numbered list</li>
                <li><code>&gt; Quote</code> → Blockquote</li>
                <li><code>---</code> → Horizontal rule</li>
                <li><code>```code```</code> → Code block</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .container h1, .container h2, .container h3 {
          color: var(--primary-brown);
          margin: 1rem 0 0.5rem 0;
        }
        
        .container blockquote {
          border-left: 4px solid var(--primary-brown);
          padding-left: 1rem;
          margin: 1rem 0;
          font-style: italic;
          background: #f8f9fa;
          padding: 1rem;
          border-radius: 0 8px 8px 0;
        }
        
        .container pre {
          background: #f8f9fa;
          padding: 1rem;
          border-radius: 8px;
          overflow-x: auto;
          border: 1px solid #e9ecef;
        }
        
        .container code {
          background: #f8f9fa;
          padding: 0.2rem 0.4rem;
          border-radius: 4px;
          font-family: Monaco, Menlo, Ubuntu Mono, monospace;
          font-size: 0.9em;
        }
        
        .container table {
          width: 100%;
          border-collapse: collapse;
          margin: 1rem 0;
        }
        
        .container table th,
        .container table td {
          border: 1px solid #ddd;
          padding: 0.5rem;
          text-align: left;
        }
        
        .container table th {
          background: var(--primary-brown);
          color: white;
          font-weight: 600;
        }
        
        .container hr {
          border: none;
          height: 2px;
          background: var(--primary-brown);
          margin: 2rem 0;
          border-radius: 1px;
        }
        
        .container ul, .container ol {
          padding-left: 2rem;
          margin: 1rem 0;
        }
        
        .container li {
          margin: 0.5rem 0;
        }
        
        .container a {
          color: var(--primary-brown);
          text-decoration: none;
        }
        
        .container a:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
};

export default MarkdownEditor;