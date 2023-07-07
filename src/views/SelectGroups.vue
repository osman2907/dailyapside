<template>
  <v-container fill-height class="mt-5 my-6" style="max-width: 1200px !important">
    <v-row class="d-flex justify-center">
        <v-col cols="12" class="text-center">
        <span class="text-h2">Selección de grupos</span>
      </v-col>
      <v-col cols="4" v-for="group in groups" :key="group.id" class="mb-5">

        <v-card @click="redirectToGroup(group.id)" class="hoverable-card">
            <v-img height="200px" src="https://d1ymz67w5raq8g.cloudfront.net/Pictures/480xany/0/5/3/507053_teamworkpuzzleillustration_shutterstock_1518160778_513256.jpg"></v-img>
          <v-card-title>
            <h3>{{ group.name }}</h3>
          </v-card-title>
          <v-card-subtitle class="not-selectable">
            {{ group.apsiders.length }} conectados
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-icon v-on="on" v-bind="attrs">mdi-alert-circle</v-icon>
              </template>
              <small
                class="ma-0"
                v-for="apsider in group.apsiders"
                :key="apsider.id"
              >
                {{ apsider }} <br />
              </small>
            </v-tooltip>
          </v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "SelectGroups",
  data() {
    return {
      loading: false,
      groups: [],
    };
  },
  created() {
    this.getGroups();
  },
  methods: {
    getGroups() {
      this.loading = true;
      this.$axios
        .get("/groups")
        .then((response) => {
          this.groups = response.data.result;
          this.loading = false;
        })
        .catch((error) => {
          console.log(error);
          this.loading = false;
        });
    },
    redirectToGroup(groupId) {
      this.$router.push({
        name: "DailyApside",
        params: { group: groupId },
      });
    },
  },
};
</script>
<style>
.hoverable-card:hover {
  box-shadow: 0 0 16px #00000044 !important;

  cursor: pointer;
  transition: all 0.2s ease-in-out;
}

.not-selectable {
  -webkit-user-select: none; /* Safari */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* IE10+/Edge */
  user-select: none; /* Standard */
}
</style>