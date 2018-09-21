
<template>
  <div style="display: flex; flex-direction: row; flex-wrap: wrap;">
    <div v-for="item in employees" v-on:click="openDetail(item.id)" :key="item.id" style="border-radius: 10px; margin: 10px auto; min-width: 42%; max-width: 42%;  border: 1px solid #cbddec; cursor: pointer;">
      <p>
        Naam: {{item.name}}
      </p>
      <p>
        E-mail: {{item.email}}
      </p>
      <p>
        Functie: {{item.role_name}}
      </p>
    </div>
    <p v-if="error">{{error}}</p>
  </div>
</template>
<script>
import EmployeeService from "../services/employee.service.js";
import router from '../router';
export default {
  name: "thomasLedoux",
  data() {
    return {
      employees: null,
      error: null
    };
  },
  methods: {
    openDetail: function(id) {
      router.push({ name: 'EmployeeDetail', params: { employeeId: id }});
    }
  },
  mounted() {
    EmployeeService.getEmployees(
      data => {
        console.log(data);
        this.employees = data.data;
      },
      response => {
        this.error = response;
      }
    );
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
