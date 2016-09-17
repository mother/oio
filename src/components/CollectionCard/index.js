import React from 'react'

import styles from './styles.less'

const UICollectionCard = ({ body, children, title, type }) => (
   <div className={styles.uiCollectionCard}>{children}</div>
)

UICollectionCard.propTypes = {
   body: React.PropTypes.string,
   children: React.PropTypes.node,
   title: React.PropTypes.string,
   type: React.PropTypes.string
}

export default UICollectionCard
