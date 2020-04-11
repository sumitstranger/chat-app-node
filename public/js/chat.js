const socket = io()

const $messageForm = document.querySelector('#message-form')
const $messageFormInput = $messageForm.querySelector('input')
const $messageFormButton = $messageForm.querySelector('button')
const $sendlocationButton = document.querySelector('#send-location')
const $messages = document.querySelector('#messages')

const messageTemplate = document.querySelector('#message-tempplate').innerHTML
const locationTemplate = document.querySelector('#location-tempplate').innerHTML
const sidebarTemplate = document.querySelector('#sidebar-template').innerHTML

const {username, room} = Qs.parse(location.search,{ignoreQueryPrefix: true})


const autoscroll = () => {
    // New message element
    const $newMessage = $messages.lastElementChild

    // Height of the new message
    const newMessageStyles = getComputedStyle($newMessage)
    const newMessageMargin = parseInt(newMessageStyles.marginBottom)
    const newMessageHeight = $newMessage.offsetHeight + newMessageMargin

    // Visible height
    const visibleHeight = $messages.offsetHeight

    // Height of messages container
    const containerHeight = $messages.scrollHeight

    // How far have I scrolled?
    const scrollOffset = $messages.scrollTop + visibleHeight

    if (containerHeight - newMessageHeight <= scrollOffset) {
        $messages.scrollTop = $messages.scrollHeight
    }
}



socket.on('message',(msg)=>{
    //console.log(msg);
    const html = Mustache.render(messageTemplate,{
        username:msg.username,
        msg: msg.text,
        createdAt: moment(msg.createdAt).format('h:mm a')
    })
    $messages.insertAdjacentHTML('beforeend',html)
    autoscroll()
})

socket.on('locationMessage',(msg)=>{
    //console.log('From anotherL :',url);
    const html = Mustache.render(locationTemplate,{
        username:msg.username,
        url: msg.url,
        createdAt: moment(msg.createdAt).format('h:mm a')
    })
    $messages.insertAdjacentHTML('beforeend',html)
    autoscroll()
})

socket.on('roomData',({room,users})=>{
    const html = Mustache.render(sidebarTemplate,{
        room,
        users
    })
    document.querySelector('#sidebar').innerHTML = html
})

document.querySelector('form').addEventListener('submit',(e)=>{
    e.preventDefault()
    $messageFormButton.setAttribute('disabled','disabled')
  
    const msg = e.target.elements.message.value
    socket.emit('sendMessage', msg, (error)=>{

        $messageFormButton.removeAttribute('disabled')
        $messageFormInput.value = ''
        $messageFormInput.focus()

        if (error){
            return console.log(error);
        }
        console.log("Msg-sent :-p");
        
    })
    
})

document.querySelector('#send-location').addEventListener('click',()=>{
    if (!navigator.geolocation){
        return alert('Geolocation is not supported by your browser.')
    }
    $sendlocationButton.setAttribute('disabled','disabled')
    navigator.geolocation.getCurrentPosition((position)=>{
       
        const {latitude,longitude} = position.coords
        //console.log(latitude,longitude);
        socket.emit('sendLocation',{latitude,longitude},(akw)=>{
            $sendlocationButton.removeAttribute('disabled')
            console.log(akw);
            
        })
    })
})

socket.emit('join',{username,room},(error)=>{
    if(error){
        alert(error)
        location.href = '/'
    }
})