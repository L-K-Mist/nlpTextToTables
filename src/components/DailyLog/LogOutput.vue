<template>
    <v-card>
        <v-list two-line>
            <template v-for="(item, index) in finSentences.verified">
                <v-list-tile :key="index" avatar>
                    <v-list-tile-avatar>
                        <emoji  emoji="money_with_wings" :size="40"></emoji>
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                        <v-list-tile-title v-html="item"></v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </template>
        </v-list>
    </v-card>
</template>
<script>
export default {
  computed: {
    gotFin() {
      return this.$store.getters.gotFin;
    },
    finSentences() {
      console.log("LogOutput has", this.$store.getters.suppliersEvaluated);
      return this.$store.getters.suppliersEvaluated;
    }
  }
};
</script>


