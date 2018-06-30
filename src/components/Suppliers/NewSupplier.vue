<template>
  <v-form ref="form" v-model="valid">
    <v-text-field
      v-model="name"
      :rules="nameRules"
      :counter="10"
      label="Name"
      required
    ></v-text-field>
    <v-text-field
      v-model="nickName"
      :rules="nameRules"
      :counter="10"
      label="Nick-Name"
    ></v-text-field>    
    <v-text-field
      v-model="email"
      :rules="emailRules"
      label="E-mail"
      required
    ></v-text-field>
    <v-btn
    :disabled="!valid"
      @click="submit"
    >
      submit
    </v-btn>
  </v-form>
</template>

<script>
export default {
  data: () => ({
    valid: false,
    name: "",
    nameRules: [
      v => !!v || "Name is required",
      v => v.length <= 40 || "Name must be less than 40 characters"
    ],
    nickName: "",
    email: "",
    emailRules: [
      v => !!v || "E-mail is required",
      v =>
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
        "E-mail must be valid"
    ]
  }),
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        // Native form submission is not yet supported
        this.$store.dispatch("captureNewSupplier", {
          name: this.name,
          email: this.email,
          nickName: this.nickName
        });
        //this.$store.dispatch('triggerTest', true)
      }
    }
  }
};
</script>
