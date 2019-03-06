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
    addGameToTable(index, partija){
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

    refreshList(){
        $("#blok tbody tr").remove();
        let mi_ukupno = 0;
        let vi_ukupno = 0;
        for(let i = 0; i < this.partije.length; i++){
           this.addGameToTable(i, this.partije[i]);
           mi_ukupno += this.partije[i].mi;
           vi_ukupno += this.partije[i].vi;
        }
        $("#status_mi").text(mi_ukupno);
        $("#status_vi").text(vi_ukupno);
    }
}

function clearModal() {
    $("#mi_ukupno").val("");
    $("#vi_ukupno").val("");
    $("input[value='mi']").prop("checked", true);
    $("#zvanja").val("");
}
function closeModal(){
        $(".modal").css("display", "none");
}

$(document).ready(function () {

    game = new Igra();


    $("#modal_save").click(function () {
        let mi = $("#mi_ukupno").val();
        let vi = $("#vi_ukupno").val();
        let zvao = $("input[name='zvao']:checked").val();
        let zvanja = $("#zvanja").val();

        if (mi.length < 1 || vi.length < 1 || zvanja.length < 1) {
            console.log("Error");
        } else {

            let partija = new Partija(mi, vi, zvao, zvanja);

            game.addGame(partija);
            console.log(game);
            clearModal();
            game.refreshList();
            closeModal();
        }

    });
});