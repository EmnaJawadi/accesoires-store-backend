
const Commande =  require('../Models/Commande')
const postCommande = async (req, res) => {
  const { id, numCde, totalCde } = req.body;

  if (!id || !numCde || !totalCde) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  try {
    const newCommande = new Commande({ id, numCde, totalCde });
    await newCommande.save();
    res.status(201).json(newCommande);
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

const getCommande = async (req, res) => {
  try {
    const commandes = await Commande.find();
    res.status(200).json(commandes);
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};
const getCommandes = async (req, res) => {
  try {
    const commande = await Commande.findOne({ id: req.params.id });
    if (!commande) {
      return res.status(404).json({ message: 'Commande not found' });
    }
    res.status(200).json(commande);
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};
const putCommande = async (req, res) => {
  const { numCde, totalCde } = req.body;

  if (!numCde || !totalCde) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const updatedCommande = await Commande.findOneAndUpdate(
      { id: req.params.id },
      { numCde, totalCde },
      { new: true }
    );

    if (!updatedCommande) {
      return res.status(404).json({ message: 'Commande not found' });
    }

    res.status(200).json(updatedCommande);
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};
const deleteCommande = async (req, res) =>
 {
  try {
    const deletedCommande = await Commande.findOneAndDelete({ id: req.params.id });

    if (!deletedCommande) {
      return res.status(404).json({ message: 'Commande not found' });
    }

    res.status(200).json({ message: 'Commande deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

module.exports = { postCommande,getCommande, getCommandes,putCommande, deleteCommande };
