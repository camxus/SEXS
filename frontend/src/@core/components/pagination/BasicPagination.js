import ReactPaginate from 'react-paginate'
import PropTypes from "prop-types"

const BasicPagination = ({handlePagination, pageCount}) => {
  return (
        <ReactPaginate
            // forcePage={currentPage !== 0 ? currentPage - 1 : 0}
            onPageChange={page => handlePagination(page)}
            pageCount={pageCount ?? 10}
            nextLabel={''}
            breakLabel={'...'}
            pageRangeDisplayed={5}
            marginPagesDisplayed={2}
            activeClassName={'active'}
            pageClassName={'page-item'}
            previousLabel={''}
            breakClassName='page-item'
            breakLinkClassName='page-link'
            nextLinkClassName={'page-link'}
            nextClassName={'page-item next-item'}
            previousClassName={'page-item prev-item'}
            previousLinkClassName={'page-link'}
            pageLinkClassName={'page-link'}
            containerClassName={'pagination react-paginate no-navigation'}
        />
  )
}
export default BasicPagination

BasicPagination.propTypes = {
    handlePagination: PropTypes.func.isRequired,
    // currentPage: PropTypes.number.isRequired || PropTypes.string.isRequired,
    // pageCount: PropTypes.number.isRequired || PropTypes.string.isRequired
    pageCount: PropTypes.number
}