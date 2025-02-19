import { useAuthState } from "../../hooks/auth.hook";
import { saveCVInfo } from "../../hooks/database.hook";
import { getCVDetail } from "../../hooks/database.hook";
import { useParams } from "react-router-dom";
import { NavBar } from "../../components/nav_bar/Navbar";
import { useHistory } from "react-router-dom";
import {
  Row,
  Col,
  Container,
  Form,
  InputGroup,
  FormControl,
  ListGroup,
  Card,
  Button,
  Modal,
  Overlay,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import * as React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { CV1 } from "../CV_Template/CV1/cv1";
import domtoimage from "dom-to-image";

// validate dữ liệu input
interface IFormInput {
  firstName: string;
  lastName: string;
  AvatarUser: string;
  email: string;
  DOB: number;
  phone: number;
  address: string;
  country: string;
  bio: string;

  // Skills
  skillName: string;
  level: number;

  // Hobbies
  hobbyName: string;

  // Educations
  education: string;
  fromEdu: number;
  toEdu: number;
  schoolName: string;
  degree: string;

  // Employments
  company: string;
  fromEmploy: number;
  toEmploy: number;
  position: string;
  //CV info
  CVThumbnail: string;
  CVImage: string;
}

export const CreateCV = () => {
  const history = useHistory();
  let id: any = useParams();

  async function routerID(
    id: any,
    firstName: any,
    lastName: any,
    AvatarUser: any,
    email: any,
    DOB: any,
    phone: any,
    address: any,
    country: any,
    bio: any,
    skillName: any,
    hobbyName: any,
    education: any,
    company: any,
    CVThumbnail: any,
    CVImage: any
  ) {
    await saveCVInfo(
      id,
      firstName,
      lastName,
      AvatarUser,
      email,
      DOB,
      phone,
      address,
      country,
      bio,
      skillName,
      hobbyName,
      education,
      company,
      CVThumbnail,
      CVImage
    );
    history.push(`/createcv2/${id}`);
  }

  const [show, setShow] = useState(true);
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [lgShow3, setLgShow3] = useState(false);
  const [lgShow4, setLgShow4] = useState(false);

  useEffect(() => {
    getCVLayout();
  }, []);
  // validate dữ liệu input
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data: any) => console.log(data);
  const onSubmit1: SubmitHandler<IFormInput> = (data: any) =>
    routerID(
      id.id,
      data.firstName,
      data.lastName,
      data.AvatarUser,
      data.email,
      data.DOB,
      data.phone,
      data.address,
      data.country,
      data.bio,
      data.skillName,
      { hobbyName: data.hobbyName },
      data.education,
      {
        company: data.company,
        fromEmploy: data.fromEmploy,
        toEmploy: data.toEmploy,
      },
      data.CVThumbnail,
      data.CVImage
    );

  const authState = useAuthState();
  async function getCVLayout() {
    let temp = document.getElementById("CVImageLayout")!;
    let div = await domtoimage.toPng(temp);
    let img = new Image(600, 700);
    img.src = div;
    document.getElementById("CVImage")?.appendChild(img);
    setShow(false);
  }

  // lấy dữ liệu được truyền từ component khác
  // let location = useLocation();
  // console.log(location.state);
  //////////
  return (
    <>
      <NavBar></NavBar>
      <div className="from" style={{ paddingTop: "6rem" }}>
        <Container>
          <Form onSubmit={handleSubmit(onSubmit1)}>
            <Row>
              <Col>
                <h3>Personal Detail</h3>
                <div>
                  <Container>
                    <Row>
                      <Col>
                        <label>First Name</label>
                        <InputGroup className="mb-3">
                          <FormControl
                            {...register("firstName", {
                              required: true,
                              maxLength: 30,
                            })}
                            type="text"
                            placeholder="Đào Thùy"
                            aria-label="Default"
                            aria-describedby="inputGroup-sizing-default"
                          />
                        </InputGroup>
                        {errors?.firstName?.type === "required" && (
                          <p>This field is required</p>
                        )}
                        {errors?.firstName?.type === "maxLength" && (
                          <p>First name cannot exceed 30 characters</p>
                        )}
                      </Col>
                      <Col>
                        <label>Last Name</label>
                        <InputGroup className="mb-3">
                          <FormControl
                            {...register("lastName", {
                              required: true,
                              maxLength: 20,
                            })}
                            type="text"
                            placeholder="Linh"
                            aria-label="Default"
                            aria-describedby="inputGroup-sizing-default"
                          />
                        </InputGroup>
                        {errors?.lastName?.type === "required" && (
                          <p>This field is required</p>
                        )}
                        {errors?.lastName?.type === "maxLength" && (
                          <p>Last name cannot exceed 20 characters</p>
                        )}
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={6}>
                        <label>Email</label>
                        <InputGroup className="mb-3">
                          <FormControl
                            {...register("email", {
                              required: true,
                              maxLength: 50,
                              pattern:
                                /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
                            })}
                            placeholder="linhmilo123@gmail.com"
                            aria-label="Default"
                            aria-describedby="inputGroup-sizing-default"
                          />
                        </InputGroup>
                        {errors?.email?.type === "required" && (
                          <p>This field is required</p>
                        )}
                        {errors?.email?.type === "maxLength" && (
                          <p>Email cannot exceed 50 characters</p>
                        )}
                        {errors?.lastName?.type === "pattern" && (
                          <p>Must "@" or "."</p>
                        )}
                      </Col>
                      <Col>
                        <label>Date Of Birth</label>
                        <InputGroup className="mb-3">
                          <FormControl
                            {...register("DOB", {
                              required: true,
                              pattern:
                                /^(0[1-9]|1\d|2\d|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/i,
                            })}
                            type="text"
                            maxLength={10}
                            placeholder="07/07/1997"
                            aria-label="Default"
                            aria-describedby="inputGroup-sizing-default"
                          />
                        </InputGroup>
                        {errors?.DOB?.type === "required" && (
                          <p>This field is required</p>
                        )}
                        {errors?.DOB?.type === "pattern" && (
                          <p>Field number and "/" only</p>
                        )}
                      </Col>
                      <Col>
                        <label>Phone</label>
                        <InputGroup className="mb-3">
                          <FormControl
                            {...register("phone", {
                              required: true,
                              minLength: 10,
                              maxLength: 11,
                              pattern: /^[0-9]+$/i,
                            })}
                            type="tel"
                            placeholder="0966745xxx"
                            aria-label="Default"
                            aria-describedby="inputGroup-sizing-default"
                          />
                        </InputGroup>
                        {errors?.phone?.type === "required" && (
                          <p>This field is required</p>
                        )}
                        {errors?.phone?.type === "minLength" && (
                          <p>Phone cannot less 10 number</p>
                        )}
                        {errors?.phone?.type === "maxLength" && (
                          <p>Phone cannot exceed 11 number</p>
                        )}
                        {errors?.phone?.type === "pattern" && (
                          <p>Field number only</p>
                        )}
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={9}>
                        <label>Address</label>
                        <InputGroup className="mb-3">
                          <FormControl
                            {...register("address", {
                              required: true,
                            })}
                            type="text"
                            placeholder="61 Tô Ngọc Vân, Tây Hồ, Hà Nội"
                            aria-label="Default"
                            aria-describedby="inputGroup-sizing-default"
                          />
                        </InputGroup>
                        {errors?.address?.type === "required" && (
                          <p>This field is required</p>
                        )}
                      </Col>
                      <Col>
                        <label>Country</label>
                        <InputGroup className="mb-3">
                          <FormControl
                            {...register("country", {
                              required: true,
                            })}
                            type="text"
                            placeholder="Việt Nam"
                            aria-label="Default"
                            aria-describedby="inputGroup-sizing-default"
                          />
                        </InputGroup>
                        {errors?.country?.type === "required" && (
                          <p>This field is required</p>
                        )}
                      </Col>
                    </Row>
                    <Row>
                      <Form>
                        <Form.Group
                          className="mb-3"
                          controlId="exampleForm.ControlTextarea1"
                        >
                          <Form.Label>Bio</Form.Label>
                          <Form.Control
                            {...register("bio", {
                              required: true,
                            })}
                            as="textarea"
                            rows={3}
                          />
                        </Form.Group>
                        {errors?.bio?.type === "required" && (
                          <p>This field is required</p>
                        )}
                      </Form>
                    </Row>
                    <Row>
                      <Container>
                        <Row>
                          <Col>
                            <h3>Skills</h3>
                            <Card style={{ width: "13rem" }}>
                              <ListGroup variant="flush">
                                <ListGroup.Item
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                  }}
                                >
                                  <label
                                    style={{
                                      margin: "auto",
                                      paddingRight: "1rem",
                                    }}
                                  >
                                    Cras justo odio
                                  </label>
                                  <Button onClick={() => setShow1(true)}>
                                    +
                                  </Button>
                                </ListGroup.Item>
                              </ListGroup>
                            </Card>
                            <Modal
                              size="lg"
                              show={show1}
                              onHide={() => setShow1(false)}
                              aria-labelledby="contained-modal-title-vcenter"
                              centered
                            >
                              <Modal.Header closeButton>
                                <Modal.Title>Add Skills</Modal.Title>
                              </Modal.Header>
                              <Modal.Body>
                                <Form onSubmit={handleSubmit(onSubmit)}>
                                  <div
                                    style={{
                                      display: "flex",
                                      placeContent: "center",
                                    }}
                                  >
                                    <div style={{ display: "flex" }}>
                                      <Form style={{ marginRight: "1rem" }}>
                                        <Form.Group
                                          className="mb-3"
                                          controlId="formBasicText"
                                        >
                                          <Form.Label>Skill name</Form.Label>
                                          <Form.Control
                                            {...register("skillName")}
                                            placeholder="Eg. your text here"
                                          />
                                        </Form.Group>
                                      </Form>
                                      <div>
                                        <Form style={{ marginRight: "1rem" }}>
                                          <Form.Label>Level</Form.Label>
                                          <Form.Control
                                            {...register("level", {
                                              pattern: /^[0-9]+$/i,
                                              minLength: 1,
                                              maxLength: 2,
                                            })}
                                            style={{ marginTop: "0.35rem" }}
                                            placeholder="1-10"
                                            maxLength={2}
                                            type = "number"
                                            min = "1"
                                            max = "10"
                                            aria-label="Default select example"
                                          ></Form.Control>
                                        </Form>
                                        {errors?.level?.type === "pattern" && (
                                          <p>Field number only</p>
                                        )}
                                        {errors?.level?.type ===
                                          "minLength" && (
                                          <p>Level cannot less 1</p>
                                        )}
                                        {errors?.level?.type ===
                                          "maxLength" && (
                                          <p>Level cannot exceed 10</p>
                                        )}
                                      </div>
                                    </div>
                                    <div style={{ marginTop: "2.4rem" }}>
                                      <Button
                                        style={{ marginRight: "0.5rem" }}
                                        variant="outline-danger"
                                      >
                                        Cancel
                                      </Button>
                                      <Button
                                        type="submit"
                                        variant="outline-primary"
                                      >
                                        Done
                                      </Button>
                                    </div>
                                  </div>
                                </Form>
                              </Modal.Body>
                            </Modal>
                          </Col>
                          <Col>
                            <h3>Hobbies</h3>
                            <Card style={{ width: "13rem" }}>
                              <ListGroup variant="flush">
                                <ListGroup.Item
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                  }}
                                >
                                  <label
                                    style={{
                                      margin: "auto",
                                      paddingRight: "1rem",
                                    }}
                                  >
                                    Cras justo odio
                                  </label>
                                  <Button onClick={() => setShow2(true)}>
                                    +
                                  </Button>
                                </ListGroup.Item>
                              </ListGroup>
                            </Card>
                            <Modal
                              show={show2}
                              onHide={() => setShow2(false)}
                              aria-labelledby="contained-modal-title-vcenter"
                              centered
                            >
                              <Modal.Header closeButton>
                                <Modal.Title>Add Hobbies</Modal.Title>
                              </Modal.Header>
                              <Modal.Body>
                                <Form onSubmit={handleSubmit(onSubmit)}>
                                  <div
                                    style={{
                                      display: "flex",
                                      placeContent: "center",
                                    }}
                                  >
                                    <Form style={{ marginRight: "1rem" }}>
                                      <Form.Group
                                        className="mb-3"
                                        controlId="formBasicText"
                                      >
                                        <Form.Label>Hobby name</Form.Label>
                                        <Form.Control
                                          {...register("hobbyName")}
                                          type="text"
                                          placeholder="Eg. your text here"
                                        />
                                      </Form.Group>
                                    </Form>
                                    <div style={{ marginTop: "2.2rem" }}>
                                      <Button
                                        style={{ marginRight: "0.5rem" }}
                                        variant="outline-danger"
                                      >
                                        Cancel
                                      </Button>
                                      <Button
                                        type="submit"
                                        variant="outline-primary"
                                      >
                                        Done
                                      </Button>
                                    </div>
                                  </div>
                                </Form>
                              </Modal.Body>
                            </Modal>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <h3>Educations</h3>
                            <Card style={{ width: "13rem" }}>
                              <ListGroup variant="flush">
                                <ListGroup.Item
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                  }}
                                >
                                  <label
                                    style={{
                                      margin: "auto",
                                      paddingRight: "1rem",
                                    }}
                                  >
                                    Cras justo odio
                                  </label>
                                  <Button onClick={() => setLgShow3(true)}>
                                    +
                                  </Button>
                                </ListGroup.Item>
                              </ListGroup>
                            </Card>
                            <Modal
                              size="lg"
                              show={lgShow3}
                              onHide={() => setLgShow3(false)}
                              aria-labelledby="contained-modal-title-vcenter"
                              centered
                            >
                              <Modal.Header closeButton>
                                <Modal.Title>Add Educations</Modal.Title>
                              </Modal.Header>
                              <Modal.Body>
                                <Form onSubmit={handleSubmit(onSubmit)}>
                                  <div>
                                    <Form
                                      style={{
                                        display: "flex",
                                        placeContent: "center",
                                      }}
                                    >
                                      <div
                                        style={{
                                          marginRight: "1rem",
                                          width: "54%",
                                        }}
                                      >
                                        <div>
                                          <Form.Group
                                            className="mb-3"
                                            controlId="formBasicText"
                                          >
                                            <Form.Label>Education</Form.Label>
                                            <Form.Control
                                              {...register("education")}
                                              placeholder="Eg. your text here"
                                            />
                                          </Form.Group>
                                        </div>
                                        <div>
                                          <Form.Group
                                            className="mb-3"
                                            controlId="formBasicText"
                                          >
                                            <Form.Label>School name</Form.Label>
                                            <Form.Control
                                              {...register("schoolName")}
                                              placeholder="Eg. your text here"
                                            />
                                          </Form.Group>
                                        </div>
                                      </div>
                                      <div>
                                        <div style={{ display: "flex" }}>
                                          <div
                                            style={{ marginRight: "0.5rem" }}
                                          >
                                            <Form.Group
                                              className="mb-3"
                                              controlId="formBasicText"
                                            >
                                              <Form.Label>From</Form.Label>
                                              <InputGroup className="mb-3">
                                                <Form.Control
                                                  {...register("fromEdu", {
                                                    pattern: /^[0-9]+$/i,
                                                  })}
                                                  placeholder="Eg. your text here"
                                                />
                                              </InputGroup>
                                            </Form.Group>
                                            {errors?.fromEdu?.type ===
                                              "pattern" && (
                                              <p>Field number only</p>
                                            )}
                                          </div>
                                          <div>
                                            <Form.Group
                                              className="mb-3"
                                              controlId="formBasicText"
                                            >
                                              <Form.Label>To</Form.Label>
                                              <InputGroup className="mb-3">
                                                <Form.Control
                                                  {...register("toEdu", {
                                                    pattern: /^[0-9]+$/i,
                                                  })}
                                                  placeholder="Eg. your text here"
                                                />
                                              </InputGroup>
                                            </Form.Group>
                                            {errors?.toEdu?.type ===
                                              "pattern" && (
                                              <p>Field number only</p>
                                            )}
                                          </div>
                                        </div>
                                        <div>
                                          <Form.Group
                                            className="mb-3"
                                            controlId="formBasicText"
                                          >
                                            <Form.Label>Degree</Form.Label>
                                            <Form.Control
                                              {...register("degree")}
                                              placeholder="Eg. your text here"
                                            />
                                          </Form.Group>
                                        </div>
                                      </div>
                                    </Form>
                                    <div
                                      style={{
                                        textAlign: "center",
                                        paddingRight: "0.5rem",
                                      }}
                                    >
                                      <Button
                                        style={{ marginRight: "1rem" }}
                                        variant="outline-danger"
                                      >
                                        Cancel
                                      </Button>
                                      <Button
                                        type="submit"
                                        variant="outline-primary"
                                      >
                                        Done
                                      </Button>
                                    </div>
                                  </div>
                                </Form>
                              </Modal.Body>
                            </Modal>
                          </Col>
                          <Col>
                            <h3>Employments</h3>
                            <Card style={{ width: "13rem" }}>
                              <ListGroup variant="flush">
                                <ListGroup.Item
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                  }}
                                >
                                  <label
                                    style={{
                                      margin: "auto",
                                      paddingRight: "1rem",
                                    }}
                                  >
                                    Cras justo odio
                                  </label>
                                  <Button onClick={() => setLgShow4(true)}>
                                    +
                                  </Button>
                                </ListGroup.Item>
                              </ListGroup>
                            </Card>
                            <Modal
                              size="lg"
                              show={lgShow4}
                              onHide={() => setLgShow4(false)}
                              aria-labelledby="contained-modal-title-vcenter"
                              centered
                            >
                              <Modal.Header closeButton>
                                <Modal.Title>Add Employments</Modal.Title>
                              </Modal.Header>
                              <Modal.Body>
                                <Form onSubmit={handleSubmit(onSubmit)}>
                                  <div>
                                    <Form
                                      style={{
                                        display: "flex",
                                        placeContent: "center",
                                      }}
                                    >
                                      <div
                                        style={{
                                          marginRight: "1rem",
                                          width: "54%",
                                        }}
                                      >
                                        <div>
                                          <Form.Group
                                            className="mb-3"
                                            controlId="formBasicText"
                                          >
                                            <Form.Label>
                                              Company name / Workplace name
                                            </Form.Label>
                                            <Form.Control
                                              {...register("company")}
                                              placeholder="Eg. your text here"
                                            />
                                          </Form.Group>
                                        </div>
                                        <div>
                                          <Form.Group
                                            className="mb-3"
                                            controlId="formBasicText"
                                          >
                                            <Form.Label>Position</Form.Label>
                                            <Form.Control
                                              {...register("position")}
                                              placeholder="Eg. your text here"
                                            />
                                          </Form.Group>
                                        </div>
                                      </div>
                                      <div>
                                        <div style={{ display: "flex" }}>
                                          <div
                                            style={{ marginRight: "0.5rem" }}
                                          >
                                            <Form.Group
                                              className="mb-3"
                                              controlId="formBasicText"
                                            >
                                              <Form.Label>From</Form.Label>
                                              <InputGroup className="mb-3">
                                                <Form.Control
                                                  {...register("fromEmploy", {
                                                    pattern: /^[0-9]+$/i,
                                                  })}
                                                  placeholder="Eg. your text here"
                                                />
                                              </InputGroup>
                                            </Form.Group>
                                            {errors?.fromEmploy?.type ===
                                              "pattern" && (
                                              <p>Field number only</p>
                                            )}
                                          </div>
                                          <div>
                                            <Form.Group
                                              className="mb-3"
                                              controlId="formBasicText"
                                            >
                                              <Form.Label>To</Form.Label>
                                              <InputGroup className="mb-3">
                                                <Form.Control
                                                  {...register("toEmploy", {
                                                    pattern: /^[0-9]+$/i,
                                                  })}
                                                  placeholder="Eg. your text here"
                                                />
                                              </InputGroup>
                                            </Form.Group>
                                            {errors?.toEmploy?.type ===
                                              "pattern" && (
                                              <p>Field number only</p>
                                            )}
                                          </div>
                                        </div>
                                      </div>
                                    </Form>
                                    <div
                                      style={{
                                        textAlign: "center",
                                        paddingRight: "0.5rem",
                                      }}
                                    >
                                      <Button
                                        style={{ marginRight: "1rem" }}
                                        variant="outline-danger"
                                      >
                                        Cancel
                                      </Button>
                                      <Button
                                        type="submit"
                                        variant="outline-primary"
                                      >
                                        Done
                                      </Button>
                                    </div>
                                  </div>
                                </Form>
                              </Modal.Body>
                            </Modal>
                          </Col>
                        </Row>
                      </Container>
                    </Row>
                  </Container>
                </div>
              </Col>

              <Col>
                <Row>
                  <Col xs={6} md={4}>
                    <div
                      id="CVImage"
                      style={{ width: "28rem", marginLeft: "5rem" }}
                    ></div>
                  </Col>
                </Row>
                <Row style={{ marginLeft: "5rem", marginTop: "2rem" }}>
                  <Col>
                    {" "}
                    <Button style={{ width: "9rem" }} variant="outline-primary">
                      Export PDF
                    </Button>{" "}
                  </Col>
                  <Col>
                    {/* <NavLink to={{ pathname: "/createcv2" }}>
                  {" "} */}
                    <Button
                      type="submit"
                      style={{ width: "9rem" }}
                      variant="outline-success"
                    >
                      Done
                    </Button>
                    {/* </NavLink> */}
                  </Col>
                </Row>
              </Col>
            </Row>
          </Form>
        </Container>
        {show === true && (
          <div id="CVImageLayout">
            <CV1></CV1>
          </div>
        )}
      </div>
    </>
  );
};
