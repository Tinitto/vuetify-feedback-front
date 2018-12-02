<template>
  <v-layout row justify-center>
    <v-dialog v-model="value" max-width="400px">
      <v-card>
        <v-card-title>
          <span class="headline">{{ rating.user }}</span>
          <v-spacer />
          <span class="grey--text">{{ rating.createdAt | moment("DD-MM-YYYY") }} </span>
        </v-card-title>
        <v-divider />
        <v-card-text class="text-xs-center">
            <v-rating
                  v-model="rating.rating"
                  background-color="white"
                  color="yellow accent-4"
                  dense
                  half-increments
                  hover
                  size="18"
                  readonly
            ></v-rating>
            {{ rating.reason }}
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" flat @click.stop="closeDialog()">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
  export default {
    props: {
      value: {
        default: false
      },
      rating: {
        type: Object,
        required: true,
      }
    },
    data: () => ({
      dialog: false,
    }),
    methods: {
      closeDialog(){
        // update the v-modal
        this.dialog = false;
        this.$emit('input', this.dialog);
      }
    }
  }
</script>