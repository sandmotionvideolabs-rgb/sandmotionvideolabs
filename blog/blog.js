// PASTE YOUR GOOGLE APPS SCRIPT WEB APP URL BETWEEN THE QUOTES BELOW (only here, once)
var ENDPOINT='https://script.google.com/macros/s/AKfycbyHyOMPN_9S3O_PuTJF0UpmjkmyXj3_HYdzdDP7L8fiJfaxr_9HZRWWFKJE_3Ao8MlD/exec';

function track(n,p){if(window.gtag)gtag('event',n,p||{})}
document.addEventListener('click',function(e){var a=e.target.closest('[data-evt]');if(a)track(a.dataset.evt)});
// reading progress
(function(){var b=document.getElementById('bar');if(!b)return;
 addEventListener('scroll',function(){var h=document.documentElement,m=h.scrollHeight-h.clientHeight;b.style.width=(m>0?h.scrollTop/m*100:0)+'%'},{passive:true})})();
// free resource forms
(function(){
 var re=/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
 function unlock(file){document.querySelectorAll('.mform[data-file="'+file+'"]').forEach(function(f){
  var box=f.parentNode,dl=box.querySelector('.dl');f.style.display='none';dl.hidden=false;
  var s=document.createElement('p');s.className='mstatus ok';s.textContent='Thank you. Your free resource is ready below.';box.insertBefore(s,dl)})}
 document.querySelectorAll('.mform').forEach(function(f){
  var st=f.querySelector('.mstatus'),btn=f.querySelector('button');
  f.addEventListener('submit',function(e){
   e.preventDefault();st.className='mstatus';st.textContent='';
   var n=f.elements.name,m=f.elements.email,bad=false;
   [[n,!n.value.trim()],[m,!re.test(m.value.trim())]].forEach(function(x){x[0].setAttribute('aria-invalid',x[1]?'true':'false');if(x[1])bad=true});
   if(bad){st.className='mstatus bad';st.textContent='Please enter your name and a valid email address.';return}
   if(!f.elements.consent.checked){st.className='mstatus bad';st.textContent='Please tick the consent box to continue.';return}
   if(f.elements.website.value)return;
   if(!/^https:\/\/script\.google\.com\//.test(ENDPOINT)){st.className='mstatus bad';st.textContent='This form is not connected yet. Please use WhatsApp or email for now.';return}
   var title=f.dataset.title,fd=new FormData();
   fd.append('name',n.value.trim());fd.append('email',m.value.trim());fd.append('company','');
   fd.append('service','Lead magnet: '+title);fd.append('message','Requested free resource: '+title+' (page: '+location.pathname+')');
   fd.append('budget','');fd.append('consent','on');fd.append('website','');
   btn.disabled=true;var old=btn.textContent;btn.textContent='Sending...';
   fetch(ENDPOINT,{method:'POST',body:fd}).then(function(r){return r.json()}).then(function(r){
    if(!r||r.result!=='success')throw new Error('fail');
    track('generate_lead',{form:'lead_magnet',resource:title});unlock(f.dataset.file)})
   .catch(function(){st.className='mstatus bad';st.textContent='We could not send that. Please try again, or message us on WhatsApp.';track('form_error')})
   .finally(function(){btn.disabled=false;btn.textContent=old})
  })})
})();