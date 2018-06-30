import crud from '@/api/pouchDB'




var suppliersJSON = '[{ "name": "Bluffy Hardware Storey", "email": "ug@ers.com", "nickName": "Usual Guysy", "_id": "supplier_Bluff Hardware Store", "_rev": "1-902f6f7a7ae54976a637639c9fcab4ab" }, { "name": "Bluff Hardware Store", "email": "ug@ers.com", "nickName": "Usual Guys", "_id": "supplier_Bluff Hardware Store", "_rev": "1-902f6f7a7ae54976a637639c9fcab4ab" }, { "name": "Checkers Bluff", "email": "check@ers.com", "nickName": "Checkers", "_id": "supplier_Checkers Bluff", "_rev": "1-4f1aab0865a44bc9886f6878af3797c3" }]'



var suppliersArray = JSON.parse(suppliersJSON)

console.log("suppliers Array ", suppliersArray)




const state = {
  testRemoteDispatch: false,
  suppliers: [],
  supplierTags: {}
};

const getters = {
  testRemoteDispatch(state) {
    return state.testRemoteDispatch;
  },
  suppliers(state) {
    return state.suppliers;
  },
};

const mutations = {
  testRemoteDispatch(state, payload) {
    // mutate state
    console.log("testRemoteDispatch was: ", state.testRemoteDispatch);
    state.testRemoteDispatch = payload;
    console.log("testRemoteDispatch is now: ", state.testRemoteDispatch);
  },
  suppliers(state, payload) {
    // mutate state
    state.suppliers = payload;
    console.log('suppliers updated', JSON.stringify(state.suppliers))
  },
};

const actions = {
  // Dialogue actions
  testRemoteDispatch: ({
    commit
  }, payload) => {
    commit("testRemoteDispatch", payload);

  },
  captureNewSupplier: ({
    dispatch
  }, payload) => {
    payload._id = "supplier_" + payload.name
    crud.create(payload)
    crud.info()
    dispatch('fetchAllSuppliers')

    let supplierTags = {
      _id: 'supTags',
      [payload.nickName]: 'Supplier'
    }
    console.log('supplierTags', supplierTags)
  },
  updateExistingSupplier: ({
    commit
  }, payload) => {
    crud.update(payload)
  },
  fetchAllSuppliers: ({
    commit
  }) => {
    crud.getAllType('supplier_').then(result => {
      console.log('fetchAllSuppliers', result)
      commit("suppliers", result)
      var newWords = {}

      //var words = Object.assign(newWord)
      result.forEach(function (element) {
        var strName = String(element.name).toLowerCase()
        var strNick = String(element.nickName).toLowerCase()
        newWords = Object.assign(newWords, {
          [strName]: 'Supplier',
          [strNick]: 'Supplier'
        })
      });
      commit('supplierTags', newWords)
      console.log("new words", newWords)
    })

  }
};

export default {
  state,
  mutations,
  actions,
  getters
}
