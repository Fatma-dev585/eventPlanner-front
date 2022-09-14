
import axios from 'axios';
const baseURL = 'http://localhost:8081/giskard/availibility';

export const fetchEvents = async () => {
 const response = await axios.get(`http://localhost:8081/giskard/event/availableSlots/2`)
 console.log("response:",response.data);
 const a = [];

response.data.forEach(element => {
    a.push({
        id : element[0],
        title : element[1],
        start : element[2],
        end : element[3],
        duration : element[4],
     })
});
console.log("a:",a);

  return await a;

}

export const storeEvent = async (event) => {
    console.log("formatDate",typeof event.start);
    console.log("formatDate content", Date.parse(event.start));
    console.log("storing api time format:", event.duration)
  // const result = { start:event.start, end: event.end, duration:event.duration};

    return await axios.post(`${baseURL}/add`, {
        method: 'POST',
        header : {
            'Content-Type': 'application/json',
        },
        body : event
    }
    )
}
// to FIX
export const mutateEvent = async (event) => {
    return await fetch(`${baseURL}/add`, {
        method: 'POST',
        header : {
            'Content-Type': 'application/json',
        },
        body : JSON.stringify(event)
    }
    )
}

export const destroyEvent = async (id) => {
    return await fetch(`${baseURL}/deleteById/${id}`, {
        method: 'DELETE'

    })
}

