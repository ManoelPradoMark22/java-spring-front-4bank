let userData = JSON.parse(localStorage.getItem('4bank'));
if(!userData){
	userData = {};
  $(document).ready(() => {
    $('#myLoginModal').show();
    $('.closeModal').hide();
  });
}else{
  $(document).ready(() => {
    $('.closeModal').show();
  });
  getBalance().catch(err => alert('Erro na requisição! ' + err.message));
}

window.clickAccount = function clickAccount(id){
  document.getElementById('numConta').innerHTML = `Conta: <span>${id}</span>`
  idAccountTransaction = parseInt(id);
}

window.clickContaSolidaria = function clickContaSolidaria(id){
  console.log(id);
  let radios = document.querySelectorAll('.transactionRadio');
  let inputContaDest = document.getElementById('conta_destino');
  let divContaDest = document.getElementById('inputContaDestino');
  for(let i=0; i<radios.length; i++){
    if(radios[i].id == 'radioTransferencia'){
      radios[i].checked = true;
    }else {
      radios[i].checked = false;
    }
  }
  divContaDest.style.display = 'flex';
  inputContaDest.value = id;
}

async function getContasSolidarias() {  
  const minhaUrl = 'http://localhost:8080/contasolidaria';
  const accounts = await fetch(minhaUrl, {mode: 'cors'})
  .then(response => response.json());
  console.log(accounts);

  document.getElementById('contasSolidarias').innerHTML = accounts.map(obj => `
    <a href="#transactions" class="divContaSolidaria" onclick="clickContaSolidaria(${obj.contaCorrente.idContaCorrente})">
      <h1>Conta: <span>${obj.contaCorrente.idContaCorrente}</span></h1>
      <hr>
      <h2>Causa:</h2>
      <h3>${obj.nomeCausa}</h3>
      <hr>
      <h2>Descrição:</h2>
      <h3>${obj.descricaoCausa}</h3>
    </a>
  `).join('');
}
getContasSolidarias().catch(err => alert('Erro na requisição! ' + err.message));

var idAccountTransaction = null;

async function getBalance() {
  document.getElementById('agencia').innerHTML = `Agência <span>${userData.agencia.idAgencia}</span> - ${userData.agencia.nomeAgencia}`;
  document.getElementById('complementoAgencia').innerHTML = `${userData.agencia.endereco} (Tel.: <span>${ userData.agencia.telefone}</span>)`;
  
  const minhaUrl = `http://localhost:8080/conta/fullinout/${userData.idCliente}`;
  const balance = await fetch(minhaUrl, {mode: 'cors'})
  .then(response => response.json());

  document.getElementById('numConta').innerHTML = balance.lista.length>0 ? `Conta: <span>${idAccountTransaction==null ? balance.lista[0].idAccount : idAccountTransaction}</span>` : "Crie uma conta!";
  let inputVal = document.getElementById('inputContainer');
  if(balance.lista.length>0){
    if(idAccountTransaction==null) {
      idAccountTransaction = balance.lista[0].idAccount
    };
    inputVal.style.display = 'flex';
  }else{
    inputVal.style.display = 'none';
  }
  

  document.getElementById('divBalance').innerHTML = `
    <div class="cardBalance">
      <h1>Total</h1>
      <h3><span>R$</span>${(balance.valorTotal).toFixed(2)}</h3>
    </div>
    <div class="cardBalance">
      <h1>Entradas</h1>
      <h3><span>R$</span>${(balance.entradas).toFixed(2)}</h3>
    </div>
    <div class="cardBalance">
      <h1>Saídas</h1>
      <h3><span>R$</span>${(balance.saidas).toFixed(2)}</h3>
    </div>
  `;

  document.getElementById('divAccounts').innerHTML = balance.lista.map(obj => `
    <a id=${obj.idAccount} href="#transactions" class="divAccount" onclick="clickAccount(${obj.idAccount})" data-aos="fade-down">
      <h1>Conta: <span>${obj.idAccount}</span></h1>
      <div class="detailsAccount">
        <div class="cardBalanceInsideTotal">
          <h1>Total</h1>
          <h3><span>R$</span>${(obj.valorTotal).toFixed(2)}</h3>
        </div>
        <div class="cardBalanceInsideInOut">
          <div>
            <h1>Entradas</h1>
            <h3><span>R$</span>${(obj.entradas).toFixed(2)}</h3>
          </div>
          <div>
            <h1>Saídas</h1>
            <h3><span>R$</span>${(obj.saidas).toFixed(2)}</h3>
          </div>
        </div>
      </div>
    </a>
  `).join('');
}

