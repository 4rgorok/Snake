var field
var new_game=true 
var pierwszy_ruch=true
var kierX
var kierY
var dlugosc 
var pole=new Array(22) 
var interwal
var szybkosc=120
var top_shift = 0
var left_shift = 0
var goodKey=false

document.addEventListener("DOMContentLoaded", function(){
    
    top_shift = (window.innerHeight - 880) / 2
    left_shift = (window.innerWidth - 880) / 2
    ustaw()
})

function ustaw()
{
    goodKey=false;
    kierX=0
    kierY=0
    new_game=true
    if(pierwszy_ruch==false)clearInterval(interwal)
    pierwszy_ruch=false
    dlugosc = 2
    document.body.innerHTML=""
    plansza()
    pole[10][10]=1
    pole[10][11]=2 
    dodajJablko()
}


function turn(event) 
{
    if(event.key=="w")
    {
        kierX=0
        kierY=-1
        goodKey=true
    }
    if(event.key=="a")
    {
        kierX=-1
        kierY=0
        goodKey=true
    }
    if(event.key=="s")
    {
        kierX=0
        kierY=1
        goodKey=true
    }
    if(event.key=="d")
    {
        kierX=1
        kierY=0
        goodKey=true
    }

    if(new_game && goodKey)
    {
        new_game=false
        interwal=setInterval(function(){przesun()}, szybkosc)
    }
    
}


function plansza()
{
    field=document.createElement("div")      
    field.style.position="absolute"
    field.style.width="880px"
    field.style.height="880px"

    field.style.top=top_shift + "px"
    field.style.left=left_shift + "px"
    field.style.backgroundColor="rgb(96, 216, 61)"
    for(var x=0;x<22;x++)
    {
        pole[x]=new Array(22)                 
        for(var y=0;y<22;y++)
        {
            pole[x][y]=0                      
            var klatka=document.createElement("div")
            klatka.style.position="absolute"
            klatka.style.width="40px"
            klatka.style.height="40px"
            klatka.id=x+"&"+y            
            klatka.style.top=(y*40)+"px"
            klatka.style.left=(x*40)+"px"
            if(x==10&&y==10)klatka.style.backgroundImage="url(./graphics/glowaN.png)" 
            if(x==10&&y==11)klatka.style.backgroundImage="url(./graphics/ogonN.png)"
            if(x==0||y==0||x==21||y==21)klatka.style.backgroundImage="url(./graphics/rama.png)" 
            field.appendChild(klatka)
        }
    }
    document.body.appendChild(field)
}



function przesun()
{
    if(new_game)return
    var przerwij=false
    var add=false
    var zx,zy
    for(var i=1;i<=dlugosc;i++) 
    {
        przerwij=false
        for(var y=1;y<21;y++)
        {
            for(var x=1;x<21;x++) 
            {
                if(pole[x][y]==i)
                {
                    pole[x][y]=0
                    if(i==1&&(x+kierX==0||x+kierX==21||y+kierY==0||y+kierY==21||pole[x+kierX][y+kierY]>0)) 
                    {
                        window.alert("Koniec Gry")
                        clearInterval(interwal) 
                        ustaw()
                        return 
                    }
                    if(i==1) 
                    {
                        if(pole[x+kierX][y+kierY]==-1)add=true 
                        pole[x+kierX][y+kierY]=i
                    }
                    else
                    {
                        pole[zx][zy]=i 
                    }
                    document.getElementById(x+"&"+y).style.backgroundImage=""
                    przerwij=true
                    zx=x 
                    zy=y
                    break
                }
            }
            if(przerwij)break
        }
    }
    if(add) 
    {
        add=false
        dlugosc++
        if(dlugosc==400) 
        {
            window.alert("Gratulacje!!! Wygrałeś!!!")
            clearInterval(interwal) 
            ustaw()
            return 
        }
        pole[zx][zy]=dlugosc
        dodajJablko()
    }
    var spr=false
    for(var i=1;i<=dlugosc;i++)
    {
        spr=false
        for(var y=1;y<21;y++)
        {
            for(var x=1;x<21;x++)
            {
                if(pole[x][y]==i)
                {
                    var div=document.getElementById(x+"&"+y)
                    var px,py,mx,my
                    var p1,p2
                    var n1,n2
                    if(i==1) 
                    {
                        if(pole[x+1][y]==2)div.style.backgroundImage="url('./graphics/glowaW.png')"
                        if(pole[x-1][y]==2)div.style.backgroundImage="url('./graphics/glowaE.png')"
                        if(pole[x][y+1]==2)div.style.backgroundImage="url('./graphics/glowaN.png')"
                        if(pole[x][y-1]==2)div.style.backgroundImage="url('./graphics/glowaS.png')"
                    }
                    else if(i==dlugosc)
                    {
                        if(pole[x+1][y]==dlugosc-1)div.style.backgroundImage="url('./graphics/ogonE.png')"
                        if(pole[x-1][y]==dlugosc-1)div.style.backgroundImage="url('./graphics/ogonW.png')"
                        if(pole[x][y+1]==dlugosc-1)div.style.backgroundImage="url('./graphics/ogonS.png')"
                        if(pole[x][y-1]==dlugosc-1)div.style.backgroundImage="url('./graphics/ogonN.png')"
                    }
                    else
                    {
                        if(pole[x+1][y]==i+1){p1=x+1;p2=y}
                        if(pole[x-1][y]==i+1){p1=x-1;p2=y}
                        if(pole[x][y+1]==i+1){p1=x;p2=y+1}
                        if(pole[x][y-1]==i+1){p1=x;p2=y-1}
                        if(pole[x+1][y]==i-1){n1=x+1;n2=y}
                        if(pole[x-1][y]==i-1){n1=x-1;n2=y}
                        if(pole[x][y+1]==i-1){n1=x;n2=y+1}
                        if(pole[x][y-1]==i-1){n1=x;n2=y-1}
                        if(p1==n1||p2==n2)div.style.backgroundImage="url('./graphics/cialo.png')"
                        if(p1>n1&&p2>n2&&p1==x)div.style.backgroundImage="url('./graphics/zakretS.png')"
                        if(p1>n1&&p2>n2&&p2==y)div.style.backgroundImage="url('./graphics/zakretN.png')"
                        if(p1<n1&&p2>n2&&p2==y)div.style.backgroundImage="url('./graphics/zakretW.png')"
                        if(p1>n1&&p2<n2&&p2==y)div.style.backgroundImage="url('./graphics/zakretE.png')"
                        if(p1<n1&&p2<n2&&p2==y)div.style.backgroundImage="url('./graphics/zakretS.png')"
                        if(p1<n1&&p2>n2&&p1==x)div.style.backgroundImage="url('./graphics/zakretE.png')"
                        if(p1>n1&&p2<n2&&p1==x)div.style.backgroundImage="url('./graphics/zakretW.png')"
                        if(p1<n1&&p2<n2&&p1==x)div.style.backgroundImage="url('./graphics/zakretN.png')"
                    }
                    spr=true
                    break
                }
            }
            if(spr)break
        }
    }
}

function dodajJablko()
{
    var x=10,y=10
    while(true)
    {
        x=Math.floor(Math.random() * 18)+1   
        y=Math.floor(Math.random() * 18)+1
        if(pole[x][y]==0)break
    }                   
    pole[x][y]=-1                             
    var div=document.getElementById(x+"&"+y)
    div.style.backgroundImage="url('./graphics/apple.png')"
}

window.onkeypress = function(e)
{
    turn(e)
}