const Appointment = require('../models/Appointment');
const scheduleNotifications = require('../config/notifications');

// Agendar uma nova consulta
const scheduleAppointment = async (req, res) => {
  try {
    const { patientId, doctorId, appointmentTime } = req.body;

    const newAppointment = new Appointment({
      patient: patientId,
      doctor: doctorId,
      appointmentTime,
    });

    await newAppointment.save();

    // Agendar lembrete de notificação
    scheduleNotifications(appointmentTime, req.user);

    res.status(201).json({ message: 'Consulta agendada com sucesso.', appointment: newAppointment });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao agendar a consulta.', error: error.message });
  }
};

// Cancelar uma consulta
const cancelAppointment = async (req, res) => {
  try {
    const { id } = req.params;

    const canceledAppointment = await Appointment.findByIdAndDelete(id);

    if (!canceledAppointment) {
      return res.status(404).json({ message: 'Consulta não encontrada.' });
    }

    res.status(200).json({ message: 'Consulta cancelada com sucesso.' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao cancelar a consulta.', error: error.message });
  }
};

// Exibir histórico de consultas de um paciente
const getPatientAppointments = async (req, res) => {
  try {
    const { patientId } = req.params;

    const appointments = await Appointment.find({ patient: patientId }).populate('doctor', 'name');

    res.status(200).json({ appointments });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar histórico de consultas.', error: error.message });
  }
};

module.exports = {
  scheduleAppointment,
  cancelAppointment,
  getPatientAppointments,
};
