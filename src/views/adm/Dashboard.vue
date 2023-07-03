<template>
  <v-container class="pa-5 mt-5">
    <v-row>
      <v-col cols="12">
        <span class="text-h3">Dashboard</span>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" lg="6">
        <v-card>
          <apexchart
            width="100%"
            type="bar"
            ref="mostAssistedApsidersChartRef"
            :options="mostAssistedApsidersChart"
            :series="mostAssistedApsidersSeries"
          />
          <v-card-title>
            Top 15 Apsiders mas asistidos
          </v-card-title>
          <v-card-subtitle>
            Total de asistencias de apsiders ordenados de quien mas asiste al que menos asiste
          </v-card-subtitle>
          <v-card-text>
            <span class="mr-4">Filtros:</span>
            <v-btn
              class="mx-1"
              :loading="mostAssistedLoading"
              @click="getMostAssistedApsiders()"
              >1 mes</v-btn
            >
            <v-btn
              class="mx-1"
              :loading="mostAssistedLoading"
              @click="getMostAssistedApsiders('3')"
              >3 meses</v-btn
            >
            <v-btn
              class="mx-1"
              :loading="mostAssistedLoading"
              @click="getMostAssistedApsiders('12')"
              >1 año</v-btn
            >
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" lg="6">
        <v-card>
          <apexchart
            width="100%"
            type="bar"
            ref="leastAssistedApsidersChartRef"
            :options="leastAssistedApsidersChart"
            :series="leastAssistedApsidersSeries"
          />
          <v-card-title>
            Top 15 Apsiders con menos asistencias
          </v-card-title>
          <v-card-subtitle>
            Total de asistencias de apsiders ordenados de quien menos asiste 
            al que mas asiste
          </v-card-subtitle>
          <v-card-text>
            <span class="mr-4">Filtros:</span>
            <v-btn
              class="mx-1"
              :loading="mostAssistedLoading"
              @click="getLeastAssistedApsiders()"
              >1 mes</v-btn
            >
            <v-btn
              class="mx-1"
              :loading="mostAssistedLoading"
              @click="getLeastAssistedApsiders('3')"
              >3 meses</v-btn
            >
            <v-btn
              class="mx-1"
              :loading="mostAssistedLoading"
              @click="getLeastAssistedApsiders('12')"
              >1 año</v-btn
            >
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" lg="3" md="6">
        <v-card class="pa-3">
          <div class="d-flex grow flex-wrap justify-space-between">
            <v-sheet
              style="position: relative; top: -20px"
              class="text-start pa-7"
              elevation="6"
              width="auto"
              height="90"
              rounded
              color="info"
            >
              <v-icon size="32" dark>mdi-server</v-icon>
            </v-sheet>
            <div class="ml-6">
              <div class="ml-auto text-right">
                <div class="body-3 grey--text font-weight-light">
                  Total Apsiders
                </div>
                <span class="text-h4 display-2 font-weight-light text--primary"
                  >+{{ apsidersDiscord }}</span
                >
              </div>
            </div>
            <v-col class="px-0" cols="12">
              <v-divider></v-divider>
            </v-col>
            <v-icon size="16" class="mx-2">mdi-server</v-icon>
            <div class="caption grey--text font-weight-light">
              Apsiders totales en la empresa
            </div>
          </div>
        </v-card>
      </v-col>
      <v-col cols="12" lg="3" md="6">
        <v-card class="pa-3">
          <div class="d-flex grow flex-wrap justify-space-between">
            <v-sheet
              style="position: relative; top: -20px"
              class="text-start pa-7"
              elevation="6"
              width="auto"
              height="90"
              rounded
              color="red"
            >
              <v-icon size="32" dark>mdi-server</v-icon>
            </v-sheet>
            <div class="ml-6">
              <div class="ml-auto text-right">
                <div class="body-3 grey--text font-weight-light">
                  No ingresados
                </div>
                <span class="text-h4 display-2 font-weight-light text--primary"
                  >+{{ notInServer }}</span
                >
              </div>
            </div>
            <v-col class="px-0" cols="12">
              <v-divider></v-divider>
            </v-col>
            <v-icon size="16" class="mx-2">mdi-server</v-icon>
            <div class="caption grey--text font-weight-light">
              Apsiders que no estan en el servidor
            </div>
          </div>
        </v-card>
      </v-col>
      <v-col cols="12" lg="3" md="6">
        <v-card class="pa-3">
          <div class="d-flex grow flex-wrap justify-space-between">
            <v-sheet
              style="position: relative; top: -20px"
              class="text-start pa-7"
              elevation="6"
              width="auto"
              height="90"
              rounded
              color="green"
            >
              <v-icon size="32" dark>mdi-database</v-icon>
            </v-sheet>
            <div class="ml-6">
              <div class="ml-auto text-right">
                <div class="body-3 grey--text font-weight-light">Database</div>
                <span class="text-h4 display-2 font-weight-light text--primary"
                  >+{{ inServer }}</span
                >
              </div>
            </div>
            <v-col class="px-0" cols="12">
              <v-divider></v-divider>
            </v-col>
            <v-icon size="16" class="mx-2">mdi-server</v-icon>
            <div class="caption grey--text font-weight-light">
              Apsiders ingresados en la BD
            </div>
          </div>
        </v-card>
      </v-col>
      <v-col cols="12" lg="3" md="6">
        <v-card class="pa-3">
          <div class="d-flex grow flex-wrap justify-space-between">
            <v-sheet
              style="position: relative; top: -20px"
              class="text-start pa-7"
              elevation="6"
              width="auto"
              height="90"
              rounded
              color="orange"
            >
              <v-icon size="32" dark>mdi-crown</v-icon>
            </v-sheet>
            <div class="ml-6">
              <div class="ml-auto text-right">
                <div class="body-3 grey--text font-weight-light">Azotado</div>
                <span style="font-size: 1.2rem" class="text--primary"
                  >Diego Ramirez</span
                >
              </div>
            </div>
            <v-col class="px-0" cols="12">
              <v-divider></v-divider>
            </v-col>
            <v-icon size="16" class="mx-2">mdi-server</v-icon>
            <div class="caption grey--text font-weight-light">
              Encargado de la daily de la semana
            </div>
          </div>
        </v-card>
      </v-col>

      <v-col cols="12" md="12" lg="6">
        <v-card>
          <v-simple-table :loading="arriveOnTimeLoading">
            <template v-slot:default>
              <thead>
                <tr>
                  <th scope="name" class="text-left">
                    Nombre
                  </th>
                  <th scope="hora" class="text-left">
                    Hora promedio
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="item in arriveOnTimeData"
                  :key="item.name"
                >
                  <td>
                    <v-avatar class="my-2" size="45">
                    <img
                      :src="'http://localhost:8999/apsiders/' + item.avatar"
                      style="height: auto !important"
                      alt="Avatar"
                    />
                  </v-avatar>
                    <span class="mx-3">{{ item.name }}</span>
                  </td>
                  <td>{{ item.promedio_hora }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
          <v-card-title > Quien llega mas temprano </v-card-title>
          <v-card-subtitle>
            promedio de hora de llegada por cada apsider ordenados de quien llega mas temprano a quien llega mas tarde
          </v-card-subtitle>

          <v-card-text>
            <span class="mr-4">Filtros:</span>
            <v-btn
              class="mx-1"
              x-small
              :loading="arriveOnTimeLoading"
              @click="getArriveOnTime()"
              >ver 5</v-btn
            >
            <v-btn
              class="mx-1"
              :loading="arriveOnTimeLoading"
              x-small
              @click="getArriveOnTime(15)"
              >ver 15</v-btn
            >
            <v-btn
              class="mx-1"
              :loading="arriveOnTimeLoading"
              x-small
              @click="getArriveOnTime(30)"
              >ver 30</v-btn
            >
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="12" lg="6">
        <v-card>
          <v-simple-table :loading="notArriveOnTimeLoading">
            <template v-slot:default>
              <thead>
                <tr>
                  <th scope="name" class="text-left">
                    Nombre
                  </th>
                  <th scope="hora" class="text-left">
                    Hora promedio
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="item in notArriveOnTimeData"
                  :key="item.name"
                >
                  <td>
                    <v-avatar class="my-2" size="45">
                    <img
                      :src="'http://localhost:8999/apsiders/' + item.avatar"
                      style="height: auto !important"
                      alt="Avatar"
                    />
                  </v-avatar>
                    {{ item.name }}
                  </td>
                  <td>{{ item.promedio_hora }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
          <v-card-title> Quien llega mas tarde </v-card-title>
          <v-card-subtitle>
            promedio de hora de llegada por cada apsider ordenados de quien llega mas tarde a quien llega mas temprano
          </v-card-subtitle>
          <v-card-text>
            <span class="mr-4">Filtros:</span>
            <v-btn
              class="mx-1"
              x-small
              :loading="mostAssistedLoading"
              @click="getNotArriveOnTime()"
              >ver 5</v-btn
            >
            <v-btn
              x-small
              class="mx-1"
              :loading="mostAssistedLoading"
              @click="getNotArriveOnTime(15)"
              >ver 15</v-btn
            >
            <v-btn
              class="mx-1"
              x-small
              :loading="mostAssistedLoading"
              @click="getNotArriveOnTime(20)"
              >ver 30</v-btn
            >
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="12" lg="12">
        <v-card>
          <apexchart
            width="100%"
            type="line"
            ref="howManyAssistsRef"
            :options="howManyAssistsChart"
            :series="howManyAssistsSeries"
          />
          <v-card-title> Total asistidos</v-card-title>
          <v-card-subtitle>Grafico que muestra el total de 
            apsiders asistidos a la daily por dia</v-card-subtitle>
          <v-card-text>
              <span class="mr-4">Filtros:</span>
              <v-btn
                class="mx-1"
                x-small
                :loading="mostAssistedLoading"
                @click="getHowManyAssists()"
                >1 Mes</v-btn
              >
              <v-btn
                x-small
                class="mx-1"
                :loading="mostAssistedLoading"
                @click="getHowManyAssists(3)"
                >3 Meses</v-btn
              >
              <v-btn
                class="mx-1"
                x-small
                :loading="mostAssistedLoading"
                @click="getHowManyAssists(12)"
                >1 Año</v-btn
              >
            </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-snackbar
      v-model="snackbar"
      :timeout="2000"
      left
      color="deep-purple accent-4"
      tile
    >
      {{ snackbarText }}
    </v-snackbar>
  </v-container>
</template>

<script>
export default {
  name: "DashBoard",
  data() {
    return {
      snackbar: false,
      snackbarText: "",

      mostAssistedLoading: false,
      mostAssistedApsidersChart: {
        chart: {
          id: "MostAssistedApsidersChart",
          opacity: 1,
        },
        xaxis: {
          categories: ["test", "test2"],
        },
        plotOptions: {
          bar: {
            borderRadius: 4,
            horizontal: true,
          },
        },
        theme: {
          palette: "palette2",
        },
        yaxis: {
          labels: {
            formatter: (value) => {
              return value;
            },
          },
        },
      },
      mostAssistedApsidersSeries: [
        {
          name: "Asistencias",
          data: [0],
        },
      ],

      leastAssistedLoading: false,
      leastAssistedApsidersChart: {
        chart: {
          id: "LeastAssistedApsidersChart",
          opacity: 1,
        },
        xaxis: {
          categories: ["test"],
        },
        theme: {
          palette: "palette7",
        },
        plotOptions: {
          bar: {
            borderRadius: 4,
            horizontal: true,
          },
        },
        yaxis: {
          labels: {
            formatter: (value) => {
              return value;
            },
          },
        },
      },

      leastAssistedApsidersSeries: [
        {
          name: "Asistencias",
          data: [0],
        },
      ],

      arriveOnTimeLoading: false,
      arriveOnTimeData : [],

      notArriveOnTimeLoading: false,
      notArriveOnTimeData : [],

      howManyAssistsLoading: false,
      howManyAssistsChart: {
        chart: {
          id: "HowManyAssistsChart",
          opacity: 1,
        },
        xaxis: {
          categories: ["test"],
        },
        theme: {
          palette: "palette5",
        },
        yaxis: {
          forceNiceScale: true,
        },
      },

      howManyAssistsSeries: [
        {
          name: "Asistencias",
          data: [0],
        },
      ],

      apsidersDiscord: 0,
      notInServer: 0,
      inServer: 0,
    };
  },
  mounted() {
    this.getMostAssistedApsiders();
    this.getLeastAssistedApsiders();
    this.getApsidersDiscord();
    this.getArriveOnTime();
    this.getNotArriveOnTime();
    this.getHowManyAssists();
  },
  methods: {
    getMostAssistedApsiders(interval_months = 1) {
      this.mostAssistedLoading = true;
      this.$axios
        .get("/mostAssistedApsiders", {
          headers: { Authorization: localStorage.getItem("access_token") },
          params: {
            interval_months: interval_months,
          },
        })
        .then((response) => {
          this.$refs.mostAssistedApsidersChartRef.updateOptions({
            xaxis: {
              categories: response.data.categories,
            },
          });

          this.mostAssistedApsidersSeries = [
            {
              name: "Asistencias",
              data: response.data.data,
            },
          ];

          this.snackbar = true;
          this.snackbarText = "Datos actualizados";
          this.mostAssistedLoading = false;
        })
        .catch((error) => {
          this.mostAssistedLoading = false;

          console.log(error);
        });
    },

    getLeastAssistedApsiders(interval_months = 1) {
      this.leastAssistedLoading = true;
      this.$axios
        .get("/leastAssistedApsiders", {
          headers: { Authorization: localStorage.getItem("access_token") },
          params: {
            interval_months: interval_months,
          },
        })
        .then((response) => {
          this.$refs.leastAssistedApsidersChartRef.updateOptions({
            xaxis: {
              categories: response.data.categories,
            },
          });

          this.leastAssistedApsidersSeries = [
            {
              name: "Asistencias",
              data: response.data.data,
            },
          ];

          this.snackbar = true;
          this.snackbarText = "Datos actualizados";
          this.leastAssistedLoading = false;
        })
        .catch((error) => {
          this.leastAssistedLoading = false;

          console.log(error);
        });
    },

    getApsidersDiscord() {
      this.$axios
        .get("/get-apsiders-discord", {
          headers: { Authorization: localStorage.getItem("access_token") },
        })
        .then((response) => {
          this.apsidersDiscord = response.data.membersInDiscordLength;
          this.notInServer = response.data.notInServerLength;
          this.inServer = response.data.inServerLength;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    getArriveOnTime(limit = 5) {
      this.arriveOnTimeLoading = true;
      this.$axios
        .get("/arriveOnTime", {
          headers: { Authorization: localStorage.getItem("access_token") },
          params: { limit: limit },
        })
        .then((response) => {
          this.arriveOnTimeData = response.data.data;

          this.snackbar = true;
          this.snackbarText = "Datos actualizados";
          this.arriveOnTimeLoading = false;
        });
    },

    getNotArriveOnTime(limit = 5) {
      this.arriveOnTimeLoading = true;
      this.$axios
        .get("/notArriveOnTime", {
          headers: { Authorization: localStorage.getItem("access_token") },
          params: { limit: limit },
        })
        .then((response) => {
          this.notArriveOnTimeData = response.data.data;

          this.snackbar = true;
          this.snackbarText = "Datos actualizados";
          this.arriveOnTimeLoading = false;
        });
    },

    getHowManyAssists(interval_months = 1) {
      this.howManyAssistsLoading = true;
      this.$axios
        .get("/howManyAssists", {
          headers: { Authorization: localStorage.getItem("access_token") },
          params: { interval: interval_months }
        })
        .then((response) => {
          this.$refs.howManyAssistsRef.updateOptions({
            xaxis: {
              categories: response.data.categories,
            },
          });

          this.howManyAssistsSeries = [
            {
              name: "Cantidad de personas asistidas",
              data: response.data.data,
            },
          ];

          this.snackbar = true;
          this.snackbarText = "Datos actualizados";
          this.arriveOnTimeLoading = false;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
.outline-card {
  width: 100%;
  position: relative;
  top: -25px;
}
.apexcharts-text {
  color: white !important;
}
</style>