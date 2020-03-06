import counterStore from '../src/store/counter';


describe('test',  () => {
  it('first', async () => {
    counterStore.increment();
    expect(counterStore.counter).toEqual(1);
  });
})
