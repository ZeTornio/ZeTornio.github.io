let chosen_args=[]
let chosen_types=[]
const MAX_DIFF = 35
let probs_diff = []
let probs_args = []
let probs =[]
//Funxioni per aggiungere dinamicament le varie tipologie all'html
var append_text='<div><div class="title">Quali tipologie?</div><div class="checkbox-container">'
for(let i=0;i<Categories.length;i++){
  let c_id=Categories[i].Tipologia.replace(/ /g, '')+"_"+Categories[i].SottoTipologia.replace(/ /g, '');
  append_text+='<div id="'+c_id+'-cb" class="c-box">'+Categories[i].Tipologia+", "+Categories[i].SottoTipologia+'</div>'+'<input type="checkbox" id="'+c_id+'" name="alg" style="display: none;">';
}
append_text+='</div></div>'
document.getElementById("setup").innerHTML+=append_text

document.getElementById("setup").innerHTML+='<div><div class="title">Difficoltà</div><div class="explanation">Spiega SPiega</div><div class="checkbox-container"><div id="bilancia-cb" class="c-box">Bilancia la difficoltà</div><div id="ordina-cb" class="c-box">Ordina i problemi per difficoltà</div><div id="personalizza-cb" class="c-box">Personalizza difficoltà</div></div><input type="checkbox" id="bilancia" name="bilancia" style="display: none;"><input type="checkbox" id="ordina" name="ordina" style="display: none;"><input type="checkbox" id="personalizza" name="personalizza" style="display: none;"></div>'

var append_text='<div id="diff-sliders-cont" style="display:none;"><div class="title">Tara le difficoltà</div><div class="explanation">Relativi blablabla</div>';
for(let i=0;i<Categories.length;i++){
  let c_id=Categories[i].Tipologia.replace(/ /g, '')+"_"+Categories[i].SottoTipologia.replace(/ /g, '');
  append_text+='<div id="'+c_id+'-b" class="inline"><div class="diff-label">'+Categories[i].Tipologia+', '+Categories[i].SottoTipologia+'</div><div id="'+c_id+'-min-m" class="pm-button">&minus;</div><div id="'+c_id+'-min-p" class="pm-button">+</div><div class="diff-bar-ext"><div id="'+c_id+'-bar" class="diff-bar-int"></div><div id="'+c_id+'-bar2" class="diff-bar-int-2"></div></div><div id="'+c_id+'-min" style="display: none;">'+Categories[i].MinDiff+'</div><div id="'+c_id+'-max" style="display: none;">'+Categories[i].MaxDiff+'</div><div id="'+c_id+'-max-m" class="pm-button">&minus;</div><div id="'+c_id+'-max-p" class="pm-button">+</div></div>'
}
append_text+='<div id="overall-b" class="inline" style="display:flex;"><div class="diff-label">Selezione</div><div id="overall-min-m" class="pm-button">&minus;</div><div id="overall-min-p" class="pm-button">+</div><div class="diff-bar-ext"><div id="overall-bar" class="diff-bar-int"></div><div id="overall-bar2" class="diff-bar-int-2"></div></div><div id="overall-min" style="display: none;">0</div><div id="overall-max" style="display: none;">'+MAX_DIFF+'</div><div id="overall-max-m" class="pm-button">&minus;</div><div id="overall-max-p" class="pm-button">+</div></div>'
append_text+='</div><div style="width:100%;display:flex;align-items:center;justify-content:center;"><div id="submit-setup" class="button">Crea gara</div></div>';
document.getElementById("setup").innerHTML+=append_text
append_text=""

//Sistema le dimensioni della finestra
function updateSize() {
    document.getElementById("container").style.minHeight = window.innerHeight +"px";
    document.getElementById("setup").style.minHeight = 0.8*window.innerHeight +"px";
    document.body.style.width = 0.6*window.innerWidth +"px";
  }
updateSize();
window.addEventListener("resize", updateSize);

