const { clear } = require('console');
const readlineSync = require('readline-sync');

let professores = [];
let alunos = [];

function criarProfessor(matricula, nome) {
    return {
        matricula: matricula,
        nome: nome,
        alunos: []
    };
}

function adicionarAlunoAoProfessor(professor, aluno) {
    professor.alunos.push(aluno);
}

function criarAluno(matricula, nome, serie, turma) {
    return {
        matricula: matricula,
        nome: nome,
        serie: serie,
        turma: turma,
        registroNotas: {
            notas: [],
            frequencia: 100.0
        }
    }
}

function registrarNotasEFrequencia(aluno, notas, frequencia) {
    aluno.registroNotas.notas = notas;
    aluno.registroNotas.frequencia = frequencia;
}

function encontrarProfessorPorMatricula(matricula) {
    return professores.find(professor => professor.matricula === matricula);
}

function encontrarAlunoPorMatricula(matricula) {
    return alunos.find(aluno => aluno.matricula === matricula);
}

function sistemaDeCadastro() {
    clear();
    console.log("|==============================|");
    console.log("|     Sistema de Cadastro      |");
    console.log("|==============================|");
    console.log("|                              |");
    console.log("| [1] Aluno                    |");
    console.log("| [2] Professor                |");
    console.log("| [3] Notas                    |");
    console.log("| [4] Frequência               |");
    console.log("| [0] Sair do Sistema          |");
    console.log("|                              |");
    console.log("|==============================|");

    let opcao = readlineSync.question("Digite a opcao desejada: ");
    switch (parseInt(opcao)) {
        case 1:
            sistemaAluno();
            break;
        case 2:
            sistemaProfessor();
            break;
        case 3:
            sistemaNotas();
            break;
        case 4:
            sistemaFrequencia();
            break;
        case 0:
            console.log("Saindo do sistema...");
            break;
        default:
            console.log("Opcao inválida. Digite um numero de 0 a 4.");
            sistemaDeCadastro();
            break;
    }
}

function sistemaAluno() {
    clear();
    console.log("|==============================|");
    console.log("|         Sistema Aluno        |");
    console.log("|==============================|");
    console.log("|                              |");
    console.log("| [1] Cadastrar Aluno          |");
    console.log("| [2] Alterar Aluno            |");
    console.log("| [3] Excluir Aluno            |");
    console.log("| [4] Listar Alunos            |");
    console.log("| [0] Sair do Sistema          |");
    console.log("|                              |");
    console.log("|==============================|");

    let opcao = readlineSync.question("Digite a opcao desejada: ");
    switch (parseInt(opcao)) {
        case 1:
            cadastrarAluno();
            break;
        case 2:
            alterarAluno();
            break;
        case 3:
            excluirAluno();
            break;
        case 4:
            listarAlunos();
            break;
        case 0:
            console.log("Saindo do sistema...");
            break;
        default:
            console.log("Opcao invalida. Digite um numero de 0 a 4.");
            sistemaAluno();
            break;
    }
}

function cadastrarAluno() {
    clear();
    console.log("|==============================|");
    console.log("|      Cadastrar Aluno         |");
    console.log("|==============================|");

    let matricula = readlineSync.question("Digite a matricula do aluno: ");
    let nome = readlineSync.question("Digite o nome do aluno: ");
    let serie = readlineSync.question("Digite a serie do aluno: ");
    let turma = readlineSync.question("Digite a turma do aluno: ");

    let aluno = criarAluno(matricula, nome, serie, turma);
    alunos.push(aluno);

    console.log(`Aluno ${nome} cadastrado com sucesso.`);
    readlineSync.keyInPause("Pressione qualquer tecla para continuar...");
    sistemaAluno();
}

function alterarAluno() {
    clear();
    console.log("|==============================|");
    console.log("|       Alterar Aluno          |");
    console.log("|==============================|");

    let matricula = readlineSync.question("Digite a matricula do aluno que deseja alterar: ");
    let aluno = encontrarAlunoPorMatricula(matricula);

    if (aluno) {
        let nome = readlineSync.question(`Nome atual: ${aluno.nome}. Digite o novo nome: `);
        let serie = readlineSync.question(`Serie atual: ${aluno.serie}. Digite a nova série: `);
        let turma = readlineSync.question(`Turma atual: ${aluno.turma}. Digite a nova turma: `);

        aluno.nome = nome;
        aluno.serie = serie;
        aluno.turma = turma;

        console.log(`Aluno ${aluno.nome} alterado com sucesso.`);
    } else {
        console.log(`Aluno com matricula ${matricula} nao encontrado.`);
    }

    readlineSync.keyInPause("Pressione qualquer tecla para continuar...");
    sistemaAluno();
}

