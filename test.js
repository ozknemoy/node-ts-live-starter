
const prom1 = () => new Promise((res, fail) => {
  setTimeout(() => (
    prom2().then(
      () => (console.log('====ok prom1')),
  e => {console.log('====err 1');fail(e)}
)
), 100)
});
const prom2 = () => new Promise((res, fail) => {
  setTimeout(() => {
    prom3().then(
      () => res(console.log('====ok prom2'))/*,
      e => fail(console.log('====err 2'))*/
    );
  }, 300)
});
const prom3 = () =>new Promise((res, fail) => {
  return(prom4().then(
  () => (console.log('====ok prom3')),
  e => {console.log('====err 3');fail(e)}
))
});
const prom4 = () =>new Promise((res, fail) => {
  fail('qwet')
});


prom1().then(
  () => console.log('ok prom1'),
  e => console.log('====err 1 end')
)/*.catch(e => console.log('end catch error1'))*/;