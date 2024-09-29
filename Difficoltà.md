# Difficoltà
## Assegnazione della difficoltà ad un problema
Ogni gara viene prima considerata singolarmente. Viene calcolata la media e deviazione standard escludendo i due punteggi più alti, e poi ogni punteggio viene normalizzato.

In seguito, si considerano i problemi divisi per categoria. Tutti i problemi di una categoria vengono ordinati rispetto al punteggio calcolato; la distribuzione è poi trattata come uniforme sullo slider di difficoltà (premere *Personalizza la difficoltà* mentre si crea una gara per vedere gli slider, le difficoltà relative tra le categorie ed eventualmente effettuare modifiche.) 

## Bilancia la difficoltà
Crea *n* intervalli di difficoltà, uniformemente e parzialmente sovrapposti. Da ognuno di questi intervalli sarà estratto uno degli *n* problemi che comporranno la gara. In caso di sostituzione, il nuovo problema sarà estratto dallo stesso intervallo del problema che sostituisce. In caso di aggiunta di un problema, sarà duplicato casualmente un intervallo esistente.

## Ordina i problemi per difficoltà
Questa opzione ha effetto solamente se la difficoltà è [bilanciata](#bilancia-la-difficoltà). Ordina gli intervalli di difficoltà generati. In caso di aggiunta di un problema, il nuovo intervallo sarà una via di mezzo tra i due problemi adiacenti.

## Personalizza difficoltà
Questa opzione è utile solamente se la difficoltà è stata [bilanciata](#bilancia-la-difficoltà), oppure se si vogliono sostituire dei problemi selezionando la difficoltà. In tutti gli altri casi la personalizzazione è inutile in quanto mai considerata.

Ogni categoria ha uno slider associato. L'estremità a sinistra corrisponde al problema più facile di quella categoria, e l'estremità a destra al più difficile. C'è poi uno slider che determina da quali intervalli i problemi verranno estratti. Nell'esempio sottostante,  i problemi saranno estratti tra i difficli della *Locale Femminile*, tutti della *Nazionale Semifinale Mista* e i facili e medi della *Nazionale Finale Mista*.
![alt text](diff_ex/es1.png)