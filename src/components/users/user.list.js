import React, { lazy } from 'react';

const ListGroup = lazy(() => import('../containers/list.group'))
const ListGropuItem = lazy(() => import('../containers/list.group.item'))

/**
 * Container to render list of users
 * 
 * @param {Props} param0
 * @returns {Component}
 */

 
const UserList = ({
    handleUserClick
}) => {
    
    return <ListGroup>{
        users && users.map(user => {
            // return (<ListGropuItem
            //     key={user.id} user={user}
            //     handleUserClick={handleUserClick}
            // />)
        })
    }</ListGroup>
}

export default UserList;