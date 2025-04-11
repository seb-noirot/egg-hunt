import { db } from '../../firebase';
import { v4 as uuidv4 } from 'uuid';

export default async function handler(req, res) {
  const { method } = req;

  if (method === 'POST') {
    const { title, description, deadline, numberOfEggs } = req.body;

    if (!title || !description || !deadline || !numberOfEggs) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
      const huntId = uuidv4(); // Generate a unique ID for the hunt
      const registrationLink = `/register/${huntId}`; // Generate the registration link

      await db.collection('hunts').doc(huntId).set({
        title,
        description,
        deadline,
        numberOfEggs,
        participants: [],
        eggs: [],
        registrationLink,
        huntId
      });

      res.status(201).json({ registrationLink, huntId, message: 'Hunt created successfully' });
    } catch (error) {
      console.error('Error creating hunt:', error);
      res.status(500).json({ message: 'Error creating hunt', error: error.message });
    }
  }
    else if (method === 'GET' && req.url === '/api/hunt/winner') {
      const hunt = await db.collection('hunts').orderBy('deadline', 'desc').limit(1).get();
      if (!hunt.empty) {
        const huntData = hunt.docs[0].data();
        const randomEgg = huntData.eggs[Math.floor(Math.random() * huntData.eggs.length)];
        res.status(200).json({ message: `The winner is ${randomEgg.name} with egg number ${randomEgg.eggNumber}` });
      } else {
        res.status(404).json({ message: 'No active hunt found' });
        }
      } else if (req.url === '/api/hunt/register') {
        const { name, eggNumber } = req.body;
        const hunt = await db.collection('hunts').orderBy('deadline', 'desc').limit(1).get();
        if (!hunt.empty) {
          const huntId = hunt.docs[0].id;
          await db.collection('hunts').doc(huntId).update({
            eggs: db.FieldValue.arrayUnion({ name, eggNumber }),
          });
          res.status(200).json({ message: 'Egg registered successfully' });
        } else {
          res.status(404).json({ message: 'No active hunt found' });
        }
  else {
    res.setHeader('Allow', ['POST', 'GET']);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}