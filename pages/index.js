import { useState } from 'react';
import { db } from '../firebase';

export default function Home() {
  const [name, setName] = useState('');
  const [eggNumber, setEggNumber] = useState('');
  const [message, setMessage] = useState('');

  const joinHunt = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/hunt/join', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name }),
    });
    const data = await response.json();
    setMessage(data.message);
  };

  const registerEgg = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/hunt/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, eggNumber }),
    });
    const data = await response.json();
    setMessage(data.message);
  };

  const announceWinner = async () => {
    const response = await fetch('/api/hunt/winner');
    const data = await response.json();
    setMessage(data.message);
  };

  return (
    <div className='container'>
      <img
        src="/rabbit.png" // Replace with your rabbit image path if available
        alt="Easter Rabbit"
        className="rabbit-image"
      />
      <h1>Egg Hunt</h1>
      <form onSubmit={joinHunt}>
        <input type="text" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} />
        <button type="submit">Join Hunt</button>
      </form>
      <form onSubmit={registerEgg}>
        <input type="text" placeholder="Enter egg number" value={eggNumber} onChange={(e) => setEggNumber(e.target.value)} />
        <button type="submit">Register Egg</button>
      </form>
      <button onClick={announceWinner}>Announce Winner</button>
      <p>{message}</p>
    </div>
  );
}
