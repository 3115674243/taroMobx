import counterStore from '../store/counter';


describe('mobx',  () => {
  it('counterStore', async () => {
    counterStore.increment();
    expect(counterStore.counter).toEqual(1);
  })
})
