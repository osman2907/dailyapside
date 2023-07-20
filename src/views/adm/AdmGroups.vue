<template>
  <v-container class="pa-5 mt-5">
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>
            Administrar Grupos
            <v-spacer></v-spacer>
            <v-text-field
              v-model="busqueda"
              append-icon="mdi-magnify"
              label="Buscar grupo"
              single-line
              hide-details
            ></v-text-field>
            <v-spacer></v-spacer>
            <v-btn
              @click="openCreateGroupDialog()"
              class="mx-5 my-2"
              color="success"
              small
            >
              Crear nuevo grupo
              <v-icon> mdi-plus </v-icon>
            </v-btn>
          </v-card-title>

          <v-data-table
            :loading="cargando"
            loading-text="Cargando... Por favor espere"
            :headers="cabeceras"
            :items="grupos"
            :search="busqueda"
          >
            <template v-slot:item="row">
              <tr>
                <td>{{ row.item.channelId }}</td>
                <td>{{ row.item.name }}</td>
                <td class="text-center">{{ row.item.apsiders?.length }}</td>
                <td>
                  <v-tooltip top>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        v-on="on"
                        v-bind="attrs"
                        class="mx-2"
                        fab
                        dark
                        x-small
                        color="purple"
                        @click="openViewGroupDialog(row.item)"
                        ><v-icon dark>mdi-eye</v-icon>
                      </v-btn>
                    </template>
                    <span> Ver detalles de {{ row.item.name }} </span>
                  </v-tooltip>
                  <v-tooltip top>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        v-on="on"
                        v-bind="attrs"
                        class="mx-2"
                        fab
                        dark
                        x-small
                        color="green"
                        @click="openAddApsiderDialog(row.item)"
                        ><v-icon dark>mdi-account-plus</v-icon>
                      </v-btn>
                    </template>
                    <span> Agregar apsiders a {{ row.item.name }} </span>
                  </v-tooltip>
                  <v-tooltip top>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        v-on="on"
                        v-bind="attrs"
                        class="mx-2"
                        fab
                        dark
                        x-small
                        color="orange"
                        @click="openRemoveApsiderDialog(row.item)"
                        ><v-icon dark>mdi-account-minus</v-icon>
                      </v-btn>
                    </template>
                    <span> Eliminar apsiders de {{ row.item.name }} </span>
                  </v-tooltip>
                  <v-tooltip top>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        v-on="on"
                        v-bind="attrs"
                        class="mx-2"
                        fab
                        dark
                        x-small
                        color="blue"
                        @click="openEditGroupDialog(row.item)"
                        ><v-icon dark>mdi-pencil</v-icon>
                      </v-btn>
                    </template>
                    <span> Editar propiedades de {{ row.item.name }} </span>
                  </v-tooltip>
                  <v-tooltip top>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        v-on="on"
                        v-bind="attrs"
                        class="mx-2"
                        fab
                        dark
                        x-small
                        color="red"
                        @click="openDeleteGroupDialog(row.item)"
                        ><v-icon dark>mdi-delete</v-icon>
                      </v-btn>
                    </template>
                    <span> Eliminar {{ row.item.name }} </span>
                  </v-tooltip>
                </td>
              </tr>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>

    <!-- view apsiders on group dialog -->
    <v-dialog v-model="viewGroupDialog" persistent max-width="700px">
      <v-card outline shaped>
        <v-card-title>
          <span
            >Detalles del grupo <b>{{ viewGroupDialogData.name }}</b></span
          >
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <span class="text-h5"
                  ><b>Nombre del grupo:</b> {{ viewGroupDialogData.name }}</span
                ><br />
                <span class="text-h5"
                  ><b>ID canal:</b> {{ viewGroupDialogData.channelId }}</span
                ><br />
                <span class="text-h5"
                  ><b>Cantidad de integrantes: </b>
                  {{ viewGroupDialogData.apsiders?.length }}</span
                ><br />
              </v-col>
              <v-col cols="12" style="max-height: 600px; overflow-y: auto">
                <div
                  class="d-flex align-center"
                  v-for="apsider in viewGroupDialogData.apsiders"
                  :key="apsider.id"
                >
                  <v-avatar class="mr-2" size="63">
                    <img
                      :src="basePathApsiders + apsider.avatar"
                      style="height: auto !important"
                      alt="Avatar"
                    />
                  </v-avatar>
                  <v-list-item three-line>
                    <v-list-item-content>
                      <v-list-item-title
                        >Nombre: {{ apsider.name }}</v-list-item-title
                      >
                      <v-list-item-subtitle>
                        Correo: {{ apsider.email }}
                      </v-list-item-subtitle>
                      <v-list-item-subtitle>
                        consectetur adipiscing elit.
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </div>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="viewGroupDialog = false">
            Cerrar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- add apsiders to group dialog -->
    <v-dialog v-model="addApsiderDialog" persistent max-width="700px">
      <v-card outline shaped>
        <v-card-title>
          <span
            >Agregar apsiders al grupo
            <b>{{ addApsiderDialogData.name }}</b></span
          >
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-btn class="mr-3" color="primary" small @click="markAllAdd()">
                  Marcar a todos
                </v-btn>
                <v-btn color="warning" small @click="unmarkAllAdd()">
                  Desmarcar a todos
                </v-btn>
              </v-col>
              <v-col cols="12" style="max-height: 600px; overflow-y: auto">
                <div
                  class="d-flex align-center"
                  v-for="apsider in addApsiderDialogData.apsiders"
                  :key="apsider.id"
                >
                  <v-avatar class="mr-2" size="63">
                    <img
                      :src="basePathApsiders + apsider.avatar"
                      style="height: auto !important"
                      alt="Avatar"
                    />
                  </v-avatar>
                  <v-list-item three-line>
                    <v-list-item-content>
                      <v-list-item-title
                        >Nombre: {{ apsider.name }}</v-list-item-title
                      >
                      <v-list-item-subtitle>
                        Correo: {{ apsider.email }}
                      </v-list-item-subtitle>
                      <v-list-item-subtitle>
                        consectetur adipiscing elit.
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                  <v-checkbox v-model="apsider.selected"> </v-checkbox>
                </div>
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
            color="green darken-1"
            :loading="addApsiderDialogLoading"
            text
            @click="addApsider()"
          >
            Agregar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- remove apsiders from group dialog -->
    <v-dialog v-model="removeApsiderDialog" persistent max-width="700px">
      <v-card outline shaped>
        <v-card-title>
          <span
            >Quitar apsiders del grupo
            <b>{{ removeApsiderDialogData.name }}</b></span
          >
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-btn
                  class="mr-3"
                  color="primary"
                  small
                  @click="markAllRemove()"
                >
                  Marcar a todos
                </v-btn>
                <v-btn color="warning" small @click="unmarkAllRemove()">
                  Desmarcar a todos
                </v-btn>
              </v-col>
              <v-col cols="12" style="max-height: 600px; overflow-y: auto">
                <div
                  class="d-flex align-center"
                  v-for="apsider in removeApsiderDialogData.apsiders"
                  :key="apsider.id"
                >
                  <v-avatar class="mr-2" size="63">
                    <img
                      :src="basePathApsiders + apsider.avatar"
                      style="height: auto !important"
                      alt="Avatar"
                    />
                  </v-avatar>
                  <v-list-item three-line>
                    <v-list-item-content>
                      <v-list-item-title
                        >Nombre: {{ apsider.name }}</v-list-item-title
                      >
                      <v-list-item-subtitle>
                        Correo: {{ apsider.email }}
                      </v-list-item-subtitle>
                      <v-list-item-subtitle> mas data... </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                  <v-checkbox v-model="apsider.selected"> </v-checkbox>
                </div>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="removeApsiderDialog = false"
          >
            Cerrar
          </v-btn>
          <v-btn
            color="green darken-1"
            :loading="removeApsiderDialogLoading"
            text
            @click="removeApsider()"
          >
            Agregar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- create group dialog -->
    <v-dialog v-model="createGroupDialog" persistent max-width="700px">
      <v-card outline shaped>
        <v-card-title>
          <span>Crear nuevo grupo</span>
        </v-card-title>
        <v-card-text>
          <v-form ref="createGroupForm">
            <v-container>
              <v-row>
                <v-col cols="12">
                  <span class="text-h5">Información del grupo:</span><br />
                  <v-text-field
                    label="Nombre del grupo"
                    hint="Nombre que será utilizado tanto en la web como en discord"
                    v-model="createGroupDialogData.name"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <span class="text-h5">Añadir integrantes</span>
                </v-col>
                <v-col cols="12">
                  <v-btn
                    class="mr-3"
                    color="primary"
                    small
                    @click="markAllCreate()"
                  >
                    Marcar a todos
                  </v-btn>
                  <v-btn color="warning" small @click="unmarkAllCreate()">
                    Desmarcar a todos
                  </v-btn>
                </v-col>
                <v-col cols="12" style="max-height: 400px; overflow-y: auto">
                  <div
                    class="d-flex align-center"
                    v-for="apsider in createGroupDialogData.apsiders"
                    :key="apsider.id"
                  >
                    <v-avatar class="mr-2" size="63">
                      <img
                        :src="basePathApsiders + apsider.avatar"
                        style="height: auto !important"
                        alt="Avatar"
                      />
                    </v-avatar>
                    <v-list-item three-line>
                      <v-list-item-content>
                        <v-list-item-title
                          >Nombre: {{ apsider.name }}</v-list-item-title
                        >
                        <v-list-item-subtitle>
                          Correo: {{ apsider.email }}
                        </v-list-item-subtitle>
                        <v-list-item-subtitle>
                          consectetur adipiscing elit.
                        </v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                    <v-checkbox v-model="apsider.selected"> </v-checkbox>
                  </div>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="createGroupDialog = false">
            Cancelar
          </v-btn>
          <v-btn color="green darken-1" text @click="createGroup()">
            Crear Grupo
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- edit group dialog -->
    <v-dialog v-model="editGroupDialog" persistent max-width="700px">
      <v-card outline shaped>
        <v-card-title>
          <span>Editar el grupo {{ editGroupDialogData.name }}</span>
        </v-card-title>
        <v-card-text>
          <v-form ref="EditGroupForm">
            <v-container>
              <v-row>
                <v-col cols="12">
                  <span class="text-h5">Información del grupo:</span><br />
                  <v-text-field
                    label="Nombre del grupo"
                    hint="Nombre que será utilizado tanto en la web como en discord"
                    v-model="editGroupDialogFormData.name"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="editGroupDialog = false">
            Cancelar
          </v-btn>
          <v-btn
            color="blue darken-1"
            :loading="editGroupDialogLoading"
            text
            @click="editGroup()"
          >
            Editar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- delete group dialog -->
    <v-dialog v-model="deleteGroupDialog" persistent max-width="700px">
      <v-card outline shaped>
        <v-card-title>
          <span
            >¿Está seguro que desea eliminar
            {{ deleteGroupDialogData.name }}?</span
          >
        </v-card-title>
        <v-card-text>
          <span class="text-h5"
            >La eliminación del grupo eliminara tanto el canal de voz de discord
            y el grupo en el servidor de apside</span
          >
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="deleteGroupDialog = false">
            Cancelar
          </v-btn>
          <v-btn
            color="red darken-1"
            :loading="deleteGroupDialogLoading"
            text
            @click="deleteGroup()"
          >
            Eliminar
          </v-btn>
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
  </v-container>
