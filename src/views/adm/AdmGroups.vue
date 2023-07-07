<template>
  <v-container class="pa-5 mt-5">
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>
            Administrar Apsiders
            <v-spacer></v-spacer>
            <v-text-field
              v-model="busqueda"
              append-icon="mdi-magnify"
              label="Buscar"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-data-table
            :loading="cargando"
            loading-text="Cargando... Por favor espere"
            :headers="cabeceras"
            :items="apsiders"
            :search="busqueda"
          ></v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "admGroups",
  data() {
    return {};
  },
};
</script>

<style>
</style>