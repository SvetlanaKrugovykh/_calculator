const output = document.querySelector(".output");
const result = document.querySelector(".result");
const keys = document.querySelectorAll("button");
let PressProcent = false;

function checkOutput() {
	result.style.color = `white`;
	output.textContent = output.textContent.replace(/[^0-9A-Fa-f/+/*/)/(/%/./-]/g, '');
}

function backspace() {
	output.textContent = output.textContent.substring(0, output.textContent.length - 1);
}

addEventListener("keydown", (e) => {
	if (e.key === "=" || e.key === "Enter") {
		calcResult();
		return;
	}

	if (e.code == 'Delete') {
		backspace();
		return;
	}
	if (e.code == 'KeyV' && e.ctrlKey) {
		output.textContent = e.clipboardData.getData('Text');
		checkOutput();
		return;
	}

	if (PressProcent) {
		result.innerText = toProc(output.textContent);
		PressProcent = false;
		return;
	}

	output.contenteditable = 'false';
	output.textContent += e.key;
	checkOutput();
	output.contenteditable = 'true';

});

keys.forEach(key => {
	key.addEventListener("click", calculate);
});

//#region calculation

function toDec(str) {
	let strDec = '';
	output.textContent = output.textContent.replaceAll(':', '.');
	output.textContent = output.textContent.replaceAll('-', '.');
	checkOutput();

	let substrs = str.split('.');
	for (const substr of substrs) {
		strDec = strDec + parseInt(substr, 16) + '.';
	}

	strDec = strDec.substring(0, strDec.length - 1);
	return strDec;
}

function toHex(str) {
	checkOutput();
	let strHex = '';
	let substrs = str.split('.');

	for (const substr of substrs) {
		strHex = strHex + Number(substr).toString(16) + '.';
	}

	strHex = strHex.substring(0, strHex.length - 1);
	return strHex;
}

function toProc(str) {
	let procRezult = undefined;
	checkOutput();
	let substrs = str.split('%');
	try {
		procRezult =
			(substrs[0] - (Math.floor(substrs[0] / substrs[1]))).toString();
	}
	catch {
		return 'ERR!';
	}
	if (procRezult === undefined) {
		return 'ERR!';
	} else {
		PressProcent = false;
		return procRezult.toString();
	}
}

function calculate() {
	let buttonText = this.innerText;

	if (buttonText === "AC") {
		output.innerText = "";
		result.innerText = "0";
		result.style.animation = "";
		output.style.animation = "";
		return;
	}

	if (buttonText === "DEC") {
		result.innerText = toDec(output.textContent);
		return;
	}

	if (buttonText === "HEX") {
		result.innerText = toHex(output.textContent);
		return;
	}

	if (buttonText === "%") {
		PressProcent = true;
		output.textContent += buttonText;
		return;
	}

	if (buttonText === "+/-") {
		if (output.textContent.substring(0, 1) === '-') {
			output.textContent = output.textContent.substring(1, output.textContent.length);
		} else {
			output.textContent = `-` + output.textContent;
		}
		return;
	}

	if (buttonText === "DEL") {
		backspace();
		return;
	}

	if (buttonText === "=") {
		calcResult();
	} else {
		output.textContent += buttonText;
	}


}


function calcResult() {
	checkOutput();
	try {
		if (PressProcent) {
			result.innerText = toProc(output.textContent);
		} else {
			result.innerText = eval(output.innerText);
		}
	} catch {
		result.innerText = 'ERR!';
		result.style.color = `red`;
	}
	result.style.animation = "big 0.5s ease-in-out";
	output.style.animation = "small 0.5s ease-in-out";
	result.style.animationFillMode = "forwards";
	output.style.animationFillMode = "forwards";
}


//#endregion


