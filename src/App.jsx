import { useState } from 'react';
import './App.css';

function App() {
  const [selectedDate, setSelectedDate] = useState('09/03/2026');
  const [clientName, setClientName] = useState('Helena Souza');
  const [selectedPeriod, setSelectedPeriod] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const periods = [
    { id: 'morning', label: 'Manhã', icon: '☀️', hours: '9h-12h', times: ['09:00', '10:00', '11:00', '12:00'] },
    { id: 'afternoon', label: 'Tarde', icon: '🌤️', hours: '13h-18h', times: ['13:00', '14:00', '15:00', '16:00', '17:00', '18:00'] },
    { id: 'night', label: 'Noite', icon: '🌙', hours: '19h-21h', times: ['19:00', '20:00', '21:00'] }
  ];

  const handleSchedule = () => {
    if (!selectedPeriod || !selectedTime) {
      alert('Selecione um horário');
      return;
    }
    alert(`Agendamento confirmado!\nCliente: ${clientName}\nData: ${selectedDate}\nHorário: ${selectedTime}`);
  };

  return (
    <div className="app">
      <div className="container">
        <div className="left-panel">
          <div className="logo">HairDay✨</div>

          <h2>Agende um atendimento</h2>
          <p className="subtitle">Selecione data, horário e informe o nome do cliente para criar o agendamento</p>

          <div className="form-group">
            <label>Data</label>
            <input
              type="text"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              placeholder="dd/mm/aaaa"
            />
          </div>

          <div className="form-group">
            <label>Horários</label>

            {periods.map(period => (
              <div key={period.id}>
                <div className="period-header">{period.label}</div>
                <div className="time-slots">
                  {period.times.map(time => (
                    <button
                      key={time}
                      className={`time-slot ${selectedTime === time ? 'selected' : ''}`}
                      onClick={() => {
                        setSelectedPeriod(period.id);
                        setSelectedTime(time);
                      }}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="form-group">
            <label>Cliente</label>
            <input
              type="text"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              placeholder="Nome do cliente"
            />
          </div>

          <button className="btn-schedule" onClick={handleSchedule}>
            AGENDAR
          </button>
        </div>

        <div className="right-panel">
          <div className="agenda-header">
            <h2>Sua agenda</h2>
            <input
              type="text"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="date-input"
            />
          </div>
          <p className="agenda-subtitle">Consulte os seus cortes de cabelo agendados por dia</p>

          {periods.map(period => (
            <div key={period.id} className="agenda-period">
              <div className="period-info">
                <span className="period-icon">{period.icon}</span>
                <span className="period-name">{period.label}</span>
                <span className="period-hours">{period.hours}</span>
              </div>
              <div className="no-appointments">
                Nenhum agendamento para este período
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
