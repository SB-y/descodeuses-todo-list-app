import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calculette',
  standalone: false,
  templateUrl: './calculette.component.html',
  styleUrl: './calculette.component.css'
})
export class CalculetteComponent implements OnInit {

  result!: number | null;
  N1: any | null = null;
  N2: any | null = null;
  O: string | null = null;
  nombConcat: string = "";  // pour concaténer les chiffres cliqués
  messagediv: string = "";

  listeNbres = [
    { text: "0", value: "0" },
    { text: "1", value: "1" },
    { text: "2", value: "2" },
    { text: "3", value: "3" },
    { text: "4", value: "4" },
    { text: "5", value: "5" },
    { text: "6", value: "6" },
    { text: "7", value: "7" },
    { text: "8", value: "8" },
    { text: "9", value: "9" },
    { text: "=", value: "=" },
    { text: "C", value: "C" },
  ]

  listeOpes = [
    { text: "+", value: "+" },
    { text: "-", value: "-" },
    { text: "x", value: "*" },
    { text: "/", value: "/" }
  ]

  ngOnInit(): void {
  }

  recupNomb(val: string): void {

    if (val === "=") {
      this.calculer(); // si on clique sur '=', on appelle la fonction calculer
      return;
    }
  
    if (val === "C") {
      this.reset(); // si on clique sur 'C', on réinitialise tout
      return;
    }
    
    this.nombConcat += val.toString();  // on concatène les chiffres
  
    if (this.O === null) { // tant qu'on est pas à l'opérateur, on concaténe le premier nombre N1 puis le nombre N2
      this.N1 = +this.nombConcat;
    } else {
      this.N2 = +this.nombConcat;
    }

  }

  recupOpe(val: string): void {
    if (this.N1 !== null) { // on passe à l'opérateur après avoir saisi (et concaténer) le premier nombre N1
      this.O = val;
      this.nombConcat = ""; // on reset pour saisir le deuxième nombre N2
      console.log("Opérateur =", this.O);
    }
  }


  calculer(): void {

    if (this.N1 === null || this.N2 === null || this.O === null) {
      this.messagediv = "Veuillez effectuer une opération complète";
      return;
    }

    switch (this.O) {
      case "+":
        this.result = this.N1 + this.N2;
        break;
      case "-":
        this.result = this.N1 - this.N2;
        break;
      case "*":
        this.result = this.N1 * this.N2;
        break;
      case "/":
        if (this.N2 !== 0) {
          this.result = this.N1 / this.N2
        } else {
          this.messagediv = "Opération invalide";
        }
        break;
    }
  }

  reset(): void {
    this.result = null;
    this.N1 = null;
    this.N2 = null;
    this.O = null;
    this.nombConcat = "";
    this.messagediv = "";
  }
}
