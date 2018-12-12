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
      <v-btn flat v-if="user">
        <v-avatar size="30">
          <img :src="avatarUrl(user.name)" />
        </v-avatar>
      </v-btn>      
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      required: true
    }
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
