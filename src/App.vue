<template>
  <v-app class="bg-white">
    <AdmSidebar v-if="isLoggedIn" />
    <!-- app -->
    <div :style="isLoggedIn ? 'margin-left: 256px;' : ''" style="height: 100%">
      <router-view />
    </div>
  </v-app>
</template>

<script>
import AdmSidebar from "@/components/AdmSidebar.vue";

export default {
  components: {
    AdmSidebar,
  },
  name: "App",
  computed: {
    isLoggedIn: function() {
      return this.$store.getters.isLoggedIn;
    },
  },
};
</script>

<style scoped>
#app {
  background-color: #f5f5f5 !important;
}
</style>
