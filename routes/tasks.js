const express = require('express');
const Task = require('../models/Task');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Route pour créer une tâche
router.post('/', authMiddleware, async (req, res) => {
  const { title, description } = req.body;
  try {
    const task = new Task({
      title,
      description,
      userId: req.user.userId,
    });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la création de la tâche' });
  }
});

// Route pour obtenir les tâches d'un utilisateur
router.get('/', authMiddleware, async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.userId });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la récupération des tâches' });
  }
});

// Route pour marquer une tâche comme terminée
router.put('/:taskId', authMiddleware, async (req, res) => {
  const { taskId } = req.params;
  try {
    const task = await Task.findOneAndUpdate(
      { _id: taskId, userId: req.user.userId },
      { status: 'terminée' },
      { new: true }
    );
    if (!task) {
      return res.status(404).json({ message: 'Tâche non trouvée' });
    }
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour de la tâche' });
  }
});

// Route pour supprimer une tâche
router.delete('/:taskId', authMiddleware, async (req, res) => {
  const { taskId } = req.params;
  try {
    const task = await Task.findOneAndDelete({
      _id: taskId,
      userId: req.user.userId,
    });
    if (!task) {
      return res.status(404).json({ message: 'Tâche non trouvée' });
    }
    res.json({ message: 'Tâche supprimée' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la suppression de la tâche' });
  }
});

module.exports = router;
