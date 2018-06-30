<template>

                <v-card>
                  <v-card-title class="headline primary--text">Data Capture</v-card-title>
                    <v-container fill-height>
                      <v-layout fill-height>
                        <v-flex xs12 align-end flexbox>                    
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
                      </v-layout>
                    </v-container>
                </v-card>


</template>

<script>
export default {
  created() {
    this.$store.dispatch("fetchAllSuppliers");
  },
  data: () => ({
    rawLog:
      "Got shoes for R70 from Mike. Bought R70 worth Cement, Lime, and Soda from usual guys. Got Sugar for R34 from PickNPay. Got Sweet Melon for R45 from Spar. Tonight, after a breakthrough year for America, our economy is growing and creating jobs at the fastest pace since 1999. Got R90.00 worth of Peas from Bluff Checkers"
  }),
  methods: {
    submit() {
      this.$store.dispatch("newRawLog", this.rawLog);
    }
  }
};
</script>

