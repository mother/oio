import React, { Component } from 'react'
import {
   Grid,
   GridCell,
   GridRow,
   Spacer,
   Text,
   Title,
   TitleBar,
   View
} from '../../src'
import style from '../style.less'

export default class DemoContentText extends Component {
   static propTypes = {
      contents: React.PropTypes.array
   }

   constructor(props) {
      super(props)

      this.state = {
         value: 'Flexitarian biodiesel kale chips, hoodie lumbersexual food truck keffiyeh umami single-origin coffee franzen. Celiac viral put a bird on it, farm-to-table heirloom everyday carry before they sold out locavore listicle stumptown. Cold-pressed single-origin coffee seitan, next level biodiesel vinyl synth chia pop-up sartorial ugh post-ironic. Hella bitters cardigan affogato selfies thundercats gentrify, man braid schlitz normcore banjo umami messenger bag sartorial. Humblebrag freegan offal, mumblecore tote bag mustache venmo meditation lumbersexual. Put a bird on it intelligentsia lomo gluten-free bitters marfa. Meh literally try-hard ugh everyday carry.',
         editing: false,
         editorState: 'ready'
      }
   }

   handleEditCancel = (value) => {
      this.setState({ editing: false })
   }

   handleEditDone = (value) => {
      this.setState({ editing: true, editorState: 'pending' })
      setTimeout(() => {
         this.setState({
            value,
            editing: false,
            editorState: 'ready'
         })
      }, 2000)
   }

