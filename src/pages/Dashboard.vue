<template>
  <div class="dashboard-page">
    <Navbar />
    <main class="dashboard-main">
      <div class="dashboard-container">
        <h1>Dashboard</h1>
        <div class="stats-grid">
          <div class="stat-card">
            <h3>Total Tickets</h3>
            <p class="stat-number">{{ totalTickets }}</p>
          </div>
          <div class="stat-card">
            <h3>Open Tickets</h3>
            <p class="stat-number stat-open">{{ openTickets }}</p>
          </div>
          <div class="stat-card">
            <h3>In Progress</h3>
            <p class="stat-number stat-progress">{{ inProgressTickets }}</p>
          </div>
          <div class="stat-card">
            <h3>Resolved Tickets</h3>
            <p class="stat-number stat-closed">{{ closedTickets }}</p>
          </div>
        </div>

        <div class="dashboard-actions">
          <router-link to="/tickets" class="btn btn-primary">Manage Tickets</router-link>
        </div>
      </div>
    </main>
    <Footer />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'
import { getTickets } from '../utils/storage.js'

const tickets = ref([])

onMounted(() => {
  tickets.value = getTickets()
})

const totalTickets = computed(() => tickets.value.length)
const openTickets = computed(() => tickets.value.filter(t => t.status === 'open').length)
const inProgressTickets = computed(() => tickets.value.filter(t => t.status === 'in_progress').length)
const closedTickets = computed(() => tickets.value.filter(t => t.status === 'closed').length)
</script>

<style scoped>
.dashboard-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.dashboard-main {
  flex: 1;
  padding: 2rem;
  background-color: var(--neutral-light);
}

.dashboard-container {
  max-width: 1440px;
  margin: 0 auto;
}

.dashboard-container h1 {
  margin-bottom: 2rem;
  color: var(--neutral-dark);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.stat-card {
  background-color: white;
  padding: 2rem;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  text-align: center;
}

.stat-card h3 {
  color: #6b7280;
  margin-bottom: 1rem;
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.stat-number {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--primary-color);
}

.stat-open {
  color: var(--success-color);
}

.stat-progress {
  color: var(--warning-color);
}

.stat-closed {
  color: #9ca3af;
}

.dashboard-actions {
  display: flex;
  gap: 1rem;
}

@media (max-width: 768px) {
  .dashboard-main {
    padding: 1rem;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }

  .stat-number {
    font-size: 2rem;
  }
}
</style>
