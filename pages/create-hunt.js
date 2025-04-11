import { useState } from 'react';

export default function CreateHunt() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [numEggs, setNumEggs] = useState('');
  const [registrationLink, setRegistrationLink] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/hunt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description, deadline, numEggs }),
      });

      if (!response.ok) {
        throw new Error('Failed to create hunt');
      }

      const data = await response.json();
      setRegistrationLink(data.registrationLink);
    } catch (error) {
      console.error('Error creating hunt:', error);
      // Handle error appropriately, e.g., display an error message to the user.
    }
  };

  return (
    <div>
      <h1>Create a New Hunt</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="deadline">Deadline:</label>
          <input
            type="datetime-local"
            id="deadline"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="numEggs">Number of Eggs:</label>
          <input
            type="number"
            id="numEggs"
            value={numEggs}
            onChange={(e) => setNumEggs(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create Hunt</button>
      </form>

      {registrationLink && (
        <div>
          <label>Registration Link:</label>
          <p><a href={registrationLink}>{registrationLink}</a></p>
        </div>
      )}
    </div>
  );
}