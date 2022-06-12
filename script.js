const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const sName = document.querySelector('#m-name')
const sBadge = document.querySelector('#m-bagde')
const sSalary = document.querySelector('#m-salary')
const btnSave = document.querySelector('#btn-save')

let items   //vai armazenar os itens do banco
let id      // vai armazenar o index para fazer a ação de edição

// funtion open modal
function openModal(edit = false, index = 0) {
    modal.classList.add('active')
    
    modal.onclick = e => {
        if (e.target.className.indexOf('modal-container') !== -1) {
            modal.classList.remove('active')
        }
      }

    if (edit) {
        sName.value = items[index].nome
        sBadge.value = items[index].funcao
        sSalary.value = items[index].salario
        id = index        
    }else {
        sName.value = ''
        sBadge.value = ''
        sSalary.value = ''
    }
}

// editar o item
function editItem(index) {
    openModal(true, index)
    
}

// deletar o item
function deleteItem(index) {
    items.splice(index, 1)
    setItemsDB()
    loadItems()    
}                   

//inserir o item 
function insertItem(item, index) {
    let tr = document.createElement('tr')

    tr.innerHTML = `                          
    <td>${item.nome}</td>
    <td>${item.funcao}</td>
    <td>R$ ${item.salario}</td>
    <td class="action">
    <button onclick= "editItem(${index})"><i class='bx bx-edit' ></i></button>
    </td>
    <td class="action">
    <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
    </td>
    `
    tbody.appendChild(tr)    
}                                   

// logica do botao salvar
btnSave.onclick = e => {
     if ( sName.value == '' || sBadge.value == '' || sSalary.value == '') {
        return
     }

     e.preventDefault();
     if (id !== undefined) {
        items[id].nome = sName.value
        items[id].funcao = sBadge.value
        items[id].salario = sSalary.value        
     } else {
        items.push({'nome': sName.value, 'funcao': sBadge.value, 'salario': sSalary.value})
     }

     setItemsDB()

     modal.classList.remove('active')
     loadItems();
     id = undefined;    
}

// função que carrega os items na tabela
function loadItems() {
    items = getItemsDB()
    tbody.innerHTML = ''
    items.forEach((item, index) => {
        insertItem(item, index)
    })
}

// função para pegar os itens do banco de dados
const getItemsDB = () => JSON.parse(localStorage.getItem('dbFunction')) ?? []

// função para setar os itens do banco de dados
const setItemsDB = () => localStorage.setItem('dbFunction', JSON.stringify(items))

loadItems()

