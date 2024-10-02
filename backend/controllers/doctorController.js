const Doctor = require('../models/Doctor');

// Buscar médicos por especialidade, nome ou localização
const searchDoctors = async (req, res) => {
  try {
    const { specialty, name, location } = req.query;

    // Construir a query dinamicamente com base nos filtros
    const query = {};
    if (specialty) query.specialty = specialty;
    if (name) query.name = { $regex: name, $options: 'i' }; // Buscar nome que contenha o valor
    if (location) query.location = { $regex: location, $options: 'i' };

    const doctors = await Doctor.find(query);

    res.status(200).json({ doctors });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar médicos.', error: error.message });
  }
};

module.exports = {
  searchDoctors,
};
