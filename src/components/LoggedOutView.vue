<template>
    <v-container align-center justify-center fill-height >
        <v-card class="elevation-16 mx-auto my-auto" width="400px">
          <v-card-text class="text-xs-center display-1 font-weight-thin">You are not logged in</v-card-text>
          <v-divider></v-divider>
          <v-card-actions class="justify-center">
            <v-btn color="primary" @click="login">Login</v-btn>
          </v-card-actions>
        </v-card>
      </v-container>
</template>

<script>
export default {
  props: {
    login: {
      type: Function,
      required: true,
    }
  }
}
</script>

