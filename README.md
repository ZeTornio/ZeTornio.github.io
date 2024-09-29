# Generatore di allenamenti per Olimpiadi della Matematica (Gara a Squadre)
Questa repo raccoglie i testi delle gare a squadre delle [Olimpiadi della Matematica](http://olimpiadi.dm.unibo.it/), sia le fasi locali che nazionali. Oltre alla funzione di archivio, consultabile in [questa pagina](Testi.md), è possibile generare una simulazione di gara in [questa pagina](https://zetornio.github.io/), selezionando vari parametri tra cui la provenienza, l'argomento e la difficoltà dei problemi estratti.

Inoltre, in quest'ultima revisione, è facilmente possibile aggiungere nuovi testi, come spiegato in seguito.
## Aggiungere nuovi problemi
### Aggiungere una categoria
Se il problema è di una nuova categoria, per prima cosa aggiungere la categoria in [```resources/js/gare.js```](resources/js/gare.js), utilizzando la struttura
```
    {
        "Tipologia": <str>,
        "SottoTipologia": <str>,
        "MinDiff":<int>,
        "MaxDiff":<int>
    }
```
In particolare, ```MinDiff``` deve essere maggiore o uguale a 0, e ```MaxDiff``` minore o uguale della costante ```MAX_DIFF``` definita in [```resources/js/script.js```](resources/js/script.js). Questi due parametri determinano la difficoltà della categoria rispetto alle altre categorie.
### Aggiungere una gara
Aggiungere la gara in [```resources/js/testi.js```](resources/js/testi.js) ove sono presenti le gare già esistenti, possibilmente con un criterio logico (al momento sono ordinate per categoria, e poi anno). La struttura deve essere nella forma
```
    {
        "Tipologia": <str>,
        "SottoTipologia" : <str>,
        "Anno": <int>,
        "Ringraziamenti": <str>,
        "Enti": <str>,
        "Problemi": [
            {
                "titolo": <str>,
                "argomento": <str>,
                "soluzione": <int>,
                "numero": <int>,
                "valore": <int>,
                "autore": <str>,
                "testo": <str>
            }
        ]
    }
```
Per ```Ringraziamenti``` ed ```Enti```, se sono molteplici separare da virgole gli interessati. 

```"Tipologia"``` e ```"SottoTipologia"``` devono esistere in [```resources/js/gare.js```](resources/js/gare.js).

I ```Problemi``` hanno come argomento uno (o più, separati da virgola) tra ```log```(logica), ```geo```(geometria), ```tdn```(teoria dei numeri),```alg```(algebra) e ```com```(combinatoria).

La ```soluzione``` è il valore numerico della soluzione, ```numero``` il numero del problema e ```valore``` il punteggio associato a quel problema, che viene poi utilizzato per determiarne la [difficoltà](Difficoltà.md). Se il punteggio è ignoto, usare ```-1```; tuttavia così facendo il problema non sarà mai sorteggiato.


## Ringraziamenti e link utili
Si ringraziano gli autori dei problemi, sempre riportati ove noti, e lo staff che organizza le competizioni. 

Si consiglia di visitare le pagine ufficiali delle competizioni e altre utili risorse su
+ [Olimpiadi della Matematica](http://olimpiadi.dm.unibo.it/)
+ [Fair Math](https://www.fairmath.it/)
+ [Phi Quadro](https://www.phiquadro.it/)
+ [Disfida Matematica](https://www.disfida.it/)