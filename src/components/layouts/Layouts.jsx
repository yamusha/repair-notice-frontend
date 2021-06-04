import Head from "next/head";
import { useRouter } from "next/router";
// import Header from '../shared/Header'
// import Footer from '../shared/Footer'
import Showcase from "../shared/Showcase";
import styles from "styles/Layout.module.css";
// import Header from 'components/layout/part/Header'

import { Layout } from "@panely/components";
import Scrolltop from "components/layout/part/Scrolltop";
import Footer from "components/layout/part/Footer";
import Header from "components/layout/part/Header";
import Aside from "components/layout/part/Aside";
import PAGE from "config/page.config";

const Layouts = ({ title, keywords, description, children, headprop, breadcrumpprop }) => {
  const router = useRouter();

  const { enableAside, enableHeader, enableFooter, enableScrolltop } =
    PAGE.layout;
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
      </Head>
      <Layout type="holder">
        {enableAside ? <Aside /> : null}
        <Layout type="wrapper">
          {enableHeader ? <Header headprop={headprop} breadcrumpprop={breadcrumpprop} /> : null}
          <Layout type="content">{children}</Layout>
          {enableFooter ? <Footer /> : null}
        </Layout>
        {enableScrolltop ? <Scrolltop /> : null}
      </Layout>
    </>
  );
};

Layouts.defaultProps = {
  title: "DJ Events | find the hottest parties",
  description: "Find the lastest DJ",
  keywords: "music, EDM",
};

export default Layouts;
