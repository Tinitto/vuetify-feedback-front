<template>
  <div>
    <slot />
    <v-toolbar flat color="white" class="py-3 elevation-1">
      <v-layout row wrap justify-space-between align-baseline>
        <v-flex xs12 sm4>
      <v-toolbar-title>{{ tableTitle }}</v-toolbar-title>
        </v-flex>
      <!--<v-spacer></v-spacer>-->
      <v-flex xs12 sm8>      
      <v-text-field
        v-model="search"
        append-icon="search"
        label="Search"
        single-line
        hide-details
      ></v-text-field> 
      </v-flex>
      </v-layout>  
    </v-toolbar>
    <v-data-table
      :headers="headerList"
      :items="filteredUsers(filter.property, filter.value)"
      class="elevation-1"
      :search="search"
    >
      <template slot="items" slot-scope="props">
        <td v-for="header in headerList" :key="header.value">
          <v-switch
            value
            :input-value="props.item[header.value]"
            @change="toggleProperty(props.item, header.value)"
            :disabled="isReadOnly(props.item)"
            v-if="header.type == 'boolean'"
          ></v-switch>
          <span v-else>{{ props.item[header.value] }}</span>
        </td>
        <td class="justify-center layout px-0">
           
        </td>
      </template>
      <template slot="no-data">
        <v-alert :value="true" color="error" icon="warning">
        Sorry, nothing to display here :(
      </v-alert>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  props: {
    toggleProperty: {
      type: Function,
      required: true
      /* the function of type (item, property) */
    },
    tableTitle: {
      type: String,
      default: "Users"
    },
    users: {
      type: Array,
      required: true
    },
    headerList: {
      type: Array,
      required: true
      /*
        [
          {
            type: boolean,
            text: 'The Label',
            value: 'the_corresponding_key_in_data_set'
          },
          {
            type: string,
            text: 'The Label',
            value: 'the_corresponding_key_in_data_set'
          },

        ]
        */
    },
    isReadOnly: {
      type: Function,
      required: true
    },
    filter: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  data: () => ({
    search: ""
  }),
  methods: {
    filteredUsers(property, value) {
      if (property === undefined || value === undefined) {
        return this.users;
      }
      return this.users.filter(user => user[property] == value);
    }
  }
};
</script>
