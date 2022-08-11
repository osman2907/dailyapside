<template>
  <v-app>
    <v-main>
      <DailyApside />
    </v-main>
  </v-app>
</template>

<script>
import DailyApside from "./components/DailyApside";

export default {
  name: "App",

  components: {
    DailyApside,
  },

  data: () => ({
    //
  }),
};
</script>
