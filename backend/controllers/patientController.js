const Patient = require('../models/Patient');

// Cadastro de um novo paciente
const registerPatient = async (req, res) => {
  try {
    const { name, address, phone, email } = req.body;

    const newPatient = new Patient({
      name,
      address,
      phone,
      email,
    });

    await newPatient.save();
    res.status(201).json({ message: 'Paciente cadastrado com sucesso.', patient: newPatient });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao cadastrar o paciente.', error: error.message });
  }
};

// Atualizar dados de um paciente existente
const updatePatient = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedPatient = await Patient.findByIdAndUpdate(id, updates, { new: true });

    if (!updatedPatient) {
      return res.status(404).json({ message: 'Paciente não encontrado.' });
    }

    res.status(200).json({ message: 'Paciente atualizado com sucesso.', patient: updatedPatient });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar o paciente.', error: error.message });
  }
};

// Remover um paciente do sistema
const deletePatient = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedPatient = await Patient.findByIdAndDelete(id);

    if (!deletedPatient) {
      return res.status(404).json({ message: 'Paciente não encontrado.' });
    }

    res.status(200).json({ message: 'Paciente removido com sucesso.' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao remover o paciente.', error: error.message });
  }
};

module.exports = {
  registerPatient,
  updatePatient,
  deletePatient,
};
