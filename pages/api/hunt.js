import { db } from '../../firebase';

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'POST':
      if (req.url === '/api/hunt') {
        const { organizer, numberOfEggs, deadline } = req.body;
        await db.collection('hunts').add({
          organizer,
          numberOfEggs,
          deadline,
          participants: [],
          eggs: [],
        });
        res.status(200).json({ message: 'Hunt created successfully' });
      } else if (req.url === '/api/hunt/join') {
        const { name } = req.body;
        const hunt = await db.collection('hunts').orderBy('deadline', 'desc').limit(1).get();
        if (!hunt.empty) {
          const huntId = hunt.docs[0].id;
          await db.collection('hunts').doc(huntId).update({
            participants: db.FieldValue.arrayUnion(name),
          });
          res.status(200).json({ message: 'Joined hunt successfully' });
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
      }
      break;
    case 'GET':
      if (req.url === '/api/hunt/winner') {
        const hunt = await db.collection('hunts').orderBy('deadline', 'desc').limit(1).get();
        if (!hunt.empty) {
          const huntData = hunt.docs[0].data();
          const randomEgg = huntData.eggs[Math.floor(Math.random() * huntData.eggs.length)];
          res.status(200).json({ message: `The winner is ${randomEgg.name} with egg number ${randomEgg.eggNumber}` });
        } else {
          res.status(404).json({ message: 'No active hunt found' });
        }
      }
      break;
    default:
      res.setHeader('Allow', ['POST', 'GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
