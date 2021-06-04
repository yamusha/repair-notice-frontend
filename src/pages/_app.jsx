// All components stylesheets
import "styles/core/reboot.scss";
import "styles/components/index.scss";
import "styles/quill/core.scss";
import "styles/quill/snow.scss";
import "styles/quill/bubble.scss";
import "styles/apexcharts/index.scss";
import "styles/simplebar/index.scss";
import "styles/sortablejs/sortablejs.scss";
import "styles/sweetalert2/index.scss";
import "styles/slick-carousel/index.scss";
// import "styles/globals.css"
import "styles/font.css";

import { bindActionCreators } from "redux";
import { pageChangeTheme } from "store/actions";
import { wrapper } from "store";
import { connect } from "react-redux";
import DefaultLayout from "components/layout/template/DefaultLayout";
import BlankLayout from "components/layout/template/BlankLayout";
import ProgressBar from "@panely/progressbar";
import Router from "next/router";
import App from "next/app";
import UserStoreProvider from "context/UserContext";

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    let Layout;

    switch (pageProps.layout) {
      case "default":
        Layout = DefaultLayout;
        break;
      case "blank":
        Layout = BlankLayout;
        break;
      default:
        Layout = DefaultLayout;
    }
    // console.log(this.props);
    return (
      <UserStoreProvider>
        <Layout {...this.props}>
          <ProgressBar />
          <Component {...pageProps} />
        </Layout>
      </UserStoreProvider>
    );
  }
}

export default wrapper.withRedux(MyApp);