</template>

<script>
export default {
  name: "admGroups",
  data() {
    return {
      busqueda: "",
      cabeceras: [
        {
          text: "ID Grupo (discord)",
          align: "start",
          sortable: true,
          value: "id",
        },
        {
          text: "Nombre Grupo",
          sortable: true,
          value: "name",
        },
        {
          text: "Cantidad de Integrantes",
          sortable: true,
          align: "center",
          value: "members",
        },
        {
          text: "Acciones",
          value: "actions",
        },
      ],
      grupos: [],
      apsidersWithoutGroup: [],

      cargando: false,

      // addApsiderDialog
      addApsiderDialog: false,
      addApsiderDialogLoading: false,
      addApsiderDialogData: {},

      // removeApsiderDialog
      removeApsiderDialog: false,
      removeApsiderDialogLoading: false,
      removeApsiderDialogData: {},

      // editGroupDialog
      editGroupDialog: false,
      editGroupDialogLoading: false,
      editGroupDialogData: {},
      editGroupDialogFormData: {
        name: "",
      },

      // deleteGroupDialog
      deleteGroupDialog: false,
      deleteGroupDialogLoading: false,
      deleteGroupDialogData: {
        id: "",
      },

      // createGroupDialog
      createGroupDialog: false,
      createGroupDialogLoading: false,
      createGroupDialogData: {
        name: "",
        apsiders: [],
      },

      // viewGroupDialog
      viewGroupDialog: false,
      viewGroupDialogData: {},

      basePathApsiders: process.env.VUE_APP_APSIDERS,

      appSnackbar: false,
      appSnackbarText: "",
    };
  },
  created() {
    this.getGroups();
    this.getApsidersWithoutGroup();
  },
  methods: {
    getGroups() {
      this.cargando = true;
      this.$axios
        .get("/groups")
        .then((response) => {
          this.grupos = response.data.result;

          this.cargando = false;
        })
        .catch((error) => {
          console.log(error);
          this.cargando = false;
        });
    },

    getApsidersWithoutGroup() {
      this.cargando = true;
      this.$axios
        .get("/apsidersWithoutGroup")
        .then((response) => {
          if (response.data.status === "empty") {
            this.cargando = false;
            return;
          }

          this.apsidersWithoutGroup = response.data.result;

          this.cargando = false;
        })
        .catch((error) => {
          console.log(error);
          this.cargando = false;
        });
    },

    openViewGroupDialog(data) {
      this.viewGroupDialogData = JSON.parse(JSON.stringify(data));
      this.viewGroupDialog = true;
    },

    openAddApsiderDialog(data) {
      this.addApsiderDialogData = JSON.parse(JSON.stringify(data));
      this.addApsiderDialogData.apsiders = this.apsidersWithoutGroup.map(
        (apsider) => {
          return { ...apsider, selected: false };
        }
      );
      this.addApsiderDialog = true;
    },

    openRemoveApsiderDialog(data) {
      this.removeApsiderDialogData = JSON.parse(JSON.stringify(data));
      this.removeApsiderDialogData.apsiders =
        this.removeApsiderDialogData.apsiders.map((apsider) => {
          return { ...apsider, selected: false };
        });
      this.removeApsiderDialog = true;
    },

    openCreateGroupDialog() {
      this.createGroupDialog = true;
      this.createGroupDialogData.name = "";
      this.createGroupDialogData.apsiders = this.apsidersWithoutGroup.map(
        (apsider) => {
          return { ...apsider, selected: false };
        }
      );
    },

    openEditGroupDialog(data) {
      this.editGroupDialogData = data;
      this.editGroupDialog = true;
    },

    openDeleteGroupDialog(data) {
      this.deleteGroupDialog = true;
      this.deleteGroupDialogData.id = data.id;
    },

    markAllAdd() {
      this.addApsiderDialogData.apsiders.forEach((apsider) => {
        apsider.selected = true;
      });
    },
    unmarkAllAdd() {
      this.addApsiderDialogData.apsiders.forEach((apsider) => {
        apsider.selected = false;
      });
    },

    markAllRemove() {
      this.removeApsiderDialogData.apsiders.forEach((apsider) => {
        apsider.selected = true;
      });
    },

    unmarkAllRemove() {
      this.removeApsiderDialogData.apsiders.forEach((apsider) => {
        apsider.selected = false;
      });
    },

    markAllCreate() {
      this.createGroupDialogData.apsiders.forEach((apsider) => {
        apsider.selected = true;
      });
    },

    unmarkAllCreate() {
      this.createGroupDialogData.apsiders.forEach((apsider) => {
        apsider.selected = false;
      });
    },

    createGroup() {
      if (!this.$refs.createGroupForm.validate()) {
        return;
      }
      console.log(this.createGroupDialogData.name);

      const selectedApsiders = this.createGroupDialogData.apsiders.filter(
        (apsider) => {
          return apsider.selected === true;
        }
      );

      this.createGroupDialogLoading = true;
      this.$axios
        .post(
          "/group",
          {
            name: this.createGroupDialogData.name,
            apsiders: selectedApsiders,
          },
          {
            headers: {
              Authorization: localStorage.getItem("access_token"),
            },
          }
        )
        .then((res) => {
          this.createGroupDialogLoading = false;

          if (res.data.status !== "success") {
            this.appSnackbar = true;
            this.appSnackbarText = "Hubo un problema al crear el grupo.";
            return;
          }
          this.grupos.push({
            id: res.data.data.id,
            name: res.data.data.name,
            channelId: res.data.data.channelId,
            apsiders: res.data.data.apsiders,
          });

          res.data.data.apsiders.forEach((apsider) => {
            const indexToDelete = this.apsidersWithoutGroup.findIndex(
              (element) => element.id === apsider.id
            );
            if (indexToDelete !== -1) {
              this.apsidersWithoutGroup.splice(indexToDelete, 1);
            }
          });
          this.createGroupDialog = false;
          this.$refs.createGroupForm.reset();

          this.appSnackbar = true;
          this.appSnackbarText = "Grupo creado exitosamente.";
        })
        .catch((err) => {
          this.createGroupDialogLoading = false;
          this.appSnackbar = true;
          this.appSnackbarText = "Error al crear grupo.";
          console.log(err);
        });
    },

    editGroup() {
      if (!this.$refs.EditGroupForm.validate()) {
        return;
      }

      this.editGroupDialogLoading = true;
      this.$axios
        .patch(
          "/group",
          {
            name: this.editGroupDialogFormData.name,
          },
          {
            headers: {
              Authorization: localStorage.getItem("access_token"),
            },
          }
        )
        .then((res) => {
          this.editGroupDialogLoading = false;

          if (res.data.status !== "success") {
            this.appSnackbar = true;
            this.appSnackbarText = "Hubo un problema al crear el grupo.";
            return;
          }

          this.$refs.createGroupForm.reset();
          this.appSnackbar = true;
          this.appSnackbarText = "Grupo creado exitosamente.";
        })
        .catch(() => {
          this.editGroupDialogLoading = false;

          this.appSnackbar = true;
          this.appSnackbarText = "Error al crear grupo.";
        });
    },

    deleteGroup() {
      this.deleteGroupDialogLoading = true;
      this.$axios
        .delete("/group", {
          headers: {
            Authorization: localStorage.getItem("access_token"),
          },
          data: {
            id: this.deleteGroupDialogData.id,
          },
        })
        .then((res) => {
          this.deleteGroupDialogLoading = false;

          if (res.data.status !== "success") {
            this.appSnackbar = true;
            this.appSnackbarText = "Hubo un problema al eliminar el grupo.";
            return;
          }

          this.grupos.forEach((grupo, index) => {
            if (grupo.id === this.deleteGroupDialogData.id) {
              this.grupos.splice(index, 1);
            }
          });

          this.deleteGroupDialog = false

          this.appSnackbar = true;
          this.appSnackbarText = "Grupo eliminado exitosamente.";
        })
        .catch(() => {
          this.deleteGroupDialogLoading = false;

          this.appSnackbar = true;
          this.appSnackbarText = "Error al eliminar grupo.";
        });
    },
  },
};
</script>
