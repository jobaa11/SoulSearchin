document.getElementById('click').onclick =
function textMe() {
    alert('JUST KIDDING ' + " \uD83D\uDE00" )
};


textMe();

module.exports = { 
    text: textMe
}
