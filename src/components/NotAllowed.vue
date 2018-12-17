<template>
  <v-container align-center justify-center fill-height>
    <v-card class="elevation-16 mx-auto my-auto" width="400px">
      <v-card-text class="text-xs-center display-1 font-weight-thin">You are not Allowed Here</v-card-text>
      <v-divider></v-divider>
      <v-card-actions class="justify-center">
        <v-btn color="primary" @click="goBack()">Back</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>
<script>
export default {
  methods: {
    goBack() {
      try {
        this.$router.go(-1);
      } catch (err) {
        const currentPath = window.location.href;
        const queryString = currentPath.includes("?")
          ? currentPath.slice(currentPath.indexOf("?"))
          : "";
        let rootUrl = `${window.location.protocol}//${
          window.location.hostname
        }`;
        const port = window.location.port;
        rootUrl = port ? `${rootUrl}:${port}` : rootUrl;
        rootUrl += queryString;
        // go to the rootUrl
        window.location.replace(rootUrl);
      }
    }
  }
};
</script>
