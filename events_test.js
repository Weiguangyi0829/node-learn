const EventEmitter = require('events');

class MyObject extends EventEmitter{

}
const myObj = new MyObject();

myObj.on('a', function (data) {
    console.log('参数',data);

})
myObj.emit('a','hello');
const events = new EventEmitter();

events.on('click', function (data) {
    console.log(data);

});
function removeHandler (data) {
    console.log('delete', data.userId);

}
events.on('remove', removeHandler);

events.emit('click', 'click!');

events.emit('remove', { userId: '1' }); 

events.off('remove',removeHandler);

events.emit('remove', { userId: '2' }); 