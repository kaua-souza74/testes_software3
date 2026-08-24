/**
 * testeAutomatizado.js
 *
 * Como rodar:
 * 1) npm install selenium-webdriver
 * 2) node testeAutomatizado.js
 */

const { Builder, By, until } = require("selenium-webdriver");
const fs = require("fs");
const path = require("path");
let relatorio = [];

// ---------- CONFIGURAÇÃO ----------
// Aponta exatamente para a URL da sua aplicação no XAMPP
const TARGET_URL = "http://localhost/ACME_Digital/login.php"; 
const SCREENSHOT_DIR = path.join(__dirname, "assets", "screenshots");
const TIMEOUT_MS = 5000; // Tempo de espera padrão (5 segundos)

// Garante que a pasta de screenshots exista
fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });

// Função para salvar screenshot base64 em arquivo
function salvarScreenshot(base64, nomeArquivo) {
    const filePath = path.join(SCREENSHOT_DIR, nomeArquivo);
    fs.writeFileSync(filePath, base64, "base64");
    return filePath;
}

// ---------- FUNÇÃO DE TESTE ----------
async function testarLogin(email, senha, descricao) {
    let driver = await new Builder().forBrowser("chrome").build();
    let status = "pass";
    let mensagem = "";

    try {
        console.log(`\n----------------------------------------`);
        console.log(`Testando: ${descricao}`);
        await driver.get(TARGET_URL);

        // Preenche o campo e-mail (se informado)
        await driver.wait(until.elementLocated(By.id("email")), TIMEOUT_MS);
        if (email !== "") {
            await driver.findElement(By.id("email")).sendKeys(email);
        }

        // Preenche o campo senha (se informado)
        await driver.wait(until.elementLocated(By.id("senha")), TIMEOUT_MS);
        if (senha !== "") {
            await driver.findElement(By.id("senha")).sendKeys(senha);
        }

        // Clica no botão de login
        await driver.wait(until.elementLocated(By.id("btn-login")), TIMEOUT_MS);
        await driver.findElement(By.id("btn-login")).click();

        // Aguarda a resposta (o script captura do #mensagem auxiliar que colocamos no HTML)
        await driver.wait(until.elementLocated(By.id("mensagem")), TIMEOUT_MS);
        
        // Dá um pequeno tempo para o SweetAlert renderizar na tela antes da foto
        await driver.sleep(1000);

        mensagem = await driver.findElement(By.id("mensagem")).getText();
        console.log(`Resultado capturado: "${mensagem}"`);

        // Tira screenshot e salva
        const safeName = descricao.replace(/\s+/g, "_").replace(/[^a-zA-Z0-9_\-]/g, "");
        const screenshotName = `screenshot_${safeName}.png`;
        const base64 = await driver.takeScreenshot();
        const savedPath = salvarScreenshot(base64, screenshotName);
        
        console.log(`Status: SUCESSO | Print salvo em: ${savedPath}`);
        relatorio.push({
            teste: descricao,
            status,
            mensagem,
            screenshot: savedPath,
        });
    } catch (err) {
        status = "fail";
        console.log("Erro durante a execução:", err.message);

        try {
            const safeName = descricao.replace(/\s+/g, "_").replace(/[^a-zA-Z0-9_\-]/g, "");
            const screenshotName = `screenshot_erro_${safeName}.png`;
            const base64 = await driver.takeScreenshot();
            const savedPath = salvarScreenshot(base64, screenshotName);
            
            relatorio.push({
                teste: descricao,
                status,
                mensagem: err.message,
                screenshot: savedPath,
            });
        } catch (e) {
            relatorio.push({
                teste: descricao,
                status,
                mensagem: err.message,
                screenshot: null,
            });
        }
    } finally {
        await driver.quit();
    }
}

// ---------- CASOS DE TESTE OBRIGATÓRIOS DO PROFESSOR ----------
const testes = [
    { email: "kaua2@gmail.com", senha: "1234", descricao: "Login Correto" },
    { email: "kaua2@gmail.com", senha: "errada", descricao: "Senha Incorreta" },
    { email: "", senha: "1234", descricao: "Campo Email Vazio" },
    { email: "kaua2@gmail.com", senha: "", descricao: "Campo Senha Vazio" },
    { email: "<script>alert(1)</script>", senha: "1234", descricao: "Tentativa de XSS" },
    { email: "' OR '1'='1", senha: "1234", descricao: "Tentativa de SQL Injection" }
];

// ---------- EXECUÇÃO SEQUENCIAL ----------
(async () => {
    if (!Array.isArray(testes) || testes.length === 0) {
        console.log("Nenhum teste configurado.");
        return;
    }

    console.log("🚀 Iniciando suíte de testes automatizados via Selenium...");

    for (let t of testes) {
        await testarLogin(t.email, t.senha, t.descricao);
    }

    // Salva o relatório consolidado em JSON
    fs.writeFileSync("relatorio.json", JSON.stringify(relatorio, null, 2));
    console.log("\n========================================");
    console.log("✅ Todos os testes foram executados!");
    console.log("📄 Relatório final salvo em: relatorio.json");
    console.log("📸 Screenshots salvos em: assets/screenshots/");
    console.log("========================================\n");
})();