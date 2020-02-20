var rainLevel;

/*function playSound(e){
  markers = e.target
  osc.freq(tempMidi);
  osc3.freq(tempSept);
  for (weatherCon of weather.weather){
    if (inRange(weatherCon.id, 803, 804)
     || inRange(weatherCon.id, 701, 781)
     || inRange(weatherCon.id, 200, 232)
     || inRange(weatherCon.id, 611, 622)
     || inRange(weatherCon.id, 503, 511)
     || inRange(weatherCon.id, 522, 531)
     || inRange(weatherCon.id, 302, 321)) {
        osc2.freq(tempMollTerz); //schlechtes Wetter
        env.triggerAttack();
 } else {
   osc2.freq(tempDurTerz); //schönes Wetter
   env.triggerAttack();}
} if (inRange(weatherCon.id,500,531)){
  rainLevel = map(weatherCon.id, 500, 531, 0.1, 0.3);
   rainFader.setRange(rainLevel, 0);
   rainFader.triggerAttack();
 }//cloudeffect.process(osc);
 //cloudeffect.process(osc2);
 //cloudeffect.process(osc3);
 if (inRange(weatherCon.id,801, 804)) {
//cloudeffect.connect()

cloudFreq = map(weatherCon.id, 801, 804, 0, 10000);
cloudRes = map(weatherCon.id, 801, 804, 0, 30);
cloudgain = (map(weatherCon.id,801,804,50,100));
cloudeffect.set(cloudFreq, cloudRes);
cloudeffect.gain(cloudgain)
}
}*/

let envelopes = {};

function playSound(ton) {
  const env = new p5.Env();
  env.setADSR(0.2,0.1,0.3,2.5);
  env.setRange(0.5, 0);

  osc = new p5.Oscillator();
  osc.amp(env);
  midiTon = midiToFreq(ton)
  osc.freq(midiTon);
  osc.start();
  env.triggerAttack()

  envelopes[ton] = env;

  return false;
  //rainFader.triggerAttack()
}
function stopSound(ton){
envelopes[ton].triggerRelease();
  //rainFader.triggerRelease();
return false;
}

function inRange(x, min, max) {
    return ((x-min)*(x-max) <= 0);
}
