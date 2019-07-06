import react from 'react'
import styles from './index.css';
import { connect } from 'dva';
import cn from '../locale/cn'
import en from '../locale/en'

import intl from 'react-intl-universal';
import { Button,LocaleProvider } from 'antd'


const locales = {
  en: en,
  cn: cn
};


@connect(({ global }) => ({
  lang: global.lang
}))
class BasicLayout extends react.PureComponent {
  state = { initDone: false }
  componentDidMount() {
    this.loadLocales();
  }

  i18n = (key) => {
    return intl.getHTML( key )
  }

  loadLocales = () => {
    let props = this.props
    intl.init({
      currentLocale: props.lang,
      locales,
    })
      .then(() => {
        this.setState({ initDone: true });
      });

  }
  doChangeLang = () => {
    let props = this.props
    let lang = props.lang === 'cn' ? 'en' : 'cn'
    localStorage.setItem("lang", lang)
    window.location.reload();
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

