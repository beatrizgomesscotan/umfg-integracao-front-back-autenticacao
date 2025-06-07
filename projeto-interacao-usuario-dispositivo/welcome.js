// window.onload = function() {
//     const welcomeMessage = document.getElementById('welcome-message');
//     const email = document.getElementById('email');
//     const token = document.getElementById('token');
//     const expiration = document.getElementById('expiration');
  
//     // Pegue os dados do localStorage (você precisa salvar esses dados no login.js, por exemplo)
//     const userEmail = localStorage.getItem('email') || 'Usuário';
//     const userToken = localStorage.getItem('token') || 'sem token';
//     const userExpiration = localStorage.getItem('expiration') || 'não informado';
  
//     welcomeMessage.textContent = `Olá, ${userEmail}! Seja bem-vindo(a).`;
//     email.textContent = userEmail;
//     token.textContent = userToken;
//     expiration.textContent = userExpiration;
//   };
  

  window.onload = function() {
  const welcomeMessage = document.getElementById('welcome-message');
  const email = document.getElementById('email');
  const token = document.getElementById('token');
  const expiration = document.getElementById('expiration');

  const userEmail = localStorage.getItem('email') || 'Usuário';
  const userToken = localStorage.getItem('token') || 'sem token';
  const userExpiration = localStorage.getItem('expiration') || 'não informado';

  welcomeMessage.textContent = `Olá, ${userEmail}! Seja bem-vindo(a).`;
  email.textContent = userEmail;
  token.textContent = userToken;
  expiration.textContent = userExpiration;
};
