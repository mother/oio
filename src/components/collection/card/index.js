import React from 'react'
import { Link } from 'react-router'
import { UIText, UIView } from '../../../../kits/mui'
import styles from './index.less'

export default class UICollectionCard extends React.Component {
   static propTypes = {
      body: React.PropTypes.string,
      title: React.PropTypes.string,
      type: React.PropTypes.string
   }

   render() {
      return (
         <div className={styles.uiCollectionCard}>
            <Link to="/initiative">
               <UIView width="100%" aspectRatio="16:9" className="bgBlack p30" format="float" />
            </Link>
            <Link to="/initiative">
               <div className={styles.info}>
                  <UIText size="1" weight="medium" color="gray60" className="uppercase">
                     {this.props.type}
                  </UIText>
                  <UIText size="3" weight="medium" color="gray90">
                     {this.props.title}
                  </UIText>
                  <UIText>
                     {this.props.body}
                  </UIText>
               </div>
            </Link>
         </div>
      )
   }
}
