document.addEventListener('DOMContentLoaded', () => {
    console.log('Frontend VitaSUS carregado com sucesso.');

    // Exemplo de função para carregar médicos
    async function loadDoctors() {
        try {
            const response = await fetch('/api/doctors');
            const doctors = await response.json();
            console.log('Médicos carregados:', doctors);
        } catch (error) {
            console.error('Erro ao carregar médicos:', error);
        }
    }

    // Chama a função para carregar médicos ao iniciar
    loadDoctors();
});
