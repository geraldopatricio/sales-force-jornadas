
function formatTelefone(ddd,numero){

    const ONLY_NUMBER_PATTERN = /\d+/g;
    const ddd_only_numbers = ddd.match(ONLY_NUMBER_PATTERN).join("");
    const numero_onlynumbers = numero.match(ONLY_NUMBER_PATTERN).join("");
    return `55${ddd_only_numbers}${numero_onlynumbers}`;
}


telefone = 
formatTelefone("(085)", "99763-5122");

console.log({ 
    ...(telefone && { telefone })
})