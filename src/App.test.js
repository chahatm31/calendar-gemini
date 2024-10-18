import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import App from "./App";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";

// Mock localStorage
const localStorageMock = (function () {
  let store = {};
  return {
    getItem: function (key) {
      return store[key] || null;
    },
    setItem: function (key, value) {
      store[key] = value.toString();
    },
    removeItem: function (key) {
      delete store[key];
    },
    clear: function () {
      store = {};
    },
  };
})();

Object.defineProperty(window, "localStorage", { value: localStorageMock });

describe("App Component", () => {
  // Helper function to render the calendar with specific plugins
  const renderCalendar = (
    plugins = [dayGridPlugin, timeGridPlugin, interactionPlugin]
  ) => {
    render(<App />);
  };

  beforeEach(() => {
    localStorage.clear(); // Clear localStorage before each test
  });

  it("renders the calendar", () => {
    renderCalendar();
    expect(screen.getByText("today")).toBeInTheDocument();
  });

  // Requirement 1: Add and customize events
  it("allows users to add and customize events", () => {
    renderCalendar();
    // Click a date to add an event
    fireEvent.click(screen.getByText(new Date().getDate().toString()));
    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "Test Event" },
    });
    fireEvent.click(screen.getByText("Save"));
    expect(screen.getByText("Test Event")).toBeInTheDocument();
  });

  // Requirement 2: Show daily, weekly, and monthly views
  it("shows daily, weekly, and monthly views", () => {
    renderCalendar();
    fireEvent.click(screen.getByText("Month View"));
    expect(screen.getByText("today")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Week View"));
    expect(screen.getByText("today")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Day View"));
    expect(screen.getByText("today")).toBeInTheDocument();
  });

  // Requirement 3: Drag and drop events
  it("allows users to drag and drop events", () => {
    renderCalendar();
    // Add an event (implementation depends on how you add events)
    fireEvent.click(screen.getByText(new Date().getDate().toString()));
    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "Draggable Event" },
    });
    fireEvent.click(screen.getByText("Save"));

    // Simulate drag and drop (this is complex and may require a library like @testing-library/user-event)
    // ... (Implementation for drag and drop testing) ...
    // Assert that the event has moved to the new date/time
  });

  // Requirement 4: Set reminder notifications
  it("allows users to set reminder notifications", () => {
    renderCalendar();
    // Add an event with a reminder (implementation depends on how you set reminders)
    // ... (Implementation for adding event with reminder) ...
    // Assert that the reminder is set correctly (e.g., check event object or UI)
  });

  // Requirement 5: Display overlapping events
  it("displays overlapping events in an organized way", () => {
    renderCalendar();
    // Add overlapping events (implementation depends on how you add events)
    // ... (Implementation for adding overlapping events) ...
    // Assert that the events are displayed without overlapping text (e.g., check CSS classes or layout)
  });

  // Requirement 6: Visually differentiate events
  it("visually differentiates between past, current, and future events", () => {
    renderCalendar();
    // Add past, current, and future events (implementation depends on how you add events)
    // ... (Implementation for adding events with different dates) ...
    // Assert that the events have different styles/classes based on their date (e.g., check CSS classes)
  });

  // Requirement 7: Reset calendar
  it("allows users to reset the calendar to default views and settings", () => {
    renderCalendar();
    // Change some settings (e.g., switch to week view)
    fireEvent.click(screen.getByText("Week View"));

    // Implement and click a reset button
    // ... (Implementation for reset button) ...

    // Assert that the calendar is back to the default monthly view
    expect(screen.getByText("Month View")).toBeInTheDocument();
  });

  // Requirement 8: Customize calendar display
  it("allows users to customize the calendar display", () => {
    renderCalendar();
    // Implement and interact with customization options (e.g., change theme or font size)
    // ... (Implementation for customization options) ...
    // Assert that the calendar display changes accordingly (e.g., check CSS classes or styles)
  });

  // Requirement 9: View multiple calendars
  it("allows users to view and compare events from multiple calendars", () => {
    renderCalendar();
    // Implement and interact with calendar syncing/adding functionality
    // ... (Implementation for adding external calendars) ...
    // Assert that events from both calendars are displayed correctly
  });

  // Requirement 10: Edit events without repositioning
  it("allows users to edit events while keeping their position", () => {
    renderCalendar();
    // Add an event
    fireEvent.click(screen.getByText(new Date().getDate().toString()));
    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "Editable Event" },
    });
    fireEvent.click(screen.getByText("Save"));

    // Edit the event (implementation depends on how you edit events)
    // ... (Implementation for editing the event) ...
    // Assert that the event remains in the same position on the calendar
  });

  // Requirement 11: Export calendar data
  it("provides an option to export the calendar or specific events", () => {
    renderCalendar();
    // Implement and interact with export functionality
    // ... (Implementation for export button and functionality) ...
    // Assert that the export functionality works as expected (e.g., mock the download or check the exported data)
  });

  // Requirement 12: Set recurring events
  it("allows users to set recurring events", () => {
    renderCalendar();
    // Add a recurring event (implementation depends on how you add recurring events)
    // ... (Implementation for adding recurring events) ...
    // Assert that the recurring event appears on the correct dates
  });
});
