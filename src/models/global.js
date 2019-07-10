import intl from 'react-intl-universal';
import cn from '../locale/cn'
import en from '../locale/en'
const locales = {
    en: en,
    cn: cn
  };

export default {
    namespace: 'global',
    state:{
        lang:localStorage.getItem("lang")?localStorage.getItem("lang"):'cn'
    },
    effects: {
        * changeLang({ lang,cb }, { call, put }) {      
            yield put({ type: 'changeLangSuccess', lang,cb })
            localStorage.setItem("lang",lang)
            yield  intl.init({
                currentLocale: lang,
                locales,
              })
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