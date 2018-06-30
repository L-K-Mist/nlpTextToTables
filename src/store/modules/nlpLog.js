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






var suppliersJSON = '[{ "name": "Bluff Hardware Store", "email": "ug@ers.com", "nickName": "Usual Guys", "_id": "supplier_Bluff Hardware Store", "_rev": "1-902f6f7a7ae54976a637639c9fcab4ab" }, { "name": "Checkers Bluff", "email": "check@ers.com", "nickName": "Checkers", "_id": "supplier_Checkers Bluff", "_rev": "1-4f1aab0865a44bc9886f6878af3797c3" }]'

var suppliersArray = JSON.parse(suppliersJSON)

console.log("suppliers Array ", suppliersArray)

// var suppliersObj
// var simpleSuppliersArray = []
// for (let supplier of suppliersArray) {
//   simpleSuppliersArray.push(supplier.nickName)
// }
// console.log('simpleSuppliersArray', simpleSuppliersArray)

// //var simpleSuppliersArray = ['a', 'b', 'c'];
// var mine
// simpleSuppliersArray.forEach(function (element) {
//   // mine = nlp(element).tag('Supplier');
//   words.[String(element)] = 'Supplier'
//   // console.log('element: ', element, " tags: ", mine.out('tags'));

//   tester

// });


/**
 * const object1 = {
  a: 1,
  b: 2,
  c: 3
};

const object2 = Object.assign({c: 4, d: 5}, object1);

console.log(object2.c, object2.d);
// expected output: 3 5

 */

var newWord = {
  [suppliersArray[0]['nickName']]: 'Supplier'
}
console.log('newWord is:', newWord)

var words = Object.assign(newWord)



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
  suppliersEvaluated: {},
  gotFin: false,
};

const getters = {
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
        // console.log("Verified Supplier: ", suppliers.unverified)


        // let numberText = nlp(val)
        //   .match("#Money")
        //   .out("text")
        //   .replace("r", "");
        // item.number = parseInt(numberText, 10);
        // item.provider = nlp(val)
        //   .match("#Supplier")
        //   .toTitleCase()
        //   .out();
        // item.value = false; // something Vuetify Tabular Data needs
        // item.item = nlp(val)
        //   .delete("#Supplier")
        //   .delete("#Money")
        //   .delete("#FinItemPhrase")
        //   .delete("#Preposition")
        //   .match("#Noun")
        //   .toTitleCase()
        //   .out();
        // commit('addFinData', item); //TODO rather use state.finItems.push(item) <-- because I want to push to it from different actions
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
