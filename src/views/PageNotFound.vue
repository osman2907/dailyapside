<template>
    <v-container fill-height fluid>
        <v-row align="center" justify="center">
            <v-col cols="12 text-center">
                <div class="text-h1 custom-font">404, Not found</div>
                <div class="text-h4">La página solicitada no existe. Por favor vuelva al inicio e inténtelo nuevamente.</div>
                <v-btn color="primary" class="my-4" x-large to="/">Volver al inicio</v-btn>
                <v-img src="@/assets/images/apside.png" style="margin:auto" max-width="400"></v-img>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    name: 'PageNotFound',
}
</script>

<style scoped>
.custom-font {
    color: #202055;
}
</style>