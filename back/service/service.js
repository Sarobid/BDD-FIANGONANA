function isValidTimeFormat(input) {
    let timeRegex = /^(?:[01]\d|2[0-3]):(?:[0-5]\d)$/;

    if (!timeRegex.test(input)) {
        return false; 
    }

    let [hours, minutes] = input.split(':').map(Number);
    if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
        return false; 
    }
    return true;
}
exports.isValidTimeFormat = isValidTimeFormat;
function isTimeBefore(time1, time2) {
    let date1 = new Date('2024-01-01T' + time1 + ':00');
    let date2 = new Date('2024-01-01T' + time2 + ':00');
    return date1 < date2;
}
exports.isTimeBefore = isTimeBefore;
function calculateDuration(heureDebut, heureFin){
    let debutEnMs = heureInMillisecconde(heureDebut);
    let finEnMs = heureInMillisecconde(heureFin);
    let dureeEnMs =0;
    if (finEnMs >= debutEnMs) {
        dureeEnMs = finEnMs - debutEnMs;
    } else {
        dureeEnMs = (24 * 60 * 60 * 1000) - debutEnMs + finEnMs;
    }
    return dureeEnMs;
}
exports.calculateDuration = calculateDuration;
function heureInMillisecconde(heure){
    let h = heure.split(":");
    return (+h[0]) * 60 * 60 * 1000 + (+h[1]) * 60 * 1000;
}
exports.heureInMillisecconde = heureInMillisecconde;
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
exports.numberWithCommas = numberWithCommas;

function afficheDate(date) {
    let joursSemaine = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
    let mois = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];
    let jourSemaine = joursSemaine[date.getDay()];
    let jour = date.getDate();
    let moisActuel = mois[date.getMonth()];
    let annee = date.getFullYear();
    let dateFormatee = jourSemaine + " " + (jour < 10 ? '0' : '') + jour + " " + moisActuel + " " + annee;
    return dateFormatee;
}
exports.afficheDate = afficheDate;
function afficheDureMilliseconde(dureeEnMs){
    let heures = Math.floor(dureeEnMs / (1000 * 60 * 60));
    let minutes = Math.floor((dureeEnMs % (1000 * 60 * 60)) / (1000 * 60));
    let heuresFormat = heures < 10 ? '0' + heures : heures;
    let minutesFormat = minutes < 10 ? '0' + minutes : minutes;
    let rep = "";
    if(heuresFormat !== "00"){
        rep = rep + heuresFormat +" h "
    }
    if(minutesFormat !== "00"){
        rep = rep + minutesFormat +" min"
    }
    return rep;
}
exports.afficheDureMilliseconde = afficheDureMilliseconde;

function formatPrice(price){
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
exports.formatPrice = formatPrice;

function createColonnePeriodeSQL(type,colonneDate,name){
    let sql = " "+colonneDate+" as "+name+" ,";
    if(type === "mensuel"){
        sql = " CONCAT(TO_CHAR("+colonneDate+", 'TMMonth'),'-',EXTRACT(YEAR FROM "+colonneDate+")) as "+name+" ,EXTRACT(MONTH FROM "+colonneDate+"), "
    }
    if(type === "annuel"){
        sql = " EXTRACT(YEAR FROM "+colonneDate+") as  "+name+","
    }

    return sql+"";
}
exports.createColonnePeriodeSQL = createColonnePeriodeSQL;

function createOrderByPeriodeSQL(type,colonneDate){
    let sql = " "+colonneDate+" asc ";
    if(type === "mensuel"){
        sql = " EXTRACT(YEAR FROM "+colonneDate+") asc,EXTRACT(MONTH FROM "+colonneDate+") asc  "
    }
    if(type === "annuel"){
        sql = " EXTRACT(YEAR FROM "+colonneDate+") asc "
    }
    return sql+"";
}
exports.createOrderByPeriodeSQL = createOrderByPeriodeSQL;

function createGroupByPeriodeSQL(type,colonneDate){
    let sql = " "+colonneDate+" ";
    if(type === "mensuel"){
        sql = "TO_CHAR("+colonneDate+", 'TMMonth'), EXTRACT(YEAR FROM "+colonneDate+") ,EXTRACT(MONTH FROM "+colonneDate+")  "
    }
    if(type === "annuel"){
        sql = " EXTRACT(YEAR FROM "+colonneDate+")  "
    }
    return sql+"";
}
exports.createGroupByPeriodeSQL = createGroupByPeriodeSQL;

function createFiltreColonnePeriodeSQL(type,colonneDate,debut,fin){
    let sql = " ";
    if(type === "journaliere"){
        if(debut !== "" && debut !==null){
            sql += " and "+colonneDate+" >='"+debut+"' "
        }
        if(fin !== "" && fin !== null){
            sql += " and "+colonneDate+" <='"+fin+"' "
        }
    }
    if(type === "mensuel"){
        if(debut !== "" && debut !==null){
            let d = debut.split("-");
            sql += " and ( EXTRACT(MONTH FROM "+colonneDate+") >="+d[0]+" and EXTRACT(YEAR FROM "+colonneDate+")>="+d[1]+")";
        }
        if(fin !== "" && fin !==null){
            let d = fin.split("-");
            sql += " and ( EXTRACT(MONTH FROM "+colonneDate+") <="+d[0]+" and EXTRACT(YEAR FROM "+colonneDate+")<="+d[1]+")";
        }
    }
    if(type === "annuel"){
        if(debut !== "" && debut!==null){
            sql += " and ( EXTRACT(YEAR FROM "+colonneDate+") >="+debut+" )";
        }
        if(fin !== "" && fin !==null){
            sql += " and ( EXTRACT(YEAR FROM "+colonneDate+") <="+fin+" )";
        }
    }

    return sql+"";
}
exports.createFiltreColonnePeriodeSQL = createFiltreColonnePeriodeSQL;