//Funzione per il numero di problemi
function increase_num_prob(){
  let probs=document.getElementById("problems");
  probs.innerHTML=parseInt(probs.innerHTML)+1;
}
function decrease_num_prob(){
  let probs=document.getElementById("problems");
  if(parseInt(probs.innerHTML)>0){
    probs.innerHTML=parseInt(probs.innerHTML)-1;
  }
}
let timeout=null;
function cont_increase_probs(){
  increase_num_prob();
  timeout=setTimeout(cont_increase_probs,150);
}
function cont_decrease_probs(){
  decrease_num_prob();
  timeout=setTimeout(cont_decrease_probs,150);
}
function clear_timeout(){
  clearTimeout(timeout);
}
document.getElementById("increase_problems").addEventListener("mousedown",cont_increase_probs)
document.getElementById("increase_problems").addEventListener("mouseup",clear_timeout)
document.getElementById("reduce_problems").addEventListener("mousedown",cont_decrease_probs)
document.getElementById("reduce_problems").addEventListener("mouseup",clear_timeout)
//Funzione per i checkbox
function triggerCheckbox(event){
  let cb_name = event.target.id.slice(0,-3);
  let cb = document.getElementById(cb_name);
  console.log(cb_name)

  if (cb.checked){
    cb.checked=false;
    event.target.classList.remove("cb-active")
    if(document.getElementById(cb_name+"-b")!=null){
      document.getElementById(cb_name+"-b").style.display='none';
    }
  }else{
    cb.checked=true;
    event.target.classList.add("cb-active");
    if(document.getElementById(cb_name+"-b")!=null){
      document.getElementById(cb_name+"-b").style.display='flex';
    }
  }

}

function addAllTriggers(){
  let cbs=document.getElementsByClassName("c-box");
  for (let i=0;i<cbs.length;i++){
    cbs[i].addEventListener('click',triggerCheckbox);
  }
}
addAllTriggers();
//Funzione per il checkbox che fa apparire gli slider di difficoltà
function showSliders(){
  cb=document.getElementById("personalizza")
  if(cb.checked){
    document.getElementById("diff-sliders-cont").style.display='block';
  }else{
    document.getElementById("diff-sliders-cont").style.display='none';
  }
}
document.getElementById("personalizza-cb").addEventListener('click',showSliders)

