<template>
  <v-bottom-nav
  fixed
  color="primary"
  style="bottom: 56px;"
  >
    <v-btn dark :to="rootUrl">
      <span>Home</span>
      <v-icon>home</v-icon>
    </v-btn>

    <v-btn dark :to="usersUrl" v-if="isAppOwnerOrAdmin">
      <span>Users</span>
      <v-icon>group</v-icon>
    </v-btn>
    
  </v-bottom-nav>
</template>

<script>
export default {
  props: {
    user: {
      required: true,
      validator: prop => typeof prop === "object" || prop === null
    },
  },
  computed: {
    isAppOwnerOrAdmin() {
      return this.user ? (this.user.isOwner || this.user.isAdmin) : false;
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
  }
};
</script>
