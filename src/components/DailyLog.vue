<template>
<main>
  <v-container fluid fill-width> 
    <v-layout flex align-center justify-center>
      
      <v-flex xs10 >
        <p>
          This is a little app I'm working on to take my daily activity logs captured on pen and paper; and turn them into useable data. 
        </p>
        <p>
          What makes this possible is a great super-lean Natural Language Programming (NLP) library called <a href="https://nlp-compromise.github.io/#docs" target="blank">Compromise</a>. Also thanks to the great newbie support received on their slack channel - in particular a night-lark SuperUser of the library, who goes by Aurielle.
        </p>
        <p>
          Next I must find out how to plug in one of those microphone speech-to-text buttons, so that the user can simply dictate into the box by voice.
        </p>
        <p>
          So then it's voice-to-text and text-to-spreadsheet. Woot! <emoji  emoji="fist" :size="15"></emoji><emoji  emoji="nerd_face" :size="20"></emoji>
        </p>
      </v-flex>
    </v-layout>
    <v-lay row>
      <log-input></log-input>
            <template v-if="gotFin">
              <v-flex>
                <p class="blue">
                  First we pull out those sentences that mention money (eg. R90)
                </p>
              </v-flex>          
              <log-output></log-output>
            </template> 
      </v-layout>
  </v-container>

</main>
</template>
<script>
import LogInput from "@/components/DailyLog/LogInput"
import LogOutput from "@/components/DailyLog/LogOutput";

export default {

  computed: {
    gotFin() {
      return this.$store.getters.gotFin;
    },
  },

  components: {
    LogOutput,
    LogInput,
  }
};
</script>