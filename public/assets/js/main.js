

let burgerMenu = document.querySelector('.burger-menu');
let sidenavMenu = document.querySelector('.hide-sidebar-menu');

if(burgerMenu){
    burgerMenu.addEventListener('click', e =>{
        burgerMenu.classList.toggle('active');
        sidenavMenu.classList.toggle('active');
    });
}

if(sidenavMenu){
    sidenavMenu.addEventListener('click', e =>{
        burgerMenu.classList.remove('active');
        sidenavMenu.classList.remove('active');
    
    });    
}




