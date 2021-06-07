import { parseCookies } from "helpers/index";
import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { baseURLAPI } from "constants/configAxios";
import Link from "next/link";
import Head from "next/head";
import dayjs from "dayjs";
import axios from "axios";
import thai from "dayjs/locale/th";
import relativeTime from "dayjs/plugin/relativeTime";
import buddhistEra from "dayjs/plugin/buddhistEra";
import { UserStoreContext } from "context/UserContext";
import NumberFormat from "react-number-format";
import {
  Row,
  Col,
  Label,
  Badge,
  Button,
  DemoWrapper,
  Table,
  Portlet,
  Container, Tooltip,
  Modal,
  Form,
  Avatar,
  InputGroup,
  CustomInput,
  Widget8,
  Widget10,
} from "@panely/components";

import Swal from "sweetalert2";
import cogoToast from "cogo-toast";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as SolidIcon from "@fortawesome/free-solid-svg-icons";
import withLayout2 from "components/layout/withLayout2";
import { API_URL, API_URL2, PER_PAGE } from "config/index";
import Pagination from "components/Pagination";
import { NEXT_URL } from "config";

dayjs.locale(thai);
dayjs.extend(relativeTime);
dayjs.extend(buddhistEra);

const repairPage = ({ notices, notices1, notices2, notices3, page, total }) => {
  const router = useRouter();
  const [image, setImage] = useState("");
  const userStore = useContext(UserStoreContext);

  const getProfile = () => {
    if (!localStorage.getItem("profile")) {
      userStore.updateProfile(null);
    } else {
      const profileValue = localStorage.getItem("profile");
      if (profileValue) {
        userStore.updateProfile(profileValue);
      }
    }
  };
  useEffect(async () => {
    // console.log(userStore.profile);
    // console.log(localStorage.getItem('phichit2Token'));

    const checkCookie = await fetch(`${NEXT_URL}/api/logged`);
    const chkC = await checkCookie.json();
    // console.log(chkC.data.search('token'));
    if (chkC.data.search("token") > 1) {
      getProfile();
    } else {
      userStore.updateProfile(null);
      localStorage.removeItem("profile");
      localStorage.removeItem("phichit2Token");
    }
    // const total = await totalRes.json();
  }, []);

  // console.log(products, page, total);
  return (
    <>
      <Head>
        <title>จัดการคำขอ | แจ้งซ่อม DLTV, ICT</title>
      </Head>
      <Container fluid>
        <Row>
          <Col>
            {/* BEGIN Portlet */}
            <Portlet>
              <Portlet.Header bordered>
                <Portlet.Title>รายการแจ้งซ่อม ({total})</Portlet.Title>
              </Portlet.Header>
              <Portlet.Body>
                <Row>
                  <Col className="pb-2 text-right">
                    <Link href="/add">
                      <a>
                        <Button variant="text-success" size="lg">
                          {" "}
                          <FontAwesomeIcon icon={SolidIcon.faPlus} />{" "}
                          แจ้งซ่อมใหม่
                        </Button>
                      </a>
                    </Link>
                  </Col>
                </Row>
                <Table hover responsive className="mb-0">
                  <thead>
                    <tr>
                      <th className="text-center">โรงเรียน</th>
                      <th className="text-center">สาเหตุ/อาการ</th>
                      <th className="text-center">ประเภท</th>
                      <th className="text-center">รูปภาพ</th>
                      <th className="text-center">วันที่แจ้ง</th>
                      <th className="text-center">สถานะ</th>
                      <th className="text-center">จัดการ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {notices.map((notice, index) => (
                      <tr
                        key={index}
                        className="border-gray-200 hover:bg-gray-100 text-md"
                      >
                        <td className="px-1 py-1 border-b">
                          <div className="flex items-center font-weight-bold">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {notice.school.schoolname_th}
                            </p>
                          </div>
                        </td>

                        <td className="px-1 py-1 border-b">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {notice.description}
                          </p>
                        </td>

                        <td className="px-1 py-1 text-center border-b">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {notice.repair_type}
                          </p>
                        </td>

                        <td className="px-1 py-1 border-b">
                          {/* BEGIN Form Group */}
                          <Form.Group row>
                              <Col sm="4"></Col>
                              <Col sm="4" className="text-center">
                                <Modal7
                                  imgClick={notice}
                                  img={notice.image ? notice.image.formats.small.url : ''}
                                />
                              </Col>
                              <Col sm="4"></Col>
                            </Form.Group>

                          {/* END Form Group */}
                        </td>

                        <td className="px-1 py-1 text-center border-b ">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {dayjs(notice.created_at).format("D/M/BB")}
                          </p>
                        </td>

                        <td className="px-1 py-1 text-sm text-center border-b">
                          <p className="text-gray-900 whitespace-no-wrap">
                          {notice.status === "notice" ? (
                              <Badge pill variant="secondary">
                                แจ้งซ่อม
                              </Badge>
                            ) : notice.status === "process" ? (
                              <>
                              <Badge id={`tooltip${notice.id}`} pill variant="warning">
                                รอดำเนินการ
                              </Badge>
                              <Tooltip.Uncontrolled target={`tooltip${notice.id}`}>เข้าดำเนินการ {dayjs(notice.book_date).format("D/M/BB")}</Tooltip.Uncontrolled>
                              </>
                            ) : (
                              <>
                              <Badge href={`${notice.image_url}`} target="_blank" id={`tooltip${notice.id}`} pill variant="success">
                                ดำเนินการแล้ว
                              </Badge>
                              <Tooltip.Uncontrolled target={`tooltip${notice.id}`}>ดำเนินการเมื่อ {dayjs(notice.book_date).format("D/M/BB")}</Tooltip.Uncontrolled>
                              </>
                            )}
                          </p>
                        </td>

                        <td className="px-1 py-1 text-sm text-center border-b">
                          <p className="text-gray-900 whitespace-no-wrap">
                            <Link href={`admin/update/${notice.id}`}>
                              <a> 
                                <Button variant="text-danger">
                                <FontAwesomeIcon icon={SolidIcon.faTools} />
                                </Button></a>
                            </Link>
                          </p>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <center>
                  <Pagination page={page} total={total} path="admin" />
                </center>
              </Portlet.Body>
            </Portlet>
          </Col>
        </Row>
        {/* {userStore.profile && console.log(userStore.profile)} */}
      </Container>
    </>
  );
};

export default repairPage;

export async function getServerSideProps({ query: { page = 1 } }) {
  const start = +page === 1 ? 0 : (+page - 1) * PER_PAGE;

  const totalRes = await fetch(`${API_URL2}/repair-notices/count`);
  const total = await totalRes.json();

  const textURL = `${API_URL2}/repair-notices?_sort=id:DESC&_limit=${PER_PAGE}&_start=${start}`;
  // console.log(textURL);

  const noticesRes = await fetch(textURL);
  const notices = await noticesRes.json();

  const textURL1 = `${API_URL2}/repair-notices?status=notice`;
  // console.log(textURL);

  const noticesRes1 = await fetch(textURL1);
  const notices1 = await noticesRes1.json();

  const textURL2 = `${API_URL2}/repair-notices?status=process`;
  // console.log(textURL);

  const noticesRes2 = await fetch(textURL2);
  const notices2 = await noticesRes2.json();

  const textURL3 = `${API_URL2}/repair-notices?status=done`;
  // console.log(textURL);

  const noticesRes3 = await fetch(textURL3);
  const notices3 = await noticesRes3.json();

  const pageChangeHeaderTitle = "จัดการคำขอ";

  const breadcrumbChange = [
    { text: "หน้าหลัก", link: "/" },
    { text: "แจ้งซ่อมใหม่" },
  ];

  return {
    props: {
      notices,
      notices1,
      notices2,
      notices3,
      page: +page,
      total,
      pageChangeHeaderTitle,
      breadcrumbChange,
    },
  };
}

class Modal7 extends React.Component {
  // Default state
  state = { isOpen: false, img1: "", title: "", description: "", name:"", phone: "" };

  // Handle modal toggle event
  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen, img1: this.props.img, title: this.props.imgClick.school.schoolname_th, description: this.props.imgClick.description, name: this.props.imgClick.name, phone: this.props.imgClick.phone});
  };

  render() {
    // console.log(this.props.imgClick)
    return (
      <>
        <Button variant="text-primary" onClick={this.toggle}>
          <FontAwesomeIcon icon={SolidIcon.faComments} />
        </Button>

        {/* BEGIN Modal */}
        <Modal centered isOpen={this.state.isOpen} toggle={this.toggle}>
          <Modal.Header toggle={this.toggle}>รายละเอียด</Modal.Header>
          <Modal.Body>
            <h6>{this.state.title}</h6>
            <p>{this.state.description}</p>
            <p>ผู้ประสานงาน {this.state.name} {this.state.phone}</p>
            {
              this.state.img1 && (
                <>
                <h6>ภาพประกอบ</h6>
            <p className="mb-0 text-center">
              
              <img src={`${API_URL2}${this.state.img1}`} alt="" width={350} />
            </p>
            </>
              )
            }
            
          </Modal.Body>
        </Modal>
        {/* END Modal */}
      </>
    );
  }
}