import db from '@/api/pouchDB'
import nlp from 'compromise'


nlp.plugin({
    patterns: {
        '/R[0-9]+/': 'Money',
        '(of|worth of|worth)': 'FinItemPhrase',
        'from #Noun': 'MaybeSupplier',
        'from #Noun': 'MaybePaidMe'
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
    openActivityLog: false,
    rawLog: null,
    finItems: [{
        value: false,
        sentence: "unknown",
        number: 0,
        provider: "unknown",
        item: "unknown"
    }],
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
    openActivityLog: state => {
        return state.openActivityLog;
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
    openActivityLog: (state, payload) => {
        state.openActivityLog = payload;
    },
    rawLog(state, payload) {
        // mutate state
        state.rawLog = payload
    },
    finSentences(state, payload) {
        // mutate state
        state.finSentences = payload
        //console.log('mutated finSentences to ', state.financialData.sentences)
    },
    gotFin(state, payload) {
        // mutate state
        console.log('gotFin was: ', state.gotFin)
        state.gotFin = payload
        console.log('gotFin is now: ', state.gotFin)
    },
    finItems(state, payload) {
        state.finItems = payload
    },
};

const actions = {
    // Dialogue actions
    openActivityLog: ({
        commit
    }, payload) => {
        commit('openActivityLog', payload);
    },
    newRawLog({
        commit,
        dispatch
    }, payload) {
        commit('rawLog', payload)
        dispatch('finSentences', payload)
    },
    finSentences({
        commit,
        dispatch
    }, payload) {
        var financialSentences = nlp(payload).sentences().if('#Money')
        commit('finSentences', financialSentences.data())
        console.log(financialSentences.out('text'))
        dispatch('finData', financialSentences)
    },

    finData({
        commit,
        dispatch
    }, payload) {
        // commit('finSentences', )
        var val;
        var items = [];
        for (val of payload.out('array')) {
            let item = {};
            item.sentence = val;
            console.log(item.sentence); // to show the step of pulling out financial sentences
            let numberText = nlp(val).match('#Money').out('text').replace('r', '')
            item.number = parseInt(numberText, 10)
            item.provider = nlp(val).match('#Supplier').toTitleCase().out()
            item.value = false // something Vuetify Tabular Data needs
            item.item = nlp(val).delete('#Supplier').delete('#Money').delete('#FinItemPhrase').delete('#Preposition').match('#Noun').toTitleCase().out()
            items.push(item)
        }
        commit('finItems', items)
        console.log(items)
        commit('gotFin', true)
    }
};

export default {
    state,
    mutations,
    actions,
    getters
}