import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [selectedDate, setSelectedDate] = useState('09/03/2026');
  const [clientName, setClientName] = useState('');
  const [selectedTime, setSelectedTime] = useState(null);
  const [appointments, setAppointments] = useState(() => {
    const saved = localStorage.getItem('hairday-appointments');
    return saved ? JSON.parse(saved) : [];
  });

  const periods = [
    { id: 'morning', label: 'Manhã', icon: '☀️', hours: '9h-12h', times: ['09:00', '10:00', '11:00', '12:00'] },
    { id: 'afternoon', label: 'Tarde', icon: '🌤️', hours: '13h-18h', times: ['13:00', '14:00', '15:00', '16:00', '17:00', '18:00'] },
    { id: 'night', label: 'Noite', icon: '🌙', hours: '19h-21h', times: ['19:00', '20:00', '21:00'] }
  ];

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('hairday-appointments', JSON.stringify(appointments));
  }, [appointments]);

  const handleSchedule = () => {
    if (!selectedTime) {
      alert('Selecione um horário');
      return;
    }
    if (!clientName.trim()) {
      alert('Informe o nome do cliente');
      return;
    }

    const newAppointment = {
      id: Date.now(),
      date: selectedDate,
      time: selectedTime,
      client: clientName
    };

    setAppointments([...appointments, newAppointment]);
    setClientName('');
    setSelectedTime(null);
    alert('Agendamento confirmado!');
  };

  const handleDelete = (id) => {
    if (window.confirm('Deseja cancelar este agendamento?')) {
      setAppointments(prev => prev.filter(app => app.id !== id));
    }
  };



  return (
    <div className="app">
      <div className="container">
        <div className="left-panel">
          <div className="logo">
            <span>💈</span> HairDay Retro
          </div>

          <h2>Agende seu Corte</h2>
          <p className="subtitle">Escolha a data, o horário e o barbeiro(a) não vai te deixar esperando!</p>

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

          {periods.map(period => {
            const periodAppointments = appointments
              .filter(app => app.date === selectedDate && period.times.includes(app.time))
              .sort((a, b) => a.time.localeCompare(b.time));

            return (
              <div key={period.id} className="agenda-period">
                <div className="period-info">
                  <span className="period-icon">{period.icon}</span>
                  <span className="period-name">{period.label}</span>
                  <span className="period-hours">{period.hours}</span>
                </div>
                
                <div className="appointments-list">
                  {periodAppointments.length > 0 ? (
                    periodAppointments.map(app => (
                      <div key={app.id} className="appointment-item">
                        <span className="appointment-time">{app.time}</span>
                        <span className="appointment-client">{app.client}</span>
                        <button 
                          className="btn-delete" 
                          onClick={() => handleDelete(app.id)}
                          title="Cancelar agendamento"
                        >
                          Remover
                        </button>
                      </div>
                    ))
                  ) : (
                    <div className="no-appointments">
                      Nenhum agendamento para este período
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
