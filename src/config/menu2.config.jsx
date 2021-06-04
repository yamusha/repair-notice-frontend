import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Badge } from "@panely/components"
import * as SolidIcon from "@fortawesome/free-solid-svg-icons"

/*
 * Menu Configuration
 * the object below is representation of the side navigation menu
 * there are some property you can use to customize your menu
 */

const MENU = [
  {
    title: "หน้าหลัก",
    icon: () => <FontAwesomeIcon icon={SolidIcon.faDesktop} />,
    // addon: () => <Badge variant="success">new</Badge>,
    link: "/",
    auth: 'normal',
    all: true
  },  
  {
    title: "แจ้งซ่อม",
    icon: () => <FontAwesomeIcon icon={SolidIcon.faTools} />,
    link: "/add",
    auth: 'normal',
    all: true
  },
  {
    title: "ผู้ดูแลระบบ",
    icon: () => <FontAwesomeIcon icon={SolidIcon.faSignInAlt} />,
    link: "/login",
    auth: 'normal',
    all: false,
    auth: false
  },
  {
    title: "จัดการคำขอ",
    icon: () => <FontAwesomeIcon icon={SolidIcon.faListAlt} />,
    link: "/admin",
    auth: 'admin',
    all: false,
    auth: true

  },
]

export default MENU
