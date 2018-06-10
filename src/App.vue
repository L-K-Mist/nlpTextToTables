<template>
  <v-app>
    <v-toolbar app>
       <v-toolbar-title>Company Data</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-content>
      <router-view/>
    </v-content>
    <v-footer fixed app>
      <span>&copy; 2018</span>
    </v-footer>
  </v-app>
</template>

<script>

export default {
  data () {
    return {
      
    }
  },
  name: 'App'
}
</script>
