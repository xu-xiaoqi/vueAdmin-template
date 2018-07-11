<template>
  <div class="dashboard-container">
    <component :is="currentRole"></component>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import adminDashboard from './admin'

export default {
  name: 'dashboard',
  components: {
    adminDashboard
  },
  computed: {
    ...mapGetters(['name', 'roles'])
  },
  data() {
    return {
      currentRole: 'adminDashboard'
    }
  }
}
</script>