async function getBalanceWithParams(clientData) {
  document.getElementById('agencia').innerHTML = `Agência <span>${clientData.agencia.idAgencia}</span> - ${clientData.agencia.nomeAgencia}`;
  document.getElementById('complementoAgencia').innerHTML = `${clientData.agencia.endereco} (Tel.: <span>${ clientData.agencia.telefone}</span>)`;
  
  const minhaUrl = `http://localhost:8080/conta/fullinout/${clientData.idCliente}`;
  const balance = await fetch(minhaUrl, {mode: 'cors'})
  .then(response => response.json());

  document.getElementById('numConta').innerHTML = balance.lista.length>0 ? `Conta: <span>${idAccountTransaction==null ? balance.lista[0].idAccount : idAccountTransaction}</span>` : "Crie uma conta!";
  let inputVal = document.getElementById('inputContainer');
  if(balance.lista.length>0){
    if(idAccountTransaction==null) {
      idAccountTransaction = balance.lista[0].idAccount
    };
    inputVal.style.display = 'flex';
  }else{
    inputVal.style.display = 'none';
  }
  

  document.getElementById('divBalance').innerHTML = `
    <div class="cardBalance">
      <h1>Total</h1>
      <h3><span>R$</span>${(balance.valorTotal).toFixed(2)}</h3>
    </div>
    <div class="cardBalance">
      <h1>Entradas</h1>
      <h3><span>R$</span>${(balance.entradas).toFixed(2)}</h3>
    </div>
    <div class="cardBalance">
      <h1>Saídas</h1>
      <h3><span>R$</span>${(balance.saidas).toFixed(2)}</h3>
    </div>
  `;

  document.getElementById('divAccounts').innerHTML = balance.lista.map(obj => `
    <a id=${obj.idAccount} href="#transactions" class="divAccount" onclick="clickAccount(${obj.idAccount})" data-aos="fade-down">
      <h1>Conta: <span>${obj.idAccount}</span></h1>
      <div class="detailsAccount">
        <div class="cardBalanceInsideTotal">
          <h1>Total</h1>
          <h3><span>R$</span>${(obj.valorTotal).toFixed(2)}</h3>
        </div>
        <div class="cardBalanceInsideInOut">
          <div>
            <h1>Entradas</h1>
            <h3><span>R$</span>${(obj.entradas).toFixed(2)}</h3>
          </div>
          <div>
            <h1>Saídas</h1>
            <h3><span>R$</span>${(obj.saidas).toFixed(2)}</h3>
          </div>
        </div>
      </div>
    </a>
  `).join('');
}

async function catchAgencies() {
  const minhaUrl = "http://localhost:8080/agencia";
  const agencies = await fetch(minhaUrl, {mode: 'cors'})
  .then(response => response.json());
  document.getElementById('selectAgencies').innerHTML = agencies.map(obj => `
    <option value="${obj.idAgencia}">
      ${obj.nomeAgencia}
    </option>
  `).join('');
}
catchAgencies().catch(err => alert('Erro na requisição! ' + err.message));

async function getClientDataByCpf(cpf) {
  error = false;
  const minhaUrl = `http://localhost:8080/cliente/${cpf}`;
  const clientData = await fetch(minhaUrl, {mode: 'cors'})
  .then(response => {
    if(response.status != 200) {
      error = true;
    }
    return response.json();
  });
  
  if(error) {
    alert(clientData);
  }else {
    console.log(userData);
    localStorage.setItem('4bank', JSON.stringify(clientData));
    console.log(userData);
    console.log(clientData);
    getBalanceWithParams(clientData).catch(err => alert('Erro na requisição! ' + err.message));
    $('#myLoginModal').hide();
    $('#myCadastroModal').hide();
    $('.closeModal').is(':hidden') && $('.closeModal').show();
  }
}

