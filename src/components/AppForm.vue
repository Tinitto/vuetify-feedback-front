<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-btn slot="activator" color="error" dark absolute bottom right fab>
        <v-icon>add</v-icon>
      </v-btn>
      <v-card>
        <v-card-title>
          <span class="headline">New Application</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout row wrap>
              <v-flex xs12>
                <v-text-field
                label="Name*"
                required
                v-model="name"
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-textarea
                  v-model="description"
                  auto-grow
                  box
                  label="Description*"
                  rows="2"
                  required
                ></v-textarea>
              </v-flex>
            </v-layout>
            <small>*indicates required field</small>
            
          </v-container>          
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="secondary darken-1" flat @click="close()">Cancel</v-btn>
          <v-btn color="primary darken-1" type="submit" flat @click="submit">Create</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
export default {
  props: {
    submitFunction: {
      type: Function,
      required: true
    }
  },
  data: () => ({
    dialog: false,
    name: "",
    description: ""
  }),
  computed: {
    model() {
      return {
        name: this.name,
        description: this.description
      };
    }
  },
  methods: {
    close() {
      this.name = "";
      this.description = "";
      this.dialog = false;
    },
    submit() {
      this.submitFunction(this.model);
      this.close();
    }
  }
};
</script>
