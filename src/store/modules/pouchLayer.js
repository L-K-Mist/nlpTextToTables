import crud from '@/api/pouchDB'

const state = {
  testRemoteDispatch: false,
  suppliers: []
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
      console.log(result)
      commit("suppliers", result)
    })

  }
};

export default {
  state,
  mutations,
  actions,
  getters
}
