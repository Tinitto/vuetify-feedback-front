<template>
  <div>
    <not-allowed v-if="!isAppOwnerOrAdmin"></not-allowed>
    <v-container v-else>
      <user-data-table
        :toggle-property="toggleUserProperty"
        table-title="User List"
        :users="userList"
        :header-list="headerList"
        :is-read-only="isReadOnly"
        :filter="filter"
      >
        <table-filter v-model="filter.value" :key-value-pairs="filterKeyValuePairs"></table-filter>
      </user-data-table>
    </v-container>
  </div>
</template>

<script>
import NotAllowed from "../components/NotAllowed.vue";
import UserDataTable from "../components/UserDataTable.vue";
import TableFilter from "../components/TableFilter.vue";

import authErrorHandler from "../assets/authErrorHandler.js";

import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
  components: {
    NotAllowed,
    UserDataTable,
    TableFilter
  },
  data: () => ({
    message: {
      type: undefined, // enum ['success', 'info', 'warning', 'error']
      text: undefined,
      status: false
    },
    filter: {
      property: "isAdmin",
      value: undefined
    },
    filterKeyValuePairs: [
      { key: "Admins", value: true },
      { key: "Non-admins", value: false }
    ],
    headerList: [
      {
        type: "string",
        text: "Name",
        value: "name"
      },
      {
        type: "string",
        text: "Email",
        value: "email"
      },
      {
        type: "boolean",
        text: "Is Admin",
        value: "isAdmin"
      }
    ]
  }),
  created() {
    // initialize the user list
    const params = {};
    this.updateUserList(params).catch(err => {
      authErrorHandler(err, this.authenticate, () => {
        this.clearAuthenticateError();
        this.updateUserList(params);
      });
    });
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    isAppOwner() {
      return this.currentUser ? this.currentUser.isOwner : false;
    },
    isAppOwnerOrAdmin() {
      return this.currentUser
        ? this.currentUser.isOwner || this.currentUser.isAdmin
        : false;
    },
    ...mapGetters("users", {
      userList: "list"
    })
  },
  methods: {
    ...mapActions("auth", {
      authenticate: "authenticate"
    }),
    ...mapActions("users", {
      updateUser: "update"
    }),
    ...mapActions("users", {
      updateUserList: "find"
    }),
    ...mapMutations(["alertError", "alertSuccess"]),
    toggleUserProperty(user, property) {
      const data = { [property]: !user[property] };
      this.updateUser([user._id, data, {}])
        .then(() => {
          this.alertSuccess(
            `${user.name}'s ${property} was changed to ${user[property]}`
          );
        })
        .catch(err => {
          this.alertError(err.message);
        });
    },
    isReadOnly(user) {
      /* Only app owners can edit other users but they can not be editted themselves*/
      if (!this.isAppOwner) {
        return true;
      }
      return user.isOwner;
    },
    ...mapMutations("auth", {
      clearAuthenticateError: "clearAuthenticateError"
    })
  }
};
</script>
