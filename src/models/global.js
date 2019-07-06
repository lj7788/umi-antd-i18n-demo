export default {
    namespace: 'global',
    state:{
        lang:localStorage.getItem("lang")?localStorage.getItem("lang"):'cn'
    },
    effects: {
        * changeLang({ lang,cb }, { call, put }) {      
            yield put({ type: 'changeLangSuccess', lang,cb })
        },
    },
    reducers: {
        changeLangSuccess(state, { lang,cb }) {
            if(cb){
                cb();
            }
            return {
                ...state,
                lang:lang
            }
        }
    }
}