//Funzione per gli slider di difficoltà
function increase_max(event){
  let c_name=event.target.id.slice(0,-6);
  let max_v=parseInt(document.getElementById(c_name+"-max").innerHTML);
  if(max_v>=MAX_DIFF){
    return
  }
  document.getElementById(c_name+"-max").innerHTML=max_v+1;
  calibrate_bar(c_name)
}
function decrease_max(event){
  let c_name=event.target.id.slice(0,-6);
  let max_v=parseInt(document.getElementById(c_name+"-max").innerHTML);
  let min_v=parseInt(document.getElementById(c_name+"-min").innerHTML);
  if(max_v-min_v<=1){
    return
  }
  document.getElementById(c_name+"-max").innerHTML=max_v-1;
  calibrate_bar(c_name)
}
function decrease_min(event){
  let c_name=event.target.id.slice(0,-6);
  let min_v=parseInt(document.getElementById(c_name+"-min").innerHTML);
  if(min_v<=0){
    return
  }
  document.getElementById(c_name+"-min").innerHTML=min_v-1;
  calibrate_bar(c_name)
}
function increase_min(event){
  let c_name=event.target.id.slice(0,-6);
  let max_v=parseInt(document.getElementById(c_name+"-max").innerHTML);
  let min_v=parseInt(document.getElementById(c_name+"-min").innerHTML);
  if(max_v-min_v<=1){
    return
  }
  document.getElementById(c_name+"-min").innerHTML=min_v+1;
  calibrate_bar(c_name)
}
function cont_incr_min(event){
  increase_min(event);
  timeout=setTimeout(function(){cont_incr_min(event);},150)
}
function cont_decr_min(event){
  decrease_min(event);
  timeout=setTimeout(function(){cont_decr_min(event);},150)
}
function cont_incr_max(event){
  increase_max(event);
  timeout=setTimeout(function(){cont_incr_max(event);},150)
}
function cont_decr_max(event){
  decrease_max(event);
  timeout=setTimeout(function(){cont_decr_max(event);},150)
}
function calibrate_bar(c_name){
  let min=parseInt(document.getElementById(c_name+'-min').innerHTML);
  let max=parseInt(document.getElementById(c_name+'-max').innerHTML);
  document.getElementById(c_name+"-bar").style.width=100*parseFloat(max-min)/MAX_DIFF + "%";
  document.getElementById(c_name+"-bar").style.left=100*parseFloat(min)/MAX_DIFF + "%";
  
  max=Math.min(max,parseInt(document.getElementById('overall-max').innerHTML));
  min=Math.max(min,parseInt(document.getElementById('overall-min').innerHTML))
  document.getElementById(c_name+"-bar2").style.width=100*parseFloat(max-min)/MAX_DIFF + "%";
  document.getElementById(c_name+"-bar2").style.left=100*parseFloat(min)/MAX_DIFF + "%";
  if(c_name=='overall'){
    calibrate_all_bars();
  }
  if(c_name=='change'){
    changeSlider();
  }
}
function calibrate_all_bars(){
  for(let i=0;i<Categories.length;i++){
    c_id=Categories[i].Tipologia.replace(/ /g, '')+"_"+Categories[i].SottoTipologia.replace(/ /g, '');
    calibrate_bar(c_id);
  }
}
//Calibrazione iniziale
for(let i=-1;i<Categories.length;i++){
  let c_id='overall'
  if(i>-1){
    c_id=Categories[i].Tipologia.replace(/ /g, '')+"_"+Categories[i].SottoTipologia.replace(/ /g, '');
  }
  calibrate_bar(c_id);
  document.getElementById(c_id+"-min-m").addEventListener('mousedown',cont_decr_min);
  document.getElementById(c_id+"-min-m").addEventListener('mouseup',clear_timeout);
  document.getElementById(c_id+"-min-p").addEventListener('mousedown',cont_incr_min);
  document.getElementById(c_id+"-min-p").addEventListener('mouseup',clear_timeout);
  document.getElementById(c_id+"-max-m").addEventListener('mousedown',cont_decr_max);
  document.getElementById(c_id+"-max-m").addEventListener('mouseup',clear_timeout);
  document.getElementById(c_id+"-max-p").addEventListener('mousedown',cont_incr_max);
  document.getElementById(c_id+"-max-p").addEventListener('mouseup',clear_timeout);
}

//Reset delle difficoltà se viene tolta la spunta a difficoltà personalizzata
function reset_diff(){
  cb=document.getElementById("personalizza")
  if(!cb.checked){
    document.getElementById("overall-min").innerHTML=0;
    document.getElementById("overall-max").innerHTML=MAX_DIFF;
    calibrate_bar('overall');
    for(let i=0;i<Categories.length;i++){
      c_id=Categories[i].Tipologia.replace(/ /g, '')+"_"+Categories[i].SottoTipologia.replace(/ /g, '');
      document.getElementById(c_id+"-min").innerHTML=Categories[i].MinDiff;
      document.getElementById(c_id+"-max").innerHTML=Categories[i].MaxDiff;
      calibrate_bar(c_id);
    }
  }
}
document.getElementById("personalizza-cb").addEventListener('click',reset_diff)
//Rimozione dell'ordinamento se viene tolto il bilanciamento 

