<template>
  <v-toolbar app color="primary" dark>
    <v-toolbar-side-icon></v-toolbar-side-icon>
    <v-toolbar-title>App Ratings</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn flat to='/'>
        <v-icon class="hidden-md-and-up">home</v-icon>        
        <span class="hidden-sm-and-down">Home</span>
      </v-btn>
      <v-menu offset-y v-if="user">
      <v-btn flat slot="activator">
        <v-avatar size="30">
          <img :src="avatarUrl(user.name)" />
        </v-avatar>
      </v-btn>
      <v-list>
        <v-list-tile
          @click="logoutFunction"
        >
        <v-list-tile-title>logout</v-list-tile-title>
        </v-list-tile>
      </v-list>
      </v-menu>
      <v-btn flat v-else @click="loginFunction">
        login
      </v-btn>
  
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
  props: {
    user: {
      required: true,
      validator: prop => typeof prop === "object" || prop === null
    },
    loginFunction: Function,
    logoutFunction: Function
  },
  methods: {
    avatarUrl(name) {
      // Returns avatars derived from User's initials e.g. for John Doe, you get JD
      let userName =
        typeof name === "string"
          ? name
              .trim()
              .split(" ")
              .join("+")
          : "Anonymous";
      return `https://ui-avatars.com/api/?name=${userName}`;
    }
  }
};
</script>
