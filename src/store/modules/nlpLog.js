import nlp from 'compromise'

nlp.plugin({
  patterns: {
    '/R[0-9]+/': 'Money',
    '(of|worth of|worth)': 'FinItemPhrase',
    'from #Noun': 'MaybeSupplier',
  },
  words: {}
  // db.get(id)



  // words: {
  //   'Blessing': 'Supplier',
  //   'usual guys': 'Supplier',
  //   'checkers': 'Supplier',
  //   'china mall': 'Supplier',
  //   'Mike': 'Supplier'
  // }
});







const state = {
  supplierTags: {},
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
  suppliersEvaluated: {},
  gotFin: false,
};

const getters = {
  supplierTags: state => {
    return state.supplierTags;
  },
  suppliersEvaluated: state => {
    return state.suppliersEvaluated;
  },
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

  supplierTags: (state, payload) => {
    state.supplierTags = payload
    console.log("supplierTags", state.supplierTags)
  },
  suppliersEvaluated: (state, payload) => {
    state.suppliersEvaluated = payload
    console.log("suppliersEvaluated", state.suppliersEvaluated)
  },
  missingSupplier: (state, payload) => {
    if (state.missingSupplier[0] == null) {
      state.missingSupplier = [payload]
    } else {
      state.missingSupplier.push(payload)
    }
    console.log('missingSupplier Array', state.missingSupplier)
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


// I need to call fetchAllSuppliers from fetchTags
const actions = {
  fetchTags: async ({
    commit,
    dispatch
  }) => {
    let getTags = await dispatch('')
  },


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
    state,
    commit,
    dispatch
  }, payload) {
    var financialSentences = nlp(payload, state.supplierTags) // state.supplierTags adds nlp #Supplier tags to known suppliers from the supplier Type in the db.
      .sentences()
      .if("#Money");
    commit("finSentences", financialSentences.data());
    console.log(financialSentences.out("text"));
    dispatch("finSentenceEvaluate", financialSentences);
  },
  finSentenceEvaluate({
    commit,
    dispatch
  }, payload) {
    // commit('finSentences', )
    var val;
    var array = payload.out(array)
    var data = payload.data()
    var suppliers = {
      verified: [],
      unverified: []
    }
    for (val of data) {
      var item = {};
      item.sentence = val.text;
      // console.log(item.sentence)

      if (!nlp(item.sentence).has("#Supplier")) {
        suppliers.unverified.push(item.sentence)
        // console.log("missing supplier: ", suppliers.verified)

      } else {
        suppliers.verified.push(item.sentence)

      }

    }
    commit("suppliersEvaluated", suppliers)

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
  populateFinSentences({
    commit,
    dispatch
  }, payload) {
    console.log(payload)
  },
  triggerTest({
    commit,
    dispatch
  }, payload) {
    dispatch("testRemoteDispatch", true)
  }
};
export default {
  state,
  mutations,
  actions,
  getters
}