//Funzione per tarare la difficoltà personalizzata
function create_diff_intervals(){
  let intervals = [];
  for(let i=0;i<Categories.length;i++){
    c_id=Categories[i].Tipologia.replace(/ /g, '')+"_"+Categories[i].SottoTipologia.replace(/ /g, '');
    if(document.getElementById(c_id).checked){
      intervals.push([parseInt(document.getElementById(c_id+"-min").innerHTML),parseInt(document.getElementById(c_id+"-max").innerHTML)]);
    }
  }
  intervals=intervals.sort(function(a,b){return a[0]-b[0]})
  let ov_min=parseInt(document.getElementById("overall-min").innerHTML)
  let ov_max=parseInt(document.getElementById("overall-max").innerHTML)
  for(let i=0;i<intervals.length;i++){
    intervals[i][0]=Math.min(Math.max(intervals[i][0],ov_min),ov_max);
    intervals[i][1]=Math.min(Math.max(intervals[i][1],ov_min),ov_max);
  }
  //console.log(intervals)
  let tot=intervals[0][1]-intervals[0][0];
  let current_max=intervals[0][1];
  for(let i=1;i<intervals.length;i++){
    if(intervals[i][0]<current_max){
      if(intervals[i][1]>current_max){
        tot+=intervals[i][1]-current_max;
        current_max=intervals[i][1];
      }
    }else{
      tot+=intervals[i][1]-intervals[i][0];
      current_max=intervals[i][1];
    }
  }
  //console.log(tot);
  let probs_thresh=[]
  let num_probs=parseInt(document.getElementById('problems').innerHTML)
  let unit_width=tot/num_probs
  let thresh = Math.max(ov_min,intervals[0][0]);

  probs_thresh.push(Math.max(ov_min,intervals[0][0]));
  current_max=intervals[0][1];
  for(let i=0;i<intervals.length;i++){
    if(intervals[i][0]>current_max){
      thresh+=unit_width-current_max+intervals[i][0];
      probs_thresh.push(thresh);
    }
    current_max=Math.max(current_max,intervals[i][1]);
    while(thresh+unit_width<current_max){
      thresh+=unit_width;
      probs_thresh.push(thresh);
    }
  }
  probs_diff.push([Math.max(ov_min,intervals[0][0]),Math.ceil(probs_thresh[2])]);
  for(let i=0;i<num_probs-3;i++){
    probs_diff.push([Math.floor(probs_thresh[i]),Math.ceil(probs_thresh[i+3])])
  }
  probs_diff.push([Math.floor(probs_thresh[num_probs-3]),Math.min(ov_max,intervals[intervals.length-1][1])])
  probs_diff.push([Math.floor(probs_thresh[num_probs-2]),Math.min(ov_max,intervals[intervals.length-1][1])]);
  //console.log(unit_width);
  //console.log(probs_thresh);
  //console.log(probs_diff);
}


