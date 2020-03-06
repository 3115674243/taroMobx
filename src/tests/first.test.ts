import counterStore from '../store/counter';


describe('test',  () => {
  it('first', async () => {
    counterStore.increment();
    expect(counterStore.counter).toEqual(1);
  })
})
