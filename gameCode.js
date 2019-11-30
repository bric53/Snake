var h = 30;
var w = 30;
var dir = ["right"];
var xPos = 3;
var yPos = h/2;
var length = 1;
var data = [];
var tbl;
var speed = 120;
document.addEventListener('keydown',    keyPress,    false);

function main()
{
  tbl = document.getElementById('tablehere');
  makeTable(tbl,h,w);
  InitializeData();
  eat();
  update();
}

function InitializeData ()
{
  for (i = 0; i < h; i++)
  {
    var row = [];
    for (j=0; j< w; j++)
    {
      row.push(0);
    }
    data.push(row);
  }

}



function makeTable(main, height, width)
{
	var TB = document.createElement("table");
	var TD;
	var TR;
	for (i = 0; i < height; i++){
		 TR = document.createElement('tr');
		for (j = 0; j < width; j++){
			TD = document.createElement('td');
      TD.innerHTML = "0";
			if (TD.innerHTML == 0) //makes empty tiles blank
				TD.innerHTML = "";
			TR.appendChild(TD);	//adds the tile to the row


		}
		TB.appendChild(TR); //adds a row to the table


	}
	main.appendChild(TB);
}


function keyPress(event) {

  LR = ((dir == "left")||(dir == "right"));
  oldDir = dir;
	var k = event.keyCode;
  switch(k)
  {
	case 37: dir.push("left");event.preventDefault(); break;
	case 38: dir.push("up"); event.preventDefault(); break;
	case 39: dir.push("right");event.preventDefault();  break;
	case 40: dir.push("down");event.preventDefault(); break;
	return;
  }
if ((dir[0] == "left") && (dir[1] == "right")) {dir.shift();dir.shift();dir.unshift("left");}
if ((dir[0] == "right") && (dir[1] == "left")) {dir.shift();dir.shift();dir.unshift("right");}
if ((dir[0] == "up") && (dir[1] == "down")) {dir.shift();dir.shift();dir.unshift("up");}
if ((dir[0] == "down") && (dir[1] == "up")) {dir.shift();dir.shift();dir.unshift("down");}




}

function update()
{
  setTimeout(update, speed);
  if (dir.length >1) {dir.shift();}
  if (dir[0] == "left") {xPos--;}
  if (dir[0] == "right") {xPos++;}
  if (dir[0] == "up") {yPos--}
  if (dir[0] == "down") {yPos++}
  if (data[yPos][xPos] == "f") {eat();}
  else{ if (!(data[yPos][xPos] == 0)) {alert("game Over");}}
  var d;
  for (i = 0; i < h; i++)
  {
    for (j = 0; j<w; j++)
    {
      //main.children[0].children[i].children[j].innerHTML = data[i][j];
      if (data[i][j]>0)
      {
        data[i][j]--;
        tbl.children[0].children[i].children[j].className = "body";
      }
      if (data[i][j] == 0)
      {
        tbl.children[0].children[i].children[j].className = "blank";
      }
      if (data[i][j] == "f")
      {
        tbl.children[0].children[i].children[j].className = "fruit";
      }

    }

    data [yPos][xPos] = length;
    tbl.children[0].children[yPos].children[xPos].className = "head";

  }

}

function eat(great)
{
length++;
  for (i = 0; i < 16; i++) //tries to find a random tile, up to 16 times
	{

		var r = Math.floor(Math.random() * h);//random row
		var c = Math.floor( Math.random() * w);//random column
		if (data[r][c] == 0)
		{
			data[r][c] = "f";

			return;
		}
	}
	for (i = 0; i<h;i++)// if a random tile could not be found, place it in the top left most open tile.
	{
		for (j = 0; j<w;j++)
		{

			if (data[i][j] == 0)
			{
				data[i][j] = "f";
				return;
			}
		}
	}
}
