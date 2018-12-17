<template>
  <v-btn-toggle v-model="state" class="elevation-1">
    <v-btn
      flat
      v-for="pair in keyValuePairs"
      :key="pair.key"
      :value="pair.value"
      outline
    >{{ pair.key}}</v-btn>
  </v-btn-toggle>
</template>
<script>
export default {
  props: {
    keyValuePairs: {
      type: Array,
      required: true
    },
    value: {
      type: [String, Boolean, Number]
    }
  },
  data: () => ({
    state: undefined
  }),
  created() {
    this.state = this.value;
  },
  watch: {
    state: function(val) {
      this.$emit("input", val);
    }
  }
};
</script>
