import Vue from 'vue'
import VueResource from 'vue-resource'
Vue.use(VueResource);

const OfficientAPI = 'http://localhost:4000/api/'

export default {
    getEmployees(success, error) {
        Vue.http.get(OfficientAPI + 'employees').then(response => {
            success(response.body);
          }, response => {
              error(response);
            // error callback
          });
        /*Vue.http.get('employees').then(
            (response) => {
                success(response.data)
            },
            (response) => {
                error(response)
            }
        )*/
    },
    getEmployeeById(id, success, error) {
        Vue.http.get(OfficientAPI + 'employee?id=' + id).then(response => {
            success(response.body);
          }, response => {
              error(response);
            // error callback
          });
        /*Vue.http.get('employees').then(
            (response) => {
                success(response.data)
            },
            (response) => {
                error(response)
            }
        )*/
    }
}