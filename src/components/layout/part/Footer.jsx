import React from 'react'
import { Row, Col, Footer, Container } from "@panely/components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import * as RegularIcon from "@fortawesome/free-regular-svg-icons"
import * as SolidIcon from "@fortawesome/free-solid-svg-icons"

function FooterComponent() {
  // Get current year and store to the variabke
  const copyrightYear = new Date().getFullYear()

  return (
    <Footer>
      <Container fluid>
        <Row>
          <Col md="12">
            <p className="text-center mb-0">
              Copyright <FontAwesomeIcon icon={RegularIcon.faCopyright} />{" "}
              <span>{copyrightYear}</span> <a href="http://www.phichit2.go.th">สพป.พิจิตร เขต 2</a>. All rights reserved
            </p>
          </Col>
        </Row>
      </Container>
    </Footer>
  )
}

export default FooterComponent
