const k = async () => {
    await Promise.resolve('apple').then((elt)=> elt+" iphone");
}
async function kk () {
   let g = await Promise.resolve().then(()=> "gg iphone");
   console.log(g)
}
kk()