<template>
<main>
  <v-container fluid fill-width>
    <v-layout column>
      <v-flex xs12>
          <v-container fluid grid-list-md>
            <v-layout row wrap justify-center>
              <v-flex xs12 md8  
              >
                <v-card v-if="!gotFin">
                  <v-card-title class="headline primary--text">Introduction</v-card-title>
                    <v-container fill-height>
                      <v-layout fill-height>
                        <v-flex xs12 align-end flexbox>
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
                    </v-container>
                </v-card>
              </v-flex>
              <v-flex xs12 md8>
                <log-input></log-input>
              </v-flex>
              <v-flex xs12 md8>
                <v-card v-if="gotFin">
                  <v-card-title class="headline primary--text">Data Output</v-card-title>
                    <v-container fill-height>
                      <v-layout fill-height>
                        <v-flex xs12 align-end flexbox>                    
                          <template >
                            <v-flex>
                              <p>
                                First we pull out those sentences that mention money (eg. R90) And attempt to make the distinction between money coming in, and money going out.
                              </p>
                            </v-flex>          
                            <log-output></log-output>
                            <v-flex>
                              <br>
                              <p>
                                Then we turn it into a Data-table.
                              </p>
                            </v-flex>
                            <fin-table></fin-table>
                          </template> 
                        </v-flex>
                      </v-layout>
                    </v-container>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
        </v-flex>
    </v-layout> 
    <missing-supplier></missing-supplier>
  </v-container>

</main>
</template>
<script>
import LogInput from "@/components/DailyLog/LogInput";
import LogOutput from "@/components/DailyLog/LogOutput";
import FinTable from "@/components/DailyLog/FinTable";
import MissingSupplier from "@/components/DailyLog/MissingSupplier";

export default {
  computed: {
    gotFin() {
      return this.$store.getters.gotFin;
    }
  },

  components: {
    LogOutput,
    LogInput,
    FinTable,
    MissingSupplier
  }
};
</script>