 <template>

<div class="container">
  <div class="card" v-for="item in events" :key="item.id">
   
    <div class="card-header">
      <div class="card-title h5">
        <slot name="title">{{item.title}}</slot>
      </div>
    
    </div>
    <div class="card-body">
      <slot name="body"><p> {{item.description}}</p></slot>
    </div>
    <div class="card-footer">
      <slot name="button-reservation">
        <router-link :to="`/reservation/${item.id}`" class="btn btn-info btn-sm">Reservation</router-link>
        </slot>
    </div>
  </div>
</div>
</template>
<script>
import axios from "axios";

export default {
  name: "events-page",

  data() {
 
    return {
      events: [],
      
    };
  },
  async mounted() {
    let result = await axios.get(
      `http://localhost:8081/giskard/event/getAll`
    );
    console.log("result.data:", result.data);
    this.events = result.data;
  },
  methods: {
  },
};
</script> 
<style scoped>
.container {
  display: flex;
  flex-wrap: wrap;
  margin: -10px 0 0 -10px;
    
}
.card {
    width: 280px;
    height: 250px;
    display: inline-block;
    margin: 10px 0 0 10px;
    flex-grow: 1;
    overflow: hidden;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    
}
p {
    padding-bottom: 100px;
    overflow: hidden;
    height: 100px;
    font-size: 13px;
 }
.card-footer {
    display:flex; 
    justify-content: right;
    font-size: 8px;

}

</style>