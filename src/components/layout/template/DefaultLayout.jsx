import React from 'react'
import { Layout } from "@panely/components"
import SidemenuSetting from "components/layout/part/SidemenuSetting"
import SidemenuAgenda from "components/layout/part/SidemenuAgenda"
import Scrolltop from "components/layout/part/Scrolltop"
import Footer from "components/layout/part/Footer"
import Header from "components/layout/part/Header"
import Aside from "components/layout/part/Aside"
import PAGE from "config/page.config"

/*
 * Default Layout
 * by default all pages loaded this layout component
 * you can customize the layout by setting the object in page.config.jsx
 * be carefull, if you want to customize this component
 */

class DefaultLayout extends React.Component {
  render() {
    const {
      enableAside,
      enableHeader,
      enableFooter,
      enableScrolltop,
    } = PAGE.layout
    const { children, pageProps } = this.props
    // console.log(pageProps);
    return (
      <Layout type="holder">
        {enableAside ? <Aside /> : null}
        <Layout type="wrapper">
          {enableHeader ? <Header pageChangeHeaderTitle={pageProps.pageChangeHeaderTitle} breadcrumbChange={pageProps.breadcrumbChange} /> : null}
          <Layout type="content">
            {children}
          </Layout>
          {enableFooter ? <Footer /> : null}
        </Layout>
        {enableScrolltop ? <Scrolltop /> : null}
        {enableHeader ? <SidemenuSetting /> : null}
        {enableHeader ? <SidemenuAgenda /> : null}
      </Layout>
    )
  }
}

export default DefaultLayout
