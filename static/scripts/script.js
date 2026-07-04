const button =document.getElementById('send');

button.addEventListener('click' , ()=>{
  
  const name = document.getElementById('name').value;
  const email =document.getElementById('email').value;
  const phone =document.getElementById('phone').value;
  const subject=document.getElementById('subject').value;
  const message = document.getElementById('message').value;

  if (!name ||!email ||!phone ||!subject ||!message) {
    alert('please fill the missing details');
    return;
  }


  button.textContent='Sent';
  button.style.backgroundColor='Gray';
  button.disabled =true;

  const text = encodeURIComponent(`Name:${name}\nEmail:${email}\nPhone Number:${phone}\nSubject:${subject}\nMessage:${message}`);
  window.open(`https://wa.me/917997937272?text=${text}`, '_blank');

  document.getElementById('name').value='';
  document.getElementById('email').value ='';
  document.getElementById('phone').value='';
  document.getElementById('subject').selectedIndex=0;
  document.getElementById('message').value='';

});

  






