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
  captureNewBusiness: async ({ commit }, payload) => {
    payload._id = "supplier_" + payload.name;
    console.log(JSON.stringify(payload))
    await crud.create(payload);
      crud.info();
  }
};

export default {
    state,
    mutations,
    actions,
    getters
}