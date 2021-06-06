import { parseCookies } from "helpers/index";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import schools2 from 'constants/optschools.json'
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

const addNotice = () => {
  const { register, handleSubmit, reset, errors } = useForm();
  const router = useRouter();

  const [imgUrl, setImgUrl] = useState("");
  const [image, setImage] = useState(null);

  const [values, setValues] = useState({
    repair_type: "",
    school: "",    
    school_name: ""
  });

  // console.log(schools2);

  const options = [
    { value: "DLTV", label: "DLTV" },
    { value: "ICT", label: "ICT" },
  ];


  let mydata = {};

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: "#424242"
    }),
    option: (provided, state) => ({
      ...provided,
      color: "#000"
    }),
    singleValue: base => ({
      ...base,
      color: "#fff"
    }),
    input: base => ({
      ...base,
      color: "#fff"
    })
  }

    // useEffect(() => {
    //   console.log(values);
    // }, [values])

  const onSubmit = async (data) => {
    // data.preventDefault()
    console.log(data);
    console.log(values);
    console.log(image);

    const hasEmptyFields = Object.values(values).some(
      (element) => element === ""
    );

    if (hasEmptyFields) {
      alert("Please fill all field");
    }
    // console.log(image);
    mydata.name = data.name;
    mydata.description = data.description;
    mydata.phone = data.phone;
    mydata.school = values.school;
    mydata.repair_type = values.repair_type;

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

    const apiUrl = `${API_URL2}/repair-notices`;
    const resp = await axios.post(apiUrl, formData);
    // console.log(resp);
    if (resp.status === 200) {
      // alert('a')
      if (image.size > 0) {
        // alert(resp.data.id)
        const formData1 = new FormData();
        formData1.append("files", image);
        formData1.append("ref", "repair-notice");
        formData1.append("refId", resp.data.id);
        formData1.append("field", "image");

        const res2 = await axios.post(`${API_URL2}/upload`, formData1);
        console.log(res2);
      }

      //   const formData = new FormData()
      // formData.append('files', image)
      // formData.append('ref', 'events')
      // formData.append('refId', evtId)
      // formData.append('field', 'image')
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

      const lineNotice = `${API_URL2}/line/${values.school_name}`;
      await axios.get(lineNotice)

      // const lineNotice = `${NEXT_URL}/api/linenotice?school=${values.school_name}`;
      // await axios.post(lineNotice)
      // let timerInterval;
      //   Swal.fire({
      //     html: "บันทึกข้อมูลเรียบร้อยแล้ว <b></b>",
      //     timer: 1000,
      //     timerProgressBar: true,
      //     background: '#19191a',
      //     allowEscapeKey: false,
      //       allowOutsideClick: false,
      //     didOpen: () => {
      //       Swal.showLoading();
      //       timerInterval = setInterval(() => {
      //         const content = Swal.getContent();
      //         if (content) {
      //           const b = content.querySelector("b");
      //           if (b) {
      //             b.textContent = Swal.getTimerLeft();
      //           }
      //         }
      //       }, 1000);
      //     },
      //     willClose: () => {
      //       clearInterval(timerInterval);
      //     },
      //   }).then((result) => {
      //     if (result.dismiss === Swal.DismissReason.timer) {
      //       // Set context
      //       router.push("/");
      //     }
      //   });

      

    //   // Show Message
    //   cogoToast.success("เพิ่มข้อมูลเรียบร้อยแล้ว", {
    //     position: "top-center",
    //     heading: "สถานะการเพิ่มข้อมูล",
    //   });
    // });
  };

  // ฟังก์ชันแสดงรูปตัวอย่างเมื่อเลือก
  const onImageChange = (e) => {
    // alert("a");
    // setImage(e.target.files[0]);
    // console.log(image);
    const reader = new FileReader();
    reader.onload = (e) => {
      setImgUrl(e.target.result);
    };
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
      // console.log(e.target.files[0]);
      setImage(e.target.files[0]);
    }
  };

  return (
    <>
      <Head>
        <title>แจ้งซ่อมใหม่ | แจ้งซ่อม DLTV, ICT</title>
      </Head>
      <Container fluid>
        <Row>
          <Col>
            <Portlet>
              <Portlet.Header bordered>
                <Portlet.Title>แจ้งซ่อมใหม่</Portlet.Title>
              </Portlet.Header>
              <Portlet.Body>
                <Row>
                  <Col>
                    <Link
                      href="/"
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
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <Row form>
                    <Col md="8">
                      {/* BEGIN Form Group */}
                      <Form.Group>
                        <FloatLabel>
                          <Input
                            id="name"
                            name="name"
                            type="text"
                            {...register("name", { required: true })}
                            placeholder="ชื่อ-สกุล ผู้แจ้ง"
                          />
                          <Label for="name">ชื่อ-สกุล ผู้แจ้ง</Label>
                        </FloatLabel>
                      </Form.Group>
                      {/* BEGIN Form Group */}
                      {/* BEGIN Form Group */}
                      <Form.Group>
                        <FloatLabel>
                          <Input
                            id="phone"
                            name="phone"
                            type="number"
                            {...register("phone", { required: true })}
                            placeholder="หมายเลขโทรศัพท์ผู้แจ้ง"
                          />
                          <Label for="phone">หมายเลขโทรศัพท์ผู้แจ้ง</Label>
                        </FloatLabel>
                      </Form.Group>
                      {/* BEGIN Form Group */}
                      {/* BEGIN Form Group */}
                      <Form.Group>
                        <FloatLabel>
                          <Input
                            rows="4"
                            id="description"
                            name="description"
                            type="textarea"
                            {...register("description")}
                            placeholder="สาเหตุ/อาการ"
                          />
                          <Label for="description">สาเหตุ/อาการ</Label>
                        </FloatLabel>
                      </Form.Group>
                      {/* BEGIN Form Group */}
                      {/* BEGIN Form Group */}

                      <Form.Group>
                        <FloatLabel>
                          <Select
                          instanceId="repair_type"
                            name="repair_type"
                            styles={customStyles}
                            // defaultValue={options[0]}
                            options={options}
                            onChange={(e) => setValues({...values, repair_type: e.value})}
                            // {...register("users", { required: true })}
                            placeholder="เลือกประเภท"
                            required
                          />
                          <Label for="repair_type">ประเภท</Label>
                        </FloatLabel>
                      </Form.Group>
                      {/* BEGIN Form Group */}
                      {/* BEGIN Form Group */}

                      <Form.Group>
                        <FloatLabel>
                          <Select
                          instanceId="school"
                            name="school"
                            styles={customStyles}
                            // defaultValue={options[0]}
                            options={schools2}
                            onChange={(e) => setValues({...values, school: e.value, school_name: e.label})}
                            // {...register("users", { required: true })}
                            placeholder="เลือกโรงเรียน"
                            required
                          />
                          <Label for="school">โรงเรียน</Label>
                        </FloatLabel>
                      </Form.Group>
                      {/* BEGIN Form Group */}
                      <Form.Group>
                        <FloatLabel>
                          <Col className="text-center">
                            <Button type="submit" variant="primary" size="lg">
                              แจ้งซ่อม
                            </Button>
                          </Col>
                        </FloatLabel>
                      </Form.Group>
                    </Col>
                    <Col md="4">
                      <div className="flex justify-center px-6 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                        <div className="space-y-1 text-center">
                        ภาพประกอบ
                          {imgUrl !== "" ? (
                            <div>
                              <Row>
                                <Col>
                                
                                  <Button
                                    variant="text-secondary"
                                    onClick={() => {
                                      setImgUrl("");
                                      setImage(null);
                                    }}
                                  >
                                    <FontAwesomeIcon icon={faTimes} /> remove
                                  </Button>
                                </Col>
                              </Row>
                              <Row>
                                <Col>
                                  <img
                                    className="w-full mx-auto rounded-md"
                                    id="target"
                                    src={imgUrl}
                                    width="100"
                                    alt=""
                                  />
                                </Col>
                              </Row>
                            </div>
                          ) : (
                            <span></span>
                          )}

                          <div className="text-sm text-gray-600">
                            <label htmlFor="uploadimg">
                              {imgUrl === "" ? (
                                <svg
                                  className="w-12 h-12 mx-auto text-gray-400"
                                  stroke="currentColor"
                                  fill="none"
                                  viewBox="0 0 48 48"
                                  aria-hidden="true"
                                >
                                  <path
                                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              ) : (
                                <span></span>
                              )}

                              <div className="w-full mx-auto my-2">
                                Upload Image
                              </div>

                              <input
                                id="uploadimg"
                                name="uploadimg"
                                type="file"
                                accept="images/*"
                                className="sr-only"
                                onChange={onImageChange}
                                // onChange={(e)=>{setImage(e.target.files[0])}}
                              />
                            </label>
                          </div>
                          <p className="text-xs text-gray-500">
                            PNG, JPG, GIF up to 2MB
                          </p>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Form>
              </Portlet.Body>
            </Portlet>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export async function getStaticProps() {
  const pageChangeHeaderTitle = "แจ้งซ่อมใหม่";

  const breadcrumbChange = [
    { text: "หน้าหลัก", link: "/" },
    { text: "แจ้งซ่อมใหม่" },
  ];

  // const paths = events.map((evt) => ({ params: { slug: evt.slug } }));
  return {
    props: {  pageChangeHeaderTitle, breadcrumbChange  },
    revalidate: 30
  };
}

export default addNotice;
