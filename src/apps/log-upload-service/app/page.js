'use client';
import { useState } from 'react';

export default function UploadPage() {
  const [status, setStatus] = useState('');

  async function handleUpload(e) {
    e.preventDefault();
    const file = e.target.file.files[0];
    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    setStatus(`Job ID: ${data.jobId || data.error}`);
  }

  return (
    <div>
      <h1>Upload Log File</h1>
      <form onSubmit={handleUpload}>
        <input type="file" name="file" required />
        <button type="submit">Upload</button>
      </form>
      <p>{status}</p>
    </div>
  );
}
