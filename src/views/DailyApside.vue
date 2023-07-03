<template>
  <v-container class="mt-5" style="max-width: 1200px !important">
    <v-row>
      <v-col
        cols="12"
        class="align-center d-flex justify-center justify-lg-space-between flex-wrap col col-12"
        style="padding: 0"
      >
        <v-img src="@/assets/images/apside.png" max-width="520"></v-img>
        <v-card class="crown-card">
          <v-container fluid>
            <v-row v-if="!loading">
              <v-col
                v-if="apsider_week !== null"
                cols="12"
                style="width: 300px; min-width: 300px; max-width: 300px"
                class="d-flex align-center"
              >
                <v-avatar size="65" class="zoom-avatar mr-5">
                  <v-img
                    @click="openInfoDialog(apsider_week)"
                    :src="
                      'http://localhost:8999/apsiders/' + apsider_week.avatar ??
                      'user-icon.png'
                    "
                  ></v-img>
                </v-avatar>
                <v-card-text class="pa-3">
                  <p class="ma-0">Encargado de la semana</p>
                  <span class="text-h6">
                    {{ apsider_week.name }}
                  </span>
                </v-card-text>
              </v-col>
              <v-col
                v-else
                cols="12"
                style="width: 300px; min-width: 300px; max-width: 300px"
                class="d-flex align-center"
              >
                <v-avatar size="65" class="zoom-avatar mr-5">
                  <v-img
                    :src="'http://localhost:8999/apsiders/' + 'user-icon.png'"
                  ></v-img>
                </v-avatar>
                <v-card-text class="pa-3">
                  <p class="ma-0">Sin Encargado de la semana</p>
                </v-card-text>
              </v-col>
            </v-row>
            <v-row v-else>
              <v-col
                cols="12"
                style="width: 300px; min-width: 300px; max-width: 300px"
              >
                <v-skeleton-loader
                  class="mx-auto"
                  max-width="290"
                  type="list-item-avatar-two-line"
                ></v-skeleton-loader>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="text-center">
        <h1 style="color: #202055">
          Daily {{ moment().format("DD/MM/YYYY") }}
        </h1>
        <p>Frase de la semana: <strong>Node vs Python</strong></p>
        <v-btn class="mx-2 my-2" @click="moveAllLeft">
          <v-icon>mdi-arrow-left</v-icon>
          <span>Mover todos izquierda</span>
        </v-btn>

        <v-btn class="mx-2 my-2" @click="archiveDialog = !archiveDialog">
          <v-icon>mdi-archive</v-icon>
          <span>Desconectados</span>
        </v-btn>

        <v-btn
          :disabled="false"
          @click="encargadoDialog = !encargadoDialog"
          class="mx-2 my-2"
        >
          <v-icon> mdi-crown </v-icon>
          Azote
        </v-btn>
      </v-col>
    </v-row>
    <v-row class="text-center">
      <v-col cols="12" sm="6">
        <v-card class="rounded-lg">
          <v-card-title class="justify-center" style="background: #f2f2f2">
            <span class="text-h5 text--primary"
              >En Daily <strong>({{ apsiders.length }})</strong></span
            >
          </v-card-title>
          <v-card-text
            style="max-height: calc(100vh - 390px); overflow: auto"
            class="custom-scroll"
          >
            <v-list one-line v-if="!loading">
              <v-list-item-group>
                <draggable
                  ghost-class="ghost"
                  :animation="150"
                  :list="apsiders"
                  @change="listChanged"
                  group="apsiders"
                  class="list-group"
                >
                  <transition-group
                    type="transition"
                    name="flip-list"
                    tag="div"
                  >
                    <v-list-item
                      class="item-c"
                      v-for="(apsider, index) in apsiders"
                      :key="index"
                    >
                      <v-list-item-avatar 
                      size="50">
                        <v-img
                          @click="openInfoDialog(apsider)"
                          :src="
                            'http://localhost:8999/apsiders/' +
                              apsider.avatar ?? 'user-icon.png'
                          "
                        ></v-img>
                      </v-list-item-avatar>
                      <v-list-item-content style="text-align: start">
                        <v-list-item-title class="text-h6">
                          {{ apsider.name }}
                        </v-list-item-title>
                        <v-list-item-subtitle>
                          <span class="text--secondary">
                            {{ apsider.email }}
                          </span>
                        </v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </transition-group>
                </draggable>
              </v-list-item-group>
            </v-list>
            <v-skeleton-loader
              v-else
              class="pa-2"
              type="list-item-avatar-two-line"
            ></v-skeleton-loader>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6">
        <v-card class="rounded-lg">
          <v-card-title class="justify-center" style="background: #f2f2f2">
            <span class="text-h5 text--primary"
              >Presentado <strong>({{ assistedApsiders.length }})</strong></span
            >
          </v-card-title>
          <v-card-text
            style="max-height: calc(100vh - 350px); overflow: auto"
            class="custom-scroll"
          >
            <v-list one-line v-if="!loading">
              <v-list-item-group>
                <draggable
                  :list="assistedApsiders"
                  group="apsiders"
                  :animation="150"
                  class="list-group"
                >
                  <transition-group
                    type="transition"
                    name="flip-list"
                    tag="div"
                  >
                    <v-list-item
                      class="item-c"
                      v-for="(apsider, index) in assistedApsiders"
                      :key="index"
                    >
                      <v-list-item-avatar size="50">
                        <v-img
                          @click="openInfoDialog(apsider)"
                          :src="
                            'http://localhost:8999/apsiders/' +
                              apsider.avatar ?? 'user-icon.png'
                          "
                        ></v-img>
                      </v-list-item-avatar>
                      <v-list-item-content style="text-align: start">
                        <v-list-item-title class="text-h6">
                          {{ apsider.name }}
                        </v-list-item-title>
                        <v-list-item-subtitle>
                          <span class="text--primary">
                            {{ apsider.email }}
                          </span>
                        </v-list-item-subtitle>
                      </v-list-item-content>
                      <v-list-item-icon style="align-self: center">
                        <v-icon :color="'green'" large> mdi-check </v-icon>
                      </v-list-item-icon>
                    </v-list-item>
                  </transition-group>
                </draggable>
              </v-list-item-group>
            </v-list>
            <v-skeleton-loader
              v-else
              class="pa-2"
              type="list-item-avatar-two-line"
            ></v-skeleton-loader>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <!-- Detalle apsider -->
    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title class="text-h5 lighten-2">
          Información Apsider
        </v-card-title>

        <v-container fluid>
          <v-row class="px-5">
            <v-col>
              <v-img
                style="
                  border-width: 3px;
                  border-style: solid;
                  border-image: linear-gradient(40deg,rgba(32, 32, 85, 1) 0%,rgba(249, 0, 90, 1) 72%)1;
                "
                :src="
                  'http://localhost:8999/apsiders/' + dialog_data.avatar ??
                  'user-icon.png'
                "
              ></v-img>
            </v-col>
            <v-col class="px-0">
              <v-card-text class="mx-auto pt-0" style="max-width: 400">
                <p class="text-h4">{{ dialog_data.name }}</p>
                <strong class="mb-0">{{ dialog_data.email }}</strong>
              </v-card-text>
            </v-col>
          </v-row>
        </v-container>
        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="dialog = false">Cerrar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Archivados -->
    <v-dialog class="o-auto" v-model="archiveDialog" width="500" scrollable>
      <v-card style="overflow: auto">
        <v-card-title class="text-h5 lighten-2">
          Apsdiers desconectados
        </v-card-title>

        <v-container fluid>
          <v-row class="px-5">
            <v-col>
              <v-list one-line v-if="archivedApsiders.length != 0">
                <v-list-item
                  v-for="(apsider, index) in archivedApsiders"
                  :key="index"
                >
                  <v-list-item-avatar size="50">
                    <v-img
                      :src="
                        'http://localhost:8999/apsiders/' + apsider.avatar ??
                        'user-icon.png'
                      "
                    ></v-img>
                  </v-list-item-avatar>
                  <v-list-item-content style="text-align: start">
                    <v-list-item-title class="text-h6">
                      {{ apsider.name }}
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      <span class="text--secondary">
                        {{ apsider.email }}
                      </span>
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
              <v-list one-line v-else>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title class="text-h6">
                      No hay apsdiers archivados
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-col>
          </v-row>
        </v-container>
        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="archiveDialog = false"
            >Cerrar</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- encargado dialog -->
    <v-dialog v-model="encargadoDialog" width="500" scrollable>
      <v-card>
        <v-card-title class="text-h5 lighten-2"> Nuevo encargado </v-card-title>

        <v-container fluid>
          <v-row class="px-5">
            <v-col v-if="!loading">
              <FortuneWheel
                style="width: 435px"
                :canvas="canvasOptions"
                :prizes="prizes"
                :verify="cavansVerify"
                @rotateStart="onCanvasRotateStart"
                @rotateEnd="onRotateEnd"
              />
            </v-col>
          </v-row>
        </v-container>
        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="encargadoDialog = false"
            >Cerrar</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="azoteDialog" width="500" scrollable>
      <v-card>
        <v-card-title class="text-h5 lighten-2"> Nuevo Azotado </v-card-title>

        <v-container fluid>
          <v-row class="px-5">
            <v-col v-if="!loading">
              <FortuneWheel
                style="width: 435px"
                :canvas="canvasOptions"
                :prizes="prizes"
                :verify="cavansVerify"
                @rotateStart="onCanvasRotateStart"
                @rotateEnd="onRotateEnd"
              />
            </v-col>
          </v-row>
        </v-container>
        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="encargadoDialog = false"
            >Cerrar</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

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
import moment from "moment";
import "moment-timezone";
import FortuneWheel from "vue-fortune-wheel";
import "vue-fortune-wheel/lib/vue-fortune-wheel.css";
export default {
  components: {
    FortuneWheel,
  },
  name: "DailyApside",

  data: () => ({
    // websocket
    connection: false,

    // snackbar
    snackbar: false,
    snackbarText: "",

    // archivados
    archivedApsiders: [],
    archiveDialog: false,

    // encargado de la semana
    apsider_week: null,

    // apsiders sin asistir
    apsiders: [],

    // apsiders asistidos
    assistedApsiders: [],

    // Todos los apsiders
    allApsiders: [],

    // detalle apsider dialog
    dialog: false,
    dialog_data: {
      name: "",
      email: "",
      avatar: "user-icon.png",
    },

    // encargado dialog
    encargadoDialog: false,

    // fortune wheel
    cavansVerify: true, // Whether the turntable in canvas mode is enabled for verification
    canvasOptions: {
      borderWidth: 6,
      borderColor: "#584b43",
      btnText: "Azotar",
      fontSize: 16,
      textLength: 25,
      btnWidth: 80,
      textDirection: "vertical",
      textRadius: 230,
    },

    azoteDialog: false,
    azoteDialogData: {
      name: "",
      email: "",
      avatar: "user-icon.png",
    },
    prizes: [],
    loading: true,
  }),

  created() {
    console.log("Conectando webscoket");
    this.connection = new WebSocket("ws://localhost:8999/");

    this.connection.onmessage = (event) => {
      console.log(event);
      console.log(JSON.parse(event.data));

      const data = JSON.parse(event.data);
      switch(data.action){
        case "user-joined":
          this.wsUserJoined(data.apsider);
          break;
        case "user-left":
          this.wsUserLeft(data.apsider);
          break;
        case "assisted-updated":
          this.wsAssistedUpdated(data.data);
          break;
        case "mandated-updated":
          this.wsMandatedUpdated(data.apsider);
          break;
        default:
          break;
      }
    };

    this.connection.onopen = function (event) {
      console.log(event);
      console.log("Conectado correctamente");
    };

    this.getData();
    moment.locale("es");
  },

  methods: {
    rollProbability(){
      this.prizes = [];
      let probability = 0;
      let largo = this.allApsiders.length - 1;
      let selected = Math.floor(Math.random() * largo);
      this.allApsiders.forEach((apsider, index) => {
        if (apsider.mandated === 1) return;
        if (selected === index) {
          probability = 100;
        }else{
          probability = 0
        }
        this.prizes.push({
          id: apsider.id,
          name: apsider.name,
          value: apsider.id,
          bgColor: index % 2 === 0 ? "#202055" : "#ef0359",
          color: "#ffffff",
          probability: probability,
          weight: 1,
        });
      });
    },

    // request axios
    getData() {
      this.$axios
        .get("/get-apsiders")
        .then((response) => {

          this.allApsiders = response.data.result;
          this.rollProbability();

          this.apsiders = response.data.result.filter((apsider) => {
            return apsider.assisted === 0 && apsider.archived === 0;
          });

          this.assistedApsiders = response.data.result.filter((apsider) => {
            return apsider.assisted === 1 && apsider.archived === 0;
          });

          this.archivedApsiders = response.data.result.filter((apsider) => {
            return apsider.archived === 1;
          });

          this.apsider_week =
            response.data.result.find((apsider) => {
              return apsider.mandated === 1;
            }) || null;
          this.loading = false;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    moveAllLeft() {
      this.$axios
        .post("/reset_assisted")
        .then((response) => {
          console.log(response);
          this.activateSnackbar("Se han reiniciado los asistentes");
        })
        .catch((error) => {
          console.log(error);
        });
    },

    // Dialog
    openInfoDialog(apsider) {
      this.dialog = true;
      this.dialog_data = apsider;
    },

    activateSnackbar(text) {
      this.snackbar = true;
      this.snackbarText = text;
    },

    listChanged(e) {
      console.log(e);
      if (e.added) {
        // apsider no asistido
        this.update_apsider(e.added.element.id, 0);
      }

      if (e.removed) {
        // cambio el estado de apsider a asistido
        this.update_apsider(e.removed.element.id, 1);
      }
    },

    update_apsider(id, assist) {
      this.$axios
        .post("/update_assist", {
          assist,
          id,
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    onCanvasRotateStart(rotate) {
      if (this.cavansVerify) {
        const verified = true; // true: the test passed the verification, false: the test failed the verification

        this.DoServiceVerify(verified, 2000).then((verifiedRes) => {
          if (verifiedRes) {
            console.log("Verification passed, start to rotate");
            rotate(); // Call the callback, start spinning
            this.cavansVerify = false; // Turn off verification mode
          } else {
            alert("Failed verification");
          }
        });
        return;
      }
    },
    onRotateEnd(prize) {
      this.rollProbability();
      this.$axios
        .post("/mandated_apsider", {
          id: prize.value,
        })
        .then((result) => {
          console.log(result);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // Simulate the request back-end interface, verified: whether to pass the verification, duration: delay time
    DoServiceVerify(verified, duration) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(verified);
        }, duration);
      });
    },
    wsUserJoined(apsider){
      console.log(apsider);
      if (apsider === null || apsider === undefined || Object.keys(apsider).length === 0) return;
      this.activateSnackbar(apsider.name + " Se ha unido a la daily!")
      for (let i = this.archivedApsiders.length - 1; i >= 0; --i) {
          if (this.archivedApsiders[i].id === apsider.id) {
            this.archivedApsiders.splice(i,1);
          }
      }

      if(apsider.assisted === 0){
        const index = this.apsiders.findIndex(a => a.id==apsider.id); 
        index === -1 ? this.apsiders.push(apsider) : console.log("object already exists");
      }else{
        const index = this.assistedApsiders.findIndex(a => a.id==apsider.id); 
        index === -1 ? this.assistedApsiders.push(apsider) : console.log("object already exists");
      }
    },

    wsUserLeft(apsider){
      console.log(apsider);
      if (apsider === null || apsider === undefined || Object.keys(apsider).length === 0) return;
      this.activateSnackbar(apsider.name + " Se ha salido de la daily")

      let sw = false;
      if(apsider.assisted === 0){
        for (let i = this.apsiders.length - 1; i >= 0; --i) {
          if (this.apsiders[i].id === apsider.id) {
            this.apsiders.splice(i,1);
            sw = true
          }
        }
      }else{
        for (let i = this.assistedApsiders.length - 1; i >= 0; --i) {
          if (this.assistedApsiders[i].id === apsider.id) {
            this.assistedApsiders.splice(i,1);
            sw = true
          }
        }
      }

      if (sw){
        this.archivedApsiders.push(apsider);
      }
    },

    wsAssistedUpdated(data){
      if (data === null || data === undefined || Object.keys(data).length === 0) return;
      if(data.assist === 0){
        for (let i = this.assistedApsiders.length - 1; i >= 0; --i) {
          if (this.assistedApsiders[i].id === data.id) {
            const apsider = this.assistedApsiders[i];
            this.assistedApsiders.splice(i,1);
            this.apsiders.push(apsider);
            this.activateSnackbar(apsider.name + " Se ha movido a la izquierda")
          }
        }
      }else{
        for (let i = this.apsiders.length - 1; i >= 0; --i) {
          if (this.apsiders[i].id === data.id) {
            const apsider = this.apsiders[i]; 
            this.apsiders.splice(i,1);
            this.assistedApsiders.push(apsider);
            this.activateSnackbar(apsider.name + " Se ha movido a la derecha")
          }
        }
      }
    },

    wsMandatedUpdated(apsider){
      if(apsider === null || apsider === undefined || Object.keys(apsider).length === 0) return;
      this.apsider_week = apsider;
      this.activateSnackbar("Felicitaciones! " + apsider.name + " Haz sido azotado!");
    }
  },
  computed: {
    disable_encargado_btn() {
      // desactivar boton si no es viernes
      return moment().day() !== 5;
    },
  },
};
</script>

<style>
.fw-btn__btn {
  font-size: 20px !important;
  -webkit-user-select: none; /* Safari */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* IE10+/Edge */
  user-select: none; /* Standard */
}
.ghost {
  opacity: 0.2;
  background: rgb(234, 132, 132);
}
#app {
  background-color: #f5f5f5;
}

.list-group:empty,
.list-group > div:empty {
  padding: 1rem;
  text-align: center;
  border: 2px dashed gray;
}

.list-group:empty:before,
.list-group > div:empty:before {
  content: "Suelta aqui";
}

.item-c:hover {
  color: #ef0359 !important;
  border-radius: 20px !important;
}
.item-c .v-avatar,
.zoom-avatar {
  transition: all 0.2s ease-in-out;
}
.item-c .v-avatar:hover,
.zoom-avatar:hover {
  scale: 1.4;
}

.custom-scroll::-webkit-scrollbar {
  width: 20px;
}
.custom-scroll::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scroll::-webkit-scrollbar-thumb {
  background: #cccccc;
  border-radius: 20px;
  border: 7px solid transparent;
  background-clip: content-box;
}

.custom-scroll::-webkit-scrollbar-thumb:hover {
  border-radius: 20px;
  border: 7px solid transparent;
  background-clip: content-box;
}

.crown-card::after {
  content: "\F01A5";
  font-family: "Material Design Icons";
  position: absolute;
  font-size: 50px;
  color: gold;
  top: -32px;
  left: -8%;
  rotate: -45deg;
}
</style>