//Funzione per la conferma del setup
function submitSetup(){
  cboxes = document.getElementById("setup").getElementsByClassName("c-box")
  for (let i = 0; i < cboxes.length-3; i++) { //Hardcoded number of cbox for 
    let c_name=cboxes[i].id.slice(0,-3)
    if(i<5 &&document.getElementById(c_name).checked){ //Hardcoded number of categories
      chosen_args.push(c_name)
    }else if(document.getElementById(c_name).checked){
      chosen_types.push(c_name)
    }
  } 
  console.log(chosen_args)
  console.log(chosen_types)
  if(chosen_args.length<1){
    chosen_args=[]
    chosen_types=[]
    alert("Selezionare almeno un argomento.")
    return
  }
  if(chosen_types.length<1){
    chosen_args=[]
    chosen_types=[]
    alert("Selezionare almeno una tipologia.")
    return
  }
  let num_probs=parseInt(document.getElementById("problems").innerHTML);
  for(let i=0;i<num_probs;i++){
    probs_args.push(chosen_args);
  }
  if(document.getElementById("bilancia").checked){
    create_diff_intervals();
  }else{
    for(let i=0;i<num_probs;i++){
      probs_diff.push([parseInt(document.getElementById("overall-min").innerHTML),parseInt(document.getElementById("overall-max").innerHTML)]);
    }
  }
  if(!document.getElementById("ordina").checked){
    shuffleArray(probs_diff);
  }
  //console.log(probs_args);
  //console.log(probs_diff);
  loadProblems();

  createGara(num_probs);
  setupChangePopUp();
}
document.getElementById("submit-setup").addEventListener("click",submitSetup)
//REMEMBER MAIN VARS: probs_diff, probs_args, probs
//Funzione per l'eliminazione
function deleteProblem(e){
  i=parseInt(e.parentElement.parentElement.getElementsByClassName("p-num")[0].innerHTML);
  console.log(i);
  probs_diff.splice(i,1);
  probs_args.splice(i,1);
  probs.splice(i,1);
  document.getElementsByClassName("problem").item(i).remove();
  console.log(document.getElementsByClassName("problem"));
  document.getElementsByClassName("add-cont").item(i).remove();
  reset_prob_nums();
}
//Funzione che apre il change
function changeProblem(e){
  cancelChange();
  i=parseInt(e.parentElement.parentElement.getElementsByClassName("p-num")[0].innerHTML);
  console.log(e.parentElement.parentElement);
  document.getElementsByClassName("problem")[i].style.display="none";
  document.getElementById("text-cont").insertBefore(document.getElementById("change-add-opt-setup"),document.getElementsByClassName("add-cont")[i+1]);
  document.getElementById("change-add-opt-setup").getElementsByClassName("use")[0].innerHTML="change";
  document.getElementById("change-add-opt-setup").getElementsByClassName("num")[0].innerHTML=i;
  loadChangePopUp();
}
//Funzione che apre l'add
function addProblem(e){
  cancelChange();
  i=parseInt(e.parentElement.parentElement.getElementsByClassName("p-num")[0].innerHTML);
  newDiv=document.createElement("div");
  newDiv.className="problem";
  newDiv.innerHTML='<div class="p-num"></div><div class="prob-head"><div class="prob-title"></div><div class="prob-author"></div></div><div class="prob-text"></div><div class="prob-opt"><div class="text-button" onclick="changeProblem(this)">Cambia problema</div><div class="text-button" onclick="deleteProblem(this)">Elimina problema</div></div></div>'
  document.getElementById("text-cont").insertBefore(newDiv,e.parentElement.parentElement);
  newDiv2=document.createElement("div");
  newDiv2.className="add-cont";
  newDiv2.innerHTML='<div class="p-num">0</div><div class="add-opt"><div class="text-button" onclick="addProblem(this)">Aggiungi un problema</div></div>';
  document.getElementById("text-cont").insertBefore(newDiv2,newDiv);
  reset_prob_nums();
  document.getElementsByClassName("problem")[i].style.display="none";
  document.getElementById("text-cont").insertBefore(document.getElementById("change-add-opt-setup"),document.getElementsByClassName("add-cont")[i+1]);
  document.getElementById("change-add-opt-setup").getElementsByClassName("use")[0].innerHTML="add";
  document.getElementById("change-add-opt-setup").getElementsByClassName("num")[0].innerHTML=i;
  min=0;
  max=0;
  if(!document.getElementById("bilancia").checked){
    min=parseInt(document.getElementById("overall-min").innerHTML);
    max=parseInt(document.getElementById("overall-max").innerHTML);
  }else if(document.getElementById("ordina").checked){
    if(i==0){
      min=probs_diff[0][0];
      max=probs_diff[0][1];
    }else if(i==probs_args.length){
      min=probs_diff[i-1][0];
      max=probs_diff[i-1][1];
    }else{
      min=Math.floor((probs_diff[i-1][0]+probs_diff[i][0])/2)
      max=Math.ceil((probs_diff[i-1][1]+probs_diff[i][1])/2)
    }
  }else{
    ind=Math.floor(Math.random()*probs_args.length);
    min=probs_diff[ind][0];
    max=probs_diff[ind][1];
  }

  probs_diff.splice(i,0,[min,max]);
  probs_args.splice(i,0,chosen_args);
  probs.splice(i,0,null);
  loadChangePopUp();
}
function reset_prob_nums(){
  divs=document.getElementsByClassName("problem");
  for(let i=0;i<divs.length;i++){
    divs[i].getElementsByClassName("p-num")[0].innerHTML=i;
    if(probs[i]!=null){
      divs[i].getElementsByClassName("prob-title")[0].innerHTML=(i+1)+" - "+probs[i].titolo;
    }
  }
  divs=document.getElementsByClassName("add-cont");
  for(let i=0;i<divs.length;i++){
    divs[i].getElementsByClassName("p-num")[0].innerHTML=i;
  }
}
//Funzioni per il popup change/add
function setupChangePopUp(){
  inHTML='<div class="title">Quali categorie?</div><div class="checkbox-container"><div id="alg-cn-cb" class="c-box">Algebra</div><div id="tdn-cn-cb" class="c-box">Teoria dei numeri</div><div id="log-cn-cb" class="c-box">Logica</div><div id="com-cn-cb" class="c-box">Combinatoria</div><div id="geo-cn-cb" class="c-box">Geometria</div></div><input type="checkbox" id="alg-cn" name="alg" style="display: none;"><input type="checkbox" id="tdn-cn" name="tdn" style="display: none;"><input type="checkbox" id="log-cn" name="log" style="display: none;"><input type="checkbox" id="com-cn" name="com" style="display: none;"><input type="checkbox" id="geo-cn" name="geo" style="display: none;">';
  inHTML+='<div class="title">Difficoltà</div>';
  for(let i=0;i<Categories.length;i++){
    let c_id=Categories[i].Tipologia.replace(/ /g, '')+"_"+Categories[i].SottoTipologia.replace(/ /g, '');
    if(!(document.getElementById(c_id).checked)){
      continue;
    }
    min=parseInt(document.getElementById(c_id+"-min").innerHTML);
    max=parseInt(document.getElementById(c_id+"-max").innerHTML);
    width=100*parseFloat(max-min)/MAX_DIFF + "%";
    left=100*parseFloat(min)/MAX_DIFF + "%";
    inHTML+='<div class="inline" style="display:flex"><div class="diff-label">'+Categories[i].Tipologia+', '+Categories[i].SottoTipologia+'</div><div class="pm-button" style="opacity:0;"></div><div class="pm-button" style="opacity:0;"></div><div class="diff-bar-ext"><div class="diff-bar-int" style="left:'+left+';width:'+width+';"></div><div class="diff-bar-int-2"></div></div><div class="pm-button" style="opacity:0;"></div><div class="pm-button" style="opacity:0;"></div></div>'
    }
    inHTML+='<div class="inline" style="display:flex"><div class="diff-label">Selezione</div><div class="pm-button" id="change-min-m">-</div><div class="pm-button" id="change-min-p">+</div><div class="diff-bar-ext"><div class="diff-bar-int-2" id="change-bar" style="left:0%;width:100%;"></div><div id="change-bar2" class="diff-bar-int-2"></div></div><div class="pm-button" id="change-max-m">-</div><div class="pm-button" id="change-max-p">+</div><div id="change-min" style="display:none;">0</div><div id="change-max" style="display:none;">0</div></div>'
    inHTML+='<div style="width:100%;display:flex;align-items:center;justify-content:center;"><div class="button" onclick="confirmChange()">Conferma</div><div class="button" onclick="cancelChange()">Annulla</div></div>'
  document.getElementById("change-add-opt-setup").innerHTML+=inHTML;
  document.getElementById("change-min-m").addEventListener('mousedown',cont_decr_min);
  document.getElementById("change-min-m").addEventListener('mouseup',clear_timeout);
  document.getElementById("change-min-p").addEventListener('mousedown',cont_incr_min);
  document.getElementById("change-min-p").addEventListener('mouseup',clear_timeout);
  document.getElementById("change-max-m").addEventListener('mousedown',cont_decr_max);
  document.getElementById("change-max-m").addEventListener('mouseup',clear_timeout);
  document.getElementById("change-max-p").addEventListener('mousedown',cont_incr_max);
  document.getElementById("change-max-p").addEventListener('mouseup',clear_timeout);
  addAllTriggers();
}
function loadChangePopUp(){
  p_up=document.getElementById("change-add-opt-setup");
  p_up.style.display="block";
  i=parseInt(p_up.getElementsByClassName("num")[0].innerHTML);
  document.getElementById("change-min").innerHTML=probs_diff[i][0];
  document.getElementById("change-max").innerHTML=probs_diff[i][1];
  console.log(i);
  for(j in probs_args[i]){
    document.getElementById(probs_args[i][j]+"-cn-cb").classList+=" cb-active";
    document.getElementById(probs_args[i][j]+"-cn").checked=true;
  }
  calibrate_bar("change");
}
function confirmChange(){
  args=[]
  cbs=document.getElementById("change-add-opt-setup").getElementsByClassName("c-box");
  for(i in cbs){
    if(cbs[i].id){
      console.log(cbs[i].id);
      if(document.getElementById(cbs[i].id.slice(0,-3)).checked){
        args.push(cbs[i].id.slice(0,-6));
      }
    }
  }
  console.log(args);
  if(args.length==0){
    alert("Seleziona almeno un argomento.");
    return;
  }
  i=parseInt(document.getElementById("change-add-opt-setup").getElementsByClassName("num")[0].innerHTML)
  probs_args[i]=args;
  probs_diff[i]=[parseInt(document.getElementById("change-min").innerHTML),parseInt(document.getElementById("change-max").innerHTML)];
  extract_and_set_problem(i);
  document.getElementById("change-add-opt-setup").getElementsByClassName("use").innerHTML="change";
  cancelChange(); //JUST TO REMOVE POPUP!
}
function cancelChange(){
  p_up=document.getElementById("change-add-opt-setup");
  p_up.style.display='none';
  ind=parseInt(p_up.getElementsByClassName("num")[0].innerHTML);
  if(p_up.getElementsByClassName("use")[0].innerHTML=="add"){
    document.getElementsByClassName("problem")[ind].remove();
    document.getElementsByClassName("add-cont")[ind].remove();
    probs_diff.splice(ind,1);
    probs_args.splice(ind,1);
    probs.splice(ind,1);
    reset_prob_nums();
  }else if(p_up.getElementsByClassName("use")[0].innerHTML=="change"){
    document.getElementsByClassName("problem")[ind].style.display="block";
  }
  //show_gara_debug();
  document.getElementById("change-add-opt-setup").getElementsByClassName("use")[0].innerHTML="static";
  document.getElementById("container").appendChild(document.getElementById("change-add-opt-setup"));
}

