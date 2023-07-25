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
          >
            <template v-slot:item="row">
              <tr v-if="row.item.inServer" :style="row.item.deshabilitado === true ? 'background-color: #80808055' : ''">
                <td>
                  <v-avatar class="my-2" size="45" @mouseover="incrementSize">
                    <img
                      :src="basePathApsiders + row.item.avatar"
                      style="height: auto !important"
                      alt="Avatar"
                    />
                  </v-avatar>
                  <b class="mx-3">{{ row.item.name }}</b>
                </td>
                <td>{{ row.item.email }}</td>
                <td v-if="row.item.azotado">
                  <v-icon large style="color: #ebd577">mdi-crown</v-icon>
                </td>
                <td v-else>---</td>
                <td>
                  <v-icon large style="color: #4caf50">mdi-check-circle</v-icon>
                </td>
                <td v-if="row.item.deshabilitado === true">
                  <v-icon large style="color: #4caf50">mdi-check-circle</v-icon>
                </td>
                <td v-else>
                  <v-icon large style="color: #f44336">mdi-close-circle</v-icon>
                </td>
                <td v-if="row.item.deshabilitado === true">
                  <v-btn
                    class="mx-2"
                    dark
                    small
                    rounded="xl"
                    color="green"
                    :loading="activateApsiderLoading"
                    @click="activeApsider(row.item)"
                    >Activar
                  </v-btn>
                </td>
                <td v-else>
                  <v-btn
                    class="mx-2"
                    fab
                    dark
                    x-small
                    color="blue"
                    @click="openEditApsiderDialog(row.item)"
                    ><v-icon dark>mdi-pencil</v-icon>
                  </v-btn>
                  <v-btn
                    class="mx-2"
                    fab
                    dark
                    x-small
                    color="red"
                    @click="openDeleteApsideDialog(row.item)"
                    ><v-icon dark>mdi-delete</v-icon>
                  </v-btn>
                </td>
              </tr>
              <tr v-else style="background-color: rgba(245, 183, 183, 0.397)">
                <td>
                  <v-avatar
                    v-if="row.item.avatar !== null"
                    class="my-2"
                    size="45"
                    @mouseover="incrementSize"
                  >
                    <img :src="row.item.avatar" alt="Avatar" />
                  </v-avatar>
                  <v-icon
                    v-else
                    class="my-2"
                    size="45"
                    @mouseover="incrementSize"
                  >
                    mdi-account-circle
                  </v-icon>
                  <b class="mx-3">{{ row.item.name }}</b>
                </td>
                <td>---</td>
                <td>---</td>
                <td>
                  <v-icon large style="color: #f44336">mdi-close-circle</v-icon>
                </td>
                <td>---</td>
                <td>
                  <v-btn
                    class="mx-2"
                    fab
                    dark
                    x-small
                    color="green"
                    @click="openAddApsiderDialog(row.item)"
                    ><v-icon dark>mdi-plus</v-icon>
                  </v-btn>
                </td>
              </tr>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>

    <!-- add apsider dialog -->
    <v-dialog v-model="addApsiderDialog" persistent max-width="700px">
      <v-card outlined shaped>
        <v-card-title>
          <span class="text-h5"
            >Agregar a {{ addApsiderDialogData.name }} al servidor</span
          >
        </v-card-title>
        <v-card-text>
          <v-container>
            <small>* indica requerido</small>

            <v-row>
              <v-col cols="12" md="6">
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      label="ID *"
                      required
                      disabled
                      v-model="addApsiderDialogForm.id"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      label="Nombre *"
                      required
                      v-model="addApsiderDialogForm.name"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      label="Correo"
                      type="email"
                      :rules="addEmailRules"
                      v-model="addApsiderDialogForm.email"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="12" md="6">
                <v-col cols="12">
                  <v-file-input
                    @change="previewImgAddApsider"
                    label="Avatar *"
                    accept="image/jpeg"
                    v-model="addApsiderDialogForm.image"
                  >
                  </v-file-input>
                  <v-img :src="addApsiderDialogForm.url"></v-img>
                </v-col>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="addApsiderDialog = false">
            Cerrar
          </v-btn>
          <v-btn
            color="blue darken-1"
            :loading="addApsiderLoading"
            text
            @click="addApsider"
            :disabled="validateAddApsiderForm"
          >
            Guardar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- edit apsider dialog -->
    <v-dialog v-model="editApsiderDialog" persistent max-width="700px">
      <v-card outlined shaped>
        <v-card-title>
          <span class="text-h5"
            >Editando a {{ addApsiderDialogData.name }}</span
          >
        </v-card-title>
        <v-card-text>
          <v-container>
            <small>* indica requerido</small>

            <v-row>
              <v-col cols="12" md="6">
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      label="ID *"
                      required
                      disabled
                      v-model="editApsiderDialogForm.id"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      label="Nombre *"
                      required
                      v-model="editApsiderDialogForm.name"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      label="Correo"
                      type="email"
                      :rules="addEmailRules"
                      v-model="editApsiderDialogForm.email"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-checkbox
                      v-model="editApsiderDialogForm.azotado"
                      label="Azotado"
                      :disabled="editApsiderDialogForm.azotado === true"
                      color="red"
                    ></v-checkbox>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="12" md="6">
                <v-col cols="12">
                  <v-file-input
                    @change="previewImgEditApsider"
                    label="Avatar *"
                    accept="image/jpeg"
                    v-model="editApsiderDialogForm.image"
                  >
                  </v-file-input>
                  <v-img :src="editApsiderDialogForm.url"></v-img>
                </v-col>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="gray darken-1" text @click="editApsiderDialog = false">
            Cerrar
          </v-btn>
          <v-btn
            color="blue darken-1"
            :loading="editApsiderLoading"
            text
            @click="editApsider"
          >
            Guardar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- delete apsider dialog -->
    <v-dialog v-model="deleteApsiderDialog" max-width="700px">
      <v-card outlined shaped>
        <v-card-title>
          <span class="text-h5"
            >Eliminar a {{ deleteApsiderDialogData.name }}</span
          >
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row class="d-flex justify-center align-center text-center">
              <v-col cols="12" md="6">
                <p style="color: rgb(185, 6, 6)" class="text-h6">
                  ¿Estás seguro de eliminar a {{ deleteApsiderDialogData.name }}
                </p>
                <p class="text-h6">
                  Toda su información será eliminada, incluyendo asistencias
                </p>
                <p style="color:rgb(52, 52, 153)" class="text-h6">Si solo desactiva no se perderán datos</p>
              </v-col>
              <v-col cols="12" md="6">
                <v-img :src="deleteApsiderDialogData.url" />
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="deleteApsiderDialog = false"
          >
            Cerrar
          </v-btn>
          <v-btn
            color="gray darken-1"
            :loading="deleteApsiderLoading"
            text
            @click="disableApsider"
          >
            Solo desactivar
          </v-btn>
          <v-btn
            color="red darken-1"
            :loading="deleteApsiderLoading"
            text
            @click="deleteApsider"
          >
            Eliminar
          </v-btn>
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
export default {
  name: "AdmApsiders",
  data() {
    return {
      size: 10,
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
          text: "Azotado",
          sortable: true,
          value: "azotado",
        },
        {
          text: "En la app",
          sortable: true,
          value: "inServer",
        },
        {
          text: "Deshabilitado",
          sortable: true,
          value: "deshabilitado",
        },
        {
          text: "Acciones",
          sortable: true,
          value: "acciones",
        },
      ],
      apsiders: [],
      busqueda: "",
      cargando: false,

      snackbar: false,
      snackbarText: "",

      addApsiderDialog: false,
      addApsiderDialogData: {},
      addApsiderDialogForm: {
        id: "",
        name: "",
        email: "",
        image: null,
        url: "",
      },
      addApsiderLoading: false,
      addEmailRules: [(v) => /.+@.+/.test(v) || "El correo debe ser valido"],

      editApsiderDialog: false,
      editApsiderDialogData: {},
      editApsiderDialogForm: {
        id: "",
        name: "",
        email: "",
        image: null,
        url: "",
        group_id: ""
      },
      editApsiderLoading: false,
      editEmailRules: [(v) => /.+@.+/.test(v) || "El correo debe ser valido"],

      deleteApsiderDialog: false,
      deleteApsiderDialogData: {},
      deleteApsiderLoading: false,

      activateApsiderLoading: false,
      basePathApsiders: process.env.VUE_APP_APSIDERS
    };
  },
  created() {
    this.getApsiders();
  },
  methods: {
    incrementSize() {
      this.size += 10;
    },

    openAddApsiderDialog(apsider) {
      this.addApsiderDialog = true;
      this.addApsiderDialogData = apsider;

      this.addApsiderDialogForm.id = apsider.id;
      this.addApsiderDialogForm.name = apsider.name;
    },

    openEditApsiderDialog(apsider) {
      this.editApsiderDialog = true;
      this.editApsiderDialogData = apsider;

      this.editApsiderDialogForm.id = apsider.id;
      this.editApsiderDialogForm.name = apsider.name;
      this.editApsiderDialogForm.email = apsider.email;
      this.editApsiderDialogForm.azotado = apsider.azotado;
      this.editApsiderDialogForm.url =
        this.basePathApsiders + apsider.avatar;
      this.editApsiderDialogForm.group_id = apsider.grupo_id;

    },

    openDeleteApsideDialog(apsider) {
      this.deleteApsiderDialog = true;
      this.deleteApsiderDialogData.id = apsider.id;
      this.deleteApsiderDialogData.name = apsider.name;
      this.deleteApsiderDialogData.url =
        this.basePathApsiders + apsider.avatar;
    },

    previewImgAddApsider() {
      if (!this.addApsiderDialogForm.image) {
        this.addApsiderDialogForm.url = "";
        return;
      }
      this.addApsiderDialogForm.url = URL.createObjectURL(
        this.addApsiderDialogForm.image
      );
    },

    previewImgEditApsider() {
      if (!this.editApsiderDialogForm.image) {
        this.editApsiderDialogForm.url = "";
        return;
      }
      this.editApsiderDialogForm.url = URL.createObjectURL(
        this.editApsiderDialogForm.image
      );
    },

    getApsiders() {
      this.cargando = true;
      this.$axios
        .get("/get-apsiders-discord", {
          headers: { Authorization: localStorage.getItem("access_token") },
        })
        .then((response) => {
          response.data.inServer.forEach((element) => {
            this.apsiders.push({
              id: element.id,
              name: element.name,
              avatar: element.avatar,
              email: element.email,
              azotado: element.mandated === 1 ? true : false,
              deshabilitado: element.disabled === 1 ? true : false,
              inServer: true,
            });
          });

          response.data.notInServer.forEach((element) => {
            this.apsiders.push({
              id: element.id,
              name: element.username,
              avatar: element.avatar,
              email: "---",
              azotado: false,
              inServer: false,
            });
          });
          this.cargando = false;
        })
        .catch((error) => {
          console.log(error);
          this.cargando = false;
        });
    },

    addApsider() {
      this.addApsiderLoading = true;

      const formData = new FormData();
      formData.append("id", this.addApsiderDialogForm.id);
      formData.append("name", this.addApsiderDialogForm.name);
      formData.append("email", this.addApsiderDialogForm.email);
      formData.append("avatar", this.addApsiderDialogForm.image);
      console.log("avatar:", this.addApsiderDialogForm.image);

      this.$axios
        .post("/apsider", formData, {
          headers: {
            Authorization: localStorage.getItem("access_token"),
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log(response);
          this.addApsiderLoading = false;

          if (response.data.status !== "success") {
            return;
          }

          this.apsiders.forEach((element) => {
            if (element.id === this.addApsiderDialogForm.id) {
              element.name = this.addApsiderDialogForm.name;
              element.email = this.addApsiderDialogForm.email;
              element.avatar = this.addApsiderDialogForm.image.name;
              element.inServer = true;
              element.azotado = false;
            }
          });

          this.addApsiderDialog = false;
          this.addApsiderDialogData = {};

          this.snackbar = true;
          this.snackbarText = "Apsider agregado correctamente";
        })
        .catch((error) => {
          this.addApsiderLoading = false;
          console.log(error);
        });
    },

    editApsider() {
      this.editApsiderLoading = true;

      const formData = new FormData();
      formData.append("id", this.editApsiderDialogForm.id);
      formData.append("name", this.editApsiderDialogForm.name);
      formData.append("email", this.editApsiderDialogForm.email);
      formData.append("avatar", this.editApsiderDialogForm.image);

      this.$axios
        .patch("/apsider", formData, {
          headers: {
            Authorization: localStorage.getItem("access_token"),
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log(response);
          this.editApsiderLoading = false;

          if (response.data.status !== "success") {
            console.log("no es success");
            return;
          }

          if (this.editApsiderDialogForm.azotado === true) {
            this.$axios
              .post("/mandated_apsider", {
                id: this.editApsiderDialogForm.id,
                groupId: this.editApsiderDialogForm.group_id,
              })
              .then((response) => {
                console.log(response);
                if (response.data.status !== "success") {
                  console.log("no es success");
                  return;
                }

                this.apsiders.forEach((element) => {
                  element.azotado = false;
                });


                this.apsiders.forEach((element) => {
                  if (element.id === this.editApsiderDialogForm.id) {
                    element.azotado = true;
                  }
                });

              })
              .catch((error) => {
                console.log(error);
              });
          }

          this.apsiders.forEach((element) => {
            if (element.id === this.editApsiderDialogForm.id) {
              element.name = this.editApsiderDialogForm.name;
              element.email = this.editApsiderDialogForm.email;
              if (this.editApsiderDialogForm.image) {
                element.avatar = this.editApsiderDialogForm.image.name;
              }
            }
          });

          this.editApsiderDialog = false;
          this.editApsiderDialogData = {};
          this.editApsiderLoading = false;

          this.snackbar = true;
          this.snackbarText = "Apsider editado correctamente";
        })
        .catch((error) => {
          this.editApsiderLoading = false;
          console.log(error);
        });
    },

    activeApsider(apsider) {
      this.activateApsiderLoading = true;
      this.$axios
        .patch("/disableApsider", {
          id: apsider.id,
          disabled: 0,
        })
        .then((response) => {
          console.log(response);
          if (response.data.status !== "success") {
            console.log("no es success");
            return;
          }

          this.apsiders.forEach((element) => {
            if (element.id === apsider.id) {
              element.deshabilitado = false;
            }
          });
          this.activateApsiderLoading = false;

          this.snackbar = true;
          this.snackbarText = "Apsider activado correctamente";
        })
        .catch((error) => {
          console.log(error);
          this.activateApsiderLoading = false;
        });
    },

    disableApsider(){
      this.deleteApsiderLoading = true;
      this.$axios.patch("/disableApsider",{
        id: this.deleteApsiderDialogData.id,
        disabled: 1
      }).then((response) => {
        console.log(response);
        if (response.data.status !== "success") {
          console.log("no es success");
          return;
        }

        this.apsiders.forEach((element) => {
          if (element.id === this.deleteApsiderDialogData.id) {
            element.deshabilitado = true;
          }
        });
        this.deleteApsiderLoading = false;
        this.deleteApsiderDialog = false;
        this.deleteApsiderDialogData = {};
        this.snackbar = true;
        this.snackbarText = "Apsider deshabilitado correctamente";
      }).catch((error) => {
        console.log(error);
        this.deleteApsiderLoading = false;
      });
    },

    deleteApsider(){
      this.deleteApsiderLoading = true;
      this.$axios.delete("/apsider/" + this.deleteApsiderDialogData.id
      ).then((response) => {
        console.log(response);
        if (response.data.status !== "success") {
          console.log("no es success");
          return;
        }

        this.apsiders.forEach((element, index) => {
          if (element.id === this.deleteApsiderDialogData.id) {
            this.apsiders.splice(index, 1);
          }
        });

        this.deleteApsiderLoading = false;
        this.deleteApsiderDialog = false;
        this.deleteApsiderDialogData = {};
        this.snackbar = true;
        this.snackbarText = "Apsider eliminado correctamente";
      }).catch((error) => {
        console.log(error);
        this.deleteApsiderLoading = false;
      });
    }
  },
  computed: {
    validateAddApsiderForm() {
      return (
        this.addApsiderDialogForm.name === "" ||
        this.addApsiderDialogForm.email === "" ||
        this.addApsiderDialogForm.image === null
      );
    },
  },
};
</script>