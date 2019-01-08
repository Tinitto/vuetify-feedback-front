<template>
  <v-toolbar app color="primary" dark>
    <v-toolbar-side-icon></v-toolbar-side-icon>
    <v-toolbar-title>App Ratings</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn flat :to="rootUrl" v-if="!isTabletOrMobileView">
        <!--<v-icon class="hidden-md-and-up">home</v-icon>-->
        <span class="hidden-sm-and-down">Home</span>
      </v-btn>
      <v-btn flat :to="usersUrl" v-if="isAppOwnerOrAdmin && !isTabletOrMobileView">
        <!--<v-icon class="hidden-md-and-up">group</v-icon>-->
        <span class="hidden-sm-and-down">Users</span>
      </v-btn>
      <v-menu offset-y v-if="user">
        <v-btn flat slot="activator">
          <v-avatar size="30">
            <img :src="avatarUrl(user.name)">
          </v-avatar>
        </v-btn>
        <v-list>
          <v-list-tile @click="logoutFunction">
            <v-list-tile-title>logout</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
      <v-btn flat v-else @click="loginFunction">login</v-btn>
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
    logoutFunction: Function,
    viewWidth: {
      type: Number,
      required: true
    }
  },
  computed: {
    isTabletOrMobileView() {
      return this.viewWidth <= 960;
    },
    isAppOwnerOrAdmin() {
      return this.user ? this.user.isOwner || this.user.isAdmin : false;
    },
    routeQuery() {
      let query = {};
      if (this.$route.query.backendUrl) {
        query.backendUrl = this.$route.query.backendUrl;
      }
      return query;
    },
    rootUrl() {
      return this.getUrl("app-list");
    },
    usersUrl() {
      return this.getUrl("user-list");
    }
  },
  methods: {
    getUrl(routeName) {
      let routeObject = this.$router.resolve({
        name: routeName,
        query: this.routeQuery
      });
      return routeObject.href;
    },
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
