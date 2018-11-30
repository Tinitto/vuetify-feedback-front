<template>
<div>
  <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-list three-line>
          <template v-for="rating in ratings">
            <v-divider inset :key="dividerIndex(rating._id)"></v-divider>

            <v-list-tile :key="rating._id" avatar @click="expandToModal(rating)">
              <v-list-tile-avatar>
                <img :src="avatarUrl(rating.user)">
              </v-list-tile-avatar>

              <v-list-tile-content>
                <v-list-tile-title>
                  <span>{{ rating.user }} </span>
                  <small class="grey--text">{{ rating.created | moment("DD-MM-YYYY")}}</small>
                </v-list-tile-title>
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
                <v-list-tile-sub-title>{{ rating.reason }}</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
  <rating-detail-modal
  v-model="showDialog"
  :rating="selectedRating"
  />
  </div>
</template>

<script>
import RatingDetailModal from './RatingDetailModal.vue';

export default {
  components: {
    RatingDetailModal,
  },
  props: {
    ratings: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    showDialog: false,
    selectedRating: {},
  }),
  methods: {
    avatarUrl(name) {
      // Returns avatars derived from User's initials e.g. for John Doe, you get JD
      let userName = name
        .trim()
        .split(" ")
        .join("+");
      return `https://ui-avatars.com/api/?name=${userName}`;
    },
    expandToModal(application) {
      // Open a modal with the application's details
      this.selectedRating = application;
      this.showDialog = true;
      console.log(application);
    },
    dividerIndex(ratingId) {
      return `divider${ratingId}`;
    }
  }
};
</script>

