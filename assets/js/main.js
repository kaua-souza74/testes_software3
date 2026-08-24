document.addEventListener("DOMContentLoaded", () => {
    const formLogin = document.getElementById("form-login");
    const formCadastro = document.getElementById("form-cadastro");

    // Exibe o SweetAlert2 estilizado no padrão dark/clean
    function mostrarAlerta(icone, titulo, texto) {
        return Swal.fire({
            icon: icone,
            title: titulo,
            text: texto,
            customClass: {
                popup: 'swal-dark-popup',
                title: 'swal-dark-title',
                confirmButton: 'swal-dark-confirm'
            },
            buttonsStyling: false,
            background: '#16181e',
            color: '#f1f3f5'
        });
    }

    // Validação preventiva de XSS
    function contemXSS(str) {
        const regexXss = /<script\b[^>]*>([\s\S]*?)<\/script>|<[^>]+>/gi;
        return regexXss.test(str);
    }

    // Processar Login
    if (formLogin) {
        formLogin.addEventListener("submit", async (e) => {
            e.preventDefault();
            const email = document.getElementById("email").value.trim();
            const senha = document.getElementById("senha").value.trim();

            if (!email || !senha) {
                mostrarAlerta('warning', 'Campos Vazios', 'Por favor, preencha todos os campos.');
                document.getElementById("mensagem").innerText = "Campos Vazios";
                return;
            }

            if (contemXSS(email) || contemXSS(senha)) {
                mostrarAlerta('error', 'Input Inválido', 'Caracteres maliciosos detectados!');
                document.getElementById("mensagem").innerText = "Input Inválido";
                return;
            }

            try {
                const response = await fetch("process_login.php", {
                    method: "POST",
                    headers: { "Content-Type": "application/x-www-form-urlencoded" },
                    body: `email=${encodeURIComponent(email)}&senha=${encodeURIComponent(senha)}`
                });

                const data = await response.json();
                document.getElementById("mensagem").innerText = data.message;

                if (data.status === "success") {
                    mostrarAlerta('success', 'Sucesso', data.message).then(() => {
                        window.location.href = "index.php"; // Redireciona para o Dashboard
                    });
                } else {
                    mostrarAlerta('error', 'Falha no Acesso', data.message);
                }
            } catch (err) {
                mostrarAlerta('error', 'Erro', 'Erro ao processar requisição no servidor.');
            }
        });
    }

    // Processar Cadastro
    if (formCadastro) {
        formCadastro.addEventListener("submit", async (e) => {
            e.preventDefault();
            const nome = document.getElementById("nome").value.trim();
            const email = document.getElementById("email").value.trim();
            const senha = document.getElementById("senha").value.trim();

            if (!nome || !email || !senha) {
                mostrarAlerta('warning', 'Campos Vazios', 'Por favor, preencha todos os campos.');
                document.getElementById("mensagem").innerText = "Campos Vazios";
                return;
            }

            if (contemXSS(nome) || contemXSS(email) || contemXSS(senha)) {
                mostrarAlerta('error', 'Input Inválido', 'Caracteres maliciosos detectados!');
                document.getElementById("mensagem").innerText = "Input Inválido";
                return;
            }

            try {
                const response = await fetch("process_register.php", {
                    method: "POST",
                    headers: { "Content-Type": "application/x-www-form-urlencoded" },
                    body: `nome=${encodeURIComponent(nome)}&email=${encodeURIComponent(email)}&senha=${encodeURIComponent(senha)}`
                });

                const data = await response.json();
                document.getElementById("mensagem").innerText = data.message;

                if (data.status === "success") {
                    mostrarAlerta('success', 'Conta Criada!', data.message).then(() => {
                        window.location.href = "login.php"; // Redireciona para a tela de login
                    });
                } else {
                    mostrarAlerta('error', 'Erro no Cadastro', data.message);
                }
            } catch (err) {
                mostrarAlerta('error', 'Erro', 'Erro ao processar requisição no servidor.');
            }
        });
    }
});