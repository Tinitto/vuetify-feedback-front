<template>
  <v-card color="white" class="black--text" z-index="2">
    <v-layout row>
      <v-flex xs12>
        <v-img
          class="white--text"
          height="25vh"
          gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)"
          src="https://source.unsplash.com/featured/1000x500/?technology"
        >
          <v-container fill-height fluid>
            <v-layout fill-height>
              <v-flex xs12 align-end flexbox>
                <div>
                  <div class="display-2 font-weight-light">{{ applicationName }}</div>
                  <div class="headline font-weight-thin">{{ applicationDescription }}</div>
                </div>
              </v-flex>
            </v-layout>
          </v-container>
        </v-img>
      </v-flex>
    </v-layout>
    <v-divider light></v-divider>
    <v-card-actions class="pa-3">
      <v-layout row wrap justify-space-between>
        <v-flex xs12 sm9 md10>
          <v-btn color="primary" light @click="action">Rate this app</v-btn>
          <v-btn color="error" light @click="deleteFunction" v-if="deleteFunction">Delete App</v-btn>
        </v-flex>
        <!--<v-spacer></v-spacer>-->
        <v-flex xs12 sm3 md2>
          <v-chip color="primary">
            <v-avatar class="white primary--text">{{ roundedOffRating }}</v-avatar>
            <v-rating
              v-model="rating"
              background-color="white"
              color="yellow accent-4"
              dense
              half-increments
              hover
              size="18"
              readonly
            ></v-rating>
          </v-chip>
        </v-flex>
      </v-layout>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    rating: {
      type: Number,
      default: 0
    },
    action: {
      type: Function,
      required: true
    },
    applicationName: {
      type: String,
      default: "Hello World"
    },
    applicationDescription: {
      type: String,
      default: "A created app"
    },
    deleteFunction: {
      type: Function
    }
  },
  computed: {
    roundedOffRating() {
      return this.roundOff(this.rating);
    }
  },
  methods: {
    roundOff(value) {
      return Math.round(value * 10) / 10;
    }
  }
};
</script>
