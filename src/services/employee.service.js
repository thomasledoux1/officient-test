import Vue from 'vue'
import VueResource from 'vue-resource'
Vue.use(VueResource);

const OfficientAPI = 'http://localhost:5000/api/'

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
    },
    getDirections(address, success, error, toWork = null) {
        let query = '?address=' + address;
        if (toWork) {
            query += '&toWork=true';
        }
        console.log(query);
        Vue.http.get(OfficientAPI + 'directions' + query).then(response => {
            success(response.body);
        }, response => {
            error(response);
            // error callback
        });
    }
}