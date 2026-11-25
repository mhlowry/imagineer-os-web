import{j as r,r as M}from"./index-D2E9wrR0.js";import{C as p,m as B,u as D,H as w,P as y,f as H,S as L,B as S,a as W}from"./PrimerShell-CKUpy9zD.js";import{p as X,f as E}from"./netlist-5vQsglYm.js";import{p as U,w as F}from"./check-8iLwXPq9.js";const R={term:"DMX512",label:"DMX",def:"The lighting-control standard (ANSI E1.11): up to 512 levels, 0–255 each, sent over and over on an RS-485 pair at 250,000 bits a second. One line of it is a universe."},j={term:"Universe",def:"One DMX line's worth of channels: up to 512. Big shows run hundreds of universes, most of them carried over Ethernet (sACN or Art-Net) to nodes that turn them back into DMX."},T={term:"Channel (slot)",label:"channel",def:"One of a universe's 512 numbered places, holding one level from 0 to 255. The standard calls them slots; everyone else says channels."},$={term:"Level",def:"A channel's value, 0 to 255: one byte. What it does depends on the fixture listening: a dimmer's brightness, a colour's amount, a moving light's pan."},I={term:"Fixture",def:"Anything on the DMX line that obeys it: a PAR, a moving light, a dimmer, a fog machine. Each listens to its own block of channels."},_={term:"Controller (DMX source)",label:"controller",def:"The one device on a line that sends DMX: a console, a show controller, an Ethernet node, or your Arduino. Everything else only listens."},z={term:"RS-485",def:"Sending serial data as a voltage difference on a pair of wires, A and B. DMX's electrical layer, from the MAX485 lesson."},V={term:"DMXSerial",def:"The Arduino library by Matthias Hertel that makes an Arduino a DMX controller (or receiver). It takes over the hardware serial port on pin 1 and switches the MAX485's direction pin, pin 2."},ne={dmx512:{...R,station:"start"},controller:{..._,station:"start"},rs485:{...z,station:"start"},universe:{...j,station:"universe"},channel:{...T,station:"universe"},level:{...$,station:"universe"},fixture:{...I,station:"universe"},refresh:{term:"Refresh rate",station:"universe",def:"How many times a second the controller sends the whole frame. 512 channels go about 44 times a second; fewer channels, faster."},oneway:{term:"One-way (no acknowledgement)",label:"one-way",station:"universe",def:"DMX never hears back: no fixture says “got it”. The controller just keeps resending everything, so a garbled frame is fixed a few milliseconds later by the next one."},frame:{term:"Frame (packet)",label:"frame",station:"frame",def:"One pass through the universe: a break, a mark after break, the start code, then the channel slots in order."},break:{term:"Break",station:"frame",def:"The line held LOW for longer than any byte can be (at least 92 µs from a transmitter; receivers accept 88 µs). It means “a new frame starts now”. DMXSerial's is 100 µs."},mab:{term:"Mark after break (MAB)",label:"mark after break",station:"frame",def:"The short HIGH right after the break (at least 12 µs from a transmitter; receivers accept 8 µs), before the start code. DMXSerial's is about 16 µs."},startcode:{term:"Start code",station:"frame",def:"The first slot of every frame, before channel 1. 0x00 means “ordinary levels”. Other values mark other kinds of packet, such as RDM's 0xCC, which ordinary fixtures ignore."},slot:{term:"Slot timing",station:"frame",def:"Each slot is one byte sent 8N2 at 250,000 bits a second: a start bit, 8 data bits, 2 stop bits. 11 bits, 44 µs."},hex:{term:"0x00 (hex)",label:"0x00",station:"frame",def:"A number written in hexadecimal: 0x00 is 0, 0xFF is 255, 0xCC is 204. Two hex digits are one byte."},dmxserial:{...V,station:"library"},library:{term:"Library",station:"library",def:"Ready-made code you add to a sketch with #include. In the Arduino IDE: Sketch → Include Library → Manage Libraries, then search and install. The lab has DMXSerial built in."},interrupt:{term:"Interrupt",station:"library",def:"Hardware that pauses your sketch for a few microseconds to do something urgent, then lets it carry on. DMXSerial uses the serial port's interrupt to send the next slot the moment the last one has gone, so your loop() never has to."},buffer:{term:"Buffer",station:"library",def:"Memory holding the levels waiting to be sent. DMXSerial.write() changes a level in its buffer; the next frame sends it."},maxchannel:{term:"maxChannel()",station:"library",def:"Sets how many channels DMXSerial sends each frame. It sends 32 until told otherwise, and writing a higher channel stretches the frame to include it. maxChannel(512) sends the whole universe."},tester:{term:"DMX tester",station:"first",def:"A handheld meter for DMX: plug it into a line and it says whether there's valid DMX on it, how fast, and what each channel's level is. Every lighting toolbox has one."},millis:{term:"millis()",station:"move",def:"The milliseconds since the Arduino started. Comparing it with a remembered time lets a sketch do something every so often without stopping, unlike delay()."},nonblocking:{term:"Non-blocking",station:"move",def:"Code that never stops to wait: each pass through loop() checks the time, does a little, and moves on, so everything else keeps running too."},logic:{term:"Logic analyser",station:"trouble",def:"A gadget that records digital signals over time, so you can see the actual bits. Cheap USB ones work with free software (PulseView) that can decode DMX512 frame by frame."}},se={dmx512:{...R,station:"start"},fixture:{...I,station:"start"},cue:{term:"Cue",station:"start",def:"One recorded change of the show's look, fired on a GO: a light fading up, a sound starting, a ride vehicle released. A show is a list of cues."},go:{term:"GO",station:"start",def:"The button (or timecode, or sensor) that fires the next cue. On a console it's the big one."},address:{term:"DMX address (start address)",label:"address",station:"address",def:"The first channel a fixture listens to. A 4-channel PAR at address 10 reads channels 10, 11, 12 and 13."},footprint:{term:"Footprint",station:"address",def:"How many channels a fixture uses in its current mode. Its last channel is address + footprint − 1."},patch:{term:"Patch",station:"address",def:"The plan of which fixture sits at which address in which universe. On a show it's paperwork that matters: two fixtures patched over each other fight."},channel:{...T,station:"address"},universe:{...j,station:"address"},mode:{term:"Channel mode (personality)",label:"mode",station:"channels",def:"Which set of channels a fixture listens to, chosen on the fixture: a PAR might offer 3 channels (red, green, blue) or 7 (dimmer, red, green, blue, white, strobe, macro)."},dimmer:{term:"Dimmer channel (intensity)",label:"dimmer",station:"channels",def:"A channel that scales the fixture's whole output. With colour channels at full, the dimmer at 128 gives about half brightness."},rgb:{term:"RGB mixing",station:"channels",def:"Making colours by mixing red, green and blue light: all three at full is white; red and green make yellow; red with a little green makes amber."},dmxchart:{term:"DMX chart",station:"channels",def:"The table in a fixture's manual saying what each of its channels does in each mode. Real fixtures differ, so it's always the first thing to read."},daisy:{term:"Daisy chain",station:"cable",def:"How a DMX line runs: from the controller into the first fixture's DMX IN, out of its DMX OUT (THRU) into the next, and so on. Up to 32 fixtures per line."},terminator:{term:"Terminator",station:"cable",def:"A 120 Ω resistor across Data+ and Data− in a plug, fitted to the last fixture's DMX OUT. It stops signals bouncing back down the line."},splitter:{term:"DMX splitter",station:"cable",def:"A box that takes one DMX input and drives several separate outputs, each its own line. The only right way to branch DMX: a Y-cable doesn't work."},xlrgender:{term:"DMX connector genders",label:"female out, male in",station:"cable",def:"DMX outputs are female XLR and inputs are male, the opposite of audio. A DMX cable has a male plug at one end and a female at the other."},common:{term:"Common (pin 1)",label:"common",station:"cable",def:"DMX's third wire, the 0 V reference and the cable's shield. It keeps both ends' grounds close enough for RS-485 to work."},pullup:{term:"INPUT_PULLUP",station:"button",def:"A pin mode that switches on a resistor inside the Arduino pulling the pin HIGH. Wire the button to GND and the pin reads HIGH until pressed, LOW while pressed."},activelow:{term:"Active LOW",station:"button",def:"Doing its job when LOW. A button to GND with a pull-up is active LOW: pressed reads LOW."},bounce:{term:"Contact bounce",label:"bounce",station:"button",def:"A switch's metal contacts hitting and springing apart several times in the first few milliseconds of a press or release. A fast sketch sees each one as a separate press."},debounce:{term:"Debouncing",station:"button",def:"Believing a button's new state only after it has held steady for a short while, typically 20–50 ms, so one press counts once."},edge:{term:"Edge detection",station:"button",def:"Acting when a signal changes (released → pressed) rather than while it's in a state (pressed). A cue should fire on the press, once, not over and over while the button is held."},fade:{term:"Fade",station:"cue",def:"A level changing smoothly from one value to another over a set time, by sending many small steps. On a console every cue has a fade time."},statemachine:{term:"State machine",station:"cue",def:"A way of writing a sketch as a few named states (idle, fading) and the events that move between them. Show control is full of them."},interpolate:{term:"Interpolation",station:"cue",def:"Working out the in-between value: from + (to − from) × elapsed ÷ fade time. At half the fade time you're halfway there."},millis:{term:"millis()",station:"cue",def:"The milliseconds since the Arduino started. A fade compares it with the time the cue started to know how far along it is."},delayblocks:{term:"Why not delay()",label:"delay()",station:"cue",def:"delay() stops the whole sketch. During a fade built from delays, nothing reads the button or does anything else. A fade built on millis() never stops."}};function Y({r:e=0,g:t=0,b:n=0,w:a=0}){const s=i=>Math.round(255*Math.min(1,Math.pow(Math.min(1,i+a),.5555555555555556)));return{css:`rgb(${s(e)},${s(t)},${s(n)})`,bright:Math.max(e,t,n,a)}}function Z({r:e,g:t,b:n,w:a,label:s}){const{css:i,bright:l}=Y({r:e,g:t,b:n,w:a});return r.jsxs("g",{children:[l>.02&&r.jsx("path",{d:"M 32 22 L 2 0 L 118 0 L 88 22 Z",fill:i,opacity:.25*l}),r.jsx("rect",{x:14,y:20,width:92,height:92,rx:10,fill:"#1b1b1b",stroke:"#000"}),r.jsx("circle",{cx:60,cy:66,r:36,fill:"#2a2a2a"}),r.jsx("circle",{cx:60,cy:66,r:31,fill:l>.02?i:"#111",opacity:l>.02?.45+.55*l:1}),Array.from({length:12},(u,o)=>{const d=o/12*Math.PI*2;return r.jsx("circle",{cx:60+20*Math.cos(d),cy:66+20*Math.sin(d),r:4,fill:l>.02?"#fff":"#333",opacity:l>.02?.45+.55*l:.6},o)}),s&&r.jsx("text",{x:60,y:140,fontSize:13,textAnchor:"middle",fill:p.dim,fontFamily:"JetBrains Mono, monospace",children:s})]})}function ae({size:e=120,...t}){return r.jsx("svg",{viewBox:"0 0 120 150",width:e,style:{display:"block"},"aria-label":t.label||"the light",children:r.jsx(Z,{...t})})}function oe({t:e}){const t=a=>String(a).padStart(3,"0");let n;if(!e)n=[["no tester reading yet",p.faint]];else if(e.status==="ok"){const a=e.levels.map((s,i)=>`${t(e.first+i)}:${s==null?" --":String(s).padStart(3," ")}`);n=[[`DMX OK   ${e.rate} Hz`,"#d7ff9e"],[`start code 00 · ${e.slots} channels`,"#d7ff9e"],[a.slice(0,4).join("  "),"#eaffd0"],[a.slice(4,8).join("  "),"#eaffd0"]]}else e.status==="reversed"?n=[["NO VALID DMX","#ffb3a7"],["A/B reversed?","#ffb3a7"]]:e.status==="steady"?n=[["NO DMX FRAMES","#ffe08a"],["line held steady: no breaks","#ffe08a"]]:n=[["NO SIGNAL","#9fb59a"]];return r.jsx("div",{style:{background:"#1d2b12",border:"2px solid #0b0f08",borderRadius:8,padding:"10px 12px",...B,minHeight:96,overflowX:"auto"},children:n.map(([a,s],i)=>r.jsx("div",{style:{color:s,fontSize:15,lineHeight:1.55,whiteSpace:"pre",fontWeight:600},children:a},i))})}function re({big:e,final:t,terms:n,stations:a,finish:s}){function i(){const{go:d}=D();return r.jsxs(r.Fragment,{children:[r.jsx(w,{sub:"Everything from the lesson, on one page.",children:"The whole thing, briefly"}),r.jsx("div",{style:{display:"grid",gap:8,margin:"0 0 16px"},children:e.map(([m,h,f],x)=>r.jsxs("button",{className:"tap",onClick:()=>d(h,0),style:{display:"flex",gap:12,alignItems:"flex-start",textAlign:"left",background:p.panel,border:`1px solid ${p.line}`,borderRadius:10,padding:"10px 12px",color:p.body,fontSize:17,lineHeight:1.5,fontWeight:500,cursor:"pointer"},children:[r.jsx("span",{style:{fontSize:22},children:m}),r.jsx("span",{children:f})]},x))}),r.jsx(y,{style:{color:p.dim},children:"Tap any line to go back to where it's taught."})]})}function l(){return r.jsxs(r.Fragment,{children:[r.jsx(w,{children:"Final check"}),t.map(d=>r.jsx(H,{...d},d.id))]})}function u(){const{openTerm:d}=D(),[m,h]=M.useState(""),[f,x]=M.useState("station"),v=M.useMemo(()=>Object.entries(n).map(([c,g])=>({k:c,...g})),[]),k=m.trim().toLowerCase(),A=k?v.filter(c=>c.term.toLowerCase().includes(k)||c.def.toLowerCase().includes(k)):v,G=f==="station"?a.map(([c,g])=>({title:g,items:A.filter(b=>b.station===c)})).filter(c=>c.items.length):[{title:null,items:[...A].sort((c,g)=>c.term.localeCompare(g.term))}];return r.jsxs(r.Fragment,{children:[r.jsx(w,{sub:`All ${v.length} words the lesson uses, in plain English. Tap one for its meaning (and 📌 to save it).`,children:"Word bank"}),r.jsxs("div",{style:{display:"flex",gap:8,flexWrap:"wrap",alignItems:"center",marginBottom:14},children:[r.jsx("input",{type:"search",value:m,onChange:c=>h(c.target.value),placeholder:"Search the word bank","aria-label":"Search the word bank",autoCorrect:"off",autoCapitalize:"off",spellCheck:!1,style:{flex:"1 1 240px",minWidth:0,background:"#0d1017",border:`1px solid ${p.line2}`,borderRadius:9,color:p.text,padding:"11px 12px",fontSize:17,minHeight:46}}),r.jsx(L,{value:f,options:[["station","By station"],["az","A–Z"]],onChange:x})]}),A.length===0&&r.jsxs(y,{style:{color:p.dim},children:["Nothing matches “",m,"”."]}),G.map((c,g)=>r.jsxs("div",{style:{marginBottom:14},children:[c.title&&r.jsx("div",{style:{...B,fontSize:12,letterSpacing:1.6,color:p.faint,margin:"4px 0 6px"},children:c.title.toUpperCase()}),r.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:8},children:c.items.map(b=>r.jsx("button",{className:"tap",onClick:()=>d(b.k),style:{background:"#121726",border:`1px solid ${p.line2}`,borderRadius:8,padding:"8px 12px",minHeight:40,color:"#7dd3fc",fontSize:16,fontWeight:700,cursor:"pointer"},children:b.term},b.k))})]},g))]})}function o(){const{doc:d}=D();return r.jsxs(r.Fragment,{children:[r.jsx(w,{children:s.title}),r.jsxs(y,{children:[s.text," ",s.proven(d.seen||{})?r.jsx(S,{c:p.good,children:s.doneLine}):r.jsx(S,{children:s.notYetLine})]}),r.jsx(W,{kind:"show",title:s.nextTitle,children:s.next}),r.jsxs(y,{children:["Press ",r.jsx(S,{children:"Finish ✓"})," below to mark the lesson done. Your answers and measurements stay saved, and the word bank is one step back."]})]})}return{id:"review",title:"Wrap-up",icon:"★",pages:"8 min",steps:[{title:"The whole thing, briefly",Body:i},{title:"Final check",Body:l},{title:"Word bank",Body:u},{title:"Finish",Body:o}]}}const ie=`#include <DMXSerial.h>

void setup() {
  DMXSerial.init(DMXController);  // pin 1 now sends DMX; pin 2 goes HIGH (talk)
  DMXSerial.write(1, 255);        // channel 1: full
  DMXSerial.write(2, 128);        // channel 2: half
  DMXSerial.write(3, 10);         // channel 3: a glow
}

void loop() {
  // nothing to do: DMXSerial keeps sending every channel, over and over
}
`,le=`#include <DMXSerial.h>

unsigned long lastStep = 0;  // when the level last changed
int level = 0;               // channel 1's level, 0 to 255

void setup() {
  DMXSerial.init(DMXController);
}

void loop() {
  if (millis() - lastStep >= 10) {  // every 10 ms...
    lastStep = millis();
    level = level + 1;               // ...one step up
    if (level > 255) level = 0;      // and round again from dark
    DMXSerial.write(1, level);
  }
}
`,de=`#include <DMXSerial.h>

// The PAR: address 1, 4-channel mode (dimmer, red, green, blue)
const int PAR = 1;                    // the PAR's address: its first channel
const int buttonPin = 7;              // button to GND, read with INPUT_PULLUP
const long FADE_MS = 2000;            // the cue's fade time, in ms

// the look before and after the cue: dimmer, red, green, blue
const int from[4] = {0, 0, 0, 255};      // dark (blue, but the dimmer's at 0)
const int to[4] = {255, 255, 140, 40};   // full, warm amber

int lastReading = HIGH;          // the button's raw reading last time round
int buttonState = HIGH;          // its debounced state
unsigned long lastChange = 0;    // when the raw reading last changed
bool fading = false;             // is the cue running?
unsigned long fadeStart = 0;     // when it started

void setLook(long t) {           // the look t ms into the fade
  for (int i = 0; i < 4; i++) {
    long level = from[i] + (to[i] - from[i]) * t / FADE_MS;
    DMXSerial.write(PAR + i, level);
  }
}

void setup() {
  DMXSerial.init(DMXController);
  pinMode(buttonPin, INPUT_PULLUP);
  setLook(0);                    // start dark
}

void loop() {
  // 1. debounce: believe a change only once it has held for 30 ms
  int reading = digitalRead(buttonPin);
  if (reading != lastReading) lastChange = millis();
  lastReading = reading;
  if (millis() - lastChange > 30 && reading != buttonState) {
    buttonState = reading;
    if (buttonState == LOW) {    // 2. act on the press itself, once
      fading = true;
      fadeStart = millis();
    }
  }
  // 3. the cue: a step of the fade every time round, never delay()
  if (fading) {
    long t = millis() - fadeStart;
    if (t >= FADE_MS) {
      setLook(FADE_MS);
      fading = false;
    } else {
      setLook(t);
    }
  }
}
`,he=`// Counts presses the simple way: every change from HIGH to LOW.
const int buttonPin = 7;
int lastReading = HIGH;   // the reading last time round
int count = 0;

void setup() {
  Serial.begin(9600);
  pinMode(buttonPin, INPUT_PULLUP);
  Serial.println("Counting presses");
}

void loop() {
  int reading = digitalRead(buttonPin);
  if (reading == LOW && lastReading == HIGH) {   // it just went LOW
    count++;
    Serial.println(count);
  }
  lastReading = reading;
}
`,ce=`// Counts presses properly: debounced, then once per press.
const int buttonPin = 7;
int lastReading = HIGH;         // the raw reading last time round
int buttonState = HIGH;         // the debounced state
unsigned long lastChange = 0;   // when the raw reading last changed
int count = 0;

void setup() {
  Serial.begin(9600);
  pinMode(buttonPin, INPUT_PULLUP);
  Serial.println("Counting presses");
}

void loop() {
  int reading = digitalRead(buttonPin);
  if (reading != lastReading) lastChange = millis();
  lastReading = reading;
  if (millis() - lastChange > 30 && reading != buttonState) {
    buttonState = reading;
    if (buttonState == LOW) {   // a real press: count it once
      count++;
      Serial.println(count);
    }
  }
}
`,J=Array.from({length:14},(e,t)=>`D${t}`);function C(e){const t=e&&Array.isArray(e.parts)&&e.parts||[],n=e&&Array.isArray(e.wires)&&e.wires||[],a=E({parts:t,wires:n}),s=t.find(h=>h.type==="uno"||h.type==="nano")||null,i=t.find(h=>h.type==="max485")||null,l=h=>s?a.pinNet(s.id,h):-1,u=(h,f)=>h?a.pinNet(h.id,f):-1,o=["GND1","GND2","GND3"].map(l).filter(h=>h>=0);return{parts:t,nl:a,board:s,mx:i,bn:l,net:u,isGnd:h=>h>=0&&o.includes(h),pinsOn:h=>h<0?[]:J.filter(f=>l(f)===h),A:u(i,"A"),B:u(i,"B")}}function O(e){const t=F(e),n=t.items.find(a=>!a.ok);return{id:"base",label:"Your MAX485 wiring from p1-d1",ok:t.done,warn:!!(n&&n.warn),note:n?`${n.label}: ${n.note}`:""}}function N(e,t){const n=e.net(t,"A"),a=e.net(t,"B"),s=e.net(t,"GND"),i=n>=0&&n===e.A,l=a>=0&&a===e.B,u=n>=0&&n===e.B&&a===e.A,o=e.isGnd(s);return{onA:i,onB:l,swapped:u,common:o,ok:i&&l&&o}}function ue(e){const t=C(e),n=t.parts.find(s=>s.type==="dmxtester")||null,a=[O(e)];if(a.push({id:"tester",label:"A DMX tester in the lab",ok:!!n,note:"＋ Parts → DMX → DMX tester."}),n){const s=N(t,n);a.push({id:"line",label:"Its A and B on the module's A and B",ok:s.onA&&s.onB,warn:s.swapped,note:s.swapped?"A and B are crossed: the tester's A is on the module's B. Swap the two wires.":s.onA?"Run a wire from the module's B to the tester's B−.":"Run a wire from the module's A to the tester's A+."}),a.push({id:"common",label:"Its common (⏚) on GND",ok:s.common,note:"Run a wire from the tester's ⏚ to a GND: DMX's pin 1, the common."})}return{items:a,done:a.every(s=>s.ok),tester:n}}function me(e,t){const n=t&&e&&e.parts?e.parts[t.id]:null;if(!n)return null;const a=String(n.levels||"").split(" ").filter(Boolean).map(s=>s==="-"?null:+s);return{status:n.status,rate:n.rate,slots:n.slots,startCode:n.startCode,first:n.first||1,levels:a}}function fe(e,t){if(!e||e.status!=="ok")return null;const n=t-e.first;return n>=0&&n<e.levels.length?e.levels[n]:null}function pe(e){const t=C(e),n=t.parts.find(o=>o.type==="dmxpar")||null,a=[O(e)];if(a.push({id:"par",label:"A DMX PAR light in the lab",ok:!!n,note:"＋ Parts → DMX → DMX PAR light."}),n){const o=N(t,n);a.push({id:"parAB",label:"PAR A+ to the module's A, B− to B",ok:o.onA&&o.onB,warn:o.swapped,note:o.swapped?"A and B are crossed. The light says so too: swap the two wires.":o.onA?"Run the module's B to the PAR's B−.":"Run the module's A to the PAR's A+ (through the breadboard, so the terminator can join them)."}),a.push({id:"parGnd",label:"PAR common (⏚) on GND",ok:o.common,note:"Wire the PAR's ⏚ to a GND: DMX's pin 1, the common between the two ends."})}const s=t.parts.find(o=>o.type==="resistor"&&+X(o).ohms==120&&(()=>{const d=t.net(o,"1"),m=t.net(o,"2");return t.A>=0&&t.B>=0&&(d===t.A&&m===t.B||d===t.B&&m===t.A)})()),i=t.parts.find(o=>o.type==="resistor"&&(()=>{const d=t.net(o,"1"),m=t.net(o,"2");return t.A>=0&&t.B>=0&&(d===t.A&&m===t.B||d===t.B&&m===t.A)})());a.push({id:"term",label:"A 120 Ω terminator across A and B at the light's end",ok:!!s,warn:!!i&&!s,note:i?`That resistor across A and B is ${X(i).ohms} Ω: a terminator matches the cable, 120 Ω. Tap it and set 120 Ω.`:"＋ Parts → Basics → Resistor, set to 120 Ω, across the A and B strips nearest the light."});const{btn:l,item:u}=K(e,t);return a.push(u),{items:a,done:a.every(o=>o.ok),par:n,btn:l}}function K(e,t=C(e)){const n=t.parts.find(o=>o.type==="button")||null,a="The button between pin 7 and GND";if(!n)return{btn:n,item:{id:"btn",label:a,ok:!1,note:"＋ Parts → Basics → Pushbutton, across the breadboard's centre gap."}};const s=[t.net(n,"1a"),t.net(n,"2a")],i=s.find(o=>t.pinsOn(o).length),l=i!==void 0?t.pinsOn(i)[0]:null,u=s.find(o=>o!==i);return{btn:n,item:{id:"btn",label:a,ok:l==="D7"&&t.isGnd(u),warn:!!l&&l!=="D7",note:l?l!=="D7"?`The button's on ${U(l)}. The sketches here read pin 7: move it, or change buttonPin.`:"Now the button's other side to GND.":"Wire one side of the button to pin 7 and the other side to GND (across the breadboard's centre gap)."}}}function ge(e){const t=String(e||""),n=t.lastIndexOf("Counting presses");if(n<0)return null;let a=0;for(const s of t.slice(n).split(`
`).slice(1)){const i=/(\d+)\s*$/.exec(s);i&&(a=+i[1])}return a}function be(e,t,n){return t==null?null:t>e?"bounced":n?"held":e?t<e?"short":e>=5?"clean":"even":"ready"}const P={"3ch":["red","green","blue"],"4ch":["dimmer","red","green","blue"],"7ch":["dimmer","red","green","blue","white","strobe","mode"]};function we(e){if(!e)return null;const t=X(e),n=Math.max(1,Math.min(512,+t.addr||1)),a=P[t.mode]||P["4ch"];return{addr:n,mode:t.mode,footprint:a.length,channels:a.map((s,i)=>({ch:n+i,name:s})),last:n+a.length-1}}function ye(e,t){const n=t&&e&&e.parts?e.parts[t.id]:null;if(!n)return null;const a=+n.r||0,s=+n.g||0,i=+n.b||0,l=+n.w||0;return{receiving:!!n.receiving,swapped:!!n.swapped,r:a,g:s,b:i,w:l,bright:Math.max(a,s,i,l)}}function xe(){const e=[];let t=-1/0,n=-1/0;return function(s){const i=[],l=e[e.length-1];for(e.push(s);e.length&&s.t-e[0].t>3e4;)e.shift();const u=l&&s.presses!=null&&l.presses!=null&&s.presses>l.presses;if((s.pressed&&!(l&&l.pressed)||u)&&(t=s.t,i.push("press")),s.bright>=.85&&(!l||l.bright<.85)&&s.t-n>1e3){let o=e.length-1;for(;o>0&&e[o-1].bright<e[o].bright+.02&&e[o-1].bright>.04;)o--;const d=o>0?e[o-1].t:e[0].t,m=e.filter(f=>f.t>d&&f.t<s.t&&f.bright>.05&&f.bright<.85).length;t>=d-1500&&t<=s.t&&(i.push(m>=2&&s.t-d>=600?"faded":"snapped"),n=s.t)}return i}}export{he as C,ie as F,le as M,Z as P,oe as T,fe as a,ne as b,ae as c,P as d,ce as e,K as f,ge as g,be as h,de as i,pe as j,ye as k,xe as l,re as m,se as n,we as p,me as r,ue as t};
