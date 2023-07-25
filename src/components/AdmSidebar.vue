<template>
  <v-navigation-drawer app permanent>
    <v-list-item>
      <v-list-item-content>
        <v-img src="@/assets/images/apside.png"></v-img>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>

    <v-list dense nav>
      <v-list-item
        link
        active-class="link-active"
        :to="{ name: 'Dashboard' }"
        exact
      >
        <v-list-item-icon>
          <v-icon>mdi-view-dashboard</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>Dashboard</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item
        link
        active-class="link-active"
        :to="{ name: 'AdmApsiders' }"
        exact
      >
        <v-list-item-icon>
          <v-icon>mdi-account-cog</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>Administrar Apsiders</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item
        link
        active-class="link-active"
        :to="{ name: 'AdmGroups' }"
        exact
      >
        <v-list-item-icon>
          <v-icon>mdi-account-group</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>Administrar Grupos</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item
        link
        active-class="link-active"
        :to="{ name: 'AdmAsistencias' }"
        exact
      >
        <v-list-item-icon>
          <v-icon>mdi-calendar</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>Asistencias</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item
        link
        active-class="link-active"
        :to="{ name: 'GroupSelection' }"
        exact
      >
        <v-list-item-icon>
          <v-icon>mdi-view-list</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>Daily</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <template v-slot:append>
      <div class="pa-2">
        <v-btn block color="error" @click="logout()"> Cerrar sesión </v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "AdmSidebar",
  methods: {
    logout() {
      this.$store.dispatch("logout");
      this.$router.push({ name: "Login" });
    },
  },
};
</script>

<style></style>