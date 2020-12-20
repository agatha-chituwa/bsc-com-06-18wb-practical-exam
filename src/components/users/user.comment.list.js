import React, { lazy } from 'react'

const ListGroup = lazy(() => import('../containers/list.group'))
const UserCommentListItem = lazy(() => import('../users/user.comment.item'))

/**
 * Container to render list of comments for a particular user
 * 
 * @param {Props} param0
 * @returns {Component} 
 */
 const UserCommentList = ({
    comments, user, 
    handleOnPrevPageClick,
    handleOnNextPageClick,
    handleOnPageChange,
    paginationOptions,
    ...props
}) => {
    return <>
        <ListGroup>
            <div>Comments</div>
            <button onClick={handleOnPrevPageClick} type="button">Prev page </button>
            <button onClick={handleOnNextPageClick} type="button">Next page </button>
            <select onChange={handleOnPageChange}>
                <option value={paginationOptions.limit}>{paginationOptions.limit}</option>
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
                <option value={20}>20</option>
                <option value={30}>30</option>
            </select>
            {
                comments && comments.map(comment => {
                    return <UserCommentListItem
                        key={comment.id}
                        comment={comment}
                        user={user}
                    />
                })
            }
        </ListGroup>
    </>
}

export default UserCommentList;