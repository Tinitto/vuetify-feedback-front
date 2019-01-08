<template>
<div class="primary"> 
  <bottom-nav :user="user" v-if="isTabletOrMobileView"></bottom-nav>
  <v-footer app height="auto" color="primary lighten-1"  v-else>    
    <v-layout justify-center row wrap>
      <v-btn
        v-for="link in links"
        :key="link.label"
        color="white"
        :href="link.href || ''"
        target="_blank"
        flat
        round
      >{{ link.label }}</v-btn>
      <v-flex primary lighten-2 py-3 text-xs-center white--text xs12>&copy;2018 —
        <strong>
          <slot/>
        </strong>
      </v-flex>
    </v-layout>
  </v-footer>  
</div>
</template>

<script>
import BottomNav from "./BottomNav.vue";
export default {
  components: {
    BottomNav
  },
  props: {
    links: {
      type: Array
      /*
          [{label: '', href: ''},...]
          */
    },
    user: {
      required: true,
      validator: prop => typeof prop === "object" || prop === null
    },
    viewWidth: {
      type: Number,
      required: true
    }
  },
  computed: {
    isTabletOrMobileView() {
      return this.viewWidth <= 960;
    }
  }
};
</script>
