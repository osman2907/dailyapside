<template>
  <v-container class="mt-5" style="max-width: 1200px !important">
    <v-row>
      <v-col cols="12" class="d-flex justify-sm-space-between justify-center flex-wrap" style="padding: 0">
      <v-img src="@/assets/images/apside.png" max-width="320"></v-img>
        <v-card class="crown-card">
          <v-container fluid>
            <v-row>
              <v-col cols="12" style="width:300px; min-width:300px; max-width:300px" class="d-flex align-center">
                <v-avatar size="65" class="zoom-avatar mr-5">
                  <v-img
                    @click="openInfoDialog(apsider_week)"
                   :src=" require('@/assets/images/apsiders/' + apsider_week.avatar)"></v-img>
                </v-avatar>
                <v-card-text class="pa-3">
                  <p class="ma-0">Encargado de la semana</p>
                  <span class="text-h6">
                    {{ apsider_week.name }}
                  </span>
                </v-card-text>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="text-center">
        <h1 style="color:#202055">Daily {{ moment().format("DD/MM/YYYY") }}</h1>
        <v-btn @click="archiveDialog = !archiveDialog">
          <v-icon>mdi-archive</v-icon>
          <span>Archivados</span>
        </v-btn>
      </v-col>
    </v-row>
    <v-row class="text-center">
      <v-col cols="12" sm="6">
        <v-card class="rounded-lg">
          <v-card-title class="justify-center" style="background: #f2f2f2;">
            <span class="text-h5 text--primary">Ausentes <strong>({{apsiders.length}})</strong></span>
          </v-card-title>
          <v-card-text
            style="max-height: calc(100vh - 350px); overflow: auto"
            class="custom-scroll"
          >
            <v-list one-line>
              <v-list-item-group>
                <draggable
                  ghost-class="ghost"
                  :animation="150"
                  :list="apsiders"
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
                      <v-list-item-avatar size="50">
                        <v-img
                          @click="openInfoDialog(apsider)"
                          :src="
                            require('@/assets/images/apsiders/' +
                              apsider.avatar)
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
                      <v-list-item-action>
                        <v-btn icon @click="archiveApsider()">
                          <v-icon color="grey lighten-1"
                            >mdi-archive-arrow-down</v-icon
                          >
                        </v-btn>
                      </v-list-item-action>
                    </v-list-item>
                  </transition-group>
                </draggable>
              </v-list-item-group>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6">
        <v-card class="rounded-lg">
          <v-card-title class="justify-center" style="background: #f2f2f2">
            <span class="text-h5 text--primary">Presentes <strong>({{assistedApsiders.length}})</strong></span>
          </v-card-title>
          <v-card-text
            style="max-height: calc(100vh - 350px); overflow: auto"
            class="custom-scroll"
          >
            <v-list one-line>
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
                            require('@/assets/images/apsiders/' +
                              apsider.avatar)
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
                style="border-width: 3px; border-style: solid; border-image: linear-gradient(40deg, rgba(32,32,85,1) 0%, rgba(249,0,90,1) 72%) 1;"
                :src="require('@/assets/images/apsiders/' + dialog_data.avatar)"
              ></v-img>
            </v-col>
            <v-col class="px-0">
              <v-card-text class="mx-auto pt-0" style="max-width: 400;">
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
    <v-dialog v-model="archiveDialog" width="500" scrollable>
      <v-card>
        <v-card-title class="text-h5 lighten-2">
          Apsdiers archivados
        </v-card-title>

        <v-container fluid>
          <v-row class="px-5">
            <v-col>
              <v-list one-line>
                <v-list-item
                  v-for="(apsider, index) in archivedApsiders"
                  :key="index"
                >
                  <v-list-item-avatar size="50">
                        <v-img
                          :src="
                            require('@/assets/images/apsiders/' +
                              apsider.avatar)
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
                      <v-list-item-action>
                        <v-btn icon >
                          <v-icon color="grey lighten-1"
                            >mdi-archive-arrow-down</v-icon
                          >
                        </v-btn>
                      </v-list-item-action>
                </v-list-item>
              </v-list>
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
  </v-container>
</template>

<script>
export default {
  name: "DailyApside",

  data: () => ({
    archivedApsiders: [],
    archiveDialog: false,
    apsider_week: {
        name: "Andrés Cea",
        email: "test3@test3.com",
        avatar: "acea-apside.jpg",
    },
    apsiders: [
      {
        name: "Kendru Estrada",
        email: "test@test.com",
        avatar: "kestrada-apside.jpg",
      },
      {
        name: "Kendru Estrada",
        email: "test@test.com",
        avatar: "kestrada-apside.jpg",
      },
      {
        name: "Kendru Estrada",
        email: "test@test.com",
        avatar: "kestrada-apside.jpg",
      },
      {
        name: "Kendru Estrada",
        email: "test@test.com",
        avatar: "kestrada-apside.jpg",
      },
      {
        name: "Kendru Estrada",
        email: "test@test.com",
        avatar: "kestrada-apside.jpg",
      },
      {
        name: "Kendru Estrada",
        email: "test@test.com",
        avatar: "kestrada-apside.jpg",
      },
      {
        name: "Kendru Estrada",
        email: "test@test.com",
        avatar: "kestrada-apside.jpg",
      },
      {
        name: "Kendru Estrada",
        email: "test@test.com",
        avatar: "kestrada-apside.jpg",
      },
      {
        name: "Kendru Estrada",
        email: "test@test.com",
        avatar: "kestrada-apside.jpg",
      },
      {
        name: "Kendru Estrada",
        email: "test@test.com",
        avatar: "kestrada-apside.jpg",
      },
      {
        name: "Kendru Estrada",
        email: "test@test.com",
        avatar: "kestrada-apside.jpg",
      },
    ],
    assistedApsiders: [
      {
        name: "Osman Perez",
        email: "test2@test.com",
        avatar: "operez-apside.jpg",
      },
    ],

    dialog: false,
    dialog_data: {
      name: "",
      email: "",
      avatar: "user-icon.png",
    },
  }),
  methods: {
    openInfoDialog(apsider) {
      this.dialog = true;
      this.dialog_data = apsider;
    },

    archiveApsider(apsider) {
      this.archivedApsiders.push(apsider);
      this.apsiders = this.apsiders.filter(
        (ap) => ap.email !== this.dialog_data.email
      );
    },
  },
};
</script>

<style>
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

.item-c:hover{
  color:#ef0359 !important;
  border-radius: 20px !important;
}
.item-c .v-avatar, .zoom-avatar {
  transition: all 0.2s ease-in-out;
}
.item-c .v-avatar:hover, .zoom-avatar:hover {
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

.crown-card::after{
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