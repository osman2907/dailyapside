<template>
  <v-container fill-height fluid>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-img src="@/assets/images/apside.png" class="my-7 mr-3"></v-img>
        <v-card class="elevation-12 rounded-m pa-2">
          <v-card-text>
            <v-alert type="error" v-if="error">{{ errorMessage }}</v-alert>
            <v-form ref="form">
              <v-text-field
                prepend-icon="mdi-account"
                name="username"
                v-model="username"
                :rules="usernameRules"
                label="Nombre de usuario"
                type="text"
                required
              ></v-text-field>
              <v-text-field
                id="password"
                prepend-icon="mdi-lock"
                name="password"
                v-model="password"
                :rules="passwordRules"
                label="Contraseña"
                autocomplete
                type="password"
                required
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" :loading="loading" block @click="login()"
              >Login</v-btn
            >
          </v-card-actions>
        </v-card>
        <div class="my-4">
          <router-link
            :to="{
              name: 'DailyApside',
            }"
          >
            <v-icon>mdi-arrow-left</v-icon>
            Volver a la daily</router-link
          >
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      username: "",
      usernameRules: [
        (value) => {
          if (value) return true;
          return "El nombre de usuario es requerido.";
        },
      ],
      password: "",
      passwordRules: [
        (value) => {
          if (value) return true;
          return "La contraseña es requerida.";
        },
        (value) => {
          if (value && value.length >= 8) return true;
          return "La contraseña debe tener al menos 8 caracteres.";
        },
      ],
      error: false,
      errorMessage: "",
      loading: false,
    };
  },
  methods: {
    login() {
      const valid = this.$refs.form.validate();
      if (!valid) return;

      this.error = false;
      this.loading = true;
      this.$axios
        .post("/adm/login", {
          username: this.username,
          password: this.password,
        })
        .then((response) => {
          console.log(response);
          this.loading = false;

          if (response.data.status === "error") {
            this.error = true;
            this.errorMessage = response.data.message;
            return;
          }

          this.$store.dispatch("login", response.data);
          this.$router.push({
            name: "Dashboard",
          });
        })
        .catch((error) => {
          console.log(error);
          this.loading = false;
        });
    },
  },
};
</script>
