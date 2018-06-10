<template>
<v-flex xs10>
    <v-text-field box
      v-model="rawLog"
      name="input-7-1"
      label="What Happened This Day"
      multi-line
    ></v-text-field>
    <v-btn
      @click="submit">submit
    </v-btn>

</v-flex>

</template>

<script>
export default {
  data: () => ({
    rawLog:
      "Got shoes for R70 from Mike. Bought R70 worth Cement, Lime, and Soda from usual guys. Tonight, after a breakthrough year for America, our economy is growing and creating jobs at the fastest pace since 1999. Got R90.00 worth of Peas from Bluff Checkers"
  }),
  methods: {
      submit() {
      this.$store.dispatch("newRawLog", this.rawLog);
    }
  },
  
}
</script>

