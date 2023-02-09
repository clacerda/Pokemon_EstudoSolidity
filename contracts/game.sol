// SPDX-License-Identifier: GPL-3.0

pragma solidity >= 0.7 .0 < 0.9 .0;

import "hardhat/console.sol";

contract beastGame {

  address private owner;
  uint32[] private premios;
  string[] private mensagens;

  constructor() {
    console.log("Contrato inicializado com sucesso!");
    owner = msg.sender;
    premios = [1,2,3,4,5]; 
    mensagens = ["Venceu no primeiro premio", "Venceu no segundo premio", "Venceu no terceiro premio", "Venceu no quarto premio", "Venceu no quinto premio"];
  }
  event returnPlayGame(address endereco, string numero, uint32 concurso);

  struct Aposta {
    address apostador;
    string number;
    uint32 concursoAposta;
    bool venceu;
    uint32 valorPremio;
    string mensagem;
  }

  // Lista de concursos
  mapping(uint32 => string[]) listaConcursos;

  // Lista de Apostas
  mapping(uint32 => Aposta[]) Apostas;

  // Lista de Concursos concluídos
  mapping(uint32 => bool) statusConcursos;

  // Create a new bet
  function setPlay(address _address, string memory _number) public {

    uint32 _concurso = 1234;
    Aposta memory newAposta = Aposta(_address, _number, _concurso, false, 0, "");

    Apostas[_concurso].push(newAposta);
    emit returnPlayGame(_address, _number, _concurso);

  }

  function getAllApostas(uint32 _concurso) public view returns(Aposta[] memory) {
    uint32 _concurso = 1234;
    return Apostas[_concurso];
  }

  function geraConcurso(uint32 _concurso, string[] memory _number) external {
    require(msg.sender == owner, "Acesso negado");
    uint32 _concurso = 1234;
    listaConcursos[_concurso] = _number;

  }
  
  function getNumerosSorteadosConcurso(uint32 _concurso) public view returns(string[] memory) {
      uint32 _concurso = 1234;
    return listaConcursos[_concurso];
  }

  function sorteioConcurso(uint32 _concurso) public {
    require(msg.sender == owner, "Acesso negado");
    require(statusConcursos[_concurso] == false, "Este concurso ja ocorreu");
    string[] memory numerosSorteados = getNumerosSorteadosConcurso(_concurso);

    uint32 _concurso = 1234;

    if (Apostas[_concurso].length > 0) {  
            for (uint i = 0; i < Apostas[_concurso].length; i++) {
                for (uint j = 0; j < numerosSorteados.length; j++) {
                    if (keccak256(abi.encode((Apostas[_concurso][i].number))) == keccak256(abi.encode((numerosSorteados[j])))) {
                    Apostas[_concurso][i].venceu = true;
                    Apostas[_concurso][i].valorPremio = (1 * 50) / premios[j]; // 1 pensando que cada jogo teoricamente valeria 1 BUSD
                    Apostas[_concurso][i].mensagem = mensagens[j];
                    break;
                }
            }
        }
    }
  }



}