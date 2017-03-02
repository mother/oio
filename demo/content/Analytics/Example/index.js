import React, { Component } from 'react'
import classNames from 'classnames'
import {
   AnalyticsBlock,
   Grid,
   GridCell,
   Modal,
   View
} from '../../../../src'
import style from '../../../../src/components/Analytics/Block/style.less'

export default class DemoContentModal extends Component {
   static propTypes = {
      contents: React.PropTypes.array
   }

   render() {
      return (
         <Modal width="1600px" height="900px" closeURL="/analytics" windowClassName="bgNone">
            <View format="auto" padding="30px 0px">
               <Grid gutter="3px" columns="6">
                  <GridCell>
                     <AnalyticsBlock label="Bags Produced" value="0" targetValue="85" />
                  </GridCell>
                  <GridCell>
                     <AnalyticsBlock label="Bags Sold" value="0" targetValue="85" />
                  </GridCell>
                  <GridCell>
                     <AnalyticsBlock label="Bags Delivered" value="0" targetValue="85" />
                  </GridCell>
                  <GridCell>
                     <AnalyticsBlock label="Sales" value="$0" targetValue="$10,000" />
                  </GridCell>
                  <GridCell colspan="2" style={{ float: 'right' }}>
                     <AnalyticsBlock label="Current Projects" tall>
                        <table>
                           <thead>
                              <tr>
                                 <th colspan="3">Stockist Kit</th>
                              </tr>
                           </thead>
                           <tbody>
                              <tr>
                                 <td>Messenger Card</td>
                                 <td>-</td>
                                 <td>
                                    <span className={classNames(style.analyticsBadge, style.green)}>
                                       Completed
                                    </span>
                                 </td>
                              </tr>
                              <tr>
                                 <td>1st Approach Script</td>
                                 <td>-</td>
                                 <td>
                                    <span className={classNames(style.analyticsBadge, style.blue)}>
                                       In Progress
                                    </span>
                                 </td>
                              </tr>
                           </tbody>
                        </table>
                        <table>
                           <thead>
                              <tr>
                                 <th colspan="3">Customer Kit</th>
                              </tr>
                           </thead>
                           <tbody>
                              <tr>
                                 <td>Messenger Card</td>
                                 <td>-</td>
                                 <td>
                                    <span className={classNames(style.analyticsBadge, style.red)}>
                                       Stalled
                                    </span>
                                 </td>
                              </tr>
                              <tr>
                                 <td>1st Approach Script</td>
                                 <td>-</td>
                                 <td>
                                    <span className={classNames(style.analyticsBadge)}>
                                       Not Started
                                    </span>
                                 </td>
                              </tr>
                              <tr>
                                 <td>1st Approach Script</td>
                                 <td>-</td>
                                 <td>
                                    <span className={classNames(style.analyticsBadge)}>
                                       Not Started
                                    </span>
                                 </td>
                              </tr>
                           </tbody>
                        </table>
                     </AnalyticsBlock>
                  </GridCell>
                  <GridCell colspan="2" style={{ float: 'left' }}>
                     <AnalyticsBlock label="Current Orders" tall />
                  </GridCell>
                  <GridCell colspan="2" style={{ float: 'left' }}>
                     <AnalyticsBlock label="Current Outreach" tall>
                        <table>
                           <tbody>
                              <tr>
                                 <td>Avenue Magazine</td>
                                 <td>-</td>
                                 <td>
                                    <span className={classNames(style.analyticsBadge, style.blue)}>
                                       In Contact
                                    </span>
                                 </td>
                              </tr>
                              <tr>
                                 <td>Store Name</td>
                                 <td>-</td>
                                 <td>
                                    <span className={classNames(style.analyticsBadge)}>
                                       Not Started
                                    </span>
                                 </td>
                              </tr>
                              <tr>
                                 <td>Store Name</td>
                                 <td>-</td>
                                 <td>
                                    <span className={classNames(style.analyticsBadge)}>
                                       Not Started
                                    </span>
                                 </td>
                              </tr>
                           </tbody>
                        </table>
                     </AnalyticsBlock>
                  </GridCell>
               </Grid>
            </View>
         </Modal>
      )
   }
}
