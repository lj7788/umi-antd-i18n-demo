import styles from './index.css';
import MyPage from './MyPage'

class Index extends MyPage {
  constructor(props){
    super(props)
  }

  render() {
    let i18n=this.i18n
    return (
      <div className={styles.normal}>
        <div className={styles.welcome} />
        <ul className={styles.list}>
          <li>{i18n('index.tip1')}</li>
          <li>
            <a href="https://umijs.org/guide/getting-started.html">
            {i18n('index.tip2')}           
          </a>         
          </li>
          <li>
            {i18n('index.tip3')}<a href="/books">{i18n('booklist.title')}</a>
          </li>
        </ul>
      </div>
    );
  }
}
export default Index;
