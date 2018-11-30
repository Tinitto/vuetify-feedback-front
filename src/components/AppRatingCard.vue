<template>
  <v-card color="white" class="black--text" z-index="2" :to="detailUrl">
    <v-layout row>
      <v-flex xs7 md9 lg10>
        <v-card-title primary-title>
          <div>
            <div class="headline">{{ applicationName }}</div>
            <div>{{ applicationDescription }}</div>
          </div>
        </v-card-title>
      </v-flex>
      <v-flex xs5 md3 lg2>
        <v-img src="https://source.unsplash.com/featured/125x125/?technology" height="125px" contain></v-img>
      </v-flex>
    </v-layout>
    <v-divider light></v-divider>
    <v-card-actions class="pa-3">
        <!--<v-btn color="primary" light :href="actionUrl">Rate this app</v-btn> -->
      <v-spacer></v-spacer>
      <span class="caption mr-2">({{ rating }})</span>
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
        default: '#'
      },
      actionUrl: {
        type: String,
        default: '#'
      },
      applicationName: {
        type: String,
        default: 'Hello World'
      },
      applicationDescription: {
        type: String,
        default: 'A created app'
      }
    }
  }
</script>
