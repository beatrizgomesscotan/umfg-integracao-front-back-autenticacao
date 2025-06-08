document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("register")?.addEventListener("click", function (event) {
      event.preventDefault();
  
      const cadastroSection = document.querySelector(".first-content .second-colunm");
      const email = cadastroSection.querySelector("input[type='email']").value.trim();
      const senha = cadastroSection.querySelectorAll("input[type='password']")[0].value.trim();
      const senhaConfirmada = cadastroSection.querySelectorAll("input[type='password']")[1].value.trim();
  
      if (!email || !senha || !senhaConfirmada) {
        alert("Preencha todos os campos do cadastro!");
        return;
      }
  
      if (senha !== senhaConfirmada) {
        alert("As senhas não coincidem!");
        return;
      }
  
      fetch("https://umfgcloud-autenticacao-service-7e27ead80532.herokuapp.com/Autenticacao/registar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, senha, senhaConfirmada })
      })
      .then(async (response) => {
        const contentType = response.headers.get("content-type");
        const data = contentType?.includes("application/json")
          ? await response.json()
          : { message: await response.text() };
  
        if (response.ok) {
          localStorage.setItem("email", email);
          localStorage.setItem("token", data.token);
          localStorage.setItem("expiration", data.expiration);
          alert("Cadastro concluído com sucesso");
          localStorage.setItem("openLoginAfterRedirect", "true");
          window.location.href = "index.html";
        } else {
          alert(data.message || "Erro ao cadastrar.");
        }
      })
      .catch((error) => {
        console.error("Erro ao conectar com o servidor:", error);
        alert("Erro ao conectar com o servidor.");
      });
    });
  });
  