let Categories =[
    {
        "Tipologia": "Locale",
        "SottoTipologia": "Mista",
        "MinDiff":4,
        "MaxDiff":20,
        "Provenienza":""
    },
    {
        "Tipologia": "Locale",
        "SottoTipologia": "Femminile",
        "MinDiff":0,
        "MaxDiff":17,
        "Provenienza":""
    },
    {
        "Tipologia": "Nazionale",
        "SottoTipologia": "Semifinale Mista",
        "MinDiff":16,
        "MaxDiff":25,
        "Provenienza":""
    },
    {
        "Tipologia": "Nazionale",
        "SottoTipologia": "Finale Mista",
        "MinDiff":20,
        "MaxDiff":35,
        "Provenienza":""
    },
    {
        "Tipologia": "Nazionale",
        "SottoTipologia": "Finale Femminile",
        "MinDiff":17,
        "MaxDiff":31,
        "Provenienza":""
    }
]

function tara(gara){
    Tipologia=gara.Tipologia;
    SottoTipologia=gara.SottoTipologia;
    problemi=gara.Problemi;

    diffs=[];
    if(Tipologia=="Nazionale"){
        mean=0;
        std=0;
        for(let i=0;i<problemi.length;i++){
            mean+=problemi[i].valore;
        }
        mean/=problemi.length;
        for(let i=0;i<problemi.length;i++){
            std+=(problemi[i].valore-mean)*(problemi[i].valore-mean);
        }
        std/=problemi.length;
        std=Math.sqrt(std);
        for(let i=0;i<problemi.length;i++){
            diffs.push((problemi[i]-mean)/std);
        }

    }else{
        for(let i=0;i<problemi.length;i++){
            diffs.push(i/problemi.length)
        }
    }
    
    return diffs;
}