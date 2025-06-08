
document.addEventListener("DOMContentLoaded", function () {
  const body = document.querySelector("body");

  // Verifica se deve abrir direto na tela de login após o cadastro
  if (localStorage.getItem("openLoginAfterRedirect") === "true") {
    body.className = "sign-in";
    localStorage.removeItem("openLoginAfterRedirect");
  } else {
    body.className = "on-load";
  }

  // Botões alternar telas
  document.getElementById("signIn")?.addEventListener("click", () => {
    body.className = "sign-in";
  });

  document.getElementById("signUp")?.addEventListener("click", () => {
    body.className = "sign-up";
  });

  // Login
  document.getElementById("access")?.addEventListener("click", function (event) {
    event.preventDefault();

    const loginSection = document.querySelector(".second-content .second-colunm");
    const email = loginSection.querySelector("input[type='email']").value.trim();
    const senha = loginSection.querySelector("input[type='password']").value.trim();

    if (!email || !senha) {
      alert("Preencha todos os campos do login!");
      return;
    }

    fetch("https://umfgcloud-autenticacao-service-7e27ead80532.herokuapp.com/Autenticacao/autenticar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, senha })
    })
    .then(async (response) => {
      const contentType = response.headers.get("content-type");
      const data = contentType?.includes("application/json")
        ? await response.json()
        : { message: await response.text() };

      if (response.ok) {
        localStorage.setItem("email", email);
        localStorage.setItem("token", data.token);
        localStorage.setItem("expiration", data.dataExpiracao);
        window.location.href = "welcome.html";
      } else {
        alert(data.message || "Usuário ou senha inválidos.");
      }
    })
    .catch((error) => {
      console.error("Erro ao conectar com o servidor:", error);
      alert("Erro ao conectar com o servidor.");
    });
  });
});

