import React, { lazy, useEffect, useState } from 'react';

import UserService from '../users/users.service';

const UserList = lazy(() => import('../users/user.list'))
const UserCommentList = lazy(() => import('../users/user.comment.list'))

const Home = ({  
    searchTerm, 
    ...props 
}) => {
    const [users, setUsers] = useState(null)
    const [comments, setUserComments] = useState([])
    const [user, setUser] = useState({ name: '' })

    const [currentPage, setCurrent] = useState([])
    const [paginationOptions, setPaginationOptions] = useState({ page: 0, limit: 10 })

    const currentPageComments = (listOfComments, first, last) => listOfComments.slice(first, last)

    // fetch comments for this user
    const fetchUserComments = userId => {
        UserService.getUserComments(userId)
            .then(response => {
                setUserComments(response)
                setCurrent(currentPageComments(response, paginationOptions.page, paginationOptions.limit))
            })
            .catch(error => console.log(error))
    }

    useEffect(() => {
        !searchTerm && UserService.getUsers()
            .then(response => {
                // set list of all users
                setUsers(response)
                // set first user only
                setUser(response[0])
                // fetch comments for first user
                // initially populate in the comments list view
                fetchUserComments(response[0].id)
            }).catch(error => console.log(error))

        searchTerm && UserService.searchUsers(searchTerm)
            .then(response => setUsers(response))
            .catch(error => console.log(error))

    }, [searchTerm]) // TODO introduce infinite loop here

    const handleOnNextPageClick = () => {
        setPaginationOptions((prevOptions) => {
            return ({
                ...prevOptions,
                // TODO: Check max size
                page: comments.length === prevOptions.page
                    ? comments.length : prevOptions.page + paginationOptions.limit
            })
        });
        const nextPage = comments.length === paginationOptions.page
            ? comments.length : paginationOptions.page + paginationOptions.limit
        // get next page of comments
        setCurrent(currentPageComments(comments, nextPage, paginationOptions.limit + nextPage))
    }

    const handleOnPrevPageClick = () => {
        setPaginationOptions((prevOptions) => {
            return ({
                ...prevOptions,
                // TODO: Check min size
                page: prevOptions.page <= paginationOptions.limit
                    ? 0 : prevOptions.page - paginationOptions.limit
            })
        });
        const prevPage = paginationOptions.page <= paginationOptions.limit
            ? 0 : paginationOptions.page - paginationOptions.limit
        // get prev page of comments
        setCurrent(currentPageComments(comments, prevPage, paginationOptions.limit - prevPage))
    }

    const handleOnPageChange = ev => {
        ev.persist();
        const value = parseInt(ev.target.value);
        // page size change
        setCurrent(currentPageComments(comments, paginationOptions.page, value))
        setPaginationOptions((prevOptions) => ({
            ...prevOptions,
            limit: value
        }))
    };

    // Get Which user was clicked in the list
    const handleUserClick = (e, account) => setUser(account)

    return <div className="container">
        <div className="row flex-xl-nowrap">
            {/* List of Users */}
            <div className="col-md-6 col-xl-5 bd-sidebar bd-content">
                <nav id="bd-docs-nav" aria-label="Main navigation">
                    <div className="bd-toc-item active">
                        <h6 className="bd-toc-link">User Accounts</h6>
                        {/* User list container */}
                        <UserList handleUserClick={handleUserClick} users={users} />
                    </div>
                </nav>
            </div>

            {/* User comments */}
            <main className="col-md-8 col-xl-8 py-md-3 pl-md-5 bd-content" role="main">
                <h1 className="bd-title" id="content">{user.name}</h1>
                {/* Comments list container */}
                <UserCommentList
                    user={user}
                    comments={currentPage}
                    paginationOptions={paginationOptions}
                    handleOnNextPageClick={handleOnNextPageClick}
                    handleOnPrevPageClick={handleOnPrevPageClick}
                    handleOnPageChange={handleOnPageChange}
                />
            </main>
        </div>
    </div>
}

 export default Home;