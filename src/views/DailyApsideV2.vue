<template>
  <v-container class="mt-5" style="max-width: 1200px !important">
    <v-row>
      <v-col cols="4" class="text-left">
        <v-img
          src="@/assets/images/apside.png"
          style="max-width: 250px"
        ></v-img>
      </v-col>
      <v-col cols="4" class="text-center">
        <v-btn dark class="apside-btn">
          <v-icon class="mr-2">mdi-circle</v-icon>
          Archivados
        </v-btn>
      </v-col>
      <v-col cols="4" class="text-right">
        <span class="apside-color text-h5 font-weight-bold">
          <span class="mr-3">Marcelo Pavis</span>
          <v-avatar size="70">
            <v-img :src="apsiders_base_url + '/dramirez-apside.jpg'"></v-img>
          </v-avatar>
        </span>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <span class="apside-color text-h4 font-weight-bold"
          >Daily {{ moment().format("DD/MM/YYYY") }}
        </span>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="3" class="pa-3 my-8">
        <div class="img-wrap">
          <div
            class="daily-image"
            :style="
              'background: url(' + apsiders_base_url + '/dramirez-apside.jpg)'
            "
          ></div>
          <div class="img-description-container">
            <span class="img-description font-weight-bold text-h6"
              >Diego Ramirez</span
            >
          </div>
        </div>
      </v-col>
      <v-col cols="3" class="pa-3 my-8">
        <div class="img-wrap" id="daily-image-1" @click="updateAssist(1, 'Diego Ramirez')">
          <div
            class="daily-image"
            :style="
              'background: url(' + apsiders_base_url + '/dramirez-apside.jpg)'
            "
          ></div>
          <div class="inner-circle"></div>
          <div class="img-description-container">
            <span class="img-description font-weight-bold text-h6"
                id="daily-name-1"
              >Diego Ramirez</span
            >
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "DailyApsideV2",
  data() {
    return {
      apsiders_base_url: process.env.VUE_APP_APSIDERS,
    };
  },
  methods: {
    updateAssist: function (id, name) {
      console.log("updateAssist");

      let dailyImage = document.getElementById("daily-image-" + id);
      let dailyName = document.getElementById("daily-name-" + id); 

      let state; // state indica si la persona se debe marcar como presente o ausente
      if (dailyImage.classList.contains("img-active")) {
          dailyImage.classList.remove("img-active");
          state = 0;
        dailyName.innerHTML = name;
        } else {
          dailyImage.classList.add("img-active");
          state = 1;
          dailyName.innerHTML = '<span style="font-size:2.8rem; transition: 0.1s all ease-in" class="mdi mdi-check-bold"></span>'
      }
    },
  },
};
</script>

<style>
.apside-btn {
  background: #201751 !important;
}

.apside-color {
  color: #201751 !important;
}

.img-wrap {
  position: relative;
  height: 190px;
  width: 190px;
}

.img-description-container {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: #17085ab9;
  color: #fff;
  visibility: hidden;
  opacity: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;

  transition: opacity 0.2s, visibility 0.2s;
}

.daily-image {
  width: 100%;
  height: 100%;
  background-size: cover !important;
  background-position: center !important;
  background-repeat: no-repeat !important;
  transition: all 0.1s ease-in-out;
  border-radius: 50%;
}

.img-wrap:hover .img-description-container {
  visibility: visible;
  opacity: 1;
}

.img-description {
  transition: 0.2s;
}


.inner-circle {
    opacity: 0;
}

.img-active .img-description-container {
  visibility: visible !important;
  opacity: 1 !important;
}

.img-active .inner-circle {
    position: absolute;
    width: 170px; height: 170px;
    border-radius: 50%;
    top: 9px;
    left: 9px;
    border: 2px solid #84db81;
    opacity: 1;
    z-index: 2;

    transition: all 0.2s ease-in-out;
}

.img-active .img-description {
  color: #84db81 !important;
}
</style>