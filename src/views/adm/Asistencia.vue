<template>
  <v-container class="pa-5 mt-5">
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>
            Asistencias
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
            :loading="apsidersLoading"
            loading-text="Cargando..."
            :headers="cabeceras"
            :items="apsidersData"
            :search="busqueda"
          >
            <template v-slot:item="row">
              <tr>
                <td>
                  <v-avatar class="my-2" size="45">
                    <img
                      :src="basePathApsiders + row.item.avatar"
                      style="height: auto !important"
                      alt="Avatar"
                    />
                  </v-avatar>
                  <b class="mx-3">{{ row.item.name }}</b>
                </td>
                <td>{{ row.item.email }}</td>
                <td>{{ row.item.total_asistencias }}</td>
                <td>
                  <v-btn
                    class="mx-2"
                    fab
                    dark
                    small
                    color="blue"
                    @click="openAsistenciaDialog(row.item)"
                    ><v-icon dark>mdi-calendar</v-icon>
                  </v-btn>
                </td>
              </tr>
            </template>
          </v-data-table>
        </v-card>

        <v-dialog v-model="asistenciasDialog" max-width="500px">
          <v-card>
            <v-card-title>
              Asistencias de {{ asistenciasDialogData.name }}
            </v-card-title>
            <vc-calendar is-expanded :attributes="attributes" />
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Asistencia",
  data() {
    return {
      apsidersData: [],
      busqueda: "",
      cabeceras: [
        {
          text: "Nombre",
          align: "start",
          sortable: true,
          value: "name",
        },
        {
          text: "Correo",
          sortable: true,
          value: "email",
        },
        {
          text: "Total asistencias",
          sortable: true,
          value: "asistencias",
        },
        {
          text: "Acciones",
          sortable: true,
          value: "acciones",
        },
      ],
      apsidersLoading: false,

      asistenciasLoading: false,
      asistenciasDialog: false,
      asistenciasDialogData: {},

      attributes: [
        {
          highlight: {
            color: "green",
            fillMode: "light",
          },
          dates: new Date(2023, 6, 28),
        },
      ],
      basePathApsiders: process.env.VUE_APP_APSIDERS
    };
  },
  created() {
    this.getApsiders();
  },
  methods: {
    getApsiders() {
      this.apsidersLoading = true;
      this.$axios
        .get("/asistenciasApsiders", {
          headers: { Authorization: localStorage.getItem("access_token") },
        })
        .then((response) => {
          this.apsidersData = response.data.data;
          this.apsidersLoading = false;
        })
        .catch((error) => {
          console.log(error);
          this.apsidersLoading = false;
        });
    },

    openAsistenciaDialog(apsider) {
      this.asistenciasLoading = true;
      this.$axios
        .get("/asistenciaApsider", {
          headers: { Authorization: localStorage.getItem("access_token") },
          params: { apsider_id: apsider.id },
        })
        .then((response) => {
          this.asistenciasLoading = false;
          this.asistenciasDialogData = apsider;

            this.attributes = response.data.data.map((item) => {
            //   "yyyy-mm-dd" llegada
            const dateSplit = item.fecha.split("-");
            const date = new Date(
                parseInt(dateSplit[0]),
                parseInt(dateSplit[1]) - 1, // porque los meses empiezan en 0 wtfl
                parseInt(dateSplit[2])
            );
                return {
                highlight: {
                  color: "green",
                  fillMode: "light",
                },
                dates: date,
                popover: {
                  label: "asistido a las: " + item.hora,
                },
              };
            });

          this.asistenciasDialog = true;
        })
        .catch((error) => {
          console.log(error);
          this.asistenciasLoading = false;
        });
    },
  },
};
</script>
