let instructions=document.querySelector('.main-instruction');
let check=true;

function instructionFn(){
    if(check){
        instructions.style.height='650px';
        setTimeout(()=>{
            instructions.style.opacity='1';
        },200);
        check=false
    }
    else{
        instructions.style.height='0';
        instructions.style.opacity='0';
        check=true;
    }   
}