window.onload = function () {
  const welcomeMessage = document.getElementById('welcome-message');

  const userEmail = localStorage.getItem('email') || 'Usuário';
  const userToken = localStorage.getItem('token') || 'sem token';
  const userExpiration = localStorage.getItem('expiration') || '';

  let formattedExpiration = 'não informado';

  if (userExpiration) {
    try {
      const DateTime = luxon.DateTime;
      const expDate = DateTime.fromISO(userExpiration).setZone('America/Sao_Paulo').setLocale('pt-BR');
      formattedExpiration = expDate.toFormat("d 'de' LLLL 'de' yyyy, HH:mm");
    } catch (error) {
      console.error('Erro ao formatar data:', error);
    }
  }

  welcomeMessage.textContent = `Seja bem-vindo(a), ${userEmail}! Seu token expira ${formattedExpiration}.`;
};

