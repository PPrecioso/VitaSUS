const Review = require('../models/Review');
const Doctor = require('../models/Doctor');

// Adicionar uma avaliação de um médico
const addReview = async (req, res) => {
  try {
    const { doctorId, rating, comment } = req.body;

    const newReview = new Review({
      doctor: doctorId,
      rating,
      comment,
      user: req.user.id, // ID do paciente que está avaliando
    });

    await newReview.save();

    // Atualiza a média de avaliações do médico
    const doctor = await Doctor.findById(doctorId);
    const reviews = await Review.find({ doctor: doctorId });

    const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;

    doctor.averageRating = averageRating;
    await doctor.save();

    res.status(201).json({ message: 'Avaliação adicionada com sucesso.', review: newReview });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao adicionar avaliação.', error: error.message });
  }
};

// Exibir avaliações de um médico específico
const getDoctorReviews = async (req, res) => {
  try {
    const { doctorId } = req.params;

    const reviews = await Review.find({ doctor: doctorId }).populate('user', 'name');

    res.status(200).json({ reviews });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar avaliações.', error: error.message });
  }
};

module.exports = {
  addReview,
  getDoctorReviews,
};
