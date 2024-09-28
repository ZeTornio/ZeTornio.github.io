let Categories =[
    {
        "Tipologia": "Locale",
        "SottoTipologia": "Mista",
        "MinDiff":4,
        "MaxDiff":20
    },
    {
        "Tipologia": "Locale",
        "SottoTipologia": "Femminile",
        "MinDiff":0,
        "MaxDiff":17
    },
    {
        "Tipologia": "Nazionale",
        "SottoTipologia": "Semifinale Mista",
        "MinDiff":16,
        "MaxDiff":25
    },
    {
        "Tipologia": "Nazionale",
        "SottoTipologia": "Finale Mista",
        "MinDiff":20,
        "MaxDiff":35
    },
    {
        "Tipologia": "Nazionale",
        "SottoTipologia": "Finale Femminile",
        "MinDiff":17,
        "MaxDiff":31
    }
]

function tara(gara){
    Tipologia=gara.Tipologia;
    SottoTipologia=gara.SottoTipologia;
    problemi=gara.Problemi;

    diffs=[];

    if(problemi[0].valore>0){
        m1=0
        m2=0
        for(let i=0;i<problemi.length;i++){
            let v=problemi[i].valore
            if(v>m2){
                if(v>m1){
                    m2=m1;
                    m1=v;
                }else{
                    m2=v;
                }
            }
        }
        mean=0-m1-m2;
        for(let i=0;i<problemi.length;i++){
            mean+=problemi[i].valore;
        }
        mean/=(problemi.length-2);
        std=0-(m1-mean)*(m1-mean)-(m2-mean)*(m2-mean);
        for(let i=0;i<problemi.length;i++){
            std+=(problemi[i].valore-mean)*(problemi[i].valore-mean);
        }
        std/=(problemi.length-2);
        std=Math.sqrt(std);
        for(let i=0;i<problemi.length;i++){
            diffs.push((problemi[i]-mean)/std);
        }
    }
    return diffs;
}