# ACME Digital - Sistema de Autenticação e Testes Automatizados

Projeto desenvolvido para validação de usabilidade, prevenção de falhas de segurança (XSS e SQL Injection) e automação de testes com Selenium.

## 🚀 Instalação e Configuração

### 1. Banco de Dados (XAMPP)
1. Inicie os módulos **Apache** e **MySQL** no XAMPP Control Panel.
2. Acesse `http://localhost/phpmyadmin/`.
3. Importe o arquivo `schema.sql` ou execute o script SQL contido nele para criar o banco `acme_digital` e a tabela `usuarios`.

### 2. Executando a Aplicação
Coloque a pasta do projeto dentro de `C:/xampp/htdocs/ACME_Digital/`.
Acesse no navegador:
- **Login:** `http://localhost/ACME_Digital/index.php`
- **Cadastro:** `http://localhost/ACME_Digital/cadastro.php`

---

## 🧪 Rodando os Testes Automatizados (Terminal)

1. Abra o terminal do VS Code na pasta do projeto.
2. Instale as dependências executando:
   ```bash
   npm install