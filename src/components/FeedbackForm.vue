<template>
<div>
  <v-alert
      v-model="error.status"
      dismissible
      type="error"
    >
      {{ error.message }}
  </v-alert>
<v-alert
      v-model="success.status"
      dismissible
      type="success"
    >
      {{ success.message }}
  </v-alert>
  
    <v-container align-center justify-center fill-height>
      <!--<v-layout v-if="!dialog" row justify-center>
        <v-btn color="primary" dark @click="dialog = true">Rate {{ applicationDetails.name}} Again</v-btn>
      </v-layout>-->

      <v-dialog v-model="dialog" :max-width="currentModalWidth" hide-overlay>
        <v-card
            class="elevation-16 mx-auto"
            :width="currentModalWidth"
        >
            <v-card-title
            class="headline"
            primary-title
            >
            {{title}}
            </v-card-title>
            <v-card-text>
            {{ intro }}
                        
            <!-- For user login and logout -->
            <card-alert
            type="info"
            action-text="Logout"
            :onclick="logoutFunction"
            v-if="userDetails.accessToken"
            >
              Logged in {{ userDetails.name }}.
            </card-alert>

            <card-alert
            type="error"
            action-text="Login"
            :onclick="loginFunction"
            v-else
            >
              You are not Logged in
            </card-alert>

            <div class="text-xs-center mt-5">
                <v-rating
                v-model="rating"
                :color="theme.starColor"
                :background-color="theme.starBackgroundColor"
                empty-icon="$vuetify.icons.ratingFull"
                half-increments
                hover
                @input="updateExternalModel('rating', $event)"
                ></v-rating>
            </div>
            <v-textarea
                v-model="reason"
                auto-grow
                box
                :color="theme.textColor"
                label="Why"
                rows="1"
                @input="updateExternalModel('reason', $event)"
            ></v-textarea>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions class="justify-space-between">
            <v-btn flat @click="dialog=false">{{ buttons.cancel}}</v-btn>
            <v-btn
                color="primary"
                flat
                @click="sendFeedback()"
            >
                {{ buttons.submit }}
            </v-btn>
            </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";
import CardAlert from "./CardAlert.vue";

export default {
  components: {
    CardAlert
  },
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
    userDetails: {
      type: Object,
      required: true
    },
    buttons: {
      type: Object,
      default: () => ({
        cancel: "No Thanks",
        submit: "Rate Now"
      })
    },
    value: {
      type: Object
    },
    theme: {
      type: Object,
      default: () => ({
        textColor: "black",
        starColor: "yellow darken-3",
        starBackgroundColor: "grey darken-1"
      })
    },
    logoutFunction: Function,
    loginFunction: Function,
    applicationDetails: {
      type: Object,
      required: true
      /*
      {
        actionUrl: {
          type: String,
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        redirectUrl: {
          type: String,
          required: true,
        }
      }
      */
    }
  },
  data: () => ({
    dialog: true,
    rating: 4.5,
    reason: "",
    error: {
      status: false,
      message: ""
    },
    success: {
      status: false,
      message: ""
    },
    model: {}
  }),
  created() {
    this.initializeModel();
  },
  methods: {
    initializeModel() {
      const externalModel = this.value || {};
      this.model.rating = this.rating;
      this.model.reason = this.reason;
      this.model.application = this.applicationDetails.id;
      this.model = { ...this.model, ...externalModel };
    },
    updateExternalModel(property, value) {
      this.model[property] = value;
      this.$emit("input", this.model);
    },
    sendFeedback() {
      // set the dialog value to false
      this.dialog = false;
      // Then send the feedback via axios
      let redirectUrl = this.applicationDetails.redirectUrl;
      let postOptions = {};
      if (this.userDetails.accessToken) {
        postOptions.headers = {
          Authorization: `JWT ${this.userDetails.accessToken}`
        };
      }
      console.log(this.model);
      axios
        .post(this.applicationDetails.actionUrl, this.model, postOptions)
        .then(response => {
          console.log(response);
          if ([200, 201, 202].includes(response.status)) {
            this.success.message = "Rating successful";
            this.success.status = true;
            window.location.replace(redirectUrl);
          }
        })
        .catch(error => {
          this.error.message = error.response.data.message;
          this.error.status = true;
          console.log(error.response.data.message);
        });
    }
  },
  computed: {
    currentModalWidth() {
      return this.modalWidth || 300;
    }
  }
};
</script>
