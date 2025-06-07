
// document.addEventListener("DOMContentLoaded", function () {
//   const body = document.querySelector("body");

//   // Classe inicial
//   body.className = "on-load";

//   // Botões alternar telas
//   document.getElementById("signIn")?.addEventListener("click", () => {
//     body.className = "sign-in";
//   });

//   document.getElementById("signUp")?.addEventListener("click", () => {
//     body.className = "sign-up";
//   });


document.addEventListener("DOMContentLoaded", function () {
  const body = document.querySelector("body");

  // Verifica se deve abrir direto na tela de login após o cadastro
  if (localStorage.getItem("openLoginAfterRedirect") === "true") {
    body.className = "sign-in"; // Força a exibição da tela de login
    localStorage.removeItem("openLoginAfterRedirect"); // Limpa a flag para não repetir
  } else {
    body.className = "on-load"; // Classe inicial padrão
  }

  // Botões alternar telas
  document.getElementById("signIn")?.addEventListener("click", () => {
    body.className = "sign-in";
  });

  document.getElementById("signUp")?.addEventListener("click", () => {
    body.className = "sign-up";
  });


  // Cadastro
  document.getElementById("register").addEventListener("click", function (event) {
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
          console.log("Dados do cadastro:", data);
          localStorage.setItem("email", email);
          localStorage.setItem("token", data.token);
          localStorage.setItem("expiration", data.expiration);
          
          alert("Cadastro concluido com sucesso")
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

  // Login
  document.getElementById("access").addEventListener("click", function (event) {
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
          console.log("Dados do login:", data);
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



// document.addEventListener("DOMContentLoaded", function () {
//   const body = document.querySelector("body");

//   // Classe inicial
//   body.className = "on-load";

//   // Botões alternar telas
//   document.getElementById("signIn")?.addEventListener("click", () => {
//     body.className = "sign-in";
//   });

//   document.getElementById("signUp")?.addEventListener("click", () => {
//     body.className = "sign-up";
//   });

//   // Cadastro
//   document.getElementById("register").addEventListener("click", function (event) {
//     event.preventDefault();

//     const cadastroSection = document.querySelector(".first-content .second-colunm");

//     const email = cadastroSection.querySelector("input[type='email']").value.trim();
//     const senha = cadastroSection.querySelectorAll("input[type='password']")[0].value.trim();
//     const senhaConfirmada = cadastroSection.querySelectorAll("input[type='password']")[1].value.trim();

//     if (!email || !senha || !senhaConfirmada) {
//       alert("Preencha todos os campos do cadastro!");
//       return;
//     }

//     if (senha !== senhaConfirmada) {
//       alert("As senhas não coincidem!");
//       return;
//     }

//     fetch("https://umfgcloud-autenticacao-service-7e27ead80532.herokuapp.com/Autenticacao/registar", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify({ email, senha, senhaConfirmada })
//     })
//       .then(async (response) => {
//         const contentType = response.headers.get("content-type");
//         const data = contentType?.includes("application/json")
//           ? await response.json()
//           : { message: await response.text() };

//         if (response.ok) {
//           localStorage.setItem("email", email);
//           localStorage.setItem("token", data.token);
//           localStorage.setItem("expiration", data.expiration);
//           window.location.href = "welcome.html";
//         } else {
//           alert(data.message || "Erro ao cadastrar.");
//         }
//       })
//       .catch((error) => {
//         console.error("Erro ao conectar com o servidor:", error);
//         alert("Erro ao conectar com o servidor.");
//       });
//   });

//   // Login
//   document.getElementById("access").addEventListener("click", function (event) {
//     event.preventDefault();

//     const loginSection = document.querySelector(".second-content .second-colunm");

//     const email = loginSection.querySelector("input[type='email']").value.trim();
//     const senha = loginSection.querySelector("input[type='password']").value.trim();

//     if (!email || !senha) {
//       alert("Preencha todos os campos do login!");
//       return;
//     }

//     fetch("https://umfgcloud-autenticacao-service-7e27ead80532.herokuapp.com/Autenticacao/autenticar", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify({ email, senha })
//     })
//       .then((response) =>
//         response.json().then((data) => ({ ok: response.ok, data }))
//       )
//       .then(({ ok, data }) => {
//         if (ok) {
//           localStorage.setItem("email", email);
//           localStorage.setItem("token", data.token);
//           localStorage.setItem("expiration", data.expiration);
//           window.location.href = "welcome.html";
//         } else {
//           alert(data.message || "Usuário ou senha inválidos.");
//         }
//       })
//       .catch((error) => {
//         console.error("Erro ao conectar com o servidor:", error);
//         alert("Erro ao conectar com o servidor.");
//       });
//   });
// }); --------correto - login













// document.addEventListener("DOMContentLoaded", function () {
//     const body = document.querySelector("body");

//     // Aplica a classe de carregamento inicial
//     body.className = "on-load";

//     // Alternar entre login e cadastro
//     document.getElementById("signIn")?.addEventListener("click", () => {
//         body.className = "sign-in";
//     });

//     document.getElementById("signUp")?.addEventListener("click", () => {
//         body.className = "sign-up";
//     });

//     // Botão de cadastro
//     document.getElementById("register")?.addEventListener("click", function (event) {
//         event.preventDefault();

//         const email = document.querySelector(".second-colunm input[type='email']").value;
//         const senha = document.querySelector(".second-colunm input[type='password']").value;
//         const senhaConfirmada = document.querySelectorAll(".second-colunm input[type='password']")[1]?.value;

//         if (!email || !senha || !senhaConfirmada) {
//             alert("Preencha todos os campos!");
//             return;
//         }

//         if (senha !== senhaConfirmada) {
//             alert("As senhas não coincidem!");
//             return;
//         }

//         fetch("https://umfgcloud-autenticacao-service-7e27ead80532.herokuapp.com/Autenticacao/registar", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify({ email, senha, senhaConfirmada })
//         })
//         .then(async (response) => {
//             const contentType = response.headers.get("content-type");
//             let data;
        
//             if (contentType && contentType.includes("application/json")) {
//                 data = await response.json();
//             } else {
//                 data = { message: await response.text() };
//             }

//             console.log("Resposta da API:", data);
        
//             if (response.ok) {
//                 window.location.href = `welcome.html?email=${email}&token=${data.token}&expiracao=${data.expiration}`;
//             } else {
//                 alert(data.message || "Erro ao cadastrar.");
//             }
//         })
//         .catch(error => {
//             console.error("Erro na requisição:", error);
//             alert("Erro ao conectar com o servidor.");
//         });
//     });

//     // Botão de login
//     document.getElementById("access")?.addEventListener("click", function (event) {
//         event.preventDefault();

//         const email = document.querySelector(".second-content .second-colunm input[type='email']").value;
//         const senha = document.querySelector(".second-content .second-colunm input[type='password']").value;

//         if (!email || !senha) {
//             alert("Preencha todos os campos!");
//             return;
//         }

//         fetch("https://umfgcloud-autenticacao-service-7e27ead80532.herokuapp.com/Autenticacao/autenticar", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify({ email, senha })
//         })
//         .then(response => response.json().then(data => ({ ok: response.ok, data })))
//         .then(({ ok, data }) => {
//             if (ok) {
//                 window.location.href = `welcome.html?email=${email}&token=${data.token}&expiracao=${data.expiration}`;
//             } else {
//                 alert(data.message || "Usuário ou senha inválidos.");
//             }
//         })
//         .catch(error => {
//             console.error("Erro na requisição:", error);
//             alert("Erro ao conectar com o servidor.");
//         });
//     });
// });
