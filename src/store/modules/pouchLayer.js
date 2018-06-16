import crud from '@/api/pouchDB'

const state = {
    testRemoteDispatch: false,
};

const getters = {
    testRemoteDispatch(state) {
        return state.testRemoteDispatch;
    },
};

const mutations = {
    testRemoteDispatch(state, payload) {
        // mutate state
        console.log("testRemoteDispatch was: ", state.testRemoteDispatch);
        state.testRemoteDispatch = payload;
        console.log("testRemoteDispatch is now: ", state.testRemoteDispatch);
    },
};

const actions = {
  // Dialogue actions
  testRemoteDispatch: ({ commit }, payload) => {
    commit("testRemoteDispatch", payload);
    
  },
  captureNewSupplier: ({ dispatch }, payload) => {
    payload._id = "supplier_" + payload.name
    crud.create(payload)
    crud.info()
    dispatch('fetchAllSuppliers')
  },
  updateExistingSupplier: ({ commit }, payload) => {
      crud.update(payload)
  },
  fetchAllSuppliers: ({ commit }) => {
      console.log(crud.getAllType('supplier_'))
  }
};

export default {
    state,
    mutations,
    actions,
    getters
}