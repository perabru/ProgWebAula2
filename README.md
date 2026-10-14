ProgWebAula2 — HTML, CSS, JavaScript e integração com Google Sheets
Da calculadora da aula a duas aplicações completas.
Material baseado na leitura dos arquivos do repositório perabru/ProgWebAula2, na branch `main`, em 13 de outubro de 2026. A autoria do código original do repositório é mantida. Esta edição acrescenta documentação, dois projetos independentes e testes, sem substituir os quatro arquivos da aula.
> **O que já existia:** `index.html`, `contato.html`, `estilo.css`, `index.js` e um `README.md` com o título `ProgWebAula2`.
>
> **O que foi criado nesta entrega:** este README detalhado, o **DevQuest**, o **Conecta Sheets** e os arquivos de teste. A documentação distingue o comportamento do original das melhorias propostas. Os arquivos deste pacote não são uma confirmação de commit ou implantação remota.
Navegação
1. Visão geral e estrutura
2. Como executar a aula
3. Explicação completa dos arquivos originais
4. Cuidados e versão sugerida da calculadora
5. Projeto surpresa: DevQuest
6. Projeto 2: Conecta Sheets — configuração e código integral
7. Testes, publicação dos arquivos e próximos exercícios
<a id="visao-geral"></a>
1. Visão geral e estrutura
A aula original apresenta uma página com dois campos numéricos, botões para somar e limpar, abertura de uma conversa no WhatsApp e navegação para uma página de contato. Na página de contato, o texto digitado é inserido em um link de conversa. Não existe servidor próprio, banco de dados, autenticação ou gravação em planilha na versão original.
A proposta pedagógica é visualizar três responsabilidades: HTML estrutura, CSS apresenta e JavaScript reage às ações do usuário. A integração com um servidor aparece apenas no novo projeto 2.
```text
ProgWebAula2/
├── README.md                              # Este guia e a solução integral do projeto 2
├── index.html                             # Calculadora original da aula, preservada
├── contato.html                           # Contato original da aula, preservado
├── estilo.css                             # CSS original da aula, preservado
├── index.js                               # JavaScript original da aula, preservado
├── projetos/
│   ├── 01-devquest/
│   │   ├── README.md                      # Guia do quiz e personalização
│   │   ├── index.html                     # Estrutura do jogo
│   │   ├── estilo.css                     # Layout e temas
│   │   └── script.js                      # Questões, pontuação e calculadora
│   └── 02-conecta-sheets/
│       ├── README.md                      # Solução completa do formulário
│       ├── previa-local.html              # Interface local; NÃO envia dados
│       └── apps-script/
│           ├── Code.gs                    # Servidor Apps Script
│           ├── Index.html                 # Template da interface
│           ├── Estilos.html               # CSS em <style>
│           └── JavaScript.html            # JavaScript em <script>
└── testes/
    ├── RELATORIO.md                        # Resultados e limitações
    ├── testar-servidor.cjs                 # Testes com serviços Google simulados
    ├── testar-interface.py                # Testes de interface em Chromium
    └── capturas/                          # Telas capturadas nos testes
```
Os novos projetos não dependem dos arquivos da raiz. Assim, podem ser estudados separadamente sem alterar a aula básica. Não é preciso instalar React, Vue, Bootstrap, banco SQL ou um conjunto de dependências npm para executar as interfaces.
<a id="executar"></a>
2. Como executar a aula e os projetos
Depois de extrair o pacote, abra o `index.html` da raiz para visualizar a aula original. Para o DevQuest, abra `projetos/01-devquest/index.html`. Para conferir apenas o visual do Conecta Sheets, abra `projetos/02-conecta-sheets/previa-local.html`.
Para trabalhar com um endereço local consistente, abra um terminal na pasta `ProgWebAula2` e execute, caso tenha Python instalado:
```bash
python -m http.server 8000 --bind 127.0.0.1
```
No Windows, a instalação do Python pode oferecer o comando `py`:
```powershell
py -m http.server 8000 --bind 127.0.0.1
```
Acesse no navegador:
```text
http://127.0.0.1:8000/                                      → aula original
http://127.0.0.1:8000/projetos/01-devquest/                  → projeto surpresa
http://127.0.0.1:8000/projetos/02-conecta-sheets/previa-local.html → prévia do projeto 2
```
Finalize o servidor com `Ctrl+C`. O servidor local não executa `Code.gs`; o envio ao Sheets exige implantação no Google. A alternativa de abrir arquivos diretamente pode ter comportamento de armazenamento diferente conforme o navegador, como informa a referência de localStorage.
<a id="originais"></a>
3. Explicação completa dos arquivos originais
3.1 `index.html`: página principal
O arquivo original tem o título Meu Segundo Site e referencia dois arquivos externos: `estilo.css`, dentro do `<head>`, e `index.js`, no início do `<body>`. Seu conteúdo foi preservado:
```html
<html>
    <head>
        <title>Meu Segundo Site</title>
        <link rel="stylesheet" href="estilo.css">
    </head>
    <body>
        <!--Linkando o arquivo de JavaScript -->
        <script src="index.js"></script>
        <form>
            <label>Número 1</label><br>
            <input type="number" id="numero1" class="meuEspaco"><br>
            <label>Número 2</label><br>
            <input type="number" id="numero2" class="meuEspaco"><br>
            <button onclick="somar()">Somar</button>
            <button onclick="limpar()">Limpar</button>
        </form>

        <button onclick="enviarWhatsapp()">Converse pelo WhatsApp</button>
        <a href="contato.html">Fale Conosco</a>
    </body>
</html>
```
Estrutura e elementos. `<html>` delimita o documento; `<head>` reúne informações da página; `<title>` define o texto da aba; `<link rel="stylesheet">` solicita o CSS; `<body>` contém o conteúdo visível. O comentário HTML apenas explica a ligação do JavaScript e não aparece como texto na tela.
O `<form>` agrupa dois campos. Cada `<label>` apresenta a identificação visual, os `<br>` introduzem quebras de linha, e os inputs usam `type="number"`. O `id` distingue cada campo para o JavaScript: `numero1` e `numero2`. A classe comum `meuEspaco` permite aplicar a mesma regra CSS aos dois.
O primeiro botão chama `somar()`; o segundo chama `limpar()`. O atributo `onclick` contém a chamada de uma função quando ocorre o clique. O botão de WhatsApp está fora do formulário e chama `enviarWhatsapp()`. O link `<a href="contato.html">` navega para o arquivo da mesma pasta.
Sequência de funcionamento: o navegador lê o HTML, carrega o estilo e o script, exibe os campos e aguarda eventos. O script original declara funções, mas não tenta selecionar os inputs imediatamente no carregamento; a seleção acontece quando essas funções são chamadas. Por isso, a posição atual do `<script>` antes do formulário não é, sozinha, um erro neste código específico.
Detalhe importante: os botões internos do formulário não definem `type`. Nesse contexto, o comportamento padrão é o de submissão. O código também não cancela esse comportamento. Assim, além de chamar a função, um clique pode submeter o formulário e navegar/recarregar a página. A correção está na seção 4 e pode ser conferida na referência do elemento button.
3.2 `estilo.css`: apresentação visual
```css
.meuEspaco{
   margin-bottom: 10px;
}
```
Esse é todo o CSS original. O ponto antes de `meuEspaco` representa um seletor de classe. As chaves delimitam o bloco de declarações; `margin-bottom` é a propriedade e `10px` é seu valor. O ponto e vírgula encerra a declaração.
A regra cria uma margem externa inferior nos elementos com `class="meuEspaco"`. Ela não define cor, centralização, fonte, largura dos campos ou comportamento responsivo. Também não existe uma regra `.container`, embora a página de contato use essa classe. O nome de uma classe, sem uma regra correspondente, não produz centralização automaticamente.
Para comparar responsabilidades: margem é espaço externo ao elemento; `padding`, quando usado, cria espaço interno. Nenhuma regra `padding` foi encontrada no arquivo original. O CSS elaborado dos projetos novos fica nas respectivas pastas, não neste arquivo básico.
3.3 `index.js`: comportamento da aula
O arquivo define exatamente quatro funções: `somar`, `enviarWhatsapp`, `enviarSuporte` e `limpar`.
```javascript
function somar(){

    let numero1 = document.getElementById("numero1").value;
    let numero2 = document.getElementById("numero2").value;

    let n1 = parseInt(numero1);
    let n2 = parseInt(numero2);
    
    let resultado = n1 + n2;

    alert("O resultado da soma é: " + resultado);

}



function enviarWhatsapp(){
    let numeroTelefone= "5512981418071";
    window.open("https://wa.me/" + numeroTelefone, "_blank");
}

function enviarSuporte(){
    let mensagem = document.getElementById("mensagem").value;
    let numeroTelefone = "5512981418071";
    window.open("https://wa.me/" + numeroTelefone + "?text=" 
        + encodeURIComponent(mensagem), "_blank");
}

function limpar(){
    document.getElementById("numero1").value = "";
    document.getElementById("numero2").value = "";

}
```
Função `somar()`
```javascript
let numero1 = document.getElementById("numero1").value;
let numero2 = document.getElementById("numero2").value;
```
`document` representa o documento no navegador. `getElementById` procura o elemento pelo ID fornecido e `.value` lê seu conteúdo. O nome da variável e o ID poderiam ser diferentes; eles coincidem neste exemplo por uma escolha de organização.
Mesmo com `type="number"`, a propriedade `.value` fornece uma string. É importante separar o tipo de entrada HTML do tipo do valor recebido pelo JavaScript. Consulte a referência de HTMLInputElement.value.
```javascript
let n1 = parseInt(numero1);
let n2 = parseInt(numero2);
let resultado = n1 + n2;
```
`parseInt` interpreta uma parte inicial da string como inteiro. O código converte os dois conteúdos e aplica `+` aos resultados. `let` declara variáveis com escopo de bloco; neste caso, os valores são utilizados dentro da função.
Exemplos de raciocínio:
Valores digitados	Operação com `parseInt`	Resultado
`10` e `5`	`10 + 5`	`15`
`-4` e `7`	`-4 + 7`	`3`
`8.9` e `2.7`	`8 + 2`	`10`, não `11.6`
Um campo vazio	Uma conversão produz `NaN`	A soma produz `NaN`
Sem conversão, `"10" + "5"` concatena textos e gera `"105"`. A função original é de soma inteira, não de cálculo decimal. `parseInt` também não deve ser tratado como uma validação completa de toda string: veja a referência de parseInt.
```javascript
alert("O resultado da soma é: " + resultado);
```
Aqui o `+` concatena a mensagem com a representação textual do resultado. `alert` abre uma caixa de diálogo do navegador. A versão original não possui um elemento de resultado persistente no HTML; a nova calculadora do DevQuest usa `<output>`.
Função `enviarWhatsapp()`
A função define o número de destino e monta um endereço iniciado por `https://wa.me/`. O número que já está no código original é mantido neste pacote, mas não foi testado como destinatário. Para adaptar a atividade, troque as duas ocorrências de `numeroTelefone` no arquivo; não publique um contato pessoal sem autorização.
`window.open(endereco, "_blank")` solicita uma nova aba ou janela. Isso abre o destino da conversa; não é uma integração com uma API de envio automático. A pessoa ainda precisa concluir a ação no WhatsApp. A execução depende do ambiente do navegador e do serviço externo.
Função `enviarSuporte()`
Primeiro, lê `document.getElementById("mensagem").value`. Depois, acrescenta o parâmetro `?text=` ao endereço da conversa e codifica a mensagem com `encodeURIComponent`.
O motivo da codificação é representar o conteúdo dentro de um parâmetro de URL sem confundir seus caracteres com separadores da própria URL. Um `&` digitado pelo usuário, por exemplo, não deve virar o início de outro parâmetro. Isso não é criptografia. A mensagem passa a fazer parte do endereço aberto.
O código não verifica se a mensagem está vazia, não limita seu tamanho e não confirma que houve envio no WhatsApp. Essas características devem ser consideradas ao interpretar a atividade.
Função `limpar()`
A função seleciona os campos `numero1` e `numero2` e atribui `""` à propriedade `.value` de cada um. A string vazia remove o conteúdo dos inputs. Ela não recarrega a página por si só; a eventual submissão vem do comportamento do botão dentro do formulário.
A função pressupõe a existência dos dois IDs. Não deve ser chamada na página `contato.html`, onde esses inputs não existem. Carregar o mesmo arquivo JavaScript nessa página continua válido porque apenas declarar `limpar()` não a executa.
3.4 `contato.html`: mensagem de suporte
```html
<html>
    <head>
        <title>Contato</title>
        <link rel="stylesheet" href="estilo.css">
    </head>
        <body>
            <script src="index.js"></script>
            <div class="container">
                <h2>Enviar para o Whatsapp</h2>
                <textarea id="mensagem"></textarea>
                <br><br>
                <button onclick="enviarSuporte()">Enviar</button>
            </div>
        </body>
</html>
```
A página usa o título Contato, reaproveita `estilo.css` e `index.js`, agrupa seu conteúdo em uma `<div class="container">`, exibe um `<h2>` e oferece um `<textarea id="mensagem">`.
`textarea` permite texto com mais de uma linha; `input type="number"`, usado na calculadora, atende outro tipo de entrada. O ID `mensagem` conecta a área de texto à função `enviarSuporte()`. Os dois `<br>` criam espaçamento por quebras de linha; uma evolução preferível é controlar esse espaço no CSS.
O botão não está dentro de um `<form>` nesta página. Portanto, ele não apresenta a mesma submissão involuntária dos botões da calculadora. Falta um rótulo explícito associado ao textarea e não há link de retorno para a página principal. Também não existe gravação de contatos: a função apenas monta o endereço do WhatsApp.
3.5 `README.md` original
Antes desta documentação, o arquivo continha somente:
```markdown
# ProgWebAula2
```
A nova versão amplia esse título para um guia de estudo, execução, manutenção e integração. Não foi encontrada uma licença explícita entre os cinco arquivos analisados; esta documentação não inventa uma licença para o código original.
3.6 Mapa das relações entre arquivos
```text
index.html ─── estilo.css ─── .meuEspaco
     │
     ├──────── index.js ───── somar(), limpar(), enviarWhatsapp()
     │
     └──────── contato.html ─ estilo.css
                    │
                    └─────── index.js ─ enviarSuporte()
```
Os nomes de arquivos e IDs precisam corresponder. Por exemplo, renomear `index.js` sem mudar `src` interrompe o carregamento; trocar o ID `mensagem` sem atualizar a função faz a seleção retornar `null`. Na atividade, esses vínculos são mais importantes do que memorizar um nome específico.
<a id="melhorias"></a>
4. Cuidados e melhorias propostas para a aula
Os quatro arquivos da raiz foram preservados para permitir comparação. Os pontos abaixo são observações e sugestões, não mudanças já aplicadas ao original.
Ponto encontrado	Consequência	Ajuste proposto
Ausência de `<!DOCTYPE html>`	O navegador não recebe a declaração moderna do documento.	Adicionar a declaração no início.
Ausência de `lang`, charset e viewport	Idioma, codificação declarada e apresentação móvel ficam incompletos.	Usar `lang="pt-BR"`, UTF-8 e viewport.
Botões do formulário sem `type`	Podem submeter/navegar após a função.	Definir o tipo ou tratar `submit` com `preventDefault`.
Uso de `parseInt`	Casas decimais não são preservadas.	Manter para inteiros ou escolher conversão apropriada para decimais.
Sem tratamento de campos vazios	Pode aparecer `NaN`.	Combinar validação HTML e JavaScript.
`label` sem `for`	Associação explícita com o campo está ausente.	Relacionar `for` ao ID do input.
`container` sem CSS	A classe não produz o layout esperado.	Definir regras de layout.
`onclick` no HTML	Comportamento fica misturado à marcação.	Em uma evolução, usar `addEventListener`.
Resultado somente em `alert`	Não permanece numa área da página.	Exibir em `<output>` com anúncio de atualização.
Mensagem de contato sem validação	Pode abrir conversa vazia ou texto excessivo.	Validar e limitar antes de montar a URL.
Uma alternativa completa para a parte da calculadora
O trecho a seguir demonstra a correção do comportamento, sem alterar o arquivo original. Ele pode ser colocado em uma página de estudo própria, com o script depois do formulário:
```html
<form id="calculadora">
  <label for="valor1">Número 1</label>
  <input id="valor1" type="number" step="any" required>
  <label for="valor2">Número 2</label>
  <input id="valor2" type="number" step="any" required>
  <button type="submit">Somar</button>
  <button type="reset">Limpar</button>
  <output id="resultado" for="valor1 valor2" aria-live="polite"></output>
</form>
<script>
  const formulario = document.getElementById('calculadora');
  const saida = document.getElementById('resultado');

  formulario.addEventListener('submit', function (evento) {
    evento.preventDefault();
    const a = document.getElementById('valor1').valueAsNumber;
    const b = document.getElementById('valor2').valueAsNumber;
    const total = a + b;

    if (![a, b, total].every(Number.isFinite)) {
      saida.textContent = 'Informe dois números finitos válidos.';
      return;
    }
    saida.textContent = 'Resultado: ' + total;
  });

  formulario.addEventListener('reset', function () {
    saida.textContent = '';
  });
</script>
```
`step="any"` permite entradas decimais; `required` marca campos obrigatórios; `valueAsNumber` lê um número ou `NaN`; e `Number.isFinite` rejeita valores não finitos. A função de reset limpa a saída adicional. Isso não transforma números JavaScript em aritmética financeira exata: o exemplo continua sendo uma calculadora didática com números de ponto flutuante.
<a id="devquest"></a>
5. Projeto surpresa — DevQuest
5.1 A ideia
Um laboratório gamificado que transforma a aula em 12 missões de múltipla escolha. Cada acerto vale 10 XP; ao final, o estudante vê sua conquista e pode reiniciar para tentar melhorar. O visual combina fundo escuro, detalhes em lilás, cartões, feedback e uma calculadora de experimentação. Também existe tema claro.
O projeto vai além de uma página decorativa: possui estado, regras de pontuação, revisão, persistência local e tratamento de respostas. Não usa framework, CDN, imagens remotas nem um serviço externo para funcionar.
5.2 Recursos implementados
O quiz mostra código relacionado a cada questão, quatro alternativas e a explicação após a resposta. Uma questão respondida não pode dar XP novamente na mesma jornada. É possível voltar para revisar e avançar após responder. A barra e o anel indicam missões respondidas, enquanto o número de XP representa acertos.
Os níveis são `Explorador da Web` abaixo de 60 XP, `Construtor de Interfaces` a partir de 60 XP e `Arquiteto da Web` a partir de 100 XP. A pontuação máxima é 120. Responder errado avança o total de missões realizadas, mas não aumenta XP.
O navegador guarda apenas o vetor de respostas e a preferência de tema. Não há cadastro nem ranking público. Em ambiente com armazenamento indisponível, a experiência continua em memória e exibe um aviso. Essa pontuação não deve ser usada como avaliação inviolável: o código e o armazenamento estão sob controle do próprio visitante.
5.3 Arquivos e funções principais
Arquivo ou parte	O que estudar
`index.html`	HTML semântico, labels, formulário, output, progress e regiões de feedback.
`estilo.css`	Variáveis CSS, Flexbox, Grid, temas, responsividade, foco e redução de movimento.
`QUESTIONS` em `script.js`	Array de objetos com enunciado, código, alternativas, resposta e explicação.
`answers`	Estado das escolhas: `null` significa questão ainda não respondida.
`current`	Índice da questão mostrada.
`render()`	Atualiza a interface a partir do estado, sem transformar alternativas em HTML executável.
`save()`	Serializa as respostas e trata falhas de armazenamento.
Eventos dos botões	Pontuação, navegação, reinício e troca de tema.
Evento do formulário	Soma decimal, validação e resultado na página.
As alternativas são criadas com `createElement` e `textContent`. Assim, a opção contendo `<script>` é mostrada como texto, e não executada. O progresso armazenado também é validado antes de ser reutilizado.
5.4 Como personalizar
Altere os textos diretamente em `QUESTIONS`. Cada objeto tem `tag`, `title`, `code`, `options`, `correct` e `explanation`. `correct` é o índice, iniciado em zero, da alternativa certa. Por exemplo, `correct: 1` significa a segunda alternativa.
Ao mudar a quantidade de questões, atualize os textos fixos da interface, a descrição, a conquista de pontuação máxima e o número exibido no progresso inicial. Ao mudar a estrutura do conteúdo, altere a versão da chave de armazenamento para não reaproveitar respostas de uma prova diferente.
As cores ficam em `:root`, e a versão clara em `:root[data-theme="light"]`. O jogo não envia a pontuação à planilha; os dois projetos foram mantidos independentes. Essa conexão pode ser um exercício futuro, mas não está implementada aqui.
5.5 Gabarito do DevQuest
Missão	Tema	Alternativa
1	Ligação do CSS	B
2	Seleção por ID	A
3	Tipo retornado por `.value`	C
4	Conversão com `parseInt`	B
5	Tipo do botão	D
6	Margem inferior	A
7	Concatenação de strings	C
8	Codificação da mensagem	D
9	Limpeza do input	A
10	Caminho relativo	B
11	Validação numérica	C
12	Responsabilidade do servidor	D
A missão 12 faz a ponte com o projeto 2; o backend não fazia parte dos arquivos originais da aula.
<a id="conecta"></a>
Projeto 2 — Conecta Sheets: solução completa
Objetivo: receber um formulário próprio, validar a solicitação e gravar uma linha no Google Sheets. A solução inclui a interface HTML, o CSS, o JavaScript do navegador e o JavaScript do servidor, executado no Google Apps Script.
> **Situação da entrega:** código pronto para configurar e implantar, sem uma planilha de destino vinculada e sem implantação Google realizada. O envio real exige a configuração descrita abaixo. A prévia local não envia dados e nunca finge uma gravação bem-sucedida.
2.1 O que o usuário vê e faz
O Conecta Sheets tem uma interface responsiva em verde e tons claros. O usuário informa nome, e-mail, turma opcional, assunto e mensagem; confirma a leitura do aviso e envia. Durante a operação, os campos são bloqueados. A resposta positiva mostra um protocolo somente depois de o servidor confirmar o registro. Uma falha mantém os campos preenchidos.
A página não lista respostas de outras pessoas. O servidor não retorna o ID da planilha nem seus registros. O e-mail é apenas um campo de contato: este projeto não dispara e-mail nem mensagem no WhatsApp.
2.2 Arquitetura e escolha técnica
```text
Navegador abre o endereço /exec do aplicativo
    ↓
doGet() renderiza Index.html
    ↓
Index inclui Estilos.html e JavaScript.html
    ↓
Usuário preenche o formulário
    ↓
JavaScript valida e chama google.script.run.salvarContato(dados)
    ↓
Apps Script valida novamente e obtém o bloqueio de escrita
    ↓
Servidor procura o protocolo existente ou grava uma nova linha
    ↓
Servidor confirma a gravação → navegador mostra o resultado
```
O HTML é hospedado no próprio Apps Script. A comunicação usa `google.script.run`, API assíncrona do serviço HTML, com callbacks de sucesso e falha. Isso evita depender de uma chamada `fetch` entre um site externo e o Apps Script. Não usamos `mode: "no-cors"`, resposta opaca nem sucesso presumido. Veja a documentação da comunicação cliente-servidor.
Importante: `google.script.run` não está disponível numa página comum do GitHub Pages ou da Hostinger. Subir os quatro arquivos somente no GitHub não publica o aplicativo Google. O repositório guarda o código; a implantação do Apps Script fornece o formulário funcional.
2.3 Arquivos e responsabilidades
Arquivo	Executado em	Responsabilidade
`apps-script/Code.gs`	Servidor Google	Renderizar a página, validar, prevenir duplicação por protocolo e gravar no Sheets.
`apps-script/Index.html`	Navegador, servido pelo Google	Estrutura do formulário, campos, textos e região de feedback.
`apps-script/Estilos.html`	Navegador	CSS dentro de `<style>`, layout responsivo e estados visuais.
`apps-script/JavaScript.html`	Navegador	JS dentro de `<script>`, contador, protocolo e comunicação com o servidor.
`previa-local.html`	Navegador local	Cópia da interface para visualizar e testar os campos sem enviar nada.
Os dois últimos arquivos de código do Apps Script usam extensão `.html` porque guardam fragmentos HTML contendo CSS ou JavaScript. A separação mantém o projeto legível e segue a organização apresentada nas boas práticas do serviço HTML. A prévia é gerada a partir dos três arquivos de interface; não é uma segunda implementação de envio.
2.4 Passo a passo de instalação
Passo A — Criar a planilha
Crie uma planilha nova no Google Sheets, por exemplo Contatos — ProgWebAula2. Use uma planilha dedicada à atividade, sem dados importantes de outras tarefas. Mantenha o compartilhamento restrito ao responsável.
Copie o ID, que corresponde ao trecho entre `/d/` e `/edit` no endereço:
```text
https://docs.google.com/spreadsheets/d/ID_DA_SUA_PLANILHA/edit
                                       └── copiar somente este trecho ──┘
```
O nome do arquivo no Drive não é o ID. O número `gid` identifica uma aba e também não substitui o ID da planilha. Não copie a URL inteira.
Não é necessário criar as colunas manualmente. No primeiro envio válido, o script cria a aba `Respostas` e seu cabeçalho. Uma aba de outro nome, como `Página1`, pode permanecer no arquivo; ela não será usada.
Passo B — Criar o Apps Script e os quatro arquivos
Na planilha, abra Extensões → Apps Script. Dê ao projeto o nome Conecta Sheets — ProgWebAula2.
Substitua o conteúdo inicial do arquivo de script pelo conteúdo integral de `Code.gs`. Depois, no botão +, escolha HTML e crie os arquivos com estes nomes, respeitando as letras maiúsculas:
```text
Code.gs       → arquivo de script
Index.html    → criar um arquivo HTML chamado Index
Estilos.html  → criar um arquivo HTML chamado Estilos
JavaScript.html → criar um arquivo HTML chamado JavaScript
```
Cole o conteúdo integral correspondente em cada arquivo. Os blocos de código completos estão na seção 2.13 deste documento. Não copie as cercas Markdown de três crases para o editor. Preserve `<style>...</style>` em `Estilos.html` e `<script>...</script>` em `JavaScript.html`.
O editor normalmente acrescenta `.html` ao nome. Evite criar `Index.html.html`. O arquivo de script pode aparecer como `Código.gs` na interface; o nome crítico para o template é `Index`, e as inclusões exigem `Estilos` e `JavaScript`.
Passo C — Informar o ID da planilha no servidor
No editor do Apps Script, abra Configurações de projeto → Propriedades do script → Adicionar propriedade do script. Preencha:
Propriedade	Valor
`SPREADSHEET_ID`	O ID real copiado da sua planilha, sem aspas e sem a URL completa.
Salve as propriedades. O código consulta essa configuração com:
```javascript
PropertiesService.getScriptProperties().getProperty('SPREADSHEET_ID');
```
A configuração fica no projeto servidor, não no JavaScript público. Veja o guia oficial de propriedades do script. O ID não é uma senha, mas não há motivo para enviá-lo ao navegador neste projeto.
Ajuste também o fuso horário da planilha para o local onde os registros serão usados. O código grava um objeto `Date` do servidor; a exibição na coluna segue as configurações de data e hora da planilha.
Passo D — Publicar como aplicativo da Web
Salve todos os arquivos. No Apps Script, abra Implantar → Nova implantação, selecione Aplicativo da Web e informe uma descrição, como `Conecta Sheets v1`.
Em Executar como, escolha Eu, isto é, a conta que tem acesso à planilha. Em Quem pode acessar, selecione o público apropriado. Para formulário público sem login, use Qualquer pessoa, quando essa opção estiver disponível e for permitida pela conta. Para uma atividade interna, prefira restringir o público às opções institucionais disponíveis.
Implante e revise a solicitação de autorização. Autorize somente o código que você revisou, na conta correta. Respeite as políticas da instituição; não tente contornar bloqueios administrativos. A disponibilização de acesso anônimo pode variar conforme a conta.
Copie a URL da implantação terminada em `/exec`. Esse é o endereço a compartilhar. A URL `/dev` é destinada aos testes de editores do script, não à distribuição geral. A execução como proprietário permite gravar sem compartilhar a planilha com cada visitante. Esses comportamentos são descritos no guia oficial de aplicativos da Web.
Passo E — Testar um envio real
Abra o endereço `/exec`, preencha com dados fictícios e envie. Exemplo de teste:
```text
Nome: Aluno Exemplo
E-mail: aluno@example.com
Turma: ADS — 2º semestre
Assunto: Dúvida sobre a aula
Mensagem: Gostaria de entender como o DOM conecta o formulário ao JavaScript.
Ciência do aviso: marcada
```
O teste está concluído somente quando a interface mostrar a confirmação e você encontrar a linha correspondente na aba `Respostas`, com o mesmo protocolo. Se o formulário for público, teste também a URL em uma sessão sem autenticação para verificar a configuração de acesso.
Não execute `salvarContato()` sem parâmetros pelo editor esperando enviar o formulário: essa função precisa receber o objeto que o navegador constrói.
2.5 Campos recebidos e regras
Campo	Obrigatório	Regra no servidor
`nome`	Sim	Texto com 2 a 80 caracteres após o tratamento; limite bruto de 80.
`email`	Sim	Texto de 5 a 120 caracteres e verificação básica de formato. É armazenado em minúsculas.
`turma`	Não	String vazia ou texto com até 40 caracteres.
`assunto`	Sim	Deve corresponder a uma das quatro opções permitidas.
`mensagem`	Sim	Entre 10 e 2.000 caracteres, desconsiderando espaços das extremidades; quebras de linha são preservadas.
`ciencia`	Sim	Deve ser o booleano `true`, não a string `"true"`.
`site`	Não preencher	Campo-isca: um valor preenchido faz o servidor rejeitar o envio.
`protocolo`	Gerado pelo navegador	Identificador UUID versão 4; usado para reconhecer tentativas repetidas.
A validação do e-mail verifica formato, não confirma que a caixa postal existe nem que pertence ao visitante. O limite de caracteres usa o comprimento das strings JavaScript; alguns símbolos, como certos emojis, podem ocupar mais de uma unidade.
2.6 Como os dados ficam na planilha
Coluna	Cabeçalho	Origem
A	Data/hora	Relógio do servidor na gravação.
B	Protocolo	Identificador do envio.
C	Nome	Formulário.
D	E-mail	Formulário, normalizado.
E	Turma	Formulário; pode ficar vazia.
F	Assunto	Opção validada.
G	Mensagem	Texto validado e neutralizado para a célula.
H	Ciência do aviso	`Sim`.
I	Versão do aviso	`1.0`.
J	Status	`Novo`.
O script grava sempre na aba `Respostas`. Não altere a ordem nem os nomes dessas dez colunas enquanto utilizar esta versão. Se encontrar outro cabeçalho, o código interrompe o envio em vez de sobrescrever uma estrutura desconhecida. Antes de modificar ou arquivar registros, faça uma cópia de segurança e preserve o histórico necessário.
2.7 O que cada função faz
Função	Papel
`doGet()`	Cria o template `Index`, avalia as inclusões, define o título e o viewport.
`incluir_()`	Inclui somente `Estilos` ou `JavaScript`; não aceita nomes arbitrários.
`salvarContato()`	Coordena validação, lock, consulta do protocolo, gravação e confirmação.
`obterAba_()`	Lê `SPREADSHEET_ID`, abre a planilha e prepara ou valida a aba.
`validar_()`	Confere tipos, limites, assunto, campo-isca, aviso e protocolo.
`campo_()`	Trata texto e rejeita conteúdo de comprimento inválido.
`textoSeguro_()`	Neutraliza prefixos potencialmente interpretados como fórmulas.
`falhar_()`	Produz erros controlados, com mensagem apropriada ao usuário.
As funções auxiliares terminam em `_`, ficando fora das chamadas por `google.script.run`. Isso não torna a aplicação privada: `salvarContato` continua sendo uma operação acessível aos visitantes autorizados pela implantação.
No navegador, `show()` escreve feedback usando `textContent`; `uuid()` gera o identificador; `busy()` bloqueia ou libera o formulário; e `count()` atualiza o contador. O evento `submit` usa `preventDefault()` e chama o servidor sem a submissão tradicional da página.
2.8 Confirmação real, falhas e repetição
O servidor usa `setValues()` e chama `SpreadsheetApp.flush()` antes de devolver `{ok: true}` para um novo registro. O cliente também confere se o protocolo retornado é o protocolo enviado. Um erro, uma resposta inesperada ou `ok: false` não dispara a mensagem de sucesso. A documentação de Range descreve a escrita em intervalos.
Enquanto o envio está pendente, o botão não dispara outra chamada. Depois de 20 segundos sem resposta, a interface exibe um aviso de espera, mas não declara sucesso nem presume cancelamento. O retorno do servidor continua sendo aguardado.
Em uma nova tentativa com os mesmos dados, sem recarregar a página, o navegador reutiliza o protocolo. O servidor procura esse protocolo na coluna B; se existir, retorna a confirmação do registro já feito, sem outra linha. A primeira gravação de um protocolo prevalece. Não se trata de deduplicação por e-mail ou por conteúdo.
Alterar os dados gera outro protocolo. Recarregar ou fechar a página perde o protocolo pendente em memória; um novo preenchimento pode gerar outra linha. Excluir linhas da planilha também remove a evidência usada para reconhecer protocolos antigos. Essas são limitações deliberadas de um exemplo didático sem persistência de dados pessoais no navegador.
2.9 Segurança, privacidade e limites
O exemplo valida no servidor, limita tamanho dos campos, restringe assuntos, evita avaliar texto do usuário como HTML e neutraliza células que começam com `=`, `+`, `-` ou `@`. Não publica tokens OAuth, senhas ou chaves privadas. O ID de destino é lido do servidor. A escrita usa um lock do script, destinado a evitar concorrência entre execuções desta mesma aplicação; consulte LockService.
O campo-isca reduz alguns envios automatizados simples, mas não é autenticação, CAPTCHA, limitação de taxa nem proteção suficiente contra abuso. O UUID identifica uma tentativa, não comprova a identidade de alguém. O lock não impede alterações manuais simultâneas na planilha nem coordena outro projeto Apps Script independente.
O aviso da interface informa a finalidade didática; ele não substitui a definição institucional de responsável, canal de contato, acesso, retenção e descarte dos dados. Antes de coletar informações reais, adapte esse texto à atividade e à organização. A marcação da caixa registra apenas a ciência do texto apresentado. Não há verificação jurídica automática.
O limite interno foi fixado em 10.000 registros para manter o escopo de sala de aula. Ele é uma decisão deste código, não uma cota oficial do Google. A busca por protocolo percorre uma coluna e não substitui um índice de banco de dados. Além disso, o Apps Script possui cotas próprias, variáveis por serviço e conta: consulte a tabela oficial de cotas. Não há promessa de uso ilimitado ou de disponibilidade contínua.
Para uso público de maior volume, este exemplo precisa evoluir com autenticação quando pertinente, proteção contra abuso e uma camada de persistência adequada. As respostas permanecem sujeitas às permissões que o responsável aplicar no Drive e no Sheets.
2.10 Colocar um acesso ao formulário no GitHub Pages
Após a implantação, adicione um link para a URL real `/exec` na página desejada. Por exemplo:
```html
<a href="https://script.google.com/macros/s/ID_DA_IMPLANTACAO/exec"
   target="_blank"
   rel="noopener noreferrer">
  Abrir o formulário de contato
</a>
```
Substitua `ID_DA_IMPLANTACAO` pelo endereço gerado ao publicar. O ID da implantação não é o ID da planilha. O link acima é um modelo, não uma implantação já existente. Esta versão não incorpora o aplicativo em iframe externo nem reduz a proteção de enquadramento da página.
2.11 Atualizar o aplicativo
Edite e salve os arquivos. Em Implantar → Gerenciar implantações, edite a implantação existente, selecione uma nova versão e implante. Teste novamente a URL `/exec`. Alterar somente arquivos no GitHub não altera os arquivos salvos no Apps Script; alterar somente o editor também não atualiza automaticamente uma implantação versionada já distribuída. Veja o guia de implantações.
A prévia local é um arquivo separado. Para atualizar sua aparência, substitua nela as duas inclusões do template pelos conteúdos de `Estilos.html` e `JavaScript.html`. Ela deve continuar mostrando o aviso de envio indisponível fora do ambiente Google.
2.12 Problemas frequentes
Situação	O que conferir
Aparece `PRÉVIA LOCAL`.	Você abriu a prévia ou uma página fora do Apps Script. Use `/exec`.
Mensagem sobre `SPREADSHEET_ID`.	Confira o nome da propriedade e copie somente o ID real da planilha.
Falha genérica de gravação.	Confira conta proprietária, acesso de edição, existência do arquivo e cotas. Consulte as execuções do script.
`Index` não encontrado.	Crie o arquivo HTML `Index`, respeitando o nome usado em `doGet`.
Estilo ou comportamento não carrega.	Confira `Estilos`, `JavaScript` e as duas chamadas de `incluir_`.
Cabeçalho incompatível.	Preserve os dados e use uma aba vazia chamada `Respostas` ou restaure os cabeçalhos corretos.
As mudanças não aparecem.	Publique nova versão da implantação; não confunda `/dev` com `/exec`.
Outra pessoa não consegue abrir.	Revise o público permitido e as regras da conta institucional.
A interface informa espera prolongada.	Não recarregue durante uma gravação incerta. Aguarde o callback e confira a planilha antes de criar outro envio.
Registros com horários inesperados.	Confira o fuso e as configurações de exibição da planilha.
`google is not defined` em um código adaptado.	A chamada está fora do serviço HTML do Apps Script. Esta versão original detecta essa situação e não tenta enviar.
2.13 Todos os arquivos do projeto 2
Os quatro blocos a seguir constituem a implementação completa da versão hospedada no Apps Script. Não há trechos omitidos nem um servidor adicional escondido. A única configuração externa indispensável é a propriedade `SPREADSHEET_ID`, além da autorização e da implantação.
Arquivo: `Code.gs`
```javascript
/** Conecta Sheets — código do servidor. Nunca publique credenciais no navegador. */
const CONFIG_ = Object.freeze({
  ABA: 'Respostas',
  MAX_REGISTROS: 10000,
  ASSUNTOS: ['Dúvida sobre a aula', 'Sugestão', 'Problema técnico', 'Outro'],
  COLUNAS: ['Data/hora', 'Protocolo', 'Nome', 'E-mail', 'Turma', 'Assunto', 'Mensagem', 'Ciência do aviso', 'Versão do aviso', 'Status']
});

/** A URL /exec executa esta função e renderiza o formulário. */
function doGet() {
  return HtmlService.createTemplateFromFile('Index').evaluate()
    .setTitle('Conecta Sheets — contato da turma')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

/** Somente arquivos internos e controlados podem ser incluídos no template. */
function incluir_(arquivo) {
  if (!['Estilos', 'JavaScript'].includes(arquivo)) throw new Error('Arquivo não permitido.');
  return HtmlService.createHtmlOutputFromFile(arquivo).getContent();
}

/** Única operação de escrita exposta ao navegador. */
function salvarContato(entrada) {
  let lock;
  let bloqueado = false;
  try {
    const dados = validar_(entrada);
    lock = LockService.getScriptLock();
    bloqueado = lock.tryLock(10000);
    if (!bloqueado) falhar_('Há outros envios em andamento. Aguarde um pouco e tente novamente.');
    const aba = obterAba_();
    const ultimaLinha = aba.getLastRow();

    // Repetir o mesmo protocolo não cria outra linha. A primeira gravação prevalece.
    if (ultimaLinha > 1) {
      const existente = aba.getRange(2, 2, ultimaLinha - 1, 1)
        .createTextFinder(dados.protocolo).matchEntireCell(true).useRegularExpression(false).findNext();
      if (existente) return {ok:true, protocolo:dados.protocolo, duplicado:true};
    }
    if (ultimaLinha - 1 >= CONFIG_.MAX_REGISTROS) {
      falhar_('Este formulário atingiu o limite de registros configurado. Avise o responsável.');
    }
    const linha = ultimaLinha + 1;
    if (linha > aba.getMaxRows()) aba.insertRowsAfter(aba.getMaxRows(), 100);
    const valores = [
      new Date(), dados.protocolo, textoSeguro_(dados.nome), textoSeguro_(dados.email),
      textoSeguro_(dados.turma), dados.assunto, textoSeguro_(dados.mensagem), 'Sim', '1.0', 'Novo'
    ];
    // Texto livre é tratado como texto, inclusive quando começa com =, +, - ou @.
    aba.getRange(linha, 2, 1, 9).setNumberFormat('@');
    aba.getRange(linha, 1, 1, CONFIG_.COLUNAS.length).setValues([valores]);
    aba.getRange(linha, 1).setNumberFormat('dd/MM/yyyy HH:mm:ss');
    SpreadsheetApp.flush();
    return {ok:true, protocolo:dados.protocolo, duplicado:false};
  } catch (erro) {
    if (erro && erro.name === 'ErroPublico') throw erro;
    // Não registre o conteúdo da mensagem, o e-mail nem os demais dados pessoais em logs.
    console.error('Conecta Sheets: falha interna', erro && erro.name ? erro.name : 'Erro');
    throw new Error('Não foi possível confirmar a gravação. Tente novamente com os mesmos dados. Se persistir, avise o responsável.');
  } finally {
    if (bloqueado && lock) lock.releaseLock();
  }
}

function obterAba_() {
  const id = PropertiesService.getScriptProperties().getProperty('SPREADSHEET_ID');
  if (!id || !/^[A-Za-z0-9_-]{20,}$/.test(id)) {
    falhar_('Configuração pendente: o responsável deve definir SPREADSHEET_ID nas propriedades do script.');
  }
  const planilha = SpreadsheetApp.openById(id);
  let aba = planilha.getSheetByName(CONFIG_.ABA);
  if (!aba) aba = planilha.insertSheet(CONFIG_.ABA);
  if (aba.getMaxColumns() < CONFIG_.COLUNAS.length) {
    aba.insertColumnsAfter(aba.getMaxColumns(), CONFIG_.COLUNAS.length - aba.getMaxColumns());
  }
  if (aba.getLastRow() === 0) {
    aba.getRange(1, 1, 1, CONFIG_.COLUNAS.length).setValues([CONFIG_.COLUNAS]);
    aba.getRange(1, 1, 1, CONFIG_.COLUNAS.length)
      .setFontWeight('bold').setBackground('#164e3e').setFontColor('#ffffff');
    aba.setFrozenRows(1);
    aba.setColumnWidth(1, 165);
    aba.setColumnWidth(2, 290);
    aba.setColumnWidths(3, 4, 180);
    aba.setColumnWidth(7, 420);
  } else {
    const cabecalho = aba.getRange(1, 1, 1, CONFIG_.COLUNAS.length).getValues()[0];
    if (cabecalho.some((valor, indice) => valor !== CONFIG_.COLUNAS[indice])) {
      falhar_('A aba Respostas tem colunas incompatíveis. Peça ao responsável uma aba vazia com esse nome.');
    }
  }
  return aba;
}

function validar_(entrada) {
  if (!entrada || typeof entrada !== 'object' || Array.isArray(entrada)) falhar_('Dados de envio inválidos.');
  if (entrada.site !== '' && entrada.site !== undefined) falhar_('Envio recusado. Recarregue o formulário.');
  const nome = campo_(entrada.nome, 'Nome', 2, 80);
  const email = campo_(entrada.email, 'E-mail', 5, 120).toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) falhar_('Informe um e-mail válido.');
  const turma = campo_(entrada.turma, 'Turma', 0, 40);
  const assunto = campo_(entrada.assunto, 'Assunto', 1, 40);
  if (!CONFIG_.ASSUNTOS.includes(assunto)) falhar_('Selecione um assunto da lista.');
  const mensagem = campo_(entrada.mensagem, 'Mensagem', 10, 2000, true);
  if (entrada.ciencia !== true) falhar_('Confirme a leitura do aviso sobre os dados.');
  if (typeof entrada.protocolo !== 'string' || !/^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i.test(entrada.protocolo)) {
    falhar_('Protocolo inválido. Recarregue a página e tente novamente.');
  }
  return {nome, email, turma, assunto, mensagem, protocolo:entrada.protocolo.toLowerCase()};
}

function campo_(valor, rotulo, minimo, maximo, multiline) {
  if (typeof valor !== 'string') falhar_(rotulo + ': conteúdo inválido.');
  // Limita também o dado bruto, antes de qualquer tratamento.
  if (valor.length > maximo) falhar_(rotulo + ': excedeu ' + maximo + ' caracteres.');
  let texto = valor.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '').trim();
  if (!multiline) texto = texto.replace(/[\r\n\t]+/g, ' ');
  if (texto.length < minimo) falhar_(rotulo + ': informe ao menos ' + minimo + ' caracteres.');
  return texto;
}

function textoSeguro_(texto) { return /^[=+\-@]/.test(texto) ? "'" + texto : texto; }
function falhar_(mensagem) { const erro = new Error(mensagem); erro.name = 'ErroPublico'; throw erro; }
```
Arquivo: `Index.html`
```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <base target="_top">
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Conecta Sheets — contato da turma</title>
  <?!= incluir_('Estilos'); ?>
</head>
<body>
  <a class="skip" href="#nome" target="_self">Pular para o formulário</a>
  <header class="wrap topbar"><a href="#contact-form" target="_self" class="brand"><span class="brand-icon" aria-hidden="true">c.</span>conecta<span class="brand-secondary">sheets</span></a><span id="mode" class="mode">FORMULÁRIO DA TURMA</span></header>
  <main class="wrap layout">
    <section class="intro" aria-labelledby="title">
      <p class="eyebrow"><span aria-hidden="true">●</span> PROGWEB / PROJETO 02</p>
      <h1 id="title">Uma mensagem.<br>Uma nova<br><em>conexão.</em></h1>
      <p class="lead">Dúvidas, ideias e sugestões da turma em um só lugar. Escreva aqui; o Conecta organiza na planilha.</p>
      <div class="flow" aria-label="Como funciona"><div><span>01</span><p><strong>Você escreve</strong>Preencha os campos ao lado.</p></div><div><span>02</span><p><strong>O servidor valida</strong>Os dados passam por conferência.</p></div><div><span>03</span><p><strong>A planilha recebe</strong>Uma resposta, um protocolo.</p></div></div>
      <aside class="privacy"><span aria-hidden="true">↗</span><div><strong>Uma aula sobre conexões reais.</strong><p>Este é um projeto didático. Use dados fictícios nos testes. Não envie senhas, documentos ou informações sensíveis.</p></div></aside>
      <p class="technology">HTML + CSS + JAVASCRIPT <span>→</span> APPS SCRIPT <span>→</span> SHEETS</p>
    </section>
    <section class="form-card" aria-labelledby="form-title">
      <div class="form-top"><div><p class="eyebrow">ESTAMOS OUVINDO</p><h2 id="form-title">Envie sua mensagem</h2></div><span class="form-icon" aria-hidden="true">↗</span></div>
      <p class="form-description">Campos com * são obrigatórios. Turma é opcional.</p>
      <p id="status" class="status" role="status" aria-live="polite" tabindex="-1" hidden></p>
      <form id="contact-form">
        <fieldset id="fields">
          <legend class="sr-only">Seus dados e sua mensagem</legend>
          <div class="row"><div class="field"><label for="nome">Seu nome <span>*</span></label><input id="nome" name="nome" type="text" autocomplete="name" minlength="2" maxlength="80" required placeholder="Como podemos chamar você?"></div><div class="field"><label for="turma">Turma <small>opcional</small></label><input id="turma" name="turma" type="text" maxlength="40" placeholder="Ex.: ADS — 2º semestre"></div></div>
          <div class="field"><label for="email">E-mail <span>*</span></label><input id="email" name="email" type="email" autocomplete="email" maxlength="120" required placeholder="voce@exemplo.com"></div>
          <div class="field"><label for="assunto">Sobre o que vamos conversar? <span>*</span></label><select id="assunto" name="assunto" required><option value="">Selecione um assunto</option><option>Dúvida sobre a aula</option><option>Sugestão</option><option>Problema técnico</option><option>Outro</option></select></div>
          <div class="field"><label for="mensagem">Sua mensagem <span>*</span></label><textarea id="mensagem" name="mensagem" minlength="10" maxlength="2000" rows="5" required aria-describedby="message-help count" placeholder="Conte um pouco mais. Como podemos ajudar?"></textarea><div class="field-help"><span id="message-help">Pelo menos 10 caracteres.</span><span id="count">0 / 2000</span></div></div>
          <div class="honeypot" aria-hidden="true"><label for="site">Deixe este campo vazio</label><input id="site" name="site" type="text" tabindex="-1" autocomplete="off" maxlength="100"></div>
          <label class="consent" for="ciencia"><input id="ciencia" name="ciencia" type="checkbox" required><span>Li o aviso: os dados informados serão registrados na planilha do responsável para organizar e responder esta solicitação. *</span></label>
          <button id="send" type="submit">Enviar para a planilha <span aria-hidden="true">↗</span></button>
        </fieldset>
      </form>
      <p class="bottom-note">A confirmação aparece somente após o retorno do servidor.</p>
    </section>
  </main>
  <footer class="wrap"><span>conecta sheets / um projeto ProgWebAula2</span><span>Da interface ao dado. Sem atalhos.</span></footer>
  <noscript><p>Ative o JavaScript para enviar este formulário.</p></noscript>
  <?!= incluir_('JavaScript'); ?>
</body>
</html>
```
Arquivo: `Estilos.html`
```html
<style>
:root {
  color-scheme:light;
  --paper:#f4f5ef;
  --ink:#163b30;
  --muted:#657469;
  --green:#195441;
  --line:#dce3d8;
  --soft:#e9eee4;
  --lime:#d7eb9b;
  --white:#fff
}
* {
  box-sizing:border-box
}
body {
  margin:0;
  background:var(--paper);
  color:var(--ink);
  font-family:Inter,ui-sans-serif,system-ui,-apple-system,"Segoe UI",sans-serif;
  line-height:1.6
}
input,select,textarea,button {
  font:inherit
}
a {
  color:inherit;
  text-decoration:none
}
h1,h2,p {
  margin-top:0
}
button,a,input,select,textarea {
  touch-action:manipulation
}
a:focus-visible,button:focus-visible,input:focus-visible,select:focus-visible,textarea:focus-visible {
  outline:3px solid #397f63;
  outline-offset:3px
}
.wrap {
  width:min(1160px,calc(100% - 48px));
  margin:auto
}
.topbar {
  display:flex;
  align-items:center;
  justify-content:space-between;
  padding:26px 0;
  border-bottom:1px solid var(--line);
  gap:15px
}
.brand {
  display:flex;
  align-items:center;
  gap:8px;
  font-size:1.4rem;
  letter-spacing:-.07em;
  font-weight:800
}
.brand-secondary {
  font-weight:450;
  color:var(--muted);
  margin-left:-3px
}
.brand-icon {
  display:grid;
  place-items:center;
  background:var(--green);
  color:var(--lime);
  width:37px;
  height:37px;
  border-radius:11px;
  margin-right:4px;
  font-size:1.6rem;
  padding-bottom:3px
}
.mode {
  font-size:.57rem;
  letter-spacing:.12em;
  padding:6px 10px;
  border:1px solid var(--line);
  border-radius:30px;
  color:var(--muted);
  font-weight:650
}
.layout {
  display:grid;
  grid-template-columns:.95fr 1.05fr;
  gap:72px;
  align-items:start;
  padding-top:60px;
  padding-bottom:60px
}
.intro {
  padding-top:17px
}
.eyebrow {
  font-size:.61rem;
  letter-spacing:.16em;
  font-weight:800;
  color:var(--green);
  margin-bottom:22px
}
.eyebrow span {
  font-size:.55rem;
  margin-right:7px
}
h1 {
  font-size:clamp(2.8rem,4.9vw,4.3rem);
  line-height:1.03;
  letter-spacing:-.065em;
  font-weight:760;
  margin-bottom:27px
}
h1 em {
  font-style:normal;
  color:#547d39
}
.lead {
  color:var(--muted);
  font-size:.96rem;
  max-width:385px;
  line-height:1.85
}
.flow {
  display:grid;
  gap:0;
  margin:29px 0
}
.flow>div {
  display:flex;
  gap:17px;
  align-items:flex-start;
  position:relative;
  padding:0 0 21px
}
.flow>div:not(:last-child):before {
  content:"";
  position:absolute;
  left:17px;
  top:35px;
  bottom:0;
  width:1px;
  background:var(--line)
}
.flow>div>span {
  border:1px solid #cbd7bf;
  color:var(--green);
  border-radius:50%;
  width:35px;
  height:35px;
  flex-shrink:0;
  display:grid;
  place-items:center;
  font-size:.66rem;
  font-weight:800;
  background:var(--soft)
}
.flow p {
  font-size:.76rem;
  color:var(--muted);
  margin:0;
  line-height:1.6;
  padding-top:0
}
.flow strong {
  display:block;
  font-size:.86rem;
  color:var(--ink);
  margin-bottom:2px
}
.privacy {
  display:flex;
  gap:16px;
  padding:20px;
  border:1px solid var(--line);
  border-radius:16px;
  max-width:410px;
  background:var(--soft)
}
.privacy>span {
  font-size:1.4rem
}
.privacy strong {
  font-size:.79rem
}
.privacy p {
  font-size:.73rem;
  line-height:1.7;
  color:var(--muted);
  margin:7px 0 0
}
.technology {
  display:flex;
  gap:8px;
  flex-wrap:wrap;
  font-size:.49rem;
  font-weight:650;
  letter-spacing:.08em;
  color:var(--muted);
  margin-top:25px
}
.form-card {
  background:var(--white);
  border:1px solid var(--line);
  border-radius:24px;
  padding:31px;
  box-shadow:0 15px 55px #193c2c07
}
.form-top {
  display:flex;
  justify-content:space-between;
  align-items:center;
  gap:20px
}
.form-top .eyebrow {
  margin-bottom:7px;
  font-size:.57rem
}
.form-top h2 {
  font-size:1.55rem;
  letter-spacing:-.045em;
  line-height:1.2;
  margin-bottom:0
}
.form-icon {
  width:43px;
  height:43px;
  border-radius:50%;
  background:var(--soft);
  display:grid;
  place-items:center;
  font-size:1.3rem
}
.form-description {
  font-size:.7rem;
  color:var(--muted);
  margin:12px 0 24px
}
fieldset {
  margin:0;
  padding:0;
  border:none;
  min-width:0
}
.row {
  display:grid;
  grid-template-columns:1.1fr .9fr;
  gap:16px
}
.field {
  margin-bottom:17px
}
label {
  display:block;
  font-size:.75rem;
  font-weight:650;
  margin-bottom:7px
}
label>span:not(.consent span) {
  color:var(--green)
}
label small {
  font-size:.62rem;
  color:var(--muted);
  font-weight:400;
  margin-left:5px
}
input:not([type=checkbox]),select,textarea {
  display:block;
  width:100%;
  min-width:0;
  padding:12px 13px;
  border:1px solid var(--line);
  border-radius:9px;
  background:#fcfdfb;
  color:var(--ink);
  font-size:.82rem;
  line-height:1.45
}
input::placeholder,textarea::placeholder {
  color:#849085;
  opacity:1
}
textarea {
  resize:vertical;
  min-height:117px;
  max-height:450px
}
select {
  min-height:45px
}
.field-help {
  display:flex;
  justify-content:space-between;
  gap:10px;
  color:var(--muted);
  font-size:.6rem;
  margin-top:5px
}
.consent {
  display:flex;
  align-items:flex-start;
  gap:10px;
  margin:20px 0;
  font-size:.65rem;
  font-weight:450;
  color:var(--muted);
  line-height:1.7
}
.consent input {
  flex-shrink:0;
  accent-color:var(--green);
  width:16px;
  height:16px;
  margin:2px 0 0
}
.consent span {
  color:var(--muted)
}
button[type=submit] {
  width:100%;
  display:flex;
  align-items:center;
  justify-content:space-between;
  border:0;
  border-radius:10px;
  background:var(--green);
  color:#fff;
  padding:14px 17px;
  font-size:.8rem;
  font-weight:650;
  cursor:pointer
}
button[type=submit]:hover {
  background:#103e2f
}
button:disabled,fieldset:disabled {
  opacity:.65;
  cursor:wait
}
.bottom-note {
  text-align:center;
  font-size:.59rem;
  color:var(--muted);
  margin:12px 0 0
}
.status {
  padding:13px 15px;
  border:1px solid var(--line);
  border-radius:9px;
  white-space:pre-line;
  overflow-wrap:anywhere;
  font-size:.76rem;
  background:var(--soft)
}
.status[data-kind=error] {
  background:#fff3f0;
  color:#963a24;
  border-color:#ecc3b7
}
.status[data-kind=success] {
  background:#edf8e7;
  color:#2d5720;
  border-color:#c8deb8
}
.status[data-kind=warning] {
  background:#fff8df;
  color:#745413;
  border-color:#efde9f
}
.honeypot {
  position:absolute;
  left:-10000px;
  top:auto;
  width:1px;
  height:1px;
  overflow:hidden
}
.sr-only {
  position:absolute;
  width:1px;
  height:1px;
  overflow:hidden;
  clip:rect(0,0,0,0);
  white-space:nowrap
}
footer {
  border-top:1px solid var(--line);
  display:flex;
  justify-content:space-between;
  gap:16px;
  padding:22px 0;
  color:var(--muted);
  font-size:.6rem
}
.skip {
  position:fixed;
  top:-100px;
  left:10px;
  background:var(--green);
  color:#fff;
  padding:10px 15px;
  z-index:5
}
.skip:focus {
  top:10px
}
@media(max-width:930px) {
  .layout {
    gap:32px;
    grid-template-columns:1fr 1.15fr
  }
  .form-card {
    padding:24px
  }
  .row {
    grid-template-columns:1fr;
    gap:0
  }
  .intro h1 {
    font-size:3rem
  }
}
@media(max-width:690px) {
  .wrap {
    width:calc(100% - 32px)
  }
  .topbar {
    padding:18px 0
  }
  .brand {
    font-size:1.2rem
  }
  .mode {
    font-size:.48rem;
    padding:5px 7px
  }
  .layout {
    grid-template-columns:1fr;
    gap:28px;
    padding-top:27px;
    padding-bottom:35px
  }
  .intro {
    padding-top:0
  }
  .intro h1 {
    font-size:2.85rem
  }
  .intro .lead {
    max-width:none
  }
  .flow {
    display:none
  }
  .privacy {
    max-width:none
  }
  .technology {
    margin-bottom:0
  }
  .form-card {
    padding:22px;
    border-radius:19px
  }
  .row {
    grid-template-columns:1fr;
    gap:0
  }
  .form-top h2 {
    font-size:1.45rem
  }
  .form-icon {
    width:35px;
    height:35px
  }
  input:not([type=checkbox]),select,textarea {
    font-size:16px
  }
  footer {
    flex-direction:column;
    gap:6px
  }
}
@media(prefers-reduced-motion:reduce) {
  * {
    scroll-behavior:auto!important;
    animation:none!important;
    transition:none!important
  }
}
</style>
```
Arquivo: `JavaScript.html`
```html
<script>
'use strict';
(() => {
  const $ = id => document.getElementById(id);
  const form = $('contact-form');
  const fields = $('fields');
  const send = $('send');
  const status = $('status');
  const available = typeof google !== 'undefined' && google.script && google.script.run;
  let pending = null; // Memória apenas: não armazena dados pessoais em localStorage.
  let sending = false;

  function show(message, kind, focus = false) {
    status.hidden = false;
    status.dataset.kind = kind;
    status.textContent = message;
    if (focus) status.focus({preventScroll:false});
  }
  function uuid() {
    if (globalThis.crypto && typeof crypto.randomUUID === 'function') return crypto.randomUUID();
    if (!globalThis.crypto || typeof crypto.getRandomValues !== 'function') throw new Error('Abra o formulário em um navegador atualizado com HTTPS.');
    const bytes = crypto.getRandomValues(new Uint8Array(16));
    bytes[6] = (bytes[6] & 15) | 64;
    bytes[8] = (bytes[8] & 63) | 128;
    const hex = Array.from(bytes, byte => byte.toString(16).padStart(2,'0')).join('');
    return `${hex.slice(0,8)}-${hex.slice(8,12)}-${hex.slice(12,16)}-${hex.slice(16,20)}-${hex.slice(20)}`;
  }
  function busy(value) {
    sending = value;
    fields.disabled = value;
    form.setAttribute('aria-busy', String(value));
    send.textContent = value ? 'Enviando…' : 'Enviar para a planilha ↗';
  }
  function count() { $('count').textContent = `${$('mensagem').value.length} / 2000`; }
  $('mensagem').addEventListener('input', count);
  if (available) $('mode').textContent = 'APP PUBLICADO';
  else {
    $('mode').textContent = 'PRÉVIA LOCAL';
    show('Prévia local: este arquivo não envia dados. Para gravar no Google Sheets, publique os quatro arquivos no Apps Script e abra a URL /exec.', 'warning');
  }
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (sending || !form.reportValidity()) return;
    if (!available) {
      show('Envio indisponível nesta prévia. Abra o endereço /exec da sua implantação no Apps Script. Nenhum dado foi enviado.', 'warning', true);
      return;
    }
    // Validação do navegador melhora a experiência; o servidor repete a validação.
    if ($('nome').value.trim().length < 2 || $('mensagem').value.trim().length < 10) {
      show('Preencha um nome com ao menos 2 caracteres e uma mensagem com ao menos 10, sem contar os espaços das extremidades.', 'error', true);
      return;
    }
    const dados = {
      nome:$('nome').value.trim(), email:$('email').value.trim(), turma:$('turma').value.trim(),
      assunto:$('assunto').value, mensagem:$('mensagem').value.trim(), ciencia:$('ciencia').checked,
      site:$('site').value
    };
    let timer;
    try {
      const fingerprint = JSON.stringify(dados);
      // Tentativa repetida, com o mesmo conteúdo, conserva o protocolo.
      if (!pending || pending.fingerprint !== fingerprint) pending = {fingerprint, protocolo:uuid()};
      dados.protocolo = pending.protocolo;
      busy(true);
      show('Enviando ao servidor. Aguarde a confirmação antes de fechar a página.', 'info');
      timer = setTimeout(() => {
        show('O servidor ainda não respondeu. A gravação pode estar em andamento; não recarregue nem reenvie enquanto aguardamos.', 'warning');
      }, 20000);
      google.script.run
        .withSuccessHandler(result => {
          clearTimeout(timer);
          busy(false);
          if (!result || result.ok !== true || result.protocolo !== dados.protocolo) {
            show('O servidor não confirmou o registro esperado. Tente novamente com os mesmos dados.', 'error', true);
            return;
          }
          const repeated = result.duplicado ? 'Este envio já estava registrado; nenhuma linha duplicada foi criada.' : 'Mensagem registrada na planilha com sucesso!';
          form.reset();
          count();
          pending = null;
          show(`${repeated}\nProtocolo: ${result.protocolo}\nGuarde este código para identificar a solicitação.`, 'success', true);
        })
        .withFailureHandler(error => {
          clearTimeout(timer);
          busy(false);
          show(error && error.message ? error.message : 'Não foi possível confirmar a gravação. Tente novamente com os mesmos dados.', 'error', true);
          // Os campos e o protocolo pendente são preservados em caso de falha.
        })
        .salvarContato(dados);
    } catch (error) {
      clearTimeout(timer);
      busy(false);
      show(error && error.message ? error.message : 'Não foi possível iniciar o envio.', 'error', true);
    }
  });
})();
</script>
```
2.14 Roteiro de aceite na conta Google
A integração real será considerada validada depois de publicar, autorizar e confirmar os seguintes cenários na conta de destino:
Um envio válido produz exatamente uma linha com o protocolo apresentado.
Os campos obrigatórios vazios, o e-mail malformado e a mensagem curta são recusados.
Uma falha de configuração não exibe sucesso e preserva os dados no formulário.
Duas pessoas enviando quase ao mesmo tempo produzem registros separados, sem sobrescrita.
Uma mensagem como `=SUM(1;2)` ampliada para ao menos 10 caracteres é armazenada como texto, e não executada como fórmula.
O formulário não permite ao visitante consultar respostas de outras pessoas, e o arquivo Sheets continua com compartilhamento restrito.
O teste real na conta Google não foi executado nesta entrega. Foram realizados testes locais da lógica com serviços simulados e testes de interface com callbacks simulados. Eles não comprovam a configuração de permissões, a autorização OAuth, as cotas nem a interpretação final das células pelo Google Sheets. Confira o relatório de testes do pacote.
<a id="testes"></a>
7. Testes e critérios de qualidade
Foram aprovados 31 testes da lógica do servidor com serviços Google simulados e 30 verificações de interface em Chromium, totalizando 61 verificações locais. O relatório detalha os cenários e as limitações.
O teste do servidor executa o `Code.gs` real em um contexto JavaScript com substitutos de `SpreadsheetApp`, `PropertiesService`, `LockService` e `HtmlService`. Verifica validação, cabeçalho, protocolo repetido, escrita, erros, capacidade de linhas e liberação do lock. Não simula fielmente toda a infraestrutura Google.
O teste de interface renderiza os arquivos locais no motor Chromium sem navegação externa. Os callbacks Google e o armazenamento são simulados explicitamente. Foram verificados pontuação, restauração de estado, tema, calculadora, estado de envio, falhas, retorno inesperado e ausência de execução de HTML em mensagens de erro. A interface de formulário foi conferida contra overflow horizontal nas larguras 320, 390, 768 e 1.024 pixels; há capturas de desktop e celular.
Não houve autorização OAuth, implantação Apps Script nem gravação numa planilha real durante estes testes. Também não houve ensaio real de carga ou de concorrência multiusuário. Uma aprovação local não substitui o roteiro de aceite na conta Google descrito no projeto 2.
Para repetir os testes de lógica, com Node.js instalado, execute na raiz do pacote:
```bash
node testes/testar-servidor.cjs
```
Para repetir os testes de navegador, com Python instalado:
```bash
python -m pip install playwright
python -m playwright install chromium
python testes/testar-interface.py
```
Node e Playwright são ferramentas de teste; não são dependências de execução do site. A instalação de navegador é necessária apenas para a suíte automatizada, não para os alunos abrirem as páginas.
8. Adicionar os novos arquivos ao repositório
A entrega é um pacote local. Nenhum commit remoto foi realizado por este material. Para incorporá-lo, copie o `README.md` e as pastas `projetos` e `testes` para sua cópia local do repositório. Os quatro arquivos originais da raiz são idênticos aos que foram lidos no GitHub; não é necessário substituí-los.
Confira o conteúdo antes de registrar as mudanças:
```bash
git status
git diff -- README.md
git add README.md projetos testes
git commit -m "Documenta a aula e adiciona DevQuest e Conecta Sheets"
git push origin main
```
Os comandos pressupõem uma cópia local já ligada ao repositório correto e permissão para publicar. Não incluem ID de planilha, token ou credencial. Prefira revisar as alterações em uma branch quando houver outras pessoas trabalhando no material.
9. Exercícios de evolução
Como continuidade pedagógica, o aluno pode justificar a diferença entre validação do navegador e validação do servidor; acrescentar uma questão ao DevQuest e adaptar sua pontuação máxima; ou criar um novo assunto no formulário, alterando tanto as opções HTML quanto a lista permitida no servidor.
Outra atividade é introduzir um novo campo no Conecta Sheets. A mudança precisa ser acompanhada em `Index`, no objeto enviado pelo navegador, em `validar_`, no vetor de escrita e no cabeçalho. Não basta desenhar o input: o dado precisa percorrer o fluxo completo. Ao alterar o esquema de uma aba já usada, planeje a migração sem sobrescrever respostas anteriores.
10. Fontes do código original e rastreabilidade
A inspeção do repositório foi feita pelos arquivos abaixo. Os hashes identificam os blobs efetivamente lidos, evitando confundir a aula observada com alterações futuras na branch.
Arquivo original	Git blob SHA-1
`README.md`	`bf39e485169a540c6f92cd5729cbba9613f861b6`
`index.html`	`500c84d49be31f0d45e3a1d6413917eaed0afbef`
`contato.html`	`9d9c0738ad29043135a3ec2d4067c725d0c0667b`
`estilo.css`	`271da9eec3fb58dc59f23279792b2ec041cb1a78`
`index.js`	`97599adef8ea0fade93eb8ae153502a63394c531`
Fonte primária: repositório ProgWebAula2, incluindo index.html, contato.html, estilo.css e index.js.
As fontes de referência da plataforma Google e do navegador estão citadas junto às explicações correspondentes. A implementação dos novos projetos foi escrita para este material; referências de API não representam uma afirmação de que a implantação já tenha sido executada.
