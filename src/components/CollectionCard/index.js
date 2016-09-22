import React from 'react'

import UIText from '../Text'

import styles from './styles.less'

// <div className={styles.uiCollectionCard}>{children}</div>
const UICollectionCard = ({ body, children, onClick, title, type }) => (
   <div className={styles.uiCollectionCard} onClick={onClick}>
      <div className={styles.info}>
         <UIText size="1" weight="medium" color="gray60" className="uppercase">
            {type}
         </UIText>
         <UIText size="3" weight="medium" color="gray90">
            {title}
         </UIText>
         <UIText>
            {body}
         </UIText>
      </div>
   </div>
)

UICollectionCard.propTypes = {
   body: React.PropTypes.string,
   children: React.PropTypes.node,
   onClick: React.PropTypes.func,
   title: React.PropTypes.string,
   type: React.PropTypes.string
}

export default UICollectionCard
