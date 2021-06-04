import { parseCookies } from "helpers/index";
import moment from 'moment'
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import {
  Row,
  Col,
  Form,
  Input,
  Label,
  Button,
  Portlet,
  Controller,
  Container,
  FloatLabel,
  Card,
  InputGroup,
  CustomInput,
} from "@panely/components";
import Select from "react-select";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faTimes } from "@fortawesome/free-solid-svg-icons";
import * as SolidIcon from "@fortawesome/free-solid-svg-icons";
import withLayout2 from "components/layout/withLayout2";
import { API_URL2 } from "config/index";
import cogoToast from "cogo-toast";

import { useForm } from "react-hook-form";
import { API_URL, NEXT_URL } from "config";

import Swal from "sweetalert2";

const addNotice = ({ schools, rn, token }) => {
  const { register, handleSubmit, reset, errors } = useForm();
  const router = useRouter();

  const [imagePreview, setImagePreview] = useState(
    rn.image ? rn.image.formats.thumbnail.url : null
  );

  const [imgUrl, setImgUrl] = useState("");
  const [book_date, setBook_date] = useState(rn.book_date);
  const [urlImg, setUrlImg] = useState("")
  const [image, setImage] = useState(null);
  const [process, setProcess] = useState(rn.status);

  const [values, setValues] = useState({
    repair_type: "",
    school: "",
    school_name: "",
  });

  // console.log(schools);
  // console.log(rn);

  // useEffect(() => {
  //   console.log(process);
  // }, [process]);

  const options = [
    { value: "notice", label: "แจ้งซ่อม" },
    { value: "process", label: "รอดำเนินการ" },
    { value: "done", label: "ดำเนินการแล้ว" },
  ];

  let mydata = {};

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: "#424242",
    }),
    option: (provided, state) => ({
      ...provided,
      color: "#000",
    }),
    singleValue: (base) => ({
      ...base,
      color: "#fff",
    }),
    input: (base) => ({
      ...base,
      color: "#fff",
    }),
  };

  // useEffect(() => {
  //   console.log(values);
  // }, [values])
  useEffect(() => {
    // if(book_date !== ""){
    //   setBook_date(new Date(book_date, 'yyyy-MM-dd'))
    // }
  }, [])

  const onSubmit = async (data) => {
    // data.preventDefault()
    // console.log(data);
    // console.log(values);
    // console.log(image);

    // const hasEmptyFields = Object.values(values).some(
    //   (element) => element === ""
    // );

    // if (hasEmptyFields) {
    //   alert("Please fill all field");
    // }

    // console.log(urlImg);
    // console.log(process);
    // console.log(book_date);
    mydata.status = process;
    if(process === "process"){
      mydata.book_date = book_date;
    } else if(process === "done") {
      mydata.book_date = book_date;
      mydata.image_url = urlImg;
    }
    // console.log(image);
    // mydata.name = data.name;
    // mydata.description = data.description;
    // mydata.phone = data.phone;
    // mydata.school = values.school;
    // mydata.repair_type = values.repair_type;

    // // สร้าง object formData ไว้สำหรับรับข้อมูลไฟล์
    const formData = new FormData();
    formData.append("data", JSON.stringify(mydata));
    // console.log(mydata);

    // console.log(data.uploadimg.length);
    // console.log(image);

    // if (data.uploadimg.length) {
    // formData.append("files.image", image);
    // // formData.append('files.image', image)
    // // formData.append('ref', 'products')
    // // formData.append('refId', evtId)
    // // formData.append('field', 'image')
    // }

    const apiUrl = `${API_URL2}/repair-notices/${rn.id}`;
    const resp = await axios.create({headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    }
  }).put(apiUrl,  formData);
    // console.log(resp);
    if (resp.status === 200) {
      // alert('a')
      // if (image.size > 0) {
      //   // alert(resp.data.id)
      //   const formData1 = new FormData();
      //   formData1.append("files", image);
      //   formData1.append("ref", "repair-notice");
      //   formData1.append("refId", resp.data.id);
      //   formData1.append("field", "image");
      //   const res2 = await axios.post(`${API_URL2}/upload`, formData1);
      //   console.log(res2);
      // }
      //   const formData = new FormData()
      // formData.append('files', image)
      // formData.append('ref', 'events')
      // formData.append('refId', evtId)
      // formData.append('field', 'image')
      let timerInterval;
      Swal.fire({
      html: "ปรับปรุงข้อมูลเรียบร้อยแล้ว <b></b>",
      timer: 1000,
      timerProgressBar: true,
      background: "#19191a",
      allowEscapeKey: false,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
        timerInterval = setInterval(() => {
          const content = Swal.getContent();
          if (content) {
            const b = content.querySelector("b");
            if (b) {
              b.textContent = Swal.getTimerLeft();
            }
          }
        }, 1000);
      },
      willClose: () => {
        clearInterval(timerInterval);
      },
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.timer) {
        // Set context
        router.push("/admin");
      }
    });
    }
    // console.log(resp)

    // alert(resp.data.message)

    // console.log(formData);

    // // ==========================================================================
    // // ส่วนของการบันทึกข้อมูลเข้า API
    // // ==========================================================================
    // axios.create({
    //       headers: {
    //           'Content-Type': 'application/json',
    //       }}).post(`${API_URL2}/products`, formData)
    // .then((res) => {
    //   console.log(res);

    //   // Reset field
    // reset();

    //   // Reset Image Field
    // setImgUrl("");

    // const lineNotice = `${NEXT_URL}/api/linenotice?school=${values.school_name}`;
    // await axios.post(lineNotice);
    // let timerInterval;
    // Swal.fire({
    //   html: "บันทึกข้อมูลเรียบร้อยแล้ว <b></b>",
    //   timer: 1000,
    //   timerProgressBar: true,
    //   background: "#19191a",
    //   allowEscapeKey: false,
    //   allowOutsideClick: false,
    //   didOpen: () => {
    //     Swal.showLoading();
    //     timerInterval = setInterval(() => {
    //       const content = Swal.getContent();
    //       if (content) {
    //         const b = content.querySelector("b");
    //         if (b) {
    //           b.textContent = Swal.getTimerLeft();
    //         }
    //       }
    //     }, 1000);
    //   },
    //   willClose: () => {
    //     clearInterval(timerInterval);
    //   },
    // }).then((result) => {
    //   if (result.dismiss === Swal.DismissReason.timer) {
    //     // Set context
    //     router.push("/");
    //   }
    // });

    //   // Show Message
    //   cogoToast.success("เพิ่มข้อมูลเรียบร้อยแล้ว", {
    //     position: "top-center",
    //     heading: "สถานะการเพิ่มข้อมูล",
    //   });
    // });
  };

  // console.log(rn);
  return (
    <>
      <Head>
        <title>ดำเนินการแก้ไข | แจ้งซ่อม DLTV, ICT</title>
      </Head>
      <Container fluid>
        <Row>
          <Col>
            <Portlet>
              <Portlet.Header bordered>
                <Portlet.Title>ดำเนินการแก้ไข</Portlet.Title>
              </Portlet.Header>
              <Portlet.Body>
                <Row>
                  <Col>
                    <Link
                      href="/admin/"
                      className="px-2 py-1 mb-2 text-xl border-0 hover:text-blue-600"
                    >
                      <a>
                        <Button variant="text-success" size="lg">
                          {" "}
                          <FontAwesomeIcon icon={faChevronLeft} /> Back
                        </Button>
                      </a>
                    </Link>
                  </Col>
                </Row>
                <Row>
                  <Col md={8}>
                    {/* BEGIN Card */}
                    <Card className="mb-3">
                      <Card.Body>
                        <Card.Title>{rn.school.schoolname_th}</Card.Title>
                        <Card.Text>{rn.description}</Card.Text>
                        <Card.Text>
                          <small className="text-muted">{rn.created_at}</small>
                        </Card.Text>
                      </Card.Body>
                    </Card>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                      <Row form>
                        <Col>
                          {/* BEGIN Form Group */}

                          <Form.Group>
                            <FloatLabel>
                              {/* <Select
                                instanceId="repair_type"
                                name="repair_type"
                                styles={customStyles}
                                // defaultValue={options[0]}
                                options={options}
                                value={rn.status}
                                onChange={(e) =>
                                  setProcess(e.value)
                                }
                                // {...register("users", { required: true })}
                                placeholder="เลือกประเภท"
                                required
                              /> */}
                              <Input
                                type="select"
                                name="repair_type"
                                id="repair_type"
                                onChange={(e) => setProcess(e.target.value)}
                              >
                                <option value="notice">แจ้งซ่อม</option>
                                <option value="process">รอดำเนินการ</option>
                                <option value="done">ดำเนินการแล้ว</option>
                              </Input>
                              <Label for="repair_type">ประเภท</Label>
                            </FloatLabel>
                          </Form.Group>
                          
                              {/* BEGIN Form Group */}
                              {process === "process" ? (
                                <Form.Group>
                                <FloatLabel>
                                <Input
                                  type="date"
                                  name="book_date"
                                  id="book_date"
                                  value={moment(book_date).format('yyyy-MM-DD')}
                                  onChange={(e) => setBook_date(e.target.value)}
                                  placeholder="วันที่เข้าดำเนินการ"
                                ></Input>
                                <Label for="book_date">วันที่เข้าดำเนินการ</Label>
                                </FloatLabel>
                          </Form.Group>
                              ) : process === "done" ? (
                                <>
                                <Form.Group>
                                <FloatLabel>
                                <Input
                                  type="date"
                                  name="book_date"
                                  id="book_date"
                                  value={moment(book_date).format('yyyy-MM-DD')}
                                  onChange={(e) => setBook_date(e.target.value)}
                                  placeholder="วันที่เข้าดำเนินการ"
                                ></Input>
                                <Label for="book_date">วันที่เข้าดำเนินการ</Label>
                                </FloatLabel>
                          </Form.Group>
                          <Form.Group>
                          <FloatLabel>
                                <Input
                                  type="text"
                                  name="url_image"
                                  id="url_image"
                                  value={rn.url_image}
                                  onChange={(e) => setUrlImg(e.target.value)}
                                  placeholder="รูปภาพการดำเนินการ"
                                ></Input>
                                <Label for="url_image">รูปภาพการดำเนินการ (Google Drive)</Label>
                                </FloatLabel>
                          </Form.Group>
                          </>
                              ) : (
                                ""
                              )}
                            
                          <Form.Group>
                            <FloatLabel>
                              <Col className="text-center">
                                <Button
                                  type="submit"
                                  variant="primary"
                                  size="lg"
                                >
                                  ปรับปรุง
                                </Button>
                              </Col>
                            </FloatLabel>
                          </Form.Group>
                        </Col>
                      </Row>
                    </Form>
                    {/* END Card */}
                  </Col>
                  <Col md={4} className="text-center">
                    {imagePreview && <img src={`${API_URL2}${imagePreview}`} />}
                  </Col>
                </Row>
              </Portlet.Body>
            </Portlet>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export async function getServerSideProps({ params: { id }, req }) {
  const { token } = parseCookies(req);

  const res1 = await fetch(`${API_URL2}/repair-notices/${id}`);
  const rn = await res1.json();

  const res = await fetch(`${NEXT_URL}/api/getstaticsch`);
  const schools = await res.json();

  const pageChangeHeaderTitle = "ดำเนินการแก้ไข";

  const breadcrumbChange = [
    { text: "หน้าหลัก", link: "/admin" },
    { text: "ดำเนินการแก้ไข" },
  ];

  // const paths = events.map((evt) => ({ params: { slug: evt.slug } }));
  return {
    props: { rn, schools, pageChangeHeaderTitle, breadcrumbChange, token },
  };
}

export default addNotice;
