<template>
 <v-dialog v-model="dialog" max-width="490">
        <v-card>
          <v-card-title class="headline">This Sentence is Missing a Known Supplier</v-card-title>
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
        potentialSupplier(){
           return this.$store.getters.potentialSupplier
        },
        dialog: {
            get(){
                return this.$store.getters.missingSupplier
            },
            set(dialog){
                //this.$store.dispatch('')
            }
        }
    }

}
</script>

