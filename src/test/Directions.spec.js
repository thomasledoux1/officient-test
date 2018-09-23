import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import Directions from '../components/Directions.vue'

describe('Directions.vue', () => {
  it('should contain a div for every day of the week', () => {
    const wrapper = shallowMount(Directions);
    expect(wrapper.findAll('.day-title').length === 5);
  });
});