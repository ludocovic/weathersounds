

function mapKeyToTon(key) {
  if(key==="A"){
    ton = 48
  } else if(key==="W"){
    ton = 49
  } else if(key==="S"){
    ton = 50;
  } else if(key==="E"){
    ton = 51
  } else if(key==="D"){
    ton = 52;
  } else if(key==="F"){
    ton = 53;
  } else if(key==="T"){
    ton = 54;
  } else if(key==="G"){
    ton = 55;
  } else if(key==="Z"){
    ton = 56;
  } else if(key==="H"){
    ton = 57;
  } else if(key==="U"){
    ton = 58;
  } else if(key==="J"){
    ton = 59;
  } else if(key==="K"){
    ton = 60;
  } else if(key==="O"){
    ton = 61;
  } else if(key==="L"){
    ton = 62;
  } else if(key==="P"){
    ton = 63;
  } else if(key==="Ö"){
    ton = 64;
  } else if(key==="Ä"){
    ton = 65;
  } else {
    ton = 11;
  }

  return ton;
}

function keyPressed() {
  playSound(mapKeyToTon(key));
  return false
};

function keyReleased() {
  stopSound(mapKeyToTon(key))
}
