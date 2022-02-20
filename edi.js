
/*usage 
set tag
div(contenteditable="plaintext-only" data-time="-")
*/
;(function done(){
  var el=document.querySelector('[contenteditable="plaintext-only"]');
  if(!el)return console.log("notfound contenteditable");
  var style=`
  <style>
[contenteditable="plaintext-only"]{
  position:relative;
  padding:1rem;border:1px solid gray;
}
[contenteditable="plaintext-only"]:after{
  position:absolute;
  right:0;padding:1rem;
  content:attr(data-time);
}  
  </style>
  `,
      savekey=location.href,
      savetimekey=savekey+"-time",
      dat = localStorage.getItem(savekey),
      time= localStorage.getItem(savetimekey),
      update=()=>{
        dat=el.textContent;
        localStorage.setItem(savekey,dat);
        time = formatDate(new Date());
        el.dataset.time=time;
        localStorage.setItem(savetimekey,time);
      }
  ;
  if(dat) el.innerHTML=dat;
  if(time) el.dataset.time=time;  
  document.body.insertAdjacentHTML('beforeend',style);  
  el.onkeydown=debounce(update,500);

  //
  function debounce(callback, wait) {
    let timerId;
    return (...args) => {
      clearTimeout(timerId);
      timerId = setTimeout(() => {
        callback(...args);
      }, wait);
    };
  }
  function formatDate(dt) {
    var y = dt.getFullYear();
    var m = ('00' + (dt.getMonth()+1)).slice(-2);
    var d = ('00' + dt.getDate()).slice(-2);
    var h = ('00' + dt.getHours()).slice(-2);
    var min= ('00' + dt.getMinutes()).slice(-2);
    var s= ('00' + dt.getSeconds()).slice(-2);

    return (y + '-' + m + '-' + d +' ' + h +':' +min+':'+s);
  }

})();/*done*/

