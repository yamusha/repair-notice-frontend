import Link from 'next/link'
import styles from 'styles/EventItem.module.css'
import { Row, Col, Portlet, Container } from "@panely/components";
import { every } from 'lodash';
const EventItem = ({evt}) => {
  return (
    <Row>
      <Col>
      <div className={styles.event}>
      <div className={styles.img}>
        <img src={evt.image ? evt.image.formats.thumbnail.url : '/images-default.png'} width={170} height={100} />
      </div>

      <div className={styles.info}>
        <span>
          {new Date(evt.date).toLocaleDateString('en-US')} at {evt.time}
        </span>
        <h3>{evt.name}</h3>
      </div>

      <div className={styles.link}>
        <Link href={`/events/${evt.slug}`}>
          <a className="btn">Detail</a>
        </Link>
      </div>
    </div>
      </Col>
    </Row>
    
  )
}

export default EventItem
