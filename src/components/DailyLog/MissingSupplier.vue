<template>
 <v-dialog v-model="dialog" max-width="490">
        <v-card>
          <v-card-title class="headline">{{headline}}</v-card-title>
          <v-container>

          <v-card v-for="sentence in missingSuppliers"  :key="sentence">{{sentence}}</v-card>
          </v-container>
          <v-card-text>Is <strong>{{potentialSupplier}}</strong> the supplier in this case?</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn>Yes, that's the Supplier</v-btn>
            <v-btn>No, let me fill in the supplier</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
</template>
<script>
export default {
  computed: {
    potentialSupplier() {
      return this.$store.getters.potentialSupplier;
    },
    missingSuppliers() {
      return this.$store.getters.missingSuppliers;
    },
    headline() {
      if (this.$store.getters.missingSupplier.length == 1) {
        return "This Sentence is Missing a Known Supplier";
      } else {
        return "These Sentences are Missing Known Suppliers";
      }
    },
    dialog: {
      get() {
        // console.log(
        //   "length of missingSupplier array ",
        //   this.$store.getters.missingSupplier.length
        // );
        // console.log(
        //   "truthy for dialog " +
        //     (this.$store.getters.missingSupplier[0] !== null)
        // );
        return this.$store.getters.missingSupplier[0] !== null; // Show the warning dialog if there's something substantive in the missingSupplier array.
      },
      set(dialog) {
        //this.$store.dispatch('')
      }
    }
  }
};
</script>

