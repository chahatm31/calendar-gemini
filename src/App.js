// App.js
import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import "./App.css";

function App() {
  const [events, setEvents] = useState([]);
  const [currentView, setCurrentView] = useState("dayGridMonth");

  useEffect(() => {
    // Load events from local storage on component mount
    const storedEvents = localStorage.getItem("events");
    if (storedEvents) {
      setEvents(JSON.parse(storedEvents));
    }
  }, []);

  useEffect(() => {
    // Save events to local storage whenever events array changes
    localStorage.setItem("events", JSON.stringify(events));
  }, [events]);

  const handleEventAdd = (addInfo) => {
    setEvents([...events, addInfo.event]);
  };

  const handleEventChange = (changeInfo) => {
    setEvents(
      events.map((event) =>
        event.id === changeInfo.event.id ? changeInfo.event : event
      )
    );
  };

  const handleEventRemove = (removeInfo) => {
    setEvents(events.filter((event) => event.id !== removeInfo.event.id));
  };

  const handleDateClick = (arg) => {
    // Create a new event when a date is clicked
    const title = prompt("Enter event title:");
    if (title) {
      const newEvent = {
        id: String(Date.now()), // Generate unique ID
        title,
        start: arg.date,
        allDay: arg.allDay,
      };
      setEvents([...events, newEvent]);
    }
  };

  return (
    <div className="app">
      <div className="calendar-container">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView={currentView}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          events={events}
          eventAdd={handleEventAdd}
          eventChange={handleEventChange}
          eventRemove={handleEventRemove}
          dateClick={handleDateClick}
          editable={true}
          droppable={true}
        />
      </div>
      <div className="view-buttons">
        <button onClick={() => setCurrentView("dayGridMonth")}>
          Month View
        </button>
        <button onClick={() => setCurrentView("timeGridWeek")}>
          Week View
        </button>
        <button onClick={() => setCurrentView("timeGridDay")}>Day View</button>
      </div>
    </div>
  );
}

export default App;
