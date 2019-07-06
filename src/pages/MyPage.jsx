import react from 'react'
import intl from 'react-intl-universal';

class MyPage extends react.Component {    
    i18n = (key) => {
        return intl.getHTML( key )
      }
}   
export default MyPage