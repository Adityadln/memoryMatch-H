 /*iniilaizing variables for example for rate at which cards turn,points
 flips and timer variables */ 
let flipcounter=0;
let points=0;
let timercount;
let count=0;
let HardnessCheck=0;
let gameRate=0;

 /*dom variable for timer,scores updation etc*/
let time=document.querySelector('.timer'); 
let score=document.querySelector('.score');
let flips=document.querySelector('.flips'); 
let card=document.querySelectorAll('.card');
let scoreLoss=document.querySelector('.scoreLoss');
let flipsWin=document.querySelector('.flipsWin');    

 /*dom variables for overlays when lost or won*/
let victory=document.querySelector('.containerpop');
let overlay=document.querySelector('.overlay');
let defeat =document.querySelector('.loss'); 

let firstScore=document.querySelector('.first');
let secondScore=document.querySelector('.second');
let thirdScore=document.querySelector('.third');

let pause=document.querySelector('.pause');
let resume=document.querySelector('.resume');


let pickCard=true; /* makes sure that third card cannot be clicked before the first
                   two close*/


alert('Select Difficulty');

let leaderBoard=JSON.parse(localStorage.getItem('leaderStat'))||
{
    first:100,
    second:200,
    third:300

};

thirdScore.innerHTML='III&nbsp;&nbsp;'+leaderBoard.third+' flips';
secondScore.innerHTML='II&nbsp;&nbsp;'+leaderBoard.second+' flips';
firstScore.innerHTML='I&nbsp;&nbsp;'+leaderBoard.first+' flips';

function pauseFn(){
    console.log('hello');
    overlay.classList.toggle('active');
    resume.classList.toggle('active');
    clearInterval(timerset);           
}
function resumeFn(){
    overlay.classList.remove('active');
    resume.classList.remove('active'); 
    timerset=setInterval(()=>{
        time.innerHTML=`${timercount}`;
        timercount--; 
    },1000);
    
}
function ranking(flip){
    if(flip<leaderBoard.first){
        leaderBoard.third=leaderBoard.second;
        leaderBoard.second=leaderBoard.first;
        leaderBoard.first=flip;       
    }
    else if(flip<leaderBoard.second){
       
        leaderBoard.third=leaderBoard.second;
        leaderBoard.second=flip;
    }
    else if(flip<leaderBoard.third){
        leaderBoard.third=flip;
    }
    localStorage.setItem('leaderStat',JSON.stringify(leaderBoard)); 
}

 /*difficulty selection of game*/
 /*difficulty varies the time available to finish the game as well as time the 
 card remains flipped up in case opened...so for hard, card is up for much
 lesser time than normal */
function diffSelection(){  
    let difficulty=document.getElementById('difficultyLevel');
    let diffValue=difficulty.value;
    console.log(diffValue);
    HardnessCheck++;
    difficultyConversion(diffValue);

}
 /*based on the difficulty the timer as well as the factor
 by which the card remains open is decided*/
function difficultyConversion(diffValue){
    switch(diffValue){
        case 'easy':
            gameRate=1 ;
            timercount=90;
            break;
        case 'medium':
            gameRate=0.7;
            timercount=70;
            break;
        case 'hard' :
            gameRate=0.5;
            timercount=50;
            break;       
    }
}
/*whenever a card is clicked this function is invoked */
function clickSound(){
    let sound=new Audio('../sounds/clicksound.wav');
    sound.play();
}
function winSound(){
    let sound=new Audio('../sounds/winsound.wav');
    sound.play();
}
function loseSound(){
    let sound=new Audio('../sounds/losesound.wav');
    sound.play();
}
/*this is the async function for timer */
 let timerset=setInterval(()=>{

    if(timercount>=0 && HardnessCheck===1){
            time.innerHTML=`${timercount}`;
            timercount--; 
        }
    if(timercount<0 ){
            overlayCheck();
            clearInterval(timerset);
        } 
     },1000);
/*this fn is called from asyn fn in case time has run out */     
 function overlayCheck(){

        scoreLoss.innerHTML=`${points}`;
        loseSound();
        overlay.classList.toggle('active');
        defeat.classList.toggle('active');
     
 }
/*this shuffles the deck of cards before the game starts */
 function cardshuffle(){
    
    card.forEach((card_order)=>{
            let random=Math.floor(Math.random()*16);
            card_order.style.order=random;
        })
    }
 cardshuffle();     

let firstcard,secondcard;
let cardflipped=false;

function onclick(cards){

    if(pickCard){
        clickSound();
    /*if card is clicked it is toggled to its active state */    
    cards.classList.toggle('flipped'); 
     
    if(!cardflipped){
        cardflipped=true;
        firstcard=cards;
        count++;
    }
    else{
        cardflipped=false;
        secondcard=cards;
        count++;
        pickCard=false;
    }
    if(count%2===0){   
        /*checking equality of cards when two cards are opened */
        flipcounter++;
        flips.innerHTML=`${flipcounter}`;
        console.log(firstcard.dataset.cardname,secondcard.dataset.cardname)
        pickCard=false;
        checkMatch();    
    } 
  }
            
}
/*everytime there is a click on any cards onclick fn is called, passing the
respective card as argument*/
card.forEach((cards)=>{

    cards.addEventListener('click',()=>{
       if(HardnessCheck===1){
        onclick(cards);
       }   
    })
})
/*checks the match of the card */
function checkMatch(){    
    if(firstcard.dataset.cardname===secondcard.dataset.cardname 
        &firstcard!=secondcard ){
        /*if points less than max possible points */
        if(points<7){  
            
                 points++;
                 score.innerHTML=`${points}`;
                 
            cardMatch();         
        }
        else{             
            /*if all cards are facing up,victory popup is shown */
            winSound()
            flipsWin.innerHTML=`${flipcounter}`;
            ranking(flipcounter);
            clearInterval(timerset);
            overlay.classList.toggle('active');
            victory.classList.toggle('active');
       }    
    }
    else{
        cardNotMatch();     
}
function cardMatch(){
    /*if cards are matched then remove the click events of those cards */
    firstcard.removeEventListener('click',onclick);
    secondcard.removeEventListener('click',onclick);   
    pickCard=true;
}
function cardNotMatch(){
    /*if cards match then flip it back by toggling back to its original state */
    setTimeout(()=>{    
        firstcard.classList.remove('flipped');
        secondcard.classList.remove('flipped');
        
        pickCard=true;
            
     },1500*gameRate);
    }
}







