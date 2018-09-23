import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import EmployeeList from '../components/EmployeeList.vue'

describe('EmployeeList.vue', () => {
  it('should contain a h1 element', () => {
    const wrapper = shallowMount(EmployeeList);
    expect(wrapper.find('h1').text()).contains('Officient | Overzicht medewerkers');
  });
});