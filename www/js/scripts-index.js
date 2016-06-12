new WOW().init();



// This is called with the results from from FB.getLoginStatus().
  function statusChangeCallback(response) {
    console.log('Você clicou no botão, vamos logar usando statusChangeCallback');
    console.log(response);
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
      //location.href="dashboard.html";
      testAPI();
    } else if (response.status === 'not_authorized') {
      // The person is logged into Facebook, but not your app.
      document.getElementById('status').innerHTML = 'Please log ' +
        'into this app.';
        
    } else {
      // The person is not logged into Facebook, so we're not sure if
      // they are logged into this app or not.
      document.getElementById('status').innerHTML = 'Please log ' +
        'into Facebook.';

    }
  }

  // This function is called when someone finishes with the Login
  // Button.  See the onlogin handler attached to it in the sample
  // code below.
  function checkLoginState() {
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
  }

  window.fbAsyncInit = function() {
  FB.init({
    appId      : '1698866733734454',
    cookie     : true,  // enable cookies to allow the server to access 
                        // the session
    xfbml      : true,  // parse social plugins on this page
    version    : 'v2.2' // use version 2.2
  });

  // Now that we've initialized the JavaScript SDK, we call 
  // FB.getLoginStatus().  This function gets the state of the
  // person visiting this page and can return one of three states to
  // the callback you provide.  They can be:
  //
  // 1. Logged into your app ('connected')
  // 2. Logged into Facebook, but not your app ('not_authorized')
  // 3. Not logged into Facebook and can't tell if they are logged into
  //    your app or not.
  //
  // These three cases are handled in the callback function.

  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });

  };

  // Load the SDK asynchronously
  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));

  // Here we run a very simple test of the Graph API after login is
  // successful.  See statusChangeCallback() for when this call is made.
  function testAPI() {
    console.log('Bem vindo! Vamos buscar suas informações');
    FB.api('/me', function(response) {
      console.log('Login ativo com sucesso: ' + response.name);
      document.getElementById('status').innerHTML =
        'Obrigado por logar, ' + response.name + '!';
    });
    FB.api('/me', function(response) {
      console.log(JSON.stringify(response));
  });
  FB.api('/me/permissions', function(response) {
      console.log(JSON.stringify(response));
  });
  FB.api('/me', { locale: 'pt_BR', fields: 'id, name, email' },
    function(response) {
      console.log("ID: "+response.id);
      console.log("NOME: "+response.name);
      console.log("EMAIL: "+response.email);
      if(response.id){ location.href="dashboard.html"; }
    });
  }

  function iniciarLogin(){
    FB.login(function(response) {
    if (response.authResponse) {
     console.log('Login realizado com sucesso.... ');
     FB.api('/me', function(response) {
       console.log('Good to see you, ' + response.name + '.');
       location.href="dashboard.html";
     });
    } else {
     console.log('Ocorreu um erro, ou você cancelou o login.');
    }
});
    //testAPI();
  }

// fazer logoff
//FB.logout(function(response) {
   // Person is now logged out
//});