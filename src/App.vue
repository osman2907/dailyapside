<template>
  <v-app class="bg-white">
    <AdmSidebar v-if="isLoggedIn" />
    <!-- app -->
    <transition name="slide" appear>
    <div :style="isLoggedIn ? 'margin-left: 256px;' : ''" style="height: 100%">

        <router-view />
      <div class="version-floating">
        Versión: {{ appVersion }}
        <v-btn
          @click="openBugReportDialog()"
          color="red"
          class="mx-2"
          dark
          small
          fab
        >
          <v-icon dark>mdi-bug</v-icon>
        </v-btn>
      </div>
    </div>
    </transition>

    <!-- bugReportDialog -->
    <v-dialog v-model="bugReportDialog" width="auto" persistent max-width="500">
      <v-card>
        <v-card-title>
          <span class="text-h5">Reportar un error</span>
        </v-card-title>
        <v-card-text>
          <v-form ref="form">
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    label="Nombre y apellido *"
                    v-model="bugReportName"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-textarea
                    solo
                    v-model="bugReportInfo"
                    name="input-7-4"
                    label="Información del error *"
                    hint="Por favor entregue información detallada del error. Tome como ayuda los siguientes puntos: 1: ¿Qué hiciste para producir el error?. 2: Resumen del error. 3: Especificaciones que debería saber (Navegador, fechha, hora, etc)."
                  ></v-textarea>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="gray darken-1" text @click="bugReportDialog = false">
            Cancelar
          </v-btn>
          <v-btn
            :loading="bugReportLoading"
            color="blue darken-1"
            text
            @click="sendBugReport()"
          >
            Enviar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- token expiration -->
    <v-dialog v-model="expiredTokenDialog" width="auto" max-width="500">
      <v-card class="pa-5 text-center">
        <v-icon size="115" class="py-4" color="error">
          mdi-alert-circle-outline
        </v-icon>
        <v-card-text class="text-h5">
          <b>Sesión expirada.</b><br />
          Por favor, inicie sesión nuevamente.
        </v-card-text>
        <v-card-actions>
          <v-btn color="error" block @click="confirmTokenExpired()"
            >Entendido</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-snackbar
      v-model="appSnackbar"
      :timeout="2000"
      left
      color="deep-purple accent-4"
      tile
    >
      {{ appSnackbarText }}
    </v-snackbar>
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
      bugReportDialog: false,
      bugReportName: "",
      bugReportInfo: "",
      bugReportLoading: false,
      appSnackbar: false,
      appSnackbarText: "",
    };
  },
  computed: {
    isLoggedIn: function () {
      return this.$store.getters.isLoggedIn;
    },
    expiredTokenDialog: function () {
      return this.$store.getters.tokenExpired;
    },
  },
  methods: {
    confirmTokenExpired: function () {
      this.$store.commit("confirmTokenExpired");
    },
    openBugReportDialog: function () {
      this.bugReportDialog = true;
    },
    sendBugReport: function () {
      if (!this.$refs.form.validate()) return;

      this.bugReportLoading = true;

      this.$axios.post("/bug-report", {
        name: this.bugReportName,
        info: this.bugReportInfo,
      }).then(() => {
        this.bugReportLoading = false;
        this.bugReportDialog = false;
        this.$refs.form.reset();
        this.appSnackbar = true;
        this.appSnackbarText = "Reporte enviado con éxito.";
      }).catch(() => {
        this.bugReportLoading = false;
        this.appSnackbar = true;
        this.appSnackbarText = "Error al enviar el reporte.";
      });
    },
  },
};
</script>

<style scoped>
#app {
  background-color: #f5f5f5 !important;
}

.version-floating {
  position: fixed;
  bottom: 0;
  right: 0;
  margin: 1rem;
  padding: 0.5rem;
  font-size: 0.8rem;
  font-weight: bold;
  color: #333;
}
</style>
