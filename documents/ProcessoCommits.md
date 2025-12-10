# Processo Commits

## Um commit deve de ser

- Frequente
- Atómico
- Descritivo
- Descentralizado
- Imutável

### Estrutura da mensagem do Commit

- Tipo(Obrigatório)
- Incidência(Opcional)
- Corpo(Opcional)
- Rodapé(Opcional)

### Tipo(Obrigatório)

- Identifica o motivo do commit. Pode ser categorizado como:

- **FEAT** - Novas funcionalidades
- **FIX** - Para correção de bugs ou defeitos
- **CHORE** - Para alterações que não afetam a fonte, mas são necessárias
- **CI** - Mudanças ci pipeline
- **DOCS** - Para alteração/criação de documentação
- **PERF** - Melhorias de desempenho
- **REFACTOR** - Para refactors (alteração do código sem mudar funcionalidades)
- **REVERT** - Reverter alterações
- **STYLE** - Para alterações cosméticas
- **TEST** - Para testes

### Incidência(Opcional)

- Permite designar a área que o commit irá afetar (ficheiro, aplicação, funcionalidade, departamento...)

### Corpo(Opcional)

- Serve para adicionar mais informação à descrição do commit.

### Rodapé(sempre que possível)

- Permite a realização de referências a tickets nos commits sem obstruir a linha de assunto do commit.

### Estrutura

```md
<tipo>[incidência]: <descrição>

<corpo opcional>

<rodapé>
```

### Exemplo: (o link abaixo presente irá apresentar-se como "#56" no preview do commit)

```md
DOCS[Qualidade, processos]: Criação do ficheiro markdown com o Processo dos Commits.

Criação de um proccesso de commits para a uniformização do processo da sua criação.

Este commit está associado ao issue https://gitlab.com/pl110/deishboard/-/issues/56
```
