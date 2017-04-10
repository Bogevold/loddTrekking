  var ferdig = true;
  var forste = true;
  var varTimer;
  var varTimer2;
  var varLoddene = [];
  var varVinnere = [];
  var varTrukket = 0;
  var antVinnere = 1;
  var vRad = 7;
  var vCol = 5;
  
  var vinnerListe

  function creTable() {
    document.getElementById('Resultat').setAttribute('hidden', '');
    var hentLodd = document.getElementById('antallLodd');
    antLodd = hentLodd.value;
    loddNr = 1;
    var tblCont = document.getElementById('tblCont');
    tblCont.innerHTML = "";
    var tbl = document.createElement('table');
    var tblB = document.createElement('tbody');
    tbl.setAttribute('class', 'table-condensed');
    for (var i = 0; i < vRad; i++) {
        var tr = document.createElement('tr');
        for (var n = 0; n < vCol; n++) {
            var td = document.createElement('td');
            td.appendChild(document.createTextNode(loddNr));
            td.setAttribute('id', "loddNr"+loddNr++);
            tr.appendChild(td);
            
        }
        tblB.appendChild(tr);
    }
    tbl.appendChild(tblB);
    tblCont.appendChild(tbl);
    document.getElementById('inVinnere').setAttribute('max', antLodd);
  }
  
  function nullAlleCeller() {
    var celler = document.getElementsByTagName('td');
    for (var i=0; i < celler.length; i++) {
        celler[i].setAttribute('class', 'normal');
    }
  }

  function nullCeller() {
    for (var i=0; i < varLoddene.length; i++) {
        varLoddene[i].setAttribute('class', 'normal');
        //console.log(celler[i].getAttribute('id'));
    }
  }  
  

  function trekk() {
    document.getElementById('Resultat').setAttribute('hidden', '');
    varLoddene = Array.prototype.slice.call(document.getElementsByTagName('td'));
    starTid = Date.now();
    varVinnere = [];
    varTrukket = 0;
    antVinnere = document.getElementById('inVinnere').value;
    varTimer = window.setInterval(velgLodd, 100);
    while (vinnerListe.firstChild) {
        vinnerListe.removeChild(vinnerListe.firstChild);
    }
  }  

  function velgLodd() {
    nullCeller();
    var nr = Math.floor(Math.random() * varLoddene.length);
    varLoddene[nr].setAttribute('class', 'valgt');
    var varTid = Date.now() - starTid;
    var varIntervall = document.getElementById('inTid').value * 1000/antVinnere;
    console.log("Tid: " + varTid);
    console.log("Intervall: " + varIntervall);
    console.log("varTrukket: " + varTrukket);
    if (varTid  > varIntervall*(1+varTrukket) ) {
      varTrukket++;
      varVinnere.push(varLoddene[nr]);
      varLoddene.splice(nr,1);
      if (antVinnere==varTrukket) {
        window.clearInterval(varTimer);
      }
            
      var vinnerLoddInn = varVinnere[varVinnere.length - 1].childNodes[0].nodeValue;
      console.log("Node value: " + vinnerLoddInn);

      var punkt = document.createElement('li');      
      punkt.appendChild(document.createTextNode("Vinner nr " + (varVinnere.length) + " ble lodd nr: " + vinnerLoddInn));

      if (varTrukket == 1) {
        var res = document.getElementById('Resultat');
        res.removeAttribute('hidden');
        var vinnereTxt = document.createElement('div');
        vinnerListe = document.createElement('ul');
        vinnerListe.setAttribute('class', 'vinnere');
        vinnereTxt.appendChild(vinnerListe);
        res.appendChild(vinnereTxt);
      }

      vinnerListe.appendChild(punkt);

  
    }
    
  }
  
  
  
  function velgInn() {
    document.getElementById("tabInn").setAttribute('class', 'active');
    document.getElementById("tabTrekk").removeAttribute('class');
    document.getElementById("divInnstillinger").removeAttribute('hidden');
    document.getElementById("divTrekking").setAttribute('hidden', '');
  }

  function velgTrekk() {
    document.getElementById("tabTrekk").setAttribute('class', 'active');
    document.getElementById("tabInn").removeAttribute('class');
    document.getElementById("divTrekking").removeAttribute('hidden');
    document.getElementById("divInnstillinger").setAttribute('hidden', '');
  }
  
  function fBeregn() {
    vRad = document.getElementById('antallRader').value;
    vCol = document.getElementById('antallKol').value;
    var antLoddB = vRad * vCol;
    document.getElementById('antallLodd').value = antLoddB;
  }
  
  var starTid;
