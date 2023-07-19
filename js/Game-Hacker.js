let emojis=['&#128003;','&#128004;','&#128005;','&#128006;','&#128007;',
'&#128008;','&#128060;','&#128010;','&#128011;','&#128012;','&#128013;',
'&#128014;','&#128015;','&#128016;','&#128017;','&#128018;','&#128019;',
'&#128020;','&#128021;','&#128022;','&#128023;','&#128024;','&#128025;',
'&#128057;','&#128027;','&#128054;','&#128044;','&#128030;','&#128039;',
'&#128032;','&#128035;','&#128034;'];

/**the above array contains emojis hex code */

let powerup=['../images/freeze.png','../images/bonus.png']; /**powerup card images */
let powerupPresent=false;/**variable to check if special cards should be present or not
  note-special cards activate on choosing 24 cards or above */

    let container=document.createElement('div'); 
    container.classList.add('container');

    let rows=parseInt(prompt('Rows(choose 36 cards for activating leaderboard)'));
    let columns=parseInt(prompt('Columns(choose 36 cards for activating leaderboard)'));
     
    /**creating special cards function */
    function specialCards(){
        function freeze(){
            let card=document.createElement('div');
            card.classList.add('card');
            card.setAttribute('data-powerup','freeze');
    
            let frontcard=document.createElement('div');
            let backcard=document.createElement('div');
            frontcard.classList.add('frontcard');
            backcard.classList.add('backcard');
    
            let imgback=document.createElement('img');
            imgback.setAttribute('src','../images/cardback.png');
            imgback.classList.add('image');
    
            
            let imgfront=document.createElement('img');
            imgfront.setAttribute('src',powerup[0]);
            imgfront.classList.add('image');
    
            frontcard.appendChild(imgfront);
            backcard.appendChild(imgback);
            card.appendChild(frontcard);
            card.appendChild(backcard);
    
            container.appendChild(card);
 
        }
         function bonus(){
             let card=document.createElement('div');
             card.classList.add('card');
             card.setAttribute('data-powerup','bonus');
     
             
             let frontcard=document.createElement('div');
             let backcard=document.createElement('div');
             frontcard.classList.add('frontcard');
             backcard.classList.add('backcard');
     
             let imgback=document.createElement('img');
             imgback.setAttribute('src','../images/cardback.png');
             imgback.classList.add('image');
     
             
             let imgfront=document.createElement('img');
             imgfront.setAttribute('src',powerup[1]);
             imgfront.classList.add('image');
     
             frontcard.appendChild(imgfront);
             backcard.appendChild(imgback);
             card.appendChild(frontcard);
             card.appendChild(backcard);
     
             container.appendChild(card);
         }
         if(rows*columns>=24){
            powerupPresent=true;
             freeze();
             bonus();
           /**the function is called to create special cards if total cards >=24 */     
         }
         
        }
        specialCards();
       
    /**creation of cards */
    let noOfCards=powerupPresent?((columns*rows)/2)-1:((columns*rows)/2);
    container.setAttribute('style',`grid-template-columns:repeat(${columns},1fr);grid-template-rows:repeat(${rows},1fr)`);
    let i=0;
    for(i=0;i<noOfCards;i++){

        let card=document.createElement('div');
        card.classList.add('card');
       
        let card1=document.createElement('div');
        card1.classList.add('card');
        
        let frontcard=document.createElement('div');
        let backcard=document.createElement('div');
        frontcard.classList.add('frontcard');
        backcard.classList.add('backcard');

        
        let frontcard1=document.createElement('div');
        let backcard1=document.createElement('div');
        frontcard1.classList.add('frontcard');
        backcard1.classList.add('backcard');
        
        let imgback=document.createElement('img');
        imgback.setAttribute('src','../images/cardback.png');
        imgback.classList.add('image');
        
        if(i<28){
              frontcard.innerHTML=`<span class=emoji>${emojis[i]} </span>`;
              frontcard1.innerHTML=`<span class=emoji>${emojis[i]} </span>`;
              card.setAttribute('data-cardname',`${i}`);
              card1.setAttribute('data-cardname',`${i}`);
        }    
        else{
            frontcard.innerHTML=`<span class=dummy>Dummy</span>`;
            frontcard1.innerHTML=`<span class=dummy>Dummy</span>`;
            
        }
        backcard.appendChild(imgback);
        card.appendChild(frontcard);
        card.appendChild(backcard);

        let imgback1=document.createElement('img');
        imgback1.setAttribute('src','../images/cardback.png');
        imgback1.classList.add('image'); 
       
        backcard1.appendChild(imgback1);
        card1.appendChild(frontcard1);
        card1.appendChild(backcard1);

        container.appendChild(card);
        container.appendChild(card1);

    }
    document.body.appendChild(container);

 /*iniilaizing variables for example for rate at which cards turn,points
 flips and timer variables */ 
let flipcounter=0;
let points=0;
let timercount;
let count=0;
let HardnessCheck=0;
let gameRate=0;
let bonusCount=true;
let freezeCount=true;

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

let pickCard=true; /* makes sure that third card cannot be clicked before the first
                   two close*/
let pause=document.querySelector('.pause');
let resume=document.querySelector('.resume');

let firstScore=document.querySelector('.first');
let secondScore=document.querySelector('.second');
let thirdScore=document.querySelector('.third');

