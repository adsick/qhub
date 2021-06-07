const form = document.getElementById('form-registration');
console.log('form: ', form);
const button = document.getElementById('button-registration')
const username = document.getElementById('username-registration');
const email = document.getElementById('email-registration');
const password = document.getElementById('password-registration');
const password2 = document.getElementById('password2-registration');


button.addEventListener('click', e => {
	e.preventDefault();	
	checkInputs();
});

function checkInputs() {
	// trim to remove the whitespaces
	const usernameValue = username.value.trim();
	const emailValue = email.value.trim();
	const passwordValue = password.value.trim();
	const password2Value = password2.value.trim();
	let counter = 0;
	if(usernameValue === '') {
		setErrorFor(username, 'Username cannot be blank');
	} else {
		setSuccessFor(username);
    counter++
	}
	
	if(emailValue === '') {
		setErrorFor(email, 'Email cannot be blank');
	} else if (!isEmail(emailValue)) {
		setErrorFor(email, 'Not a valid email');
	} else {
		setSuccessFor(email);
    counter++
	}
	
	if(passwordValue === '') {
		setErrorFor(password, 'Password cannot be blank');
	} else {
		setSuccessFor(password);
    counter++
	}
	
	if(password2Value === '') {
		setErrorFor(password2, 'Password2 cannot be blank');
	} else if(passwordValue !== password2Value) {
		setErrorFor(password2, 'Passwords does not match');
	} else{
		setSuccessFor(password2);
    counter++
	}

  if (counter == 4) {
    //! goto upstream
    let formData = new FormData()
    
    formData.append('username', username.value);
    formData.append('password', password.value);
    console.log('formData: ', ...formData);
    const searchParams = new URLSearchParams()
    for (const pair of formData){
      searchParams.append(pair[0],pair[1])
    }

    /*const formData = {      
      'username': username.value,
      'password': password.value      
    }*/
    
      await fetch("user/register",
          {
            /*headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },*/
              body: searchParams,
              method: "post"
          })
          .then((res) => {
            res.text()
          })
          .then((text) => {
            console.log(text);
          })
        
          window.location.href = "/index.html"  
        
    //form.submit()    
}
}

function setErrorFor(input, message) {
	const formControl = input.parentElement;
	const small = formControl.querySelector('small');
	formControl.className = 'form-control-registration error';
	small.innerText = message;
}

function setSuccessFor(input) {
	const formControl = input.parentElement;
	formControl.className = 'form-control-registration success';
}
	
function isEmail(email) {
	return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}