function changeSlider(){
  if(document.getElementById("change-bar")){
    bars=document.getElementById("change-add-opt-setup").getElementsByClassName("diff-bar-ext"); //TODO
    ov_left=parseFloat(document.getElementById("change-bar").style.left);
    ov_width=parseFloat(document.getElementById("change-bar").style.width);
    for(i=0;i< bars.length-1;i++){
      b=bars[i].getElementsByClassName("diff-bar-int")[0];
      //console.log(b);
      l=parseFloat(b.style.left);
      w=parseFloat(b.style.width);
      if(l>ov_left+ov_width || ov_left>l+w){
        bars[i].getElementsByClassName("diff-bar-int-2")[0].style.width="0%";
        continue;
      }
      c_l=Math.max(l,ov_left);
      bars[i].getElementsByClassName("diff-bar-int-2")[0].style.left=c_l+"%";
      bars[i].getElementsByClassName("diff-bar-int-2")[0].style.width=(Math.min(l+w,ov_left+ov_width)-c_l)+"%";
    }
  }
}
function show_gara_debug(){
  console.log(probs_diff);
  console.log(probs);
}
//Funzione per creare la gara all'inizio
function createGara(num_probs){
  inHtml='<div class="add-cont"><div class="p-num">0</div><div class="add-opt"><div class="text-button" onclick="addProblem(this)">Aggiungi un problema</div></div></div>';
  for(let i=0;i<num_probs;i++){
    inHtml+='<div class="problem"><div class="p-num">'+i+'</div><div class="prob-head"><div class="prob-title"></div><div class="prob-author"></div></div><div class="prob-text"></div><div class="prob-opt"><div class="text-button" onclick="changeProblem(this)">Cambia problema</div><div class="text-button" onclick="deleteProblem(this)">Elimina problema</div></div></div><div class="add-cont"><div class="p-num">'+(i+1)+'</div><div class="add-opt"><div class="text-button" onclick="addProblem(this)">Aggiungi un problema</div></div></div>'
  }
  document.getElementById("text-cont").innerHTML=inHtml;
  document.getElementById("setup").style.display="none";
  document.getElementById("text-cont").style.display="block";
  for(let i=0;i<num_probs;i++){
    extract_and_set_problem(i);
  }
}

