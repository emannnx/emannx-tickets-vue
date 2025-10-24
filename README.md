# emannx-tickets

A robust **Ticket Management Web App** built with **React.js**. Manage your tickets efficiently with a clean, responsive interface.

## Features

- **Landing Page**: Attractive hero section with wavy design and feature showcase
- **Authentication**: Secure login and signup with form validation
- **Dashboard**: Overview of ticket statistics (total, open, resolved)
- **Ticket Management**: Full CRUD operations with real-time validation
- **Responsive Design**: Works seamlessly on mobile, tablet, and desktop
- **Local Storage**: All data persists in browser localStorage
- **Toast Notifications**: Real-time feedback for user actions
- **Accessibility**: Semantic HTML, proper color contrast, and focus states

## Tech Stack

- **Framework**: React.js 18.2.0
- **Routing**: React Router DOM 6.20.0
- **Notifications**: React Toastify 9.1.3
- **Styling**: CSS3 with custom design system
- **State Management**: React Hooks (useState, useEffect)

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Steps

1. **Clone or download the project**
   \`\`\`bash
   git clone <repository-url>
   cd emannx-tickets
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Start the development server**
   \`\`\`bash
   npm start
   \`\`\`

4. **Open in browser**
   - Navigate to `http://localhost:3000`

## Demo Credentials

Use these credentials to test the app:

- **Email**: `testuser@test.com`
- **Password**: `password123`

Or create your own account with any valid email and password (minimum 6 characters).

## Project Structure

\`\`\`
src/
├── components/
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── ProtectedRoute.jsx
│   ├── TicketCard.jsx
│   └── Toast.jsx
├── pages/
│   ├── Landing.jsx
│   ├── Login.jsx
│   ├── Signup.jsx
│   ├── Dashboard.jsx
│   └── Tickets.jsx
├── utils/
│   ├── storage.js
│   └── validation.js
├── styles/
│   ├── index.css
│   ├── navbar.css
│   ├── footer.css
│   ├── landing.css
│   ├── auth.css
│   ├── dashboard.css
│   ├── ticket-card.css
│   └── tickets.css
├── App.jsx
└── index.js
\`\`\`

## Storage Keys

- **Session**: `ticketapp_session` - Stores user session token
- **Tickets**: `tickets_data` - Stores all tickets as JSON array

## Validation Rules

### Authentication
- Email must be valid format
- Password must be at least 6 characters

### Tickets
- **Title**: Required field
- **Status**: Required, must be one of: `open`, `in_progress`, `closed`
- **Description**: Optional
- **Priority**: Optional, defaults to "Normal"

## Status Colors

- **Open**: Green (#10b981)
- **In Progress**: Amber (#f59e0b)
- **Closed**: Gray (#6b7280)

## Accessibility Features

- Semantic HTML elements (`<main>`, `<nav>`, `<footer>`)
- Visible focus states on all interactive elements
- Proper color contrast ratios (WCAG AA compliant)
- Alt text for all images
- Responsive design for all screen sizes
- Form labels properly associated with inputs

## Known Issues & Limitations

- Authentication is simulated (no backend server)
- Data is stored in browser localStorage (not persistent across devices)
- No user-specific data isolation (all users share the same tickets)
- No real-time synchronization between tabs

## Future Enhancements

- Backend API integration
- User authentication with JWT
- Database persistence
- Real-time updates with WebSockets
- Advanced filtering and search
- Ticket assignment and team collaboration
- Email notifications

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT License - Feel free to use this project for personal or commercial purposes.

## Support

For issues or questions, please open an issue in the repository.

---

**Built with ❤️ using React.js**
