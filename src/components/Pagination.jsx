
import { Row, Col, Portlet, Pagination, Container } from "@panely/components";
import Link from 'next/link'
import { Button } from "@panely/components"
import { PER_PAGE } from 'config/index'

export default function PaginationComponent({ page, total, path }) {
  const lastPage = Math.ceil(total / PER_PAGE)

  const getPage = (data, path) => {
    let content = [];
    for (let i = 0; i < data; i++) {

      content.push(
        <Link href={`/${path}?page=${i + 1}`} key={i} >
          { page === (i+1) ?
          (<a><Pagination.Item active>
                      <Pagination.Link>{i+1}</Pagination.Link>
                    </Pagination.Item></a>) : 
                    (
                      <a><Pagination.Item>
                      <Pagination.Link>{i+1}</Pagination.Link>
                    </Pagination.Item></a>
                    )
    }
        </Link>
      );
    }
    return content;
  };
  
  return (
 
    <Row>
      <Col>
      
      <Pagination listClassName="justify-content-center" className="mb-3 pt-2">
      {page > 1 && (
        <Link href={`/${path}?page=${page - 1}`}>          
          <a><Pagination.Item>
                      <Pagination.Link>Previous</Pagination.Link>
                    </Pagination.Item></a>
        </Link>
      )}
      {getPage(lastPage, path)}
      {page < lastPage && (
        <Link href={`/${path}?page=${page + 1}`}>
          <a><Pagination.Item>
                      <Pagination.Link>Next</Pagination.Link>
                    </Pagination.Item></a>
        </Link>
      )}
      </Pagination>
      </Col>
    </Row>
      
  )
}