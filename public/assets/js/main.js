
 

if(document.querySelector('.burger-menu')){
    document.querySelector('.burger-menu').addEventListener('click', e =>{
        document.querySelector('.burger-menu').classList.toggle('active');
        document.querySelector('.hide-sidebar-menu').classList.toggle('active');
        document.querySelector('#sidebar-nav').classList.toggle('active');
    });
}

if(document.querySelector('.hide-sidebar-menu')){
    document.querySelector('.hide-sidebar-menu').addEventListener('click', e =>{
        console.log('show side nav')
        document.querySelector('.burger-menu').classList.remove('active');
        document.querySelector('.hide-sidebar-menu').classList.remove('active');
        document.querySelector('#sidebar-nav').classList.remove('active');
    
    });    
}
 