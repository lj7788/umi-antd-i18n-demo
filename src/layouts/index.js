import react from 'react'
import styles from './index.css';
import { connect } from 'dva';
import cn from '../locale/cn'
import en from '../locale/en'

import intl from 'react-intl-universal';
import { Button,LocaleProvider } from 'antd'


@connect(({ global }) => ({
  lang: global.lang
}))
class BasicLayout extends react.PureComponent {
  state = { initDone: false }
  componentDidMount() {
    const {dispatch,lang} =this.props
    dispatch({
      type:"global/changeLang",lang
    })
  }

  i18n = (key) => {
    return intl.getHTML( key )
  }
  
  doChangeLang = () => {
    let props = this.props
    let lang = props.lang === 'cn' ? 'en' : 'cn'
    const {dispatch} =this.props
    dispatch({
      type:"global/changeLang",lang
    })
  }
  render() {
    let props = this.props
    let lang = props.lang !== 'cn' ? '中文' : 'English'
    let i18n=this.i18n
    return (
      <LocaleProvider locale={props.lang !== 'cn'?en:cn}>
      <div className={styles.normal}>
        <Button className={styles.lang} onClick={this.doChangeLang}>{lang}</Button>
        <h1 className={styles.title}>{i18n('welcome')}</h1>
        {props.children}
      </div>
      </LocaleProvider>
    );
  }
}

export default BasicLayout;

