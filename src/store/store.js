import Vue from 'vue'
import Vuex from 'vuex'
import activityLog from './modules/nlpLog'
import pouchLayer from './modules/pouchLayer'

/**Because of the code below I could actually programattically initialize the nlp plugin
 * 

 //my object
 var sendData = {
   field1: value1,
   field2: value2
 };

 //add element
 sendData['field3'] = value3;
 */


Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    activityLog,
    pouchLayer
  }
})