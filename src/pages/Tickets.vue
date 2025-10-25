<template>
  <div class="tickets-page">
    <Navbar />
    <main class="tickets-main">
      <div class="tickets-container">
        <h1>Tickets</h1>

        <!-- Create Ticket Form -->
        <div class="create-ticket-card">
          <h2>Create New Ticket</h2>
          <form @submit.prevent="handleCreateTicket">
            <div class="form-row">
              <div class="form-group">
                <label for="title">Title *</label>
                <input
                  id="title"
                  v-model="newTicket.title"
                  type="text"
                  placeholder="Enter ticket title"
                  @blur="validateTitle"
                />
                <span v-if="errors.title" class="error-message">{{ errors.title }}</span>
              </div>

              <div class="form-group">
                <label for="status">Status *</label>
                <select id="status" v-model="newTicket.status">
                  <option value="open">Open</option>
                  <option value="in_progress">In Progress</option>
                  <option value="closed">Closed</option>
                </select>
              </div>
            </div>

            <div class="form-group">
              <label for="description">Description</label>
              <textarea
                id="description"
                v-model="newTicket.description"
                placeholder="Enter ticket description"
                rows="4"
              ></textarea>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label for="priority">Priority</label>
                <select id="priority" v-model="newTicket.priority">
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>

            <button type="submit" class="btn btn-primary">Create Ticket</button>
          </form>
        </div>

        <!-- Tickets List -->
        <div class="tickets-list">
          <h2>Your Tickets</h2>
          <div v-if="tickets.length === 0" class="no-tickets">
            <p>No tickets yet. Create one to get started!</p>
          </div>
          <div v-else class="tickets-grid">
            <div v-for="ticket in tickets" :key="ticket.id" class="ticket-card" :class="`status-${ticket.status}`">
              <div class="ticket-header">
                <h3>{{ ticket.title }}</h3>
                <span class="status-badge" :class="`badge-${ticket.status}`">{{ formatStatus(ticket.status) }}</span>
              </div>
              <p v-if="ticket.description" class="ticket-description">{{ ticket.description }}</p>
              <div class="ticket-meta">
                <span class="priority" :class="`priority-${ticket.priority}`">{{ ticket.priority }}</span>
                <span class="date">{{ formatDate(ticket.createdAt) }}</span>
              </div>
              <div class="ticket-actions">
                <button @click="editTicket(ticket)" class="btn btn-secondary btn-small">Edit</button>
                <button @click="deleteTicket(ticket.id)" class="btn btn-danger btn-small">Delete</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    <Footer />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'
import { getTickets, saveTickets } from '../utils/storage.js'

const tickets = ref([])
const newTicket = ref({
  title: '',
  description: '',
  status: 'open',
  priority: 'medium'
})
const errors = ref({
  title: ''
})

onMounted(() => {
  tickets.value = getTickets()
})

const validateTitle = () => {
  if (!newTicket.value.title.trim()) {
    errors.value.title = 'Title is required'
  } else {
    errors.value.title = ''
  }
}

const handleCreateTicket = () => {
  validateTitle()

  if (!errors.value.title) {
    const ticket = {
      id: Date.now(),
      ...newTicket.value,
      createdAt: new Date().toISOString()
    }
    tickets.value.push(ticket)
    saveTickets(tickets.value)
    newTicket.value = {
      title: '',
      description: '',
      status: 'open',
      priority: 'medium'
    }
  }
}

const editTicket = (ticket) => {
  newTicket.value = { ...ticket }
  deleteTicket(ticket.id)
}

const deleteTicket = (id) => {
  if (confirm('Are you sure you want to delete this ticket?')) {
    tickets.value = tickets.value.filter(t => t.id !== id)
    saveTickets(tickets.value)
  }
}

const formatStatus = (status) => {
  return status.replace('_', ' ').toUpperCase()
}

const formatDate = (date) => {
  return new Date(date).toLocaleDateString()
}
</script>

<style scoped>
.tickets-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.tickets-main {
  flex: 1;
  padding: 2rem;
  background-color: var(--neutral-light);
}

.tickets-container {
  max-width: 1440px;
  margin: 0 auto;
}

.tickets-container h1 {
  margin-bottom: 2rem;
  color: var(--neutral-dark);
}

.create-ticket-card {
  background-color: white;
  padding: 2rem;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  margin-bottom: 2rem;
}

.create-ticket-card h2 {
  margin-bottom: 1.5rem;
  color: var(--neutral-dark);
}

.form-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  margin-bottom: 1rem;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: var(--neutral-dark);
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: var(--border-radius);
  font-size: 1rem;
  font-family: inherit;
  transition: border-color 0.3s ease;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.error-message {
  color: var(--error-color);
  font-size: 0.875rem;
  margin-top: 0.25rem;
  display: block;
}

.tickets-list {
  margin-top: 2rem;
}

.tickets-list h2 {
  margin-bottom: 1.5rem;
  color: var(--neutral-dark);
}

.no-tickets {
  background-color: white;
  padding: 2rem;
  border-radius: var(--border-radius);
  text-align: center;
  color: #6b7280;
}

.tickets-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.ticket-card {
  background-color: white;
  padding: 1.5rem;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  border-left: 4px solid #d1d5db;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.ticket-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
}

.ticket-card.status-open {
  border-left-color: var(--success-color);
}

.ticket-card.status-in_progress {
  border-left-color: var(--warning-color);
}

.ticket-card.status-closed {
  border-left-color: #9ca3af;
}

.ticket-header {
  display: flex;
  justify-content: space-between;
  align-items: start;
  margin-bottom: 1rem;
  gap: 1rem;
}

.ticket-header h3 {
  color: var(--neutral-dark);
  margin: 0;
}

.status-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  white-space: nowrap;
}

.badge-open {
  background-color: rgba(16, 185, 129, 0.1);
  color: var(--success-color);
}

.badge-in_progress {
  background-color: rgba(245, 158, 11, 0.1);
  color: var(--warning-color);
}

.badge-closed {
  background-color: rgba(156, 163, 175, 0.1);
  color: #6b7280;
}

.ticket-description {
  color: #6b7280;
  margin-bottom: 1rem;
  font-size: 0.95rem;
}

.ticket-meta {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  font-size: 0.875rem;
}

.priority {
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-weight: 500;
}

.priority-low {
  background-color: rgba(16, 185, 129, 0.1);
  color: var(--success-color);
}

.priority-medium {
  background-color: rgba(245, 158, 11, 0.1);
  color: var(--warning-color);
}

.priority-high {
  background-color: rgba(239, 68, 68, 0.1);
  color: var(--error-color);
}

.date {
  color: #9ca3af;
}

.ticket-actions {
  display: flex;
  gap: 0.5rem;
}

.btn-small {
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
}

.btn-danger {
  background-color: var(--error-color);
  color: white;
}

.btn-danger:hover {
  background-color: #dc2626;
}

@media (max-width: 768px) {
  .tickets-main {
    padding: 1rem;
  }

  .create-ticket-card {
    padding: 1.5rem;
  }

  .form-row {
    grid-template-columns: 1fr;
  }

  .tickets-grid {
    grid-template-columns: 1fr;
  }

  .ticket-header {
    flex-direction: column;
  }
}
</style>
