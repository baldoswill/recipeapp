

let burgerMenux = document.querySelector('.burger-menu');
let sidenavMenu = document.querySelector('.hide-sidebar-menu');

if(burgerMenux){
    burgerMenux.addEventListener('click', e =>{
        burgerMenux.classList.toggle('active');
        sidenavMenu.classList.toggle('active');
    });
}

if(sidenavMenu){
    sidenavMenu.addEventListener('click', e =>{
        burgerMenux.classList.remove('active');
        sidenavMenu.classList.remove('active');
    
    });    
}




