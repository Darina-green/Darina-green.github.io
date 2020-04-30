let checkboxDark = document.querySelector('#dark'),
    labelDark = document.querySelector('.label-mod');
let darkcss;

labelDark.addEventListener('click',()=>{
    if(!checkboxDark.checked){
        darkcss = document.createElement('link');
        darkcss.rel = 'stylesheet';
        darkcss.href = 'css/style2.css';
        let head = document.querySelector('head');
        head.append(darkcss);
        console.log(darkcss);
    }
    else{
        darkcss.remove();
    }
})