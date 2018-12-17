<template>
  <v-container align-center justify-center fill-height>
    <v-dialog v-model="value" :max-width="currentModalWidth" hide-overlay>
      <v-card class="elevation-16 mx-auto" :width="currentModalWidth">
        <v-card-title class="headline" primary-title>{{title}}</v-card-title>
        <v-card-text>
          {{ intro }}
          <div class="text-xs-center mt-5">
            <v-rating
              v-model="rating"
              :color="theme.starColor"
              :background-color="theme.starBackgroundColor"
              empty-icon="$vuetify.icons.ratingFull"
              half-increments
              hover
            ></v-rating>
          </div>
          <v-textarea v-model="reason" auto-grow box :color="theme.textColor" label="Why" rows="1"></v-textarea>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions class="justify-space-between">
          <v-btn flat @click="cancelFunction()">{{ buttons.cancel}}</v-btn>
          <v-btn color="primary" flat @click="sendFeedback(currentData)">{{ buttons.submit }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    intro: {
      type: String,
      required: true
    },
    modalWidth: {
      type: Number
    },
    buttons: {
      type: Object,
      default: () => ({
        cancel: "No Thanks",
        submit: "Rate Now"
      })
    },
    theme: {
      type: Object,
      default: () => ({
        textColor: "black",
        starColor: "yellow darken-3",
        starBackgroundColor: "grey darken-1"
      })
    },
    sendFeedback: {
      type: Function,
      required: true
    },
    cancelFunction: {
      type: Function,
      required: true
    },
    applicationId: {
      type: String,
      required: true
    },
    value: {
      type: Boolean,
      required: true
    }
  },
  data: () => ({
    rating: 4.5,
    reason: ""
  }),
  computed: {
    currentData() {
      return {
        rating: this.rating,
        reason: this.reason,
        application: this.applicationId
      };
    },
    currentModalWidth() {
      return this.modalWidth || 300;
    }
  }
};
</script>
