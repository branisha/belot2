// alert("Hello");

function closeModal() {
    $(".modal").css("display", "none");
}
function openModal() {
    $(".modal").css("display", "initial");
}

class Partija {
    constructor(mi, vi, zvao, zvanje) {
        this.mi = parseInt(mi);
        this.vi = parseInt(vi);
        this.zvao = zvao
        this.zvanje = parseInt(zvanje);
        this.ukupno = this.mi + this.vi + this.zvanje;
    }
}

class Igra {
    constructor() {
        this.partije = new Array();
    }
    addGame(partija) {
        this.partije.push(partija);
    }
    addGameToTable(index, partija) {
        let rows = index + 1 + ".";

        let new_row = document.createElement("tr");
        let col_1 = document.createElement("td");
        let col_2 = document.createElement("td");
        let col_3 = document.createElement("td");

        $(col_1).text(rows);
        $(col_2).text(partija.mi);
        $(col_3).text(partija.vi);

        $(new_row).append(col_1);
        $(new_row).append(col_2);
        $(new_row).append(col_3);

        $("#blok tbody").append(new_row);
    }

    refreshList() {
        $("#blok tbody tr").remove();
        let mi_ukupno = 0;
        let vi_ukupno = 0;
        for (let i = 0; i < this.partije.length; i++) {
            this.addGameToTable(i, this.partije[i]);
            mi_ukupno += this.partije[i].mi;
            vi_ukupno += this.partije[i].vi;
        }
        $("#status_mi").text(mi_ukupno);
        $("#status_vi").text(vi_ukupno);
    }
}

function clearModal() {
    $("#modal_game").text("162");
    $("#mi_ukupno").val("");
    $("#vi_ukupno").val("");
    $("input[value='mi']").prop("checked", true);
    $("#zvanja").val("");
    $("#modal_status").val("");
}
function closeModal() {
    $(".modal").css("display", "none");
}


function updateZvanje() {
    let zvanje = parseInt($("#zvanja").val());
    if ($("#zvanja").val().length < 1) zvanje = 0;
    $("#modal_game").text(162 + zvanje);
    return zvanje;
}

function updateGame(element) {


    let mi_vrijednost = parseInt($("#mi_ukupno").val());
    let vi_vrijednost = parseInt($("#vi_ukupno").val());
    let zvanje = updateZvanje();

    if ($("#mi_ukupno")[0] == element) {
        $("#vi_ukupno").val(162 + zvanje - mi_vrijednost);
        vi_vrijednost = parseInt($("#vi_ukupno").val());
    } else if ($("#vi_ukupno")[0] == element) {
        $("#mi_ukupno").val(162 + zvanje - vi_vrijednost);
        mi_vrijednost = parseInt($("#mi_ukupno").val());
    }

    if ($("input[type='radio']:checked").val() == ("mi")) {
        if ((162 + zvanje) / 2 > mi_vrijednost) {
            $("#modal_status").text("Pisati će se puna igra pod \"VI\"");
        } else {
            $("#modal_status").text("");
        }

    } else {
        console.log((162 + zvanje) / 2);
        if ((162 + zvanje) / 2 > vi_vrijednost) {
            $("#modal_status").text("Pisati će se puna igra pod \"MI\"");
        } else {
            $("#modal_status").text("");
        }
    }
}

$(document).ready(function () {

    game = new Igra();


    $("#modal_save").click(function () {
        let mi = parseInt($("#mi_ukupno").val());
        let vi = parseInt($("#vi_ukupno").val());
        let zvao = $("input[name='zvao']:checked").val();
        let zvanja = parseInt($("#zvanja").val());

        if (Number.isNaN(mi) || Number.isNaN(vi)) {
            console.log("Error");
            $("#modal_status").text("Vrijednosti nisu uredu");

        } else {

            if (Number.isNaN(zvanja)) zvanja = 0;

            if (zvao == "mi" && mi < (162 + zvanja) / 2) {
                mi = 0;
                vi = 162 + zvanja;
            } else if (zvao == "vi" && vi < (162 + zvanja) / 2) {
                vi = 0;
                mi = 162 + zvanja;
            }

            let partija = new Partija(mi, vi, zvao, zvanja);

            game.addGame(partija);
            clearModal();
            game.refreshList();
            closeModal();
            str = JSON.stringify(game);
            console.log(game);
            Object.create

        }

    });

    $("input[type='radio']").click(function () {
        updateGame($("input[type='radio']:checked")[0]);
    });

    $("#zvanja").keyup(function () {

        let zvanje = updateZvanje();

        if($("input[type='radio']:checked").val() == "mi"){
            let new_value = parseInt($("#vi_ukupno").val());
            new_value = 162 + zvanje - new_value;
            console.log(zvanje);
            $("#mi_ukupno").val(new_value);

        }else{
            let new_value = parseInt($("#mi_ukupno").val());
            new_value = 162 + zvanje - new_value;
            console.log(zvanje);
            $("#vi_ukupno").val(new_value);
        }

        updateGame($("input[type='radio']:checked")[0]);

    });

    $("#mi_ukupno, #vi_ukupno").keyup(function () {
        updateGame(this);
    });
});