# EventSphere - College Event Management System

College Event Management Portal.

## Project Overview
EventSphere is a streamlined college event management portal designed to eliminate scattered WhatsApp announcements and messy Google Forms. It covers the full lifecycle of campus events:
1. **Event Discovery** - Browse and filter upcoming campus workshops, hackathons, and cultural meets.
2. **Instant Registration** - 1-click registration with real-time seat availability.
3. **Digital QR Pass** - Automated digital ticket with a unique verification QR code.
4. **QR Attendance** - Gate simulation scanner for organizers to verify entries in real time.
5. **Post-Event Feedback** - Rating and student review collection.
6. **Admin Approval** - College authority review to approve or reject proposed events.

---

## Tech Stack
* **Frontend:** React.js (Vite)
* **Styling:** Tailwind CSS
* **Routing:** React Router v7
* **Icons:** Lucide React
* **State Management:** Simple React useState and standard array methods (filter, map)

---

## Project Structure
```text
src/
|-- components/
|   |-- Navbar.jsx         # Header navigation with role-based links
|   `-- EventCard.jsx      # Reusable event card
|
|-- pages/
|   |-- Home.jsx                    # Landing page with hero & workflow
|   |-- Events.jsx                  # Search and category filter
|   |-- EventDetails.jsx            # Event information and registration
|   |-- Ticket.jsx                  # Digital pass with QR code
|   |-- StudentDashboard.jsx        # Registered events & feedback
|   |-- AdminOrganizerDashboard.jsx # Events, creation, participants, attendance, & approvals
|   `-- Login.jsx                   # Role-based login (Student / Admin / Organizer)
|
|-- data/
|   `-- events.js              # Mock college events data
|
|-- App.jsx
|-- main.jsx
`-- index.css
```

---

## Running the Project

```bash
# 1. Install dependencies
npm install

# 2. Run the development server
npm run dev
```

Open http://localhost:5173 in your browser.

---

## Key Talking Points for Faculty Presentation

1. **Problem Statement:**
   Colleges currently use a disjointed chain: WhatsApp broadcasts -> Google Forms -> manual Excel sheets -> paper attendance sheets -> separate Google Form for feedback.
2. **EventSphere Solution:**
   An integrated end-to-end workflow where registration instantly yields a scannable digital QR pass, attendance is tracked digitally, and feedback is collected in one spot.
3. **Code Quality:**
   The code is intentionally minimal and easy to explain. It avoids over-engineering (no Redux, no heavy state libraries) and relies on standard React paradigms: useState, useNavigate, useParams, and JavaScript array manipulation.