   render() {
      return (
         <View width="100%" className={style.docs}>
            <TitleBar title="Text" flush />
            <Spacer size="9" />
            <Grid columns="1[a] 2[b] 4[c-e]" gutter="60px">
               <GridCell>
                  <Title>Text Sizes</Title>
                  <Text size="2" color="gray50">
                     <p>The size prop can be used for both the <code>Text</code> and <code>Title</code> component. The default size for the <code>Text</code> component is 3.</p>
                     <p>As a general guideline, when using multiple text sizes, it is best to use sizes at least 2 units apart (ie. 4,6,8)</p>
                  </Text>
               </GridCell>
               <GridCell colspan="3">
                  <Text size="10">Size 10 Text</Text>
                  <Text size="9">Size 9 Text</Text>
                  <Text size="8">Size 8 Text</Text>
                  <Text size="7">Size 7 Text</Text>
                  <Text size="6">Size 6 Text</Text>
                  <Text size="5">Size 5 Text</Text>
                  <Text size="4">Size 4 Text</Text>
                  <Text size="3">Size 3 Text</Text>
                  <Text size="2">Size 2 Text</Text>
                  <Text size="1">Size 1 Text</Text>
               </GridCell>
               <GridCell>
                  <Title>Paragraphs</Title>
                  <Text size="2" color="gray50">
                     <p>Wrap paragraphs of text in the <code>p</code> tag. Paragraphs by default have a margin-bottom of 1em</p>
                  </Text>
               </GridCell>
               <GridCell colspan="3">
                  <p>
                     Offal tilde blog venmo sartorial, crucifix leggings
                     pork belly bitters. Banh mi iPhone cardigan tote bag.
                     Man bun narwhal pickled shoreditch kogi bespoke.
                     Vegan photo booth ethical, trust fund asymmetrical
                     neutra DIY banjo craft beer chia humblebrag church-key
                     hammock. Retro actually cold-pressed next level tofu vegan.
                     Shabby chic kogi mumblecore williamsburg. Mlkshk kale
                     chips venmo, synth pabst vegan lomo waistcoat whatever.
                  </p>

                  <p>
                     Narwhal selvage mixtape humblebrag messenger bag.
                     Meditation hella thundercats kitsch intelligentsia yr.
                     Umami ennui pug mlkshk you probably havent heard of
                     them, butcher gochujang four dollar toast kickstarter
                     single-origin coffee pabst brooklyn meditation waistcoat
                     kinfolk. Hashtag four dollar toast street art wolf
                     lumbersexual, cornhole bespoke farm-to-table 3 wolf
                     moon scenester slow-carb pop-up pitchfork.
                     Taxidermy pabst offal affogato, biodiesel echo park narwhal.
                     Master cleanse food truck artisan hammock, quinoa ugh
                     keffiyeh truffaut chia. Messenger bag knausgaard
                     lomo yuccie roof party.
                  </p>

                  <p>
                     Flexitarian biodiesel kale chips, hoodie lumbersexual
                     food truck keffiyeh umami single-origin coffee franzen.
                     Celiac viral put a bird on it, farm-to-table
                     heirloom everyday carry before they sold out locavore
                     listicle stumptown. Cold-pressed single-origin coffee seitan,
                     next level biodiesel vinyl synth chia pop-up sartorial ugh
                     post-ironic. Hella bitters cardigan affogato selfies
                     thundercats gentrify, man braid schlitz normcore banjo
                     umami messenger bag sartorial. Humblebrag freegan offal,
                     mumblecore tote bag mustache venmo meditation lumbersexual.
                     Put a bird on it intelligentsia lomo gluten-free bitters marfa.
                     Meh literally try-hard ugh everyday carry.
                  </p>
               </GridCell>
               <GridRow>
                  <GridCell>
                     <Title>Text (editable)</Title>
                     <Text size="2" color="gray50">
                        <p>With the <code>editable</code> prop,<code>Text</code>
                        can be modified in place.</p>
                     </Text>
                  </GridCell>
                  <GridCell colspan="3">
                     <Text
                        editing={this.state.editing}
                        editable
                        editorShowEditButton
                        editorState={this.state.editorState}
                        editorOnCancel={this.handleEditCancel}
                        editorOnDone={this.handleEditDone}
                        editorValue={this.state.value}
                     />
                  </GridCell>
               </GridRow>
               <GridRow>
                  <GridCell>
                     <Title>Text Configurations</Title>
                     <Text size="2" color="gray50">
                        Props for using the <code>Modal</code> component
                     </Text>
                  </GridCell>
                  <GridCell colspan="3">
                     <table className={style.table}>
                        <thead>
                           <tr>
                              <th width="150px">Prop</th>
                              <th width="90px">Prop Type</th>
                              <th width="120px">Default Value</th>
                              <th>Description/Options</th>
                           </tr>
                        </thead>
                        <tbody>
                           <tr>
                              <td><b>children</b></td>
                              <td>Node</td>
                              <td>-</td>
                              <td>Children if <code>editable === false</code></td>
                           </tr>
                           <tr>
                              <td><b>color</b></td>
                              <td>String</td>
                              <td>-</td>
                              <td>
                                 <p>CSS color (e.g. #CCC)</p>
                                 <p>Will be able to pass hex, rgba, or preset classes</p>
                              </td>
                           </tr>
                           <tr>
                              <td><b>size</b></td>
                              <td>String</td>
                              <td>-</td>
                              <td>Set content size <code>1 - 10</code></td>
                           </tr>
                           <tr>
                              <td><b>uppercase</b></td>
                              <td>Boolean</td>
                              <td>-</td>
                              <td>Make content uppercase</td>
                           </tr>
                           <tr>
                              <td><b>weight</b></td>
                              <td>String</td>
                              <td><code>normal</code></td>
                              <td>
                                 Set content font-weight
                                 <code>light</code>
                                 <code>normal</code>
                                 <code>semibold</code>
                                 <code>bold</code>
                              </td>
                           </tr>
                           <tr>
                              <td><b>editable</b></td>
                              <td>Boolean</td>
                              <td><code>false</code></td>
                              <td>Makes Text component editable</td>
                           </tr>
                           <tr>
                              <td><b>editing</b></td>
                              <td>Boolean</td>
                              <td><code>false</code></td>
                              <td>Whether editor is actively in the editing mode</td>
                           </tr>
                           <tr>
                              <td><b>editorCancelButtonText</b></td>
                              <td>String</td>
                              <td><code>Cancel</code></td>
                              <td>Text for cancel button</td>
                           </tr>
                           <tr>
                              <td><b>editorDoneButtonText</b></td>
                              <td>String</td>
                              <td><code>Done</code></td>
                              <td>Text for done button</td>
                           </tr>
                           <tr>
                              <td><b>editorOnCancel</b></td>
                              <td>Function</td>
                              <td>-</td>
                              <td>Returns <code>body</code> text to use.</td>
                           </tr>
                           <tr>
                              <td><b>editorOnDone</b></td>
                              <td>Function</td>
                              <td>-</td>
                              <td>Returns <code>body</code> text to use.</td>
                           </tr>
                           <tr>
                              <td><b>editorShowEditButton</b></td>
                              <td>Boolean</td>
                              <td><code>false</code></td>
                              <td>Show edit button at top right of text.</td>
                           </tr>
                           <tr>
                              <td><b>editorState</b></td>
                              <td>String</td>
                              <td><code>ready</code></td>
                              <td>Should the editor indicate something is happening (<code>pending</code>) or is it ready to be used (<code>ready</code>)</td>
                           </tr>
                           <tr>
                              <td><b>editorValue</b></td>
                              <td>String</td>
                              <td>-</td>
                              <td>Initial and editable body content (replaces children)</td>
                           </tr>
                        </tbody>
                     </table>
                  </GridCell>
               </GridRow>
            </Grid>
         </View>
      )
   }
}