error_problem={"Anno":"","SottoTipologia":"","Tipologia":"","argomento":"","autore":"","numero":-1,"soluzione":-1,"valore":-1,"testo":"Non esistono problemi con i parametri attuali. Cambia problema modificandoli.","titolo":"<p style='color:red;'>Error</p>"
}
//Funxione per mettere un nuovo problema
function extract_and_set_problem(i){
  p=extract_prob(probs_diff[i][0],probs_diff[i][1],probs_args[i]);
  old_p=null;
  if(probs.length>i+1){
    old_p=probs.splice(i,1);
  }
  probs.splice(i,0,p);
  interest_div=document.getElementsByClassName("problem").item(i);
  if(p==null){
    p=error_problem;
  }
  console.log(interest_div);
  interest_div.getElementsByClassName("prob-title")[0].innerHTML=(i+1)+" - "+probs[i].titolo;
  interest_div.getElementsByClassName("prob-author")[0].innerHTML=p.autore;
  interest_div.getElementsByClassName("prob-text")[0].innerHTML=p.testo;
}


//Funzione per mischiare la difficoltà
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}
//Funzione per la creazione della gara

function extract_prob(min,max,args,show_error=false){
  tmp_probs=[];
  for(let i=min;i<max;i++){
    if(i in UnseenProblems){
      for(p in UnseenProblems[i]){
        for(arg in args){
          if(UnseenProblems[i][p].argomento.includes(args[arg])){
            tmp_probs.push([i,UnseenProblems[i][p]]);
            break;
          }
        }
      }
    }
  }
  if(tmp_probs.length==0){
    if(show_error){
      return null;
    }
    reset_pool(min,max);
    return extract_prob(min,max,args,true);
  }
  chosen_prob_with_diff=tmp_probs[Math.floor(Math.random()*tmp_probs.length)];
  i=0;
  while(UnseenProblems[chosen_prob_with_diff[0]][i].titolo!=chosen_prob_with_diff[1].titolo){
    i++;
  }
  UnseenProblems[chosen_prob_with_diff[0]].splice(i,1);
  if(!(chosen_prob_with_diff[0] in SeenProblems)){
    SeenProblems[chosen_prob_with_diff[0]]=[];
  }
  SeenProblems[chosen_prob_with_diff[0]].push(chosen_prob_with_diff[1]);
  return chosen_prob_with_diff[1];
}

function reset_pool(min,max){
  alert("Hai visto tutti i problemi con le opzioni scelte. Rivedrai problemi gia visti.");
  for(let i=min;i<max;i++){
    if(i in SeenProblems){
      for(p in SeenProblems[i]){
        UnseenProblems[i].push(p);
      }
      SeenProblems[i]=[];
    }
  }
}