


document.querySelector('.burger-menu').addEventListener('click', e =>{

    document.querySelector('.burger-menu').classList.toggle('active');
    document.querySelector('#sidebar-nav').classList.toggle('active');

});

document.querySelector('.hide-sidebar-menu').addEventListener('click', e =>{
    document.querySelector('.burger-menu').classList.remove('active');
    document.querySelector('#sidebar-nav').classList.remove('active');

});


