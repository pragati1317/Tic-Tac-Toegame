let Play=document.querySelector('.play');
let FirstPage=document.querySelector('.hello');
let Start=document.querySelector('.start');
let Submit=document.querySelector('.submit');
let Player1=document.querySelector('.Player-1');
let Player2=document.querySelector('.Player-2');
let name1=document.querySelector('.name1');
let name2=document.querySelector('.name2');
let  GameStart=document.querySelector('#GameStart');
const Score1=document.getElementById('score-1');
const Score2=document.getElementById('score-2');
const Game=Array.from(document.getElementsByClassName('game'));
let Restart=document.querySelector('#restart');
let isgameover=false;
let line=document.querySelector('.line');
let turn ='X';
//let Info=document.getElementsByClassName('gameinfo');
let gameover=new Audio('gameover.mp3');
let Tiny=new Audio('ting.mp3');
//window.onload=FirstPage.style.display='block';
//Event Listener
Play.addEventListener('click', DisplayStart);
Submit.addEventListener('click', StartGame);
//Restart.addEventListener('click', RestartGame);

function StartGame()
{  
    if(Player1.value!="")
    {
        name1.innerText=Player1.value;
        Player1.value='';
    }
    else
    {
        name1.innerText='Player1';
    }
    if(Player2.value!="")
    {
          name2.innerText=Player2.value;
          Player2.value='';
    }
    else
    {
        name2.innerText="Player2";
    }
   Start.style.display='none';
   GameStart.style.display='grid';
}
function DisplayStart()
{   
    FirstPage.style.display='none';
    Start.style.display='block';
    
}
const changeTurn=()=>
{
   return turn==="X" ?"0":"X";
}

const WinningConditions=[
    [0,1,2,5,5,0],
    [3,4,5,5, 15, 0],
    [6,7,8, 5, 25, 0],
    [0,3,6,-7.5, 15, 90],
    [2,4,6 ,4,14,135],
    [0,4,8,2.5, 15, 45],
    [1,4,7,3,15,90],
    [2,5,8, 12.5, 15, 90],
   
];

const Check=()=>
{ 
   WinningConditions.forEach((e)=>
   {
       first =document.getElementById(e[0]);
       second =document.getElementById(e[1]);
       third=document.getElementById(e[2]);
       if((first.innerText!=='') && (second.innerText===first.innerText)&&(second.innerText===third.innerText))
       { 
           isgameover=true;
           gameover.play();
           document.querySelector('.imgbox').getElementsByTagName('img')[0].style.display = 'block';
           document.querySelector('.line').style.display='block';
           document.querySelector(".line").style.transform = `translate(${e[3]}vw, ${e[4]}vw) rotate(${e[5]}deg)`
           document.querySelector(".line").style.width = "25vw";
           
       }
       
   })
}

Game.forEach((element)=>
{ 
  element.addEventListener('click',((e)=>
  {let index;
    index=e.target.id;
    let box=document.getElementById(index);
    if(box.innerText==='')
    {
        document.getElementById(index).innerText=turn;
        Tiny.play();
      turn=changeTurn();
      Check();
      if(!isgameover)
      {  
           document.querySelector('.gameinfo').getElementsByTagName('span')[0].innerText='The turn for '+ turn;
      }
      else
      { 
          if(turn==='0')
          { document.querySelector('.gameinfo').getElementsByTagName('span')[0].innerText='The winner is'+ name1.innerText;
              Score1.innerText='1';
               
          }
          else if(turn==='X')
          { document.querySelector('.gameinfo').getElementsByTagName('span')[0].innerText='The winner is'+ name2.innerText;
              Score2.innerText='1';
          }
           
      }
     
    }
  }))  
})

Restart.addEventListener('click',()=>
{   Start.style.display='block';
    GameStart.style.display='none';
    Values=document.querySelectorAll('.value');
    Array.from(Values).forEach((e)=>
    {
      e.innerText='';
    })
    turn='X';
    Score1.innerText='0';
    Score2.innerText='0';
     isgameover=false;
    //restet start page
    gameover.pause();
    line.style.display='none';
    line.style.width='0px';
    
    document.getElementsByClassName('info')[0].innerText='The turn is of X' ;
    document.getElementsByTagName('img')[0].style.display = "none";
});