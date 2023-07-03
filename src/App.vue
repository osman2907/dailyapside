<template>
  <v-app class="bg-white">
    <AdmSidebar v-if="isLoggedIn" />
    <!-- app -->
    <div :style="isLoggedIn ? 'margin-left: 256px;' : ''" style="height: 100%">
      <router-view />
      {{ appVersion }}
    </div>

    <!-- token expiration -->
    <v-dialog
      v-model="expiredTokenDialog"
      width="auto"
      max-width="500"
    >
      <v-card class="pa-5 text-center">
        <v-icon size="115" class="py-4" color="error">
          mdi-alert-circle-outline
        </v-icon>
        <v-card-text class="text-h5">
          <b>Sesión expirada.</b><br> Por favor, inicie sesión nuevamente.
        </v-card-text>
        <v-card-actions>
          <v-btn
            color="error"
            block @click="confirmTokenExpired()"
          >Entendido</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
import AdmSidebar from "@/components/AdmSidebar.vue";

export default {
  components: {
    AdmSidebar,
  },
  name: "App",
  data() {
    return {
      appVersion: process.env.VUE_APP_VERSION,
    };
  },
  computed: {
    isLoggedIn: function() {
      return this.$store.getters.isLoggedIn;
    },
    expiredTokenDialog: function() {
      return this.$store.getters.tokenExpired;
    },
  },
  methods: {
    confirmTokenExpired: function() {
      this.$store.commit("confirmTokenExpired");
    },
  },
};
</script>

<style scoped>
#app {
  background-color: #f5f5f5 !important;
}
</style>