function excluirAluno() {
    clear();
    console.log("|==============================|");
    console.log("|       Excluir Aluno          |");
    console.log("|==============================|");

    let matricula = readlineSync.question("Digite a matricula do aluno que deseja excluir: ");
    let index = alunos.findIndex(aluno => aluno.matricula === matricula);

    if (index !== -1) {
        let nome = alunos[index].nome;
        alunos.splice(index, 1);
        console.log(`Aluno ${nome} excluido com sucesso.`);
    } else {
        console.log(`Aluno com matricula ${matricula} nao encontrado.`);
    }

    readlineSync.keyInPause("Pressione qualquer tecla para continuar...");
    sistemaAluno();
}

function listarAlunos() {
    clear();
    console.log("|==============================|");
    console.log("|        Listar Alunos         |");
    console.log("|==============================|");

    if (alunos.length === 0) {
        console.log("Nenhum aluno cadastrado.");
    } else {
        alunos.forEach(aluno => {
            console.log(`Matrícula: ${aluno.matricula}, Nome: ${aluno.nome}, Série: ${aluno.serie}, Turma: ${aluno.turma}`);
        });
    }

    readlineSync.keyInPause("Pressione qualquer tecla para continuar...");
    sistemaAluno();
}

function sistemaProfessor() {
    clear();
    console.log("|==============================|");
    console.log("|      Sistema Professor       |");
    console.log("|==============================|");
    console.log("|                              |");
    console.log("| [1] Cadastrar Professor      |");
    console.log("| [2] Alterar Professor        |");
    console.log("| [3] Excluir Professor        |");
    console.log("| [4] Listar Professores       |");
    console.log("| [0] Voltar ao menu           |");
    console.log("|                              |");
    console.log("|==============================|");

    let opcao = readlineSync.question("Digite a opcao desejada: ");
    switch (parseInt(opcao)) {
        case 1:
            cadastrarProfessor();
            break;
        case 2:
            alterarProfessor();
            break;
        case 3:
            excluirProfessor();
            break;
        case 4:
            listarProfessores();
            break;
        case 0:
            console.log("Saindo do sistema...");
            break;
        default:
            console.log("Opção invalida. Digite um número de 0 a 4.");
            sistemaProfessor();
            break;
    }
}

function cadastrarProfessor() {
    clear();
    console.log("|==============================|");
    console.log("|    Cadastrar Professor       |");
    console.log("|==============================|");

    let matricula = readlineSync.question("Digite a matricula do professor: ");
    let nome = readlineSync.question("Digite o nome do professor: ");

    let professor = criarProfessor(matricula, nome);
    professores.push(professor);

    console.log(`Professor ${nome} cadastrado com sucesso.`);
    readlineSync.keyInPause("Pressione qualquer tecla para continuar...");
    sistemaProfessor();
}

function alterarProfessor() {
    clear();
    console.log("|==============================|");
    console.log("|      Alterar Professor       |");
    console.log("|==============================|");

    let matricula = readlineSync.question("Digite a matricula do professor que deseja alterar: ");
    let professor = encontrarProfessorPorMatricula(matricula);

    if (professor) {
        let nome = readlineSync.question(`Nome atual: ${professor.nome}. Digite o novo nome: `);
        professor.nome = nome;

        console.log(`Professor ${professor.nome} alterado com sucesso.`);
    } else {
        console.log(`Professor com matricula ${matricula} não encontrado.`);
    }

    readlineSync.keyInPause("Pressione qualquer tecla para continuar...");
    sistemaProfessor();
}

function excluirProfessor() {
    clear();
    console.log("|==============================|");
    console.log("|     Excluir Professor        |");
    console.log("|==============================|");

    let matricula = readlineSync.question("Digite a matricula do professor que deseja excluir: ");
    let index = professores.findIndex(professor => professor.matricula === matricula);

    if (index !== -1) {
        let nome = professores[index].nome;
        professores.splice(index, 1);
        console.log(`Professor ${nome} excluido com sucesso.`);
    } else {
        console.log(`Professor com matrícula ${matricula} não encontrado.`);
    }

    readlineSync.keyInPause("Pressione qualquer tecla para continuar...");
    sistemaProfessor();
}

function listarProfessores() {
    clear();
    console.log("|==============================|");
    console.log("|      Listar Professores      |");
    console.log("|==============================|");

    if (professores.length === 0) {
        console.log("Nenhum professor cadastrado.");
    } else {
        professores.forEach(professor => {
            console.log(`Matrícula: ${professor.matricula}, Nome: ${professor.nome}`);
        });
    }

    readlineSync.keyInPause("Pressione qualquer tecla para continuar...");
    sistemaProfessor();
}

