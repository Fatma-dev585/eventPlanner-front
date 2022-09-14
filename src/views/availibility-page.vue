<script setup>
import { ref, reactive, watch } from 'vue';
import '@fullcalendar/core/vdom';
import Fullcalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import useEvents from '../composables/UseEvents.js';

const id = ref(10)

const {getEvents, createEvent, updateEvent, deleteEvent} = useEvents();

const options = reactive({
    plugins : [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin],
    initialView : 'dayGridMonth',
    headerToolbar : {
        left : 'prev,next today',
        center : 'title',
        right : 'dayGridMonth, dayGridWeek, listDay'
    },
    editable : true, 
    selectable : true,
    weekends: true,
    droppable: true,
    select: (arg) => {
        
        id.value = id.value + 1
        const cal = arg.view.calendar
        cal.unselect()
        cal.addEvent({
            id: `${id.value}`,
            title: `New Event ${id.value}`,
            start: arg.start,
            end: arg.end,
            allDay: false

        })
    },
    eventClick: (arg) => {
        console.log("arg.event.title:",arg.event)
        if(arg.event)
        {
            arg.event.remove()
        }
    },
    events: [],
    eventAdd: (arg) => {
        createEvent({
           // id: arg.event.id,
            //title: arg.event.title,
            start: Date.parse(arg.event.start),
            end: Date.parse(arg.event.end),
            duration:10,
           // allDay: arg.event.allDay,

        });
    //     axios.post('http://localhost:8081/giskard/availibility/add', {
    //     method: 'POST',
    //     header : {
    //         'Content-Type': 'application/json',
    //     },
    //     body : JSON.stringify({
    //         id: arg.event.id,
    //         //title: arg.event.title,
    //         start: arg.event.start,
    //         end: arg.event.end,
    //         duration:10,
    //        // allDay: arg.event.allDay,

    //     })
    // }
    // );

    },
    eventChange: (arg) => {
        updateEvent({
            id: arg.event.id,
            title: arg.event.title,
            start: arg.event.start,
            end: arg.event.end,
            allDay: arg.event.allDay,

        }, arg.event.id)
    },
    eventRemove: (arg) => {
        deleteEvent(arg.event.id)
    },

})

options.events = getEvents.value

watch(getEvents, () => {
    options.events = getEvents.value
})
</script>

<template >
<div>
    <!-- <Fullcalendar ></Fullcalendar> -->
    <Fullcalendar v-bind:options="options" ></Fullcalendar>
</div>
</template>