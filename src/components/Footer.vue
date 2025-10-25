<template>
  <footer class="footer">
    <div class="footer-container">
      <div class="footer-content">
        <div class="footer-section">
          <h4>emannx-tickets</h4>
        </div>
        <div class="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><router-link to="/">Home</router-link></li>
            <li><a href="#privacy">Privacy Policy</a></li>
            <li><a href="#terms">Terms of Service</a></li>
          </ul>
        </div>
  
      </div>
      <div clss="footer-bottom">
      </div>
    </div>
  </footer>
</template>

<script setup>
</script>

<style scoped>
.footer {
  background-color: var(--neutral-dark);
  color: white;
  margin-top: auto;
}

.footer-container {
  max-width: 1440px;
  margin: 0 auto;
  padding: 3rem 2rem 1rem;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.footer-section h4 {
  margin-bottom: 1rem;
  color: white;
}

.footer-section p {
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 0.5rem;
}

.footer-section ul {
  list-style: none;
  padding: 0;
}

.footer-section ul li {
  margin-bottom: 0.5rem;
}

.footer-section a {
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer-section a:hover {
  color: white;
}

.footer-bottom {
  text-align: center;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.6);
}

@media (max-width: 768px) {
  .footer-container {
    padding: 2rem 1rem 1rem;
  }

  .footer-content {
    grid-template-columns: 1fr;
  }
}
</style>
