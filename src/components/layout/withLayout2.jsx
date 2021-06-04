import React from 'react'
function withLayout2(Page, layout = "default") {
  class LayoutWrapper extends React.Component {
    
    
    render() {
      // console.log(this.props)
      return <Page {...this.props} />
    }
  }

  return LayoutWrapper
}

export default withLayout2