alert('Select Difficulty');

function pauseFn(){
    console.log('hello');
    overlay.classList.toggle('active');
    resume.classList.toggle('active');
    clearInterval(timerset);
    card.forEach((cards)=>{
        cards.classList.toggle('resume');
    })           
}
function resumeFn(){
    overlay.classList.remove('active');
    resume.classList.remove('active'); 
    timerset=setInterval(()=>{
        time.innerHTML=`${timercount}`;
        timercount--; 
    },1000);
    card.forEach((cards)=>{
        cards.classList.remove('resume');
    })
    
}
let LeaderBoardHacker=JSON.parse(localStorage.getItem('leaderStatHacker'))||
{
    first:100,
    second:200,
    third:300

};

thirdScore.innerHTML='III&nbsp;&nbsp;'+LeaderBoardHacker.third+' flips';
secondScore.innerHTML='II&nbsp;&nbsp;'+LeaderBoardHacker.second+' flips';
firstScore.innerHTML='I&nbsp;&nbsp;'+LeaderBoardHacker.first+' flips';

/**leaderboard function which gets called only if 36 cards are chosen in any way...
 * 6x6,9x4,18x2 etc */
function ranking(flip){
    if(flip<LeaderBoardHacker.first){
        LeaderBoardHacker.third=LeaderBoardHacker.second;
        LeaderBoardHacker.second=LeaderBoardHacker.first;
        LeaderBoardHacker.first=flip;       
    }
    else if(flip<LeaderBoardHacker.second){
       
        LeaderBoardHacker.third=LeaderBoardHacker.second;
        LeaderBoardHacker.second=flip;
    }
    else if(flip<LeaderBoardHacker.third){
        LeaderBoardHacker.third=flip;
    }
    localStorage.setItem('leaderStatHacker',JSON.stringify(LeaderBoardHacker)); 
   

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
            timercount=rows*columns*5;
            break;
        case 'medium':
            gameRate=0.7;
            timercount=rows*columns*4;
            break;
        case 'hard' :
            gameRate=0.5;
            timercount=rows*columns*3;
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
let timerset=0;
function timercheck(){
     timerset=setInterval(()=>{
        if(timercount>=0 && HardnessCheck===1){
                time.innerHTML=`${timercount}`;
                timercount--; 
            }
        if(timercount<0 ){
                overlayCheck();
                clearInterval(timerset);
            }      
         },1000);
}
timercheck();
/*this fn is called from asyn fn in case time has run out */     
 function overlayCheck(){

        scoreLoss.innerHTML=`${points}`;
        loseSound();
        overlay.classList.toggle('active');
        defeat.classList.toggle('active');
        card.forEach((cards)=>{
            cards.classList.toggle('resume');
        })
        
     
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
/**check for condition the game ends...if cards greater than 24 ,powerupPresent variable gets a 
 * true value and no of points required to win is adjusted accordingly */
let winCheck=powerupPresent?(rows*columns)/2+1:(rows*columns)/2 ; 
/*checks the match of the card */
function checkMatch(){
    if(firstcard.dataset.cardname===secondcard.dataset.cardname 
        &firstcard!=secondcard &firstcard.dataset.cardname!=undefined&
        secondcard.dataset.cardname!=undefined ){
        /*if points less than max possible points */
        if(points<winCheck-1){  
            
                 points++;
                 score.innerHTML=`${points}`;
                 
            cardMatch();  
        }
        else{             
            /*if all cards are facing up,victory popup is shown */
            setTimeout(() => {
                flipsWin.innerHTML=`${flipcounter}`;
                if(rows*columns===36){
                    ranking(flipcounter);
                }
                winSound();
                overlay.classList.toggle('active');
                victory.classList.toggle('active');
                firstcard.style.opacity='0';
                secondcard.style.opacity='0'; 
                clearInterval(timerset);
            }, 600);
          
        }    
    }
    else if(firstcard.dataset.powerup=='freeze'||
    secondcard.dataset.powerup=='freeze'){
        if(freezeCount){
            console.log('freeze');
            clearTimeout(timerset);
            freezeCount=false;
            setTimeout(()=>{
               timercheck();
            },5000);
            setTimeout(() => {
               if(firstcard.dataset.powerup=='freeze'){
                   firstcard.style.opacity='0';
               }
               else{
                   secondcard.style.opacity='0';
               }
           },1600);
          
        }
         cardNotMatch();    
    }
    else if(firstcard.dataset.powerup=='bonus'||
    secondcard.dataset.powerup=='bonus'){
        if(bonusCount){
            console.log('bonus');
            points+=2;
            score.innerHTML=`${points}`;
            bonusCount=false;
            setTimeout(() => {
                if(firstcard.dataset.powerup=='bonus'){
                    firstcard.style.opacity='0';
                }
                else{
                    secondcard.style.opacity='0';
                }
            },1600);
        }
        cardNotMatch();  
    } 
    else{
        cardNotMatch();     
}

function cardMatch(){
    /*if cards are matched then remove the click events of those cards */
   /* firstcard.removeEventListener('click',onclick);
    secondcard.removeEventListener('click',onclick);*/
    setTimeout(()=>{
        firstcard.style.opacity='0';
        secondcard.style.opacity='0';
        pickCard=true;
    },800);  
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








     