async function cadastrarCliente(dataClient) {
  const minhaUrl = "http://localhost:8080/cliente";
  const response = await fetch(minhaUrl, 
    {
      method: 'POST',
      body: JSON.stringify(dataClient),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    }
  ).then(response => {
    return response;
  });
  console.log(response);
  if(response.status==201){
    getClientDataByCpf(dataClient.clienteCPF).catch((e) => alert(e.message));
    alert('Cadastro efetuado com sucesso');
  }else {
    alert(response.message);
  }
}

async function criarConta() {
  const minhaUrl = `http://localhost:8080/conta/${userData.idCliente}`;
  const response = await fetch(minhaUrl, 
    {
      method: 'POST',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    }
  ).then(response => {
    return response;
  });
  console.log(response);
  if(response.status==201){
    getBalance().catch(err => alert('Erro na requisição! ' + err.message));
    alert('Conta criada com sucesso');
  }else {
    alert(response.message);
  }
}

async function sacar(value) {
  const minhaUrl = `http://localhost:8080/conta/saque/${idAccountTransaction}`;
  const response = await fetch(minhaUrl, 
    {
      method: 'PUT',
      body: JSON.stringify({
        valor: value
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    }
  ).then(res => {
    return res.text();
  }).catch(err => {
    alert("Error");
  });

    if(!response.ok){
      alert(response);
      getBalance().catch(err => alert('Erro na requisição! ' + err.message));
    }else{
      alert(response);
    }
}

async function deposito(value) {
  const minhaUrl = `http://localhost:8080/conta/deposito/${idAccountTransaction}`;
  const response = await fetch(minhaUrl, 
    {
      method: 'PUT',
      body: JSON.stringify({
        valor: value
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    }
  ).then(res => {
    return res.text();
  }).catch(err => {
    alert("Error");
  });
  if(!response.ok){
    alert(response);
    getBalance().catch(err => alert('Erro na requisição! ' + err.message));
  }else{
    alert(response);
  }
}

async function transferencia(value, idContaDestino) {
  const minhaUrl = `http://localhost:8080/conta/transferencia/${idAccountTransaction}/${parseInt(idContaDestino)}`;
  const response = await fetch(minhaUrl, 
    {
      method: 'PUT',
      body: JSON.stringify({
        valor: value
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    }
  ).then(res => {
    return res.text();
  }).catch(err => {
    alert("Error");
  });
  if(!response.ok){
    alert(response);
    getBalance().catch(err => alert('Erro na requisição! ' + err.message));
  }else{
    alert(response);
  }
}

$(document).ready(() => {
  $('.bagDiv').click(() => {
    $('#myLoginModal').toggle();
  });

  $('.linkChangeModal').click(() => {
    $('#myLoginModal').toggle();
    $('#myCadastroModal').toggle();
  });

  $('.closeModal').click(() => {
    $('#myLoginModal').hide();
    $('#myCadastroModal').hide();
  });

  $('#createAccount').click(() => {
    criarConta();
  });

  var rdTransf = document.getElementById('radioTransferencia');
  var inputCtDestino = document.getElementById('inputContaDestino');
  $('#radioTransferencia').click(() => {
    inputCtDestino.style.display = 'flex';
  });
  $('#radioDeposito').click(() => {
    if(inputCtDestino.style.display == 'flex') {
      inputCtDestino.style.display = 'none'
    };
  });
  $('#radioSaque').click(() => {
    if(inputCtDestino.style.display == 'flex') {
      inputCtDestino.style.display = 'none'
    };
  });

  $('#submitButton').click(() => {
    valorInput = document.getElementById('value_field').value;
    valorInputContaDestino = document.getElementById('conta_destino').value;

    if(valorInput=="" || valorInput=='R$ 0,00'){
      alert("Insira um valor!")
    }else if(rdTransf.checked && (valorInputContaDestino=='' || valorInputContaDestino==0)) {
      alert("Digite o número da conta destino!");
    } else {
      let justDot = valorInput.replace('R$', "");
      justDot = justDot.replace(',', ".");
      justDot = parseFloat(justDot);

      let inputTransac = document.querySelectorAll('.transactionRadio');
      valuetransac = inputTransac[0].value;

      for(let i=0; i<inputTransac.length; i++){
        if(inputTransac[i].checked){
          valuetransac = inputTransac[i].value;
        }
      }

      switch(valuetransac){
        case('saque'):
          sacar(justDot);
          break;
        case('deposito'):
          deposito(justDot);
          break;
        case('transferencia'):
          transferencia(justDot, valorInputContaDestino);
          break;
        default:
          alert("Selecione o tipo da transação!")
          break;
      }
    }
  });

  $('#buttonLogar').click(() => {
    let input =  document.getElementById('cpfLogin');

    getClientDataByCpf(input.value).catch((e) => alert(e.message));
  });

  $("#value_field").keyup((e) => {
    let value = e.target.value;
    value = value.replace(/\D/g,"");

    value = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      useGrouping: false,
      minimumFractionDigits: 2
    }).format(value/100);

    e.target.value = value;
  });

  function justNumbers(e){
    let value = e.target.value;
    value = value.replace(/\D/g,"");

    e.target.value = value;
  }

  $("#conta_destino").keyup((e) => {
    justNumbers(e);
  });

  $("#cpfLogin").keyup((e) => {
    justNumbers(e);
  });

  $("#cpfCadastro").keyup((e) => {
    justNumbers(e);
  });

  $("#telefoneCadastro").keyup((e) => {
    justNumbers(e);
  });

  $('#buttonCadastrar').click(() => {
    let valueName =  document.getElementById('nomeCadastro').value;
    let valueCpf =  document.getElementById('cpfCadastro').value;
    let valueTelefone =  document.getElementById('telefoneCadastro').value;
    let valueAgencia =  document.getElementById('selectAgencies').value;
    let inputStyle = document.querySelectorAll('.styleRadio');
    valueStyle = inputStyle[0].value;

    for(let i=0; i<inputStyle.length; i++){
      if(inputStyle[i].checked){
        valueStyle = inputStyle[i].value;
      }
    }

    cadastrarCliente({
      clienteNome: valueName,
      clienteCPF: valueCpf,
      clienteFone: valueTelefone,
      styleId: valueStyle,
      agencia: {
          idAgencia: parseInt(valueAgencia)
      }
    }).catch((e) => {
      console.log(e);
      alert(e.message);
    });
  });
});


//


//*********************************************


$(document).ready(function(){

  $('#menu-bar').click(function(){
      $(this).toggleClass('fa-times');
      $('.navbar').toggleClass('nav-toggle');
  });

  $(window).on('load scroll',function(){

      $('#menu-bar').removeClass('fa-times');
      $('.navbar').removeClass('nav-toggle');

      $('section').each(function(){

          let top = $(window).scrollTop();
          let height = $(this).height();
          let id = $(this).attr('id');
          let offset = $(this).offset().top - 200;

          if(top > offset && top < offset + height){
              $('.navbar ul li a').removeClass('active');
              $('.navbar').find(`[href="#${id}"]`).addClass('active');
          }

      });

  });

  $('.list .btn').click(function(){
      $(this).addClass('active').siblings().removeClass('active');
  });

  $('.listInside .btnInside').click(function(){
    $(this).addClass('active').siblings().removeClass('active');
  });

  $('.boxAcaiSizes .acaiSizeInside').click(function(){
    $(this).addClass('active').siblings().removeClass('active');
  });

  $('.boxMSSizes .msSizeInside').click(function(){
    $(this).addClass('active').siblings().removeClass('active');
  });
});
