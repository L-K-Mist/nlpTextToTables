import db from '@/api/pouchDB'
import nlp from 'compromise'


nlp.plugin({
  patterns: {
    '/R[0-9]+/': 'Money',
    '(of|worth of|worth)': 'FinItemPhrase',
    'from #Noun': 'MaybeSupplier',
  },
  words: {
    'blessing': 'Supplier',
    'usual guys': 'Supplier',
    'bluff checkers': 'Supplier',
    'china mall': 'Supplier',
    'mike': 'Supplier'
  }
});

const state = {
  missingSupplier: [null],
  potentialSupplier: null,
  rawLog: null,
  finItems: [],
  finSentences: [{
    "text": "Got shoes for R70 from Mike. ",
    "normal": "got shoes for r70 from mike"
  }, {
    "text": "Bought R70 worth Cement, Lime, and Soda from usual guys. ",
    "normal": "bought r70 worth cement lime and soda from usual guys"
  }, {
    "text": " Got R90.00 worth of Peas from Bluff Checkers",
    "normal": "got r90.00 worth of peas from bluff checkers"
  }],
  gotFin: false,
};

const getters = {
  missingSupplier: state => {
    return state.missingSupplier;
  },
  potentialSupplier: state => {
    return state.potentialSupplier;
  },
  rawLog(state) {
    return state.rawLog;
  },
  finSentences(state) {
    return state.finSentences;
  },
  gotFin(state) {
    return state.gotFin;
  },
  finItems(state) {
    return state.finItems;
  }
};

const mutations = {
  missingSupplier: (state, payload) => {
    if (state.missingSupplier[0] == null) {
      state.missingSupplier = [payload]
    } else {
      state.missingSupplier.push(payload)
    }
  },
  potentialSupplier: (state, payload) => {
    state.potentialSupplier = payload;
  },
  addFinData(state, arrObj) {
    // 1st solution:
    // it will work as expected and trigger getUsersNames()
    state.finItems.push(arrObj)
    console.log('mutation added to finItems: ', state.finItems)
  },
  rawLog(state, payload) {
    // mutate state
    state.rawLog = payload;
  },
  finSentences(state, payload) {
    // mutate state
    state.finSentences = payload;
    //console.log('mutated finSentences to ', state.financialData.sentences)
  },
  gotFin(state, payload) {
    // mutate state
    console.log("gotFin was: ", state.gotFin);
    state.gotFin = payload;
    console.log("gotFin is now: ", state.gotFin);
  },
  //   finItems(state, payload) {
  //     state.finItems = payload;
  //   }
};

const actions = {
  // Dialogue actions
  openActivityLog: ({
    commit
  }, payload) => {
    commit("openActivityLog", payload);
  },
  newRawLog({
    commit,
    dispatch
  }, payload) {
    commit("rawLog", payload);
    dispatch("finSentences", payload);
  },
  finSentences({
    commit,
    dispatch
  }, payload) {
    var financialSentences = nlp(payload)
      .sentences()
      .if("#Money");
    commit("finSentences", financialSentences.data());
    console.log(financialSentences.out("text"));
    dispatch("finSentenceEvaluate", financialSentences.out('array'));
  },
  finSentenceEvaluate({
    commit,
    dispatch
  }, payload) {
    // commit('finSentences', )
    var val;
    for (val of payload) {
      var item = {};

      if (!nlp(val).has("#Supplier")) {
        commit("missingSupplier", val);
      } else {
        item.sentence = val;
        let numberText = nlp(val)
          .match("#Money")
          .out("text")
          .replace("r", "");
        item.number = parseInt(numberText, 10);
        item.provider = nlp(val)
          .match("#Supplier")
          .toTitleCase()
          .out();
        item.value = false; // something Vuetify Tabular Data needs
        item.item = nlp(val)
          .delete("#Supplier")
          .delete("#Money")
          .delete("#FinItemPhrase")
          .delete("#Preposition")
          .match("#Noun")
          .toTitleCase()
          .out();
        commit('addFinData', item); //TODO rather use state.finItems.push(item) <-- because I want to push to it from different actions
      }

    }


    // commit("finItems", items);
    // // console.log(items);
    commit("gotFin", true);
  },
  missingSupplier({
    commit,
    dispatch
  }, payload) {
    console.log(payload); // to show the step of pulling out financial sentences
    let potentialSupplier = nlp(payload)
      .match("#MaybeSupplier")
      .delete("from")
      .out("text");
    commit('potentialSupplier', potentialSupplier)
    console.log(potentialSupplier);
    commit('missingSupplier', true)
  },
};

export default {
  state,
  mutations,
  actions,
  getters
}
