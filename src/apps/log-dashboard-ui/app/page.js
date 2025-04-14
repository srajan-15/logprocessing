'use client';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

export default function Dashboard() {
  const [stats, setStats] = useState([]);
  const [liveUpdate, setLiveUpdate] = useState(null);

  useEffect(() => {
    fetch('/api/stats')
      .then(res => res.json())
      .then(setStats);

    // Connect to WebSocket
    const socket = io('http://localhost:3002');
    socket.on('statsUpdate', data => {
      setLiveUpdate(data);
    });

    return () => socket.disconnect();
  }, []);

  return (
    <div>
      <h1>Log Dashboard</h1>
      {liveUpdate && <p>Live: {liveUpdate.message} @ {liveUpdate.timestamp}</p>}
      <ul>
        {stats.map((stat, i) => (
          <li key={i}>{stat}</li>
        ))}
      </ul>
    </div>
  );
}
