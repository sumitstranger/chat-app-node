const users = []
const rooms = []

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

    const roomvalue = rooms.find((name)=>{
        return name.room === room
    })

    if (!roomvalue){
            const t = { room, value:1} 
              rooms.push(t)
            }
    else{
        roomvalue.value++
        
    }
    return {user}
}

const removeUser = (id)=>{

    const index = users.findIndex((user)=> {
       return user.id ===id
    })
    
    
    if(index!==-1){
        const room = users[index].room
        const roomIndex = rooms.findIndex((name)=>{
            return name.room === room
        })
        
        rooms[roomIndex].value--
        //roomvalue.value--
        if (rooms[roomIndex].value ==0){
            
            rooms.splice(roomIndex,1)[0]
        }
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

const RoomList = ()=>{
    return rooms
}

module.exports={
    addUser,
    removeUser,
    getUser,
    getUserInRoom,
    RoomList
}