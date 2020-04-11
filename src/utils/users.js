const users = []

const addUser = ({id,username,room})=>{

    //clean the data
    username = username.trim().toLowerCase()
    room = room.trim().toLowerCase()

    //validate data
    if(!username || !room){
        return {
            error: 'Username & room is required!'
        }
    }

    //check for exisiting user
    const exsitingUser = users.find((user)=>{
        return user.room === room && user.username === username
    })
    
    //validate username
    if(exsitingUser){
        return {
            error: 'User is already in'
        }
    }

    //store user
    const user = {id,username,room}
    users.push(user)
    return {user}
}

const removeUser = (id)=>{
    const index = users.findIndex((user)=> user.id ===id)
    if(index!==-1){
        return users.splice(index,1)[0]
    }
}

const getUser = (id)=>{
    const user = users.find((user)=> user.id===id)
    return user
}

const getUserInRoom = (room)=>{
    const list = users.filter((user)=>{
        return user.room === room
    })
    return list
}

module.exports={
    addUser,
    removeUser,
    getUser,
    getUserInRoom
}