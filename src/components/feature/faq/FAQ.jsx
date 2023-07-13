import React from "react";
import Accordion from "react-bootstrap/Accordion";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Container } from "react-bootstrap";

const FAQ = () => {
  return (
    <>
      <div className="faq-wrapper pt-60" id="faq">
        <Container>
          <Row>
            <Col md={12} lg={4}>
              <div className="faq-head">
                <h2>UK Driving Licence: Frequently Asked Questions</h2>
              </div>
            </Col>
            <Col md={12} lg={8}>
              <div className="faq-body">
                <Accordion defaultActiveKey="0" flush>
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>
                      How many questions are on the theory test UK?
                    </Accordion.Header>
                    <Accordion.Body>
                      The exam comprises of 50 multiple-choice questions, and
                      you will be given 57 minutes to answer them. Prior to
                      starting the exam, you will receive guidance on how the
                      test operates, and you will also have the opportunity to
                      attempt a practice question to become familiar with the
                      format of the exam.
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="1">
                    <Accordion.Header>
                      How do I prepare for my driving theory test?
                    </Accordion.Header>
                    <Accordion.Body>
                      The Driver and Vehicle Agency (DVA) suggests that in order
                      to get ready for your theory test, you should go through
                      the Highway Code thoroughly. Also, practice all the
                      questions, attempt mock tests, and practice consistently
                      on our website and apps.
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="2">
                    <Accordion.Header>
                      How do I pass my theory test first time?
                    </Accordion.Header>
                    <Accordion.Body>
                      Practice all the sections and take mock tests until you
                      feel confident to pass the test. It is not hard to pass
                      the theory test the first time. You can do it and our
                      website and apps will guide you to accomplish the task.
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="3">
                    <Accordion.Header>
                      What happens if I fail the UK driving theory test?
                    </Accordion.Header>
                    <Accordion.Body>
                      If you fail the UK driving theory test, you will need to
                      wait at least 3 working days before you can take it again.
                      You can book another test as soon as the 3 working day
                      period has passed. You will need to pay the test fee again
                      each time you take the test.
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="4">
                    <Accordion.Header>
                      How do I book the UK driving theory test?
                    </Accordion.Header>
                    <Accordion.Body>
                      To book the UK driving theory test, you can do so online
                      through the official website of the Driver and Vehicle
                      Standards Agency (DVSA) or by phone. Here are the steps to
                      book your test online: Visit the official website of the
                      Driver and Vehicle Standards Agency (DVSA) at
                      <a href="https://www.gov.uk/book-theory-test">
                        https://www.gov.uk/book-theory-test.
                      </a>
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="5">
                    <Accordion.Header>
                      Can I reschedule my UK driving theory test?
                    </Accordion.Header>
                    <Accordion.Body>
                      Yes, you can reschedule your UK driving theory test if
                      necessary. To do It online visit
                      <a href="https://www.gov.uk/change-theory-test">
                        https://www.gov.uk/change-theory-test
                      </a>
                      or DVSA customer support on 0300 200 1122 from Monday to
                      Friday, 8 am to 4 pm.
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="6">
                    <Accordion.Header>
                      What documents do I need to bring to the UK driving theory
                      test?
                    </Accordion.Header>
                    <Accordion.Body>
                      <ol>
                        <li>
                          Your valid and current UK provisional driving license.
                        </li>
                        <li>
                          The confirmation email of your theory test booking.
                        </li>
                      </ol>
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="7">
                    <Accordion.Header>
                      How long does it take to get the results of the UK driving
                      theory test?
                    </Accordion.Header>
                    <Accordion.Body>
                      Once you finish your test you will receive your result
                      instantly.
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="8">
                    <Accordion.Header>
                      What score do I need to pass this part of the test?
                    </Accordion.Header>
                    <Accordion.Body>
                      If you are taking a car or motorcycle theory test you will
                      need 43/50.
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="9">
                    <Accordion.Header>
                      How much time will I get to complete the questions?
                    </Accordion.Header>
                    <Accordion.Body>
                      You will have 57 minutes to complete the test for Car and
                      Motorcycle.
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="10">
                    <Accordion.Header>
                      What type of questions will I be asked?
                    </Accordion.Header>
                    <Accordion.Body>
                      For car drivers, there are 14 categories which include
                      about 800 questions in total, 50 of which will be randomly
                      chosen for your test. These categories include:
                      <ol>
                        <li>Attitude</li>
                        <li>Documents </li>
                        <li>Hazard Awareness </li>
                        <li>Incidents, Accidents and Emergencies </li>
                        <li>Motorway Rules </li>
                        <li>Other Types of Vehicles </li>
                        <li>Road and Traffic Signs </li>
                        <li>Rules of the Road </li>
                        <li>Safety and Your Vehicle </li>
                        <li>Safety Margins </li>
                        <li>Vehicle Handling </li>
                        <li>Vehicle Loading </li>
                        <li>Vulnerable Road Users</li>
                      </ol>
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="11">
                    <Accordion.Header>
                      Can I take my theory test in a different language?
                    </Accordion.Header>
                    <Accordion.Body>
                      You can only take the test in English or Welsh.
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="12">
                    <Accordion.Header>
                      When should I arrive at the test center?
                    </Accordion.Header>
                    <Accordion.Body>
                      15 minutes before your theory test.
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="13">
                    <Accordion.Header>
                      What is the duration of time that I will spend at the test
                      center?
                    </Accordion.Header>
                    <Accordion.Body>
                      The total time you'll spend at the theory test center as a
                      car or motorcycle candidate is approximately two hours.
                      During this time, you'll spend 15 minutes before the test
                      getting checked in and ready, followed by an optional
                      15-minute practice session (Optional). Then, you'll have
                      57 minutes to complete the multiple-choice section of the
                      test, followed by a 3-minute break. After the break,
                      you'll have 20 minutes to complete the hazard perception
                      test, and then you'll need to wait for around 5 to 10
                      minutes to receive your test result.
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="14">
                    <Accordion.Header>
                      How long does the theory test certificate last?
                    </Accordion.Header>
                    <Accordion.Body>2 Years.</Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default FAQ;