function sistemaNotas() {
    clear();
    console.log("|==============================|");
    console.log("|        Sistema de Notas       |");
    console.log("|==============================|");
    console.log("|                              |");
    console.log("| [1] Registrar Notas          |");
    console.log("| [2] Visualizar Notas         |");
    console.log("| [0] Sair do Sistema          |");
    console.log("|                              |");
    console.log("|==============================|");

    let opcao = readlineSync.question("Digite a opcao desejada: ");
    switch (parseInt(opcao)) {
        case 1:
            registrarNotas();
            break;
        case 2:
            visualizarNotas();
            break;
        case 0:
            console.log("Saindo do sistema...");
            break;
        default:
            console.log("Opcao invalida. Digite um numero de 0 a 2.");
            sistemaNotas();
            break;
    }
}

function registrarNotas() {
    clear();
    console.log("|==============================|");
    console.log("|        Registrar Notas        |");
    console.log("|==============================|");

    let matricula = readlineSync.question("Digite a matricula do aluno: ");
    let aluno = encontrarAlunoPorMatricula(matricula);

    if (aluno) {
        let notas = readlineSync.question("Digite as notas do aluno (separadas por virgula): ").split(",").map(parseFloat);
        let frequencia = parseFloat(readlineSync.question("Digite a frequencia do aluno (%): "));

        registrarNotasEFrequencia(aluno, notas, frequencia);
        console.log(`Notas e frequencia registradas para o aluno ${aluno.nome}.`);
    } else {
        console.log(`Aluno com matricula ${matricula} nao encontrado.`);
    }

    readlineSync.keyInPause("Pressione qualquer tecla para continuar...");
    sistemaNotas();
}

function visualizarNotas() {
    clear();
    console.log("|==============================|");
    console.log("|       Visualizar Notas        |");
    console.log("|==============================|");

    let matricula = readlineSync.question("Digite a matricula do aluno: ");
    let aluno = encontrarAlunoPorMatricula(matricula);

    if (aluno) {
        console.log(`Notas do aluno ${aluno.nome}: ${aluno.registroNotas.notas}`);
        console.log(`Frequencia do aluno ${aluno.nome}: ${aluno.registroNotas.frequencia}%`);
    } else {
        console.log(`Aluno com matricula ${matricula} nao encontrado.`);
    }

    readlineSync.keyInPause("Pressione qualquer tecla para continuar...");
    sistemaNotas();
}

function sistemaFrequencia() {
    clear();
    console.log("|==============================|");
    console.log("|      Sistema de Frequência    |");
    console.log("|==============================|");
    console.log("|                              |");
    console.log("| [1] Registrar Frequência     |");
    console.log("| [2] Visualizar Frequência    |");
    console.log("| [0] Sair do Sistema          |");
    console.log("|                              |");
    console.log("|==============================|");

    let opcao = readlineSync.question("Digite a opcaoo desejada: ");
    switch (parseInt(opcao)) {
        case 1:
            registrarFrequencia();
            break;
        case 2:
            visualizarFrequencia();
            break;
        case 0:
            console.log("Saindo do sistema...");
            break;
        default:
            console.log("Opção invalida. Digite um numero de 0 a 2.");
            sistemaFrequencia();
            break;
    }
}

function registrarFrequencia() {
    clear();
    console.log("|==============================|");
    console.log("|     Registrar Frequência      |");
    console.log("|==============================|");

    let matricula = readlineSync.question("Digite a matrícula do aluno: ");
    let aluno = encontrarAlunoPorMatricula(matricula);

    if (aluno) {
        let frequencia = parseFloat(readlineSync.question("Digite a frequência do aluno (%): "));

        aluno.registroNotas.frequencia = frequencia;
        console.log(`Frequência registrada para o aluno ${aluno.nome}.`);
    } else {
        console.log(`Aluno com matrícula ${matricula} não encontrado.`);
    }

    readlineSync.keyInPause("Pressione qualquer tecla para continuar...");
    sistemaFrequencia();
}

function visualizarFrequencia() {
    clear();
    console.log("|==============================|");
    console.log("|     Visualizar Frequência     |");
    console.log("|==============================|");

    let matricula = readlineSync.question("Digite a matricula do aluno: ");
    let aluno = encontrarAlunoPorMatricula(matricula);

    if (aluno) {
        console.log(`Frequencia do aluno ${aluno.nome}: ${aluno.registroNotas.frequencia}%`);
    } else {
        console.log(`Aluno com matricula ${matricula} nao encontrado.`);
    }

    readlineSync.keyInPause("Pressione qualquer tecla para continuar...");
    sistemaFrequencia();
}

sistemaDeCadastro();

