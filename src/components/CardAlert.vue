<template>
  <v-toolbar dense :color="type">
    <small class="white--text">
      <slot />
    </small>
    <v-spacer></v-spacer>
    <v-btn @click="onclick()" small color="primary" v-if="onclick">{{ actionText }}</v-btn>            
  </v-toolbar>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      validator: function(value) {
        // The value must match one of these strings
        return ["success", "error", "info", "warning"].indexOf(value) !== -1;
      },
      required: true
    },
    actionText: String,
    onclick: Function
  }
};
</script>
