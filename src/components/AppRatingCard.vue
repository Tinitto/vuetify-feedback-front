<template>
  <v-card color="white" class="black--text" z-index="2" :to="detailUrl" style="min-height: 100%">
    <v-layout row>
      <v-flex  xs12>
        <v-img
          class="white--text"
          
          gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)"
          src="https://source.unsplash.com/featured/1000x500/?technology"
          contain
        >
          <v-container fill-height fluid>
            <v-layout fill-height>
              <v-flex xs12 align-end flexbox>
                <div>
                 <div class="headline">{{ applicationName }}</div>
                 <div class="">{{ applicationDescription }}</div>
                </div>
              </v-flex>
            </v-layout>
          </v-container>
        </v-img>
      </v-flex>
      <!--<v-flex xs7 md7 lg7>
        <v-card-title primary-title>
          <div>
            <div class="headline">{{ applicationName }}</div>
            <div>{{ applicationDescription }}</div>
          </div>
        </v-card-title>
      </v-flex>
      <v-flex xs5 md5 lg5>
        <v-img src="https://source.unsplash.com/featured/125x125/?technology" height="125px" contain></v-img>
      </v-flex> -->
    </v-layout>
    <v-divider light></v-divider>
    <v-card-actions class="pa-3">
      <span class="caption mr-2">({{ roundedOffRating }})</span>
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
    detailUrl: {
      type: String,
      default: "#"
    },
    applicationName: {
      type: String,
      default: "Hello World"
    },
    applicationDescription: {
      type: String,
      default: "A created app"
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
