import { parseCookies } from "helpers/index";
import { FaUser } from "react-icons/fa";

import withLayout from "components/layout/withLayout";
import {
  Row,
  Col,
  Form,
  Label,
  Input,
  Button,
  Portlet,
  Spinner,
  Container,
  CustomInput,
  FloatLabel,
  Widget12,
} from "@panely/components";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faTimes } from "@fortawesome/free-solid-svg-icons";
import React,{ useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from "styles/AuthForm.module.css";
import { API_URL, NEXT_URL } from "config";
import cookieCutter from "cookie-cutter";
import Swal from "sweetalert2";
import {UserStoreContext} from 'context/UserContext';

const login = () => {
  const { register, handleSubmit } = useForm();
  const router = useRouter();

  const userStore = useContext(UserStoreContext)
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  // useEffect(() => error && alert(error));

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   login({ email, password });
  // };

  const onSubmit = async (data) => {
    // alert(JSON.stringify(data));
    // console.log(data);
    // login(data.email, data.password);
    const apiUrl = `${NEXT_URL}/api/login`;
    await axios
      .post(apiUrl, {
        identifier: data.email,
        password: data.password,
      })
      .then((res) => {
        let timerInterval;
        Swal.fire({
          html: "กำลังเข้าสู่ระบบ <b></b>",
          timer: 1500,
          timerProgressBar: true,
          background: '#19191a',
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
            }, 1500);
          },
          willClose: () => {
            clearInterval(timerInterval);
          },
        }).then((result) => {
          if (result.dismiss === Swal.DismissReason.timer) {
            // Set context
            localStorage.setItem("phichit2Token", res.data.data.jwt);
            localStorage.setItem("profile", res.data.data.user);

            const profileValue = res.data.data.user
            userStore.updateProfile(profileValue)

            // ส่งไปหน้าหลัก
            router.push("/");
          }
        });
      });
    // console.log(resp.data.data.jwt);
    // cookieCutter.set('myToken', resp.data.data.jwt
    // )
    // localStorage.setItem("phichit2Token", resp.data.data.jwt);

    // router.push('/events')

    // console.log(resp.data);
  };

  return (
    <Container fluid>
      <Row
        noGutters
        className="align-items-center justify-content-center h-100"
      >
        <Col sm="8" md="6" lg="4">
          <Portlet>
            <Portlet.Body>
              <div className={styles.auth}>
                <h1>
                  <FaUser /> Log In
                </h1>
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <Form.Group>
                    <FloatLabel size="lg">
                      <Input
                        type="email"
                        name="email"
                        {...register("email")}
                        placeholder="Please insert your email"
                      />
                      <Label for="email">Email Address</Label>
                    </FloatLabel>
                  </Form.Group>
                  <Form.Group>
                    <FloatLabel size="lg">
                      <Input
                        type="password"
                        name="password"
                        {...register("password")}
                        placeholder="Please insert your password"
                      />
                      <Label for="password">Password</Label>
                    </FloatLabel>
                  </Form.Group>
                  <Row>
                    <Col>
                      <Form.Group className="mb-0 text-center">
                        <Button
                          block
                          type="submit"
                          variant="primary"
                          height="taller"
                        >
                          Login
                        </Button>
                      </Form.Group>
                    </Col>
                  </Row>
                </Form>

                <Link
                      href="/"
                    >
                      <a>
                        <Button variant="text-secondary" size="lg">
                          <FontAwesomeIcon icon={faChevronLeft} /> กลับหน้าหลัก
                        </Button>
                      </a>
                    </Link>

                {/* <p>
                  Don't have an account?{" "}
                  <Link href="/account/register">Register</Link>/
                  <Link href="/">Home</Link>
                </p> */}
              </div>
            </Portlet.Body>
          </Portlet>
        </Col>
      </Row>
    </Container>
  );
};

export default withLayout(login, "blank");
