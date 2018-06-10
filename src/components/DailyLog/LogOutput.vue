<template>
    <v-card>
        <v-list two-line>
            <template v-for="(item, index) in finSentences">
                <v-subheader v-if="item.header" :key="item.header">{{ item.header }}</v-subheader>
                <v-divider v-else-if="item.divider" :inset="item.inset" :key="index"></v-divider>
                <v-list-tile v-else :key="item.title" avatar>
                <v-list-tile-avatar>
                    <emoji  emoji="money_with_wings" :size="40"></emoji>
                </v-list-tile-avatar>
                <v-list-tile-content>
                    <v-list-tile-title v-html="item.text"></v-list-tile-title>
                    <v-list-tile-sub-title v-html="item.subtitle"></v-list-tile-sub-title>
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
      return this.$store.getters.finSentences
    }
  },
}
</